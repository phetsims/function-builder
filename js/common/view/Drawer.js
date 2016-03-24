// Copyright 2016, University of Colorado Boulder

/**
 * A drawer that opens/closes to show/hide its contents.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var DownUpListener = require( 'SCENERY/input/DownUpListener' );
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var Text = require( 'SCENERY/nodes/Text' );

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
      open: true // {boolean} is the drawer initially open?
    }, options );

    assert && assert( options.handleLocation === 'top' || options.handleLocation === 'bottom' );

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

    // handle
    var HANDLE_CORNER_RADIUS = 5;
    var HANDLE_RADII = ( options.handleLocation === 'top' ) ? {
      topLeft: HANDLE_CORNER_RADIUS,
      topRight: HANDLE_CORNER_RADIUS
    } : {
      bottomLeft: HANDLE_CORNER_RADIUS,
      bottomRight: HANDLE_CORNER_RADIUS
    };
    var handleShape = Shape.roundedRectangleWithRadii( 0, 0, 70, 30, HANDLE_RADII );
    var handleNode = new Path( handleShape, {
      cursor: 'pointer',
      fill: '#F2E916',
      stroke: 'black'
    } );

    // plus and minus indicators on handle
    var INDICATOR_OPTIONS = {
      font: new FBFont( 20 ),
      center: handleNode.center
    };
    var plusNode = new Text( FBSymbols.PLUS, INDICATOR_OPTIONS );
    var minusNode = new Text( FBSymbols.MINUS, INDICATOR_OPTIONS );
    handleNode.addChild( plusNode );
    handleNode.addChild( minusNode );

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

    // click on the handle to toggle between open and closed
    var yOpenedOffset = 0;
    var yClosedOffset = ( options.handleLocation === 'top' ) ? containerNode.height : -containerNode.height;
    handleNode.addInputListener( new DownUpListener( {
      down: function( event, trail ) {
        thisNode.openProperty.set( !thisNode.openProperty.get() );
      }
    } ) );

    // @public is the drawer open?
    this.openProperty = new Property( options.open );
    this.openProperty.link( function( open ) {
      plusNode.visible = !open;
      minusNode.visible = open;
      drawerNode.top = ( open ? yOpenedOffset : yClosedOffset );
    } );
  }

  functionBuilder.register( 'Drawer', Drawer );

  return inherit( Node, Drawer, {

    // @public
    reset: function() {
      this.openProperty.reset();
    }
  } );
} );
