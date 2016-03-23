// Copyright 2016, University of Colorado Boulder

/**
 * Base type for function nodes.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FunctionBackgroundNode = require( 'FUNCTION_BUILDER/common/view/FunctionBackgroundNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionSlot = require( 'FUNCTION_BUILDER/common/model/FunctionSlot' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableNode = require( 'FUNCTION_BUILDER/common/view/MovableNode' );
  var NotInvertibleSymbolNode = require( 'FUNCTION_BUILDER/common/view/NotInvertibleSymbolNode' );
  var OpacityTo = require( 'TWIXT/OpacityTo' );

  /**
   * @param {ImageFunction} functionInstance
   * @param {Node} contentNode
   * @param {ImageFunctionContainer} container
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer
   * @param {Node} animationLayer
   * @param {Object} [options]
   * @constructor
   */
  function FunctionNode( functionInstance, contentNode, container, builderNode, dragLayer, animationLayer, options ) {

    options = options || {};

    var thisNode = this;

    // @public
    this.functionInstance = functionInstance;

    // @private
    this.container = container;
    this.builderNode = builderNode;
    this.animationLayer = animationLayer;

    var backgroundNode = new FunctionBackgroundNode( functionInstance.viewInfo );
    contentNode.center = backgroundNode.center;

    // @private
    this.notInvertibleSymbolNode = new NotInvertibleSymbolNode( {
      center: backgroundNode.center,
      visible: false
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, contentNode, this.notInvertibleSymbolNode ];

    // @private {OpacityTo} animation to indicate that this function is non-invertible
    this.notInvertibleAnimation = null;

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

        thisNode.stopNotInvertibleAnimation();

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

      assert && assert( dragLayer.hasChild( thisNode ), 'endDrag: function should be in dragLayer' );

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
    },

    /**
     * Starts animation showing that a function is not invertible.
     * @public
     */
    startNotInvertibleAnimation: function() {

      assert && assert( !this.functionInstance.invertible );

      // stop animation if it's already running
      this.notInvertibleAnimation && this.notInvertibleAnimation.stop();

      // start animation, show symbol and gradually fade out
      var thisNode = this;
      this.notInvertibleAnimation = new OpacityTo( this.notInvertibleSymbolNode, {
        startOpacity: 0.85,
        endOpacity: 0,
        duration: 1500, // fade out time, ms
        easing: TWEEN.Easing.Quintic.In, // most of opacity change happens at end of duration
        onStart: function() {
          thisNode.notInvertibleSymbolNode.visible = true;
        },
        onComplete: function() {
          thisNode.notInvertibleSymbolNode.visible = false;
          thisNode.notInvertibleAnimation = null;
        }
      } );
      this.notInvertibleAnimation.start();
    },

    /**
     * Stops animation showing that a function is not invertible.
     * If no animation is in progress, this is a no-op.
     * @public
     */
    stopNotInvertibleAnimation: function() {
      if ( this.notInvertibleAnimation ) {
        this.notInvertibleAnimation.stop();
        this.notInvertibleSymbolNode.visible = false;
      }
    }
  } );
} );
