// Copyright 2015-2016, University of Colorado Boulder

/**
 * Visual representation of a Builder.
 * Functions appear from left to right, in the order that they are applied.
 * Cards go into a slot on the left and come out a slot on the right.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBUtils = require( 'FUNCTION_BUILDER/common/FBUtils' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var FunctionSlotNode = require( 'FUNCTION_BUILDER/common/view/FunctionSlotNode' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @param {Builder} builder
   * @param {Object} [options]
   * @constructor
   */
  function BuilderNode( builder, options ) {

    options = _.extend( {

      // body
      bodyStroke: 'black',
      bodyLineWidth: 1,

      // ends
      endRadius: 15,
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

    // @public (read-only)
    this.builder = builder;

    var colorScheme = builder.colorScheme;
    assert && assert( FBUtils.isaBuilderColorScheme( colorScheme ) );

    // To improve readability of shape code
    var BODY_WIDTH = builder.width;
    var BODY_HEIGHT = builder.height;
    var X_INSET = 0.15 * BODY_WIDTH;
    var Y_INSET = 0.15 * BODY_HEIGHT;

    // Main body of the builder, described starting at upper-left and moving clockwise
    var bodyNode = new Path( new Shape()
      .moveTo( 0, 0 )
      .lineTo( X_INSET, Y_INSET )
      .lineTo( BODY_WIDTH - X_INSET, Y_INSET )
      .lineTo( BODY_WIDTH, 0 )
      .lineTo( BODY_WIDTH, BODY_HEIGHT )
      .lineTo( BODY_WIDTH - X_INSET, BODY_HEIGHT - Y_INSET )
      .lineTo( X_INSET, BODY_HEIGHT - Y_INSET )
      .lineTo( 0, BODY_HEIGHT )
      .close(), {
      fill: new LinearGradient( 0, 0, 1, BODY_HEIGHT )
        .addColorStop( 0, colorScheme.top )
        .addColorStop( 0.5, colorScheme.middle )
        .addColorStop( 1, colorScheme.bottom ),
      stroke: options.bodyStroke,
      lineWidth: options.bodyLineWidth,

      // origin at center of input slot
      x: 0,
      centerY: 0
    } );

    // Left end
    var leftEnd = new Path( Shape.ellipse( 0, 0, options.endRadius, BODY_HEIGHT / 2, 0 ), {
      fill: colorScheme.ends,
      stroke: options.endStroke,
      lineWidth: options.endLineWidth,
      centerX: bodyNode.left,
      centerY: bodyNode.centerY
    } );

    // Right end
    var rightEnd = new Path( Shape.ellipse( 0, 0, options.endRadius, BODY_HEIGHT / 2, 0 ), {
      fill: colorScheme.ends,
      stroke: options.endStroke,
      lineWidth: options.endLineWidth,
      centerX: bodyNode.right,
      centerY: bodyNode.centerY
    } );

    // Input, on left
    var INPUT_WIDTH = 0.4 * options.endRadius;
    var INPUT_HEIGHT = 0.75 * BODY_HEIGHT;
    var INPUT_Y_OFFSET = 0.025 * INPUT_HEIGHT;
    var inputShape = new Shape()
      .moveTo( 0, INPUT_Y_OFFSET )
      .lineTo( INPUT_WIDTH, 0 )
      .lineTo( INPUT_WIDTH, INPUT_HEIGHT )
      .lineTo( 0, INPUT_HEIGHT - INPUT_Y_OFFSET )
      .close();
    var inputNode = new Path( inputShape, {
      fill: options.slotFill,
      stroke: options.slotStroke,
      lineWidth: options.slotLineWidth,
      center: leftEnd.center
    } );

    // Output, on right
    var outputShape = inputShape.transformed( Matrix3.scaling( -1, 1 ) );
    var outputNode = new Path( outputShape, {
      fill: options.slotFill,
      stroke: options.slotStroke,
      lineWidth: options.slotLineWidth,
      center: rightEnd.center
    } );

    // slots and the function nodes that are in the slots
    this.slotNodes = []; // @private
    this.functionNodes = []; // @private
    for ( var i = 0; i < builder.slots.length; i++ ) {

      this.slotNodes.push( new FunctionSlotNode( {
        // centered at slot locations
        center: builder.slots[ i ].location.minus( builder.location )
      } ) );

      this.functionNodes[ i ] = null; // empty functions are null
    }
    var slotsParent = new Node( { children: this.slotNodes } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ bodyNode, leftEnd, rightEnd, inputNode, outputNode, slotsParent ];

    Node.call( this, options );
  }

  functionBuilder.register( 'BuilderNode', BuilderNode );

  return inherit( Node, BuilderNode, {

    /**
     * Adds a function to the builder.
     *
     * @param {MovableNode} functionNode
     * @param {number} slotNumber
     * @public
     */
    addFunctionNode: function( functionNode, slotNumber ) {
      assert && assert( !this.functionNodes[ slotNumber ], 'slot ' + slotNumber + ' is occupied' );
      this.functionNodes[ slotNumber ] = functionNode;
      this.addChild( functionNode );
      functionNode.center = this.builder.slots[ slotNumber ].location.minus( this.builder.location );
      this.builder.addFunctionInstance( functionNode.movable, slotNumber );
    },

    /**
     * Removes a function from the builder.
     *
     * @param {MovableNode} functionNode
     * @param {number} slotNumber
     * @public
     */
    removeFunctionNode: function( functionNode, slotNumber ) {
      assert && assert( this.functionNodes[ slotNumber ] === functionNode, 'functionNode is not in slot ' + slotNumber );
      this.functionNodes[ slotNumber ] = null;
      this.removeChild( functionNode );
      this.builder.removeFunctionInstance( functionNode.movable, slotNumber );
    },

    /**
     * Gets the function node in the specified slot.
     *
     * @param {number} slotNumber
     * @returns {number} null if the slot is empty
     * @public
     */
    getFunctionNode: function( slotNumber ) {
      return this.functionNodes[ slotNumber ];
    }
  } );
} );
