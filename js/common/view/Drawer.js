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
  var MoveTo = require( 'TWIXT/MoveTo' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Node} contentsNode - contents of the drawer
   * @param {Object} [options]
   * @constructor
   */
  function Drawer( contentsNode, options ) {

    options = _.extend( {
      
      size: null, // {Dimension2|null} !null: contents sized to fit in container, null: container sized to fit contents
      cornerRadius: 0,
      xMargin: 0,
      yMargin: 0,
      open: true, // {boolean} is the drawer initially open?
      animationEnabled: true, // {boolean} is animation enabled when opening/closing the drawer?
      
      // handle
      handleLocation: 'top', // {string} 'top'|'bottom'
      handleSize: new Dimension2( 70, 20 ),
      handleCornerRadius: 5,
      handleFill: 'rgb( 230, 230, 230 )', // {Color|string}
      handleTouchAreaXDilation: 0, // {number} touchArea for the drawer's handle
      handleTouchAreaYDilation: 0, // {number} touchArea for the drawer's handle
      handleMouseAreaXDilation: 0, // {number} touchArea for the drawer's handle
      handleMouseAreaYDilation: 0, // {number} touchArea for the drawer's handle
      
      // grippy dots on handle
      grippyDotRadius: 1,
      grippyDotColor: 'black', // {Color|string}
      grippyDotRows: 2,
      grippyDotColumns: 4,
      grippyDotXSpacing: 9,
      grippyDotYSpacing: 5,

      // callbacks
      beforeOpen: null, // {function} called immediately before the drawer is opened 
      afterClose: null // {function} called immediately after the drawer is closed
      
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

    // background
    var backgroundNode = new Rectangle( 0, 0, CONTAINER_WIDTH, CONTAINER_HEIGHT, {
      fill: 'white',
      cornerRadius: options.cornerRadius
    } );

    // border
    var borderNode = new Rectangle( 0, 0, CONTAINER_WIDTH, CONTAINER_HEIGHT, {
      stroke: 'black',
      cornerRadius: options.cornerRadius
    } );

    // scale contents to fit the container
    if ( options.size ) {
      var scale = Math.min( 1, Math.min( CONTAINER_WIDTH / CONTENTS_WIDTH, CONTAINER_HEIGHT / CONTENTS_HEIGHT ) );
      contentsNode.setScaleMagnitude( scale );
    }

    // handle, rectangle with top or bottom corners rounded, the other corners square
    var HANDLE_RADII = ( options.handleLocation === 'top' ) ? {
      topLeft: options.handleCornerRadius,
      topRight: options.handleCornerRadius
    } : {
      bottomLeft: options.handleCornerRadius,
      bottomRight: options.handleCornerRadius
    };
    var handleShape = Shape.roundedRectangleWithRadii( 0, 0, options.handleSize.width, options.handleSize.height, HANDLE_RADII );
    var handleNode = new Path( handleShape, {
      cursor: 'pointer',
      fill: options.handleFill,
      stroke: 'black'
    } );

    // grippy dots on the handle
    var grippyDotsShape = new Shape();
    var grippyX = 0;
    var grippyY = 0;
    for ( var row = 0; row < options.grippyDotRows; row++ ) {
      for ( var column = 0; column < options.grippyDotColumns; column++ ) {
        grippyX = column * options.grippyDotXSpacing;
        grippyY = row * options.grippyDotYSpacing;
        grippyDotsShape.moveTo( grippyX, grippyY );
        grippyDotsShape.arc( grippyX, grippyY, options.grippyDotRadius, 0, 2 * Math.PI );
      }
    }
    var grippyDotsNode = new Path( grippyDotsShape, {
      fill: options.grippyDotColor,
      center: handleNode.center
    } );
    handleNode.addChild( grippyDotsNode );

    // handle pointerArea
    if ( options.handleTouchAreaXDilation !== 0 || options.handleTouchAreaYDilation !== 0 ) {
      var touchAreaShiftY = ( options.handleLocation === 'top' ) ? -options.handleTouchAreaYDilation : options.handleTouchAreaYDilation;
      handleNode.touchArea = handleNode.localBounds.dilatedXY( options.handleTouchAreaXDilation, options.handleTouchAreaYDilation ).shiftedY( touchAreaShiftY );
    }
    if ( options.handleMouseAreaXDilation !== 0 || options.handleMouseAreaYDilation !== 0 ) {
      var mouseAreaShiftY = ( options.handleLocation === 'top' ) ? -options.handleMouseAreaYDilation : options.handleMouseAreaYDilation;
      handleNode.mouseArea = handleNode.localBounds.dilatedXY( options.handleMouseAreaXDilation, options.handleMouseAreaYDilation ).shiftedY( mouseAreaShiftY );
    }

    // layout, position the handle at center-top or center-bottom
    backgroundNode.x = 0;
    handleNode.centerX = backgroundNode.centerX;
    if ( options.handleLocation === 'top' ) {
      handleNode.top = 0;
      backgroundNode.top = handleNode.bottom - 1;
    }
    else {
      backgroundNode.top = 0;
      handleNode.top = backgroundNode.bottom - 1;
    }
    borderNode.center = backgroundNode.center;
    contentsNode.center = backgroundNode.center;

    // put all of the moving pieces together
    var drawerNode = new Node( {
      children: [ handleNode, backgroundNode, contentsNode, borderNode ]
    } );

    // wrap the drawer with a clipping area, to show/hide the container
    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ drawerNode ];
    options.clipArea = Shape.bounds( drawerNode.bounds );
    Node.call( this, options );

    var openLocation = new Vector2( drawerNode.x, 0 );
    var closeLocation = new Vector2( drawerNode.x, ( options.handleLocation === 'top' ) ? backgroundNode.height : -backgroundNode.height );
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
      
      open && options.beforeOpen && options.beforeOpen();

      if ( thisNode._animationEnabled ) {

        // animate open/closed
        animation = new MoveTo( drawerNode, open ? openLocation : closeLocation, {
          constantSpeed: false,
          duration: 500,  // ms
          onComplete: function() {
            animation = null;
            !open && options.afterClose && options.afterClose();
          }
        } );
        animation.start();
      }
      else {
        
        // animation disabled, move immediately to new state
        drawerNode.translation = open ? openLocation : closeLocation;
        !open && options.afterClose && options.afterClose();
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

      // set the drawer to it's initial open/closed state, with or without animation
      var saveAnimationEnabled = this.animationEnabled;
      this.animationEnabled = options.animationEnabled;
      this.openProperty.reset();
      this.animationEnabled = saveAnimationEnabled;
    },

    /**
     * Determines whether animation is enabled for opening/closing drawer.
     *
     * @param {boolean} animationEnabled
     * @public
     *
     */
    setAnimationEnabled: function( animationEnabled ) {
      this._animationEnabled = animationEnabled;
    },
    set animationEnabled( value ) { this.setAnimationEnabled( value ); },

    /**
     * Is animation enabled for for opening/closing drawer?
     *
     * @returns {boolean}
     * @public
     */
    getAnimationEnabled: function() {
      return this._animationEnabled;
    },
    get animationEnabled() { return this.getAnimationEnabled(); }
  } );
} );
