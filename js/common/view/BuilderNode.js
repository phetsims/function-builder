// Copyright 2002-2015, University of Colorado Boulder

//TODO divide ends into background and foreground halves, to support dragging cards through the builder
/**
 * The "builder" is the devices that transforms inputs to outputs by applying functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @param {Builder} builder
   * @param {Object} [options]
   * @constructor
   */
  function BuilderNode( builder, options ) {

    options = _.extend( {

      // body
      bodySize: new Dimension2( 400, 125 ),
      bodyToColor: 'rgb( 200, 182, 188 )',
      bodyMiddleColor: 'rgb( 130, 62, 85 )',
      bodyBottomColor: 'black',
      bodyStroke: 'black',
      bodyLineWidth: 1,

      // ends
      endRadius: 15,
      endColor: 'rgb( 200, 186, 190 )',
      endStroke: 'black',
      endLineWidth: 1,

      // slots
      slotFill: 'white',
      slotStroke: 'black',
      slotLineWidth: 2,

      // function placeholders
      functionStroke: 'white',
      functionLineWidth: 1,
      functionLineDash: [ 3, 3 ]

    }, options );

    // To improve readability of shape code
    var width = options.bodySize.width;
    var height = options.bodySize.height;
    var xInset = 0.15 * width;
    var yInset = 0.15 * height;

    // Main body of the builder
    var bodyNode = new Path( new Shape()
      .moveTo( 0, 0 )
      .lineTo( xInset, yInset )
      .lineTo( width - xInset, yInset )
      .lineTo( width, 0 )
      .lineTo( width, height )
      .lineTo( width - xInset, height - yInset )
      .lineTo( xInset, height - yInset )
      .lineTo( 0, height )
      .close(), {
      fill: new LinearGradient( 0, 0, 1, height )
        .addColorStop( 0, options.bodyToColor )
        .addColorStop( 0.5, options.bodyMiddleColor )
        .addColorStop( 1, options.bodyBottomColor ),
      stroke: options.bodyStroke,
      lineWidth: options.bodyLineWidth
    } );

    // Left end
    var leftEnd = new Path( Shape.ellipse( 0, 0, options.endRadius, options.bodySize.height / 2, 0 ), {
      fill: options.endColor,
      stroke: options.endStroke,
      lineWidth: options.endLineWidth,
      centerX: bodyNode.left,
      centerY: bodyNode.centerY
    } );

    // Right end
    var rightEnd = new Path( Shape.ellipse( 0, 0, options.endRadius, options.bodySize.height / 2, 0 ), {
      fill: options.endColor,
      stroke: options.endStroke,
      lineWidth: options.endLineWidth,
      centerX: bodyNode.right,
      centerY: bodyNode.centerY
    } );

    // Left (input) slot
    var slotWidth = 0.4 * options.endRadius;
    var slotHeight = 0.75 * options.bodySize.height;
    var slotYOffset = 0.025 * slotHeight;
    var leftSlotShape = new Shape()
      .moveTo( 0, slotYOffset )
      .lineTo( slotWidth, 0 )
      .lineTo( slotWidth, slotHeight )
      .lineTo( 0, slotHeight - slotYOffset )
      .close();
    var leftSlotNode = new Path( leftSlotShape, {
      fill: options.slotFill,
      stroke: options.slotStroke,
      lineWidth: options.slotLineWidth,
      center: leftEnd.center
    } );

    // Right (output) slot
    var rightSlotShape = leftSlotShape.transformed( Matrix3.scaling( -1, 1 ) );
    var rightSlotNode = new Path( rightSlotShape, {
      fill: options.slotFill,
      stroke: options.slotStroke,
      lineWidth: options.slotLineWidth,
      center: rightEnd.center
    } );

    // Functions
    var functionNodes = [];
    builder.functionProperties.forEach( function( functionProperty, index ) {
      var functionInstance = functionProperty.get();
      functionNodes.push( new FunctionNode( functionInstance, {
        left: ( index > 0 ) ? ( functionNodes[ index - 1 ].right - functionNodes[ index - 1 ].xInset - options.functionLineWidth / 2 ) : 0
      } ) )
    } );
    var functionsParent = new Node( {
      children: functionNodes,
      center: bodyNode.center
    } );

    // Synchronize with the pipeline
    var functionPropertyObserver = function( functionInstance ) {
      console.log( functionInstance.name );//XXX
    };
    builder.functionProperties.forEach( function( functionProperty ) {
      functionProperty.link( functionPropertyObserver );
    } );

    // @private
    this.disposeBuilderNode = function() {
      builder.functionProperties.forEach( function( functionProperty ) {
        functionProperty.unlink( functionPropertyObserver );
      } );
    };

    options.children = [ bodyNode, functionsParent, leftEnd, rightEnd, leftSlotNode, rightSlotNode ];
    Node.call( this, options );
  }

  return inherit( Node, BuilderNode, {

    dispose: function() { this.disposeBuilderNode(); }
  } );
} );
