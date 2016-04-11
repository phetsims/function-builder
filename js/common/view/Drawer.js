// Copyright 2016, University of Colorado Boulder

/**
 * A drawer that opens/closes to show/hide its contents.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var DownUpListener = require( 'SCENERY/input/DownUpListener' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var MoveTo = require( 'TWIXT/MoveTo' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var HANDLE_SIZE = new Dimension2( 70, 20 );
  var HANDLE_CORNER_RADIUS = 5;
  var ARROW_SIZE = new Dimension2( 20, 7 );

  /**
   * @param {Node} contentsNode
   * @param {Object} [options]
   * @constructor
   */
  function Drawer( contentsNode, options ) {

    options = _.extend( {
      size: null, // {Dimension2|null} !null: contents sized to fit in container, null: container sized to fit contents
      handleLocation: 'top', // {string} 'top'|'bottom'
      xMargin: 0,
      yMargin: 0,
      open: true, // {boolean} is the drawer initially open?
      animationEnabled: true // {boolean} is animation enabled when opening/closing the drawer?
    }, options );

    assert && assert( options.handleLocation === 'top' || options.handleLocation === 'bottom' );

    this._animationEnabled = options.animationEnabled; // @private

    var thisNode = this;

    // size of contents, adjusted for margins
    var CONTENTS_WIDTH = contentsNode.width + ( 2 * options.xMargin );
    var CONTENTS_HEIGHT = contentsNode.height + ( 2 * options.yMargin );

    // size of container
    var CONTAINER_WIDTH = options.size ? options.size.width : CONTENTS_WIDTH;
    var CONTAINER_HEIGHT = options.size ? options.size.height : CONTENTS_HEIGHT;

    // container that holds the contents
    var containerNode = new Rectangle( 0, 0, CONTAINER_WIDTH, CONTAINER_HEIGHT, {
      cornerRadius: 0,
      fill: 'white',
      stroke: 'black'
    } );

    // scale contents to fit the container
    if ( options.size ) {
      var scale = Math.min( 1, Math.min( CONTAINER_WIDTH / CONTENTS_WIDTH, CONTAINER_HEIGHT / CONTENTS_HEIGHT ) );
      contentsNode.setScaleMagnitude( scale );
    }

    // handle, rectangle with top or bottom corners rounded, the other corners square
    var HANDLE_RADII = ( options.handleLocation === 'top' ) ? {
      topLeft: HANDLE_CORNER_RADIUS,
      topRight: HANDLE_CORNER_RADIUS
    } : {
      bottomLeft: HANDLE_CORNER_RADIUS,
      bottomRight: HANDLE_CORNER_RADIUS
    };
    var handleShape = Shape.roundedRectangleWithRadii( 0, 0, HANDLE_SIZE.width, HANDLE_SIZE.height, HANDLE_RADII );
    var handleNode = new Path( handleShape, {
      cursor: 'pointer',
      fill: '#F2E916',
      stroke: 'black'
    } );

    // arrow shapes
    var upArrowShape = new Shape()
      .moveTo( 0, 0 )
      .lineTo( ARROW_SIZE.width / 2, -ARROW_SIZE.height )
      .lineTo( ARROW_SIZE.width, 0 );
    var downArrowShape = upArrowShape.transformed( Matrix3.rotation2( Math.PI ) );

    // open and close arrows
    var ARROW_OPTIONS = {
      stroke: 'black',
      lineWidth: 2,
      lineCap: 'round',
      center: handleNode.center
    };
    var openArrowNode = new Path( ( options.handleLocation === 'top' ) ? upArrowShape : downArrowShape, ARROW_OPTIONS );
    var closeArrowNode = new Path( ( options.handleLocation === 'top' ) ? downArrowShape : upArrowShape, ARROW_OPTIONS );
    handleNode.addChild( openArrowNode );
    handleNode.addChild( closeArrowNode );
    openArrowNode.visible = !options.open;
    closeArrowNode.visible = options.open;

    // layout, position the handle at center-top or center-bottom
    containerNode.x = 0;
    handleNode.centerX = containerNode.centerX;
    if ( options.handleLocation === 'top' ) {
      handleNode.top = 0;
      containerNode.top = handleNode.bottom - 1;
    }
    else {
      containerNode.top = 0;
      handleNode.top = containerNode.bottom - 1;
    }
    contentsNode.center = containerNode.center;

    // put all of the moving pieces together
    var drawerNode = new Node( {
      children: [ handleNode, containerNode, contentsNode ]
    } );

    // wrap the drawer with a clipping area, to show/hide the container
    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ drawerNode ];
    options.clipArea = Shape.rect( 0, 0, drawerNode.width, drawerNode.height );
    Node.call( this, options );

    var openLocation = new Vector2( drawerNode.x, 0 );
    var closeLocation = new Vector2( drawerNode.x,  ( options.handleLocation === 'top' ) ? containerNode.height : -containerNode.height );
    drawerNode.translation = options.open ? openLocation : closeLocation;

    // click on the handle to toggle between open and closed
    handleNode.addInputListener( new DownUpListener( {
      down: function( event, trail ) {
        thisNode.openProperty.set( !thisNode.openProperty.get() );
      }
    } ) );

    var animation = null; // {MoveTo} animation that opens/closes the drawer

    // @public is the drawer open?
    this.openProperty = new Property( options.open );

    // animate opening and closing of the drawer
    this.openProperty.lazyLink( function( open ) {

      // stop any animation that's in progress
      animation && animation.stop();

      // adjust arrow on the handle
      openArrowNode.visible = !open;
      closeArrowNode.visible = open;

      if ( thisNode._animationEnabled ) {

        // animate open/closed
        animation = new MoveTo( drawerNode, open ? openLocation : closeLocation, {
          constantSpeed: false,
          duration: 500,  // ms
          onComplete: function() {
            animation = null;
          }
        } );
        animation.start();
      }
      else {

        // animation disabled, move immediately to new state
        drawerNode.translation = open ? openLocation : closeLocation;
      }
    } );
  }

  functionBuilder.register( 'Drawer', Drawer );

  return inherit( Node, Drawer, {

    /**
     * @param {Object} [options]
     * @public
     */
    reset: function( options ) {

      options = _.extend( {
        animationEnabled: this.animationEnabled
      }, options );

      var saveAnimationEnabled = this.animationEnabled;
      this.animationEnabled = options.animationEnabled;
      this.openProperty.reset();
      this.animationEnabled = saveAnimationEnabled;
    },

    /**
     * Determines whether animation is enabled for opening/closing drawer.
     * @param {boolean} animationEnabled
     * @public
     */
    setAnimationEnabled: function( animationEnabled ) {
      this._animationEnabled = animationEnabled;
    },
    set animationEnabled( value ) { this.setAnimationEnabled( value ); },

    /**
     * Is animation enabled for for opening/closing drawer?
     * @returns {boolean}
     * @public
     */
    getAnimationEnabled: function() {
      return this._animationEnabled;
    },
    get animationEnabled() { return this.getAnimationEnabled(); }
  } );
} );
