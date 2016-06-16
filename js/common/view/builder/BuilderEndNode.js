// Copyright 2016, University of Colorado Boulder

/**
 * The end piece of a builder, which provide some pseudo-3D perspective.
 * It consists of an ellipse with a parallelogram slot that a card passes through.
 * This is factored out to facilitate splitting the builder into foreground and background,
 * so that we can provide the illusion of a card passing through the builder.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @param {string} faces - which way the end faces, 'left'|'right'
   * @param {Object} [options]
   * @constructor
   */
  function BuilderEndNode( faces, options ) {

    options = _.extend( {

      // ellipse
      radiusX: 15,
      radiusY: 30,
      fill: 'white',
      stroke: 'black',
      lineWidth: 1,

      // slot
      slotFill: 'white',
      slotStroke: 'black',
      slotLineWidth: 2

    }, options );

    assert && assert( faces === 'left' || faces === 'right', 'invalid value for faces: ' + faces );

    // ellipse
    var ellipseNode = new Path( Shape.ellipse( 0, 0, options.radiusX, options.radiusY, 0 ), {
      fill: options.fill,
      stroke: options.stroke,
      lineWidth: options.lineWidth
    } );

    // constants that determine the shape of the slot
    var SLOT_WIDTH = 0.4 * options.radiusX;
    var SLOT_HEIGHT = 1.5 * options.radiusY;
    var SLOT_Y_OFFSET = 0.025 * SLOT_HEIGHT; // determines perspective of slot

    // shape for a slot that faces left, parallelogram described from upper-left, moving clockwise
    var slotShape = new Shape()
      .moveTo( 0, SLOT_Y_OFFSET )
      .lineTo( SLOT_WIDTH, 0 )
      .lineTo( SLOT_WIDTH, SLOT_HEIGHT )
      .lineTo( 0, SLOT_HEIGHT - SLOT_Y_OFFSET )
      .close();

    // shape for a slot that faces right is a reflection
    if ( faces === 'right' ) {
      slotShape = slotShape.transformed( Matrix3.scaling( -1, 1 ) );
    }

    // slot node
    var slotNode = new Path( slotShape, {
      fill: options.slotFill,
      stroke: options.slotStroke,
      lineWidth: options.slotLineWidth,
      center: ellipseNode.center
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ ellipseNode, slotNode ];

    Node.call( this, options );
  }

  functionBuilder.register( 'BuilderEndNode', BuilderEndNode );

  return inherit( Node, BuilderEndNode );
} );