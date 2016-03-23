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
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );

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
      yMargin: 0
    }, options );

    assert && assert( options.handleLocation === 'top' || options.handleLocation === 'bottom' );

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

    //TODO use a RectangularToggleButton?
    // handle
    var handleCornerRadius = 5;
    var handleNode = new Rectangle( 0, 0, 70, 30, {
      cursor: 'pointer',
      fill: '#F2E916',
      stroke: 'black',
      cornerRadius: handleCornerRadius
    } );

    // layout, position the handle at center-top or center-bottom
    containerNode.x = 0;
    handleNode.centerX = containerNode.centerX;
    if ( options.handleLocation === 'top' ) {
      handleNode.top = 0;
      containerNode.top = handleNode.bottom - handleCornerRadius;
    }
    else {
      containerNode.top = 0;
      handleNode.top = containerNode.bottom - handleCornerRadius;
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

    // click on the handle to open/close the drawer
    var isOpen = true;
    var yOffsetToClose = ( options.handleLocation === 'top' ) ? containerNode.height : -containerNode.height;
    handleNode.addInputListener( new DownUpListener( {
      down: function( event, trail ) {
        if ( isOpen ) {
          drawerNode.top = drawerNode.top + yOffsetToClose;
        }
        else {
          drawerNode.top = drawerNode.top - yOffsetToClose;
        }
        isOpen = !isOpen;
      }
    } ) );
  }

  functionBuilder.register( 'Drawer', Drawer );

  return inherit( Node, Drawer );
} );
