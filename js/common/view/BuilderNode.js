// Copyright 2015, University of Colorado Boulder

//TODO divide ends into background and foreground halves, to support dragging cards through the builder
/**
 * The "builder" is the devices that transforms inputs to outputs by applying functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PlaceholderFunction = require( 'FUNCTION_BUILDER/common/model/PlaceholderFunction' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @param {Builder} builder
   * @param {Object} [options]
   * @constructor
   */
  function BuilderNode( builder, options ) {

    options = _.extend( {

      // body
      bodyTopColor: 'rgb( 200, 182, 188 )',
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

    // location is determined by model
    options.x = builder.location.x;
    options.y = builder.location.y;

    // To improve readability of shape code
    var WIDTH = builder.width;
    var HEIGHT = builder.height;
    var X_INSET = 0.15 * WIDTH;
    var Y_INSET = 0.15 * HEIGHT;

    // Main body of the builder, described starting at upper-left and moving clockwise
    var bodyNode = new Path( new Shape()
      .moveTo( 0, 0 )
      .lineTo( X_INSET, Y_INSET )
      .lineTo( WIDTH - X_INSET, Y_INSET )
      .lineTo( WIDTH, 0 )
      .lineTo( WIDTH, HEIGHT )
      .lineTo( WIDTH - X_INSET, HEIGHT - Y_INSET )
      .lineTo( X_INSET, HEIGHT - Y_INSET )
      .lineTo( 0, HEIGHT )
      .close(), {
      fill: new LinearGradient( 0, 0, 1, HEIGHT )
        .addColorStop( 0, options.bodyTopColor )
        .addColorStop( 0.5, options.bodyMiddleColor )
        .addColorStop( 1, options.bodyBottomColor ),
      stroke: options.bodyStroke,
      lineWidth: options.bodyLineWidth,

      // origin at center of input slot
      x: 0,
      centerY: 0
    } );

    // Left end
    var leftEnd = new Path( Shape.ellipse( 0, 0, options.endRadius, HEIGHT / 2, 0 ), {
      fill: options.endColor,
      stroke: options.endStroke,
      lineWidth: options.endLineWidth,
      centerX: bodyNode.left,
      centerY: bodyNode.centerY
    } );

    // Right end
    var rightEnd = new Path( Shape.ellipse( 0, 0, options.endRadius, HEIGHT / 2, 0 ), {
      fill: options.endColor,
      stroke: options.endStroke,
      lineWidth: options.endLineWidth,
      centerX: bodyNode.right,
      centerY: bodyNode.centerY
    } );

    // Left (input) slot
    var SLOT_WIDTH = 0.4 * options.endRadius;
    var SLOT_HEIGHT = 0.75 * HEIGHT;
    var SLOT_Y_OFFSET = 0.025 * SLOT_HEIGHT;
    var leftSlotShape = new Shape()
      .moveTo( 0, SLOT_Y_OFFSET )
      .lineTo( SLOT_WIDTH, 0 )
      .lineTo( SLOT_WIDTH, SLOT_HEIGHT )
      .lineTo( 0, SLOT_HEIGHT - SLOT_Y_OFFSET )
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

    // slots
    var slotNodes = [];
    for ( var i = 0; i < builder.slotLocations.length; i++ ) {
      slotNodes.push( new FunctionNode( new PlaceholderFunction(), {
        // centered at slot locations
        center: builder.slotLocations[ i ].minus( builder.location)
      } ) );
    }
    var slotsParent = new Node( { children: slotNodes } );

    options.children = [ bodyNode, leftEnd, rightEnd, leftSlotNode, rightSlotNode, slotsParent ];
    Node.call( this, options );

    // @private
    this.disposeBuilderNode = function() {
      //TODO
    };
  }

  functionBuilder.register( 'BuilderNode', BuilderNode );

  return inherit( Node, BuilderNode, {

    // @public
    dispose: function() { this.disposeBuilderNode(); }
  } );
} );
