// Copyright 2015-2016, University of Colorado Boulder

/**
 * Visual representation of a Builder.
 * Cards go into a slot on the left and come out a slot on the right.
 * Functions appear from left to right, in the order that they are applied.
 * This node is the parent for function nodes when they are in the builder.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var BuilderEndNode = require( 'FUNCTION_BUILDER/common/view/BuilderEndNode' );
  var FBUtils = require( 'FUNCTION_BUILDER/common/FBUtils' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var FunctionSlotNode = require( 'FUNCTION_BUILDER/common/view/FunctionSlotNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var MoleNode = require( 'FUNCTION_BUILDER/common/view/MoleNode' );
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
      bodyStroke: 'black',
      bodyLineWidth: 1,

      // ends
      endRadiusX: 15,
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

    assert && assert( !options.x && !options.y, 'location is determined by model' );
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

    // Gradient for the body
    var bodyGradient = new LinearGradient( 0, 0, 1, BODY_HEIGHT )
      .addColorStop( 0, colorScheme.top )
      .addColorStop( 0.5, colorScheme.middle )
      .addColorStop( 1, colorScheme.bottom );

    // Body of the builder, described starting at upper-left and moving clockwise
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
      fill: bodyGradient,
      stroke: options.bodyStroke,
      lineWidth: options.bodyLineWidth,

      // origin at center of input slot
      x: 0,
      centerY: 0
    } );

    // Options for the ends
    var END_OPTIONS = {
      radiusX: options.endRadiusX,
      radiusY: BODY_HEIGHT / 2,
      fill: colorScheme.ends,
      stroke: options.endStroke,
      lineWidth: options.endLineWidth,
      slotFill: options.slotFill,
      slotStroke: options.slotStroke,
      slotLineWidth: options.slotLineWidth,
      centerX: bodyNode.left,
      centerY: bodyNode.centerY
    };

    // Left end
    var leftEndNode = new BuilderEndNode( 'left',
      _.extend( {}, END_OPTIONS, {
        centerX: bodyNode.left,
        centerY: bodyNode.centerY
      } ) );

    // Right end
    var rightEndNode = new BuilderEndNode( 'right',
      _.extend( {}, END_OPTIONS, {
        centerX: bodyNode.right,
        centerY: bodyNode.centerY
      } ) );

    // slots and the function nodes that are in the slots
    var slotNodes = [];
    this.functionNodes = []; // @private {FunctionNode[]}
    for ( var i = 0; i < builder.slots.length; i++ ) {

      slotNodes.push( new FunctionSlotNode( {
        // centered at slot locations
        center: builder.slots[ i ].location.minus( builder.location )
      } ) );

      this.functionNodes[ i ] = null; // empty functions are null
    }
    assert && assert( this.functionNodes.length === builder.slots.length );
    var slotsParent = new Node( { children: slotNodes } );
    this.functionsParent = new Node(); // @private

    // @private 'moles under the carpet' that represents a card being dragged through the builder
    this.molesLayer = new Node();

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ bodyNode, slotsParent, this.functionsParent, this.molesLayer, leftEndNode, rightEndNode ];

    assert && assert( !options.clipArea, 'clipArea cannot be customized' );
    options.clipArea = Shape.rect( 0, -BODY_HEIGHT / 2, BODY_WIDTH, BODY_HEIGHT );

    Node.call( this, options );
  }

  functionBuilder.register( 'BuilderNode', BuilderNode );

  return inherit( Node, BuilderNode, {

    // @public returns all functions to the carousel immediately, no animation
    reset: function() {
      this.functionNodes.forEach( function( functionNode ) {
        functionNode && functionNode.returnToCarousel( { animate: false } );
      } );
    },

    /**
     * Adds a function to the builder.
     *
     * @param {FunctionNode} functionNode
     * @param {number} slotNumber
     * @public
     */
    addFunctionNode: function( functionNode, slotNumber ) {

      assert && assert( functionNode instanceof FunctionNode );
      assert && assert( this.builder.isValidSlotNumber( slotNumber ) );
      assert && assert( !this.functionNodes[ slotNumber ], 'slot ' + slotNumber + ' is occupied' );

      this.functionNodes[ slotNumber ] = functionNode;
      this.functionsParent.addChild( functionNode );
      functionNode.center = this.builder.slots[ slotNumber ].location.minus( this.builder.location ); // center in slot
      this.builder.addFunctionInstance( functionNode.functionInstance, slotNumber );

      assert && assert( this.builder.containsFunctionInstance( functionNode.functionInstance ) );
    },

    /**
     * Removes a function from the builder.
     *
     * @param {FunctionNode} functionNode
     * @param {number} slotNumber
     * @public
     */
    removeFunctionNode: function( functionNode, slotNumber ) {

      assert && assert( functionNode instanceof FunctionNode );
      assert && assert( this.builder.isValidSlotNumber( slotNumber ) );
      assert && assert( this.functionNodes[ slotNumber ] === functionNode, 'functionNode is not in slot ' + slotNumber );

      this.functionNodes[ slotNumber ] = null;
      this.functionsParent.removeChild( functionNode );
      functionNode.center = functionNode.functionInstance.location; // restore location in model coordinate frame
      this.builder.removeFunctionInstance( functionNode.functionInstance, slotNumber );

      assert && assert( !this.builder.containsFunctionInstance( functionNode.functionInstance ) );
    },

    /**
     * Gets the function node in the specified slot.
     *
     * @param {number} slotNumber
     * @returns {FunctionNode} null if the slot is empty
     * @public
     */
    getFunctionNode: function( slotNumber ) {
      assert && assert( this.builder.isValidSlotNumber( slotNumber ) );
      return this.functionNodes[ slotNumber ];
    },

    /**
     * Gets the slot that is closest to the specified location.
     * Convenience function, delegates to the model.
     *
     * @param {Vector2} location - the location of the function instance
     * @returns {number} slot number, -1 if no slot is close enough
     * @public
     */
    getClosestSlot: function( location ) {
      return this.builder.getClosestSlot( location );
    },

    /**
     * Gets the location of the specified slot.
     * Convenience function, delegates to the model.
     *
     * @param {number} slotNumber
     * @returns {Vector2} location in the model coordinate frame
     * @public
     */
    getSlotLocation: function( slotNumber ) {
      return this.builder.getSlotLocation( slotNumber );
    },

    /**
     * Gets the slot number for the specified function node.
     * Convenience function, delegates to the model.
     *
     * @param {FunctionNode} functionNode
     * @returns {number} -1 if functionNode is not in the builder
     */
    getSlotNumber: function( functionNode ) {
      assert && assert( functionNode instanceof FunctionNode );
      return this.builder.getSlotNumber( functionNode.functionInstance );
    },

    /**
     * Does the builder contain the specified function node?
     * Convenience function, delegates to the model.
     *
     * @param {FunctionNode} functionNode
     * @returns {boolean}
     * @public
     */
    containsFunctionNode: function( functionNode ) {
      assert && assert( functionNode instanceof FunctionNode );
      return this.builder.containsFunctionInstance( functionNode.functionInstance );
    },

    /**
     * Is the specified slot number valid?
     * Convenience function, delegates to model.
     * @param {number} slotNumber
     * @returns {boolean}
     */
    isValidSlotNumber: function( slotNumber ) {
      return this.builder.isValidSlotNumber( slotNumber );
    },

    /**
     * Adds the 'mole under the carpet' representation of a card.
     * Moles are added when cards are created, and persist for the lifetime of the sim.
     *
     * @param {Card} card
     */
    addMole: function( card ) {
      this.molesLayer.addChild( new MoleNode( card, this.builder.location ) );
    }
  } );
} );
