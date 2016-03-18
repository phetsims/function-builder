// Copyright 2016, University of Colorado Boulder

/**
 * Base type for function nodes.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionSlot = require( 'FUNCTION_BUILDER/common/model/FunctionSlot' );
  var MovableNode = require( 'FUNCTION_BUILDER/common/view/MovableNode' );

  /**
   * @param {ImageFunction} functionInstance
   * @param {ImageFunctionContainer} container
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer
   * @param {Node} animationLayer
   * @param {Object} [options]
   * @constructor
   */
  function FunctionNode( functionInstance, container, builderNode, dragLayer, animationLayer, options ) {

    options = options || {};

    assert && assert( options.children, 'requires children to specify the look of the FunctionNode' );

    var thisNode = this;

    // @public
    this.functionInstance = functionInstance;

    // @private
    this.container = container;
    this.builderNode = builderNode;
    this.animationLayer = animationLayer;

    var slotNumberRemovedFrom = FunctionSlot.NO_SLOT_NUMBER;  // slot number that function was removed from at start of drag

    //-------------------------------------------------------------------------------
    // start a drag cycle
    assert && assert( !options.startDrag );
    options.startDrag = function() {

      assert && assert( !animationLayer.hasChild( thisNode ), 'nodes in animationLayer should not be pickable' );

      slotNumberRemovedFrom = FunctionSlot.NO_SLOT_NUMBER;

      if ( container.containsNode( thisNode ) ) {

        // function is in the carousel, pop it out
        container.removeNode( thisNode );
        dragLayer.addChild( thisNode );
        functionInstance.moveTo( container.carouselLocation.plus( FBConstants.FUNCTION_POP_OUT_OFFSET ) );
      }
      else if ( builderNode.containsFunctionNode( thisNode ) ) {

        // function is in the builder, pop it out
        var slotNumber = builderNode.getSlotNumber( thisNode );
        var slotLocation = builderNode.getSlotLocation( slotNumber );
        builderNode.removeFunctionNode( thisNode, slotNumber );
        slotNumberRemovedFrom = slotNumber;
        dragLayer.addChild( thisNode );
        functionInstance.moveTo( slotLocation.plus( FBConstants.FUNCTION_POP_OUT_OFFSET ) );
      }
      else {
        // function was grabbed while in the dragLayer, do nothing
      }

      assert && assert( dragLayer.hasChild( thisNode ) );
    };

    //-------------------------------------------------------------------------------
    // end a drag cycle
    assert && assert( !options.endDrag );
    options.endDrag = function() {

      // move function to animation layer
      dragLayer.removeChild( thisNode );
      animationLayer.addChild( thisNode );

      // Find the closest slot
      var slotNumber = builderNode.getClosestSlot( functionInstance.locationProperty.get() );

      if ( slotNumber === FunctionSlot.NO_SLOT_NUMBER ) {

        // no builder slot, animate back to the carousel
        thisNode.animateToCarousel();
      }
      else {

        // put function in builder slot
        thisNode.animateToBuilder( slotNumber, slotNumberRemovedFrom );
      }
    };

    MovableNode.call( this, functionInstance, options );
  }

  functionBuilder.register( 'FunctionNode', FunctionNode );

  return inherit( MovableNode, FunctionNode, {

    /**
     * Animates this function to a slot in the builder.
     * @param {number} slotNumber - slot number that the function is animating to
     * @param {number} slotNumberRemovedFrom - slot number that the function was removed from
     * @private
     */
    animateToBuilder: function( slotNumber, slotNumberRemovedFrom ) {
      assert && assert( this.animationLayer.hasChild( this ) );
      var thisNode = this;
      this.functionInstance.animateTo( this.builderNode.getSlotLocation( slotNumber ),
        FBConstants.FUNCTION_ANIMATION_SPEED,
        function() {

          // If the slot is occupied, relocate the occupier.
          var occupierNode = thisNode.builderNode.getFunctionNode( slotNumber );
          if ( occupierNode ) {

            thisNode.builderNode.removeFunctionNode( occupierNode, slotNumber );
            thisNode.animationLayer.addChild( occupierNode );

            if ( thisNode.builderNode.isValidSlotNumber( slotNumberRemovedFrom ) && Math.abs( slotNumberRemovedFrom - slotNumber ) === 1 ) {

              // swap adjacent slots
              occupierNode.animateToBuilder( slotNumberRemovedFrom, slotNumber );
            }
            else {

              // return function to the carousel.
              occupierNode.animateToCarousel();
            }
          }

          thisNode.animationLayer.removeChild( thisNode );
          thisNode.builderNode.addFunctionNode( thisNode, slotNumber );
        } );
    },

    /**
     * Animates this function to the carousel.
     * @private
     */
    animateToCarousel: function() {
      assert && assert( this.animationLayer.hasChild( this ) );
      var thisNode = this;
      this.functionInstance.animateTo( this.container.carouselLocation,
        FBConstants.FUNCTION_ANIMATION_SPEED,
        function() {
          thisNode.animationLayer.removeChild( thisNode );
          thisNode.container.addNode( thisNode );
        } );
    },

    /**
     * Moves this function immediately to the carousel, no animation.
     * @public
     */
    moveToCarousel: function() {
      assert && assert( !this.container.containsNode( this ) );
      this.container.addNode( this );
    }
  } );
} );
