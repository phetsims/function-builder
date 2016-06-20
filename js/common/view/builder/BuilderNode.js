// Copyright 2016, University of Colorado Boulder

/**
 * Visual representation of a Builder.
 * Cards pass through the builder horizontally.
 * An 'input' slot is on the left end, 'output' slot on the right end.
 * Functions appear from left to right, in the order that they are applied.
 * This node is the ancestor for function nodes when they are in the builder.
 *
 * Origin is at the center of the input slot.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var BuilderEndNode = require( 'FUNCTION_BUILDER/common/view/builder/BuilderEndNode' );
  var FBUtils = require( 'FUNCTION_BUILDER/common/FBUtils' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/functions/FunctionNode' );
  var FunctionSlotNode = require( 'FUNCTION_BUILDER/common/view/builder/FunctionSlotNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var MoleCardNode = require( 'FUNCTION_BUILDER/common/view/cards/MoleCardNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @param {Builder} builder
   * @param {Property.<boolean>} hideFunctionsProperty
   * @param {Object} [options]
   * @constructor
   */
  function BuilderNode( builder, hideFunctionsProperty, options ) {

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

    var thisNode = this;

    // @public (read-only)
    this.builder = builder;

    var colorScheme = builder.colorScheme;
    assert && assert( FBUtils.isaBuilderColorScheme( colorScheme ) );

    // To improve readability of shape code
    var BODY_WIDTH = builder.width;
    var END_HEIGHT = builder.endHeight;
    var X_INSET = 0.15 * BODY_WIDTH;
    var Y_INSET = ( END_HEIGHT - builder.waistHeight ) / 2;

    // Gradient for the body
    var bodyGradient = new LinearGradient( 0, 0, 1, END_HEIGHT )
      .addColorStop( 0, colorScheme.top )
      .addColorStop( 0.5, colorScheme.middle )
      .addColorStop( 1, colorScheme.bottom );

    // Body of the builder, described starting at upper-left and moving clockwise
    var bodyNode = new Path( new Shape()
      .moveTo( 0, 0 )
      .lineTo( X_INSET, Y_INSET )
      .lineTo( BODY_WIDTH - X_INSET, Y_INSET )
      .lineTo( BODY_WIDTH, 0 )
      .lineTo( BODY_WIDTH, END_HEIGHT )
      .lineTo( BODY_WIDTH - X_INSET, END_HEIGHT - Y_INSET )
      .lineTo( X_INSET, END_HEIGHT - Y_INSET )
      .lineTo( 0, END_HEIGHT )
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
      radiusY: END_HEIGHT / 2,
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
    this.moleCardsLayer = new Node();

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ bodyNode, slotsParent, this.functionsParent, this.moleCardsLayer, leftEndNode, rightEndNode ];

    assert && assert( !options.clipArea, 'clipArea cannot be customized' );
    options.clipArea = Shape.rect( 0, -END_HEIGHT / 2, BODY_WIDTH, END_HEIGHT );

    Node.call( this, options );

    // Hide/reveal the identify of functions in the builder.
    // unlink unnecessary, instances exist for lifetime of the sim
    this.hideFunctionsProperty = hideFunctionsProperty; // @private
    this.hideFunctionsProperty.link( function( hideFunctions ) {
      thisNode.functionNodes.forEach( function( functionNode ) {
        if ( functionNode ) {
          functionNode.setIdentityHidden && functionNode.setIdentityHidden( hideFunctions );
        }
      } );
    } );
  }

  functionBuilder.register( 'BuilderNode', BuilderNode );

  return inherit( Node, BuilderNode, {

    /**
     * Returns all functions to the carousel immediately, no animation.
     *
     * @public
     */
    reset: function() {
      for ( var i = 0; i < this.functionNodes.length; i++ ) {
        var functionNode = this.functionNodes[ i ];
        if ( functionNode ) {
          this.removeFunctionNode( functionNode );
          functionNode && functionNode.moveToCarousel();
        }
      }
    },

    /**
     * Adds a FunctionNode to the builder.
     *
     * @param {FunctionNode} functionNode
     * @param {number} slotNumber
     * @public
     */
    addFunctionNode: function( functionNode, slotNumber ) {

      assert && assert( functionNode instanceof FunctionNode );
      assert && assert( this.builder.isValidSlotNumber( slotNumber ) );
      assert && assert( !this.containsFunctionNode( functionNode ), 'function is already in builder' );
      assert && assert( !this.functionNodes[ slotNumber ], 'slot ' + slotNumber + ' is occupied' );

      // add to view
      this.functionNodes[ slotNumber ] = functionNode;
      this.functionsParent.addChild( functionNode );
      functionNode.center = this.builder.slots[ slotNumber ].location.minus( this.builder.location ); // center in slot

      // add to model
      this.builder.addFunctionInstance( functionNode.functionInstance, slotNumber );
      assert && assert( this.builder.containsFunctionInstance( functionNode.functionInstance ) );

      // hide the identity of function in the builder, if feature is enabled
      functionNode.setIdentityHidden && functionNode.setIdentityHidden( this.hideFunctionsProperty.get() );
    },

    /**
     * Removes a FunctionNode from the builder.
     *
     * @param {FunctionNode} functionNode
     * @returns {number} slot number that functionNode was removed from
     * @public
     */
    removeFunctionNode: function( functionNode ) {

      assert && assert( functionNode instanceof FunctionNode );

      var slotNumber = this.functionNodes.indexOf( functionNode );
      assert && assert( slotNumber !== -1, 'functionNode is not in builder' );

      // remove from view, restore location in model coordinate frame
      this.functionNodes[ slotNumber ] = null;
      this.functionsParent.removeChild( functionNode );
      functionNode.center = functionNode.functionInstance.locationProperty.get();

      // remove from model
      this.builder.removeFunctionInstance( functionNode.functionInstance, slotNumber );
      assert && assert( !this.builder.containsFunctionInstance( functionNode.functionInstance ) );

      // reveal function's identity
      functionNode.setIdentityHidden && functionNode.setIdentityHidden( false );

      return slotNumber;
    },

    /**
     * Gets the FunctionNode in the specified slot.
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
     * Does the builder contain the specified FunctionNode?
     *
     * @param {FunctionNode} functionNode
     * @returns {boolean}
     * @public
     */
    containsFunctionNode: function( functionNode ) {
      assert && assert( functionNode instanceof FunctionNode );
      return ( this.functionNodes.indexOf( functionNode ) !== -1 );
    },

    /**
     * Adds the 'mole under the carpet' representation of a card.
     * Moles are added when cards are created, and persist for the lifetime of the sim.
     *
     * @param {Card} card
     * @public
     */
    addMole: function( card ) {
      this.moleCardsLayer.addChild( new MoleCardNode( card, this.builder.location ) );
    }
  } );
} );
