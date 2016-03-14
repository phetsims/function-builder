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

    // @private
    this.functionInstance = functionInstance;
    this.container = container;
    this.builderNode = builderNode;
    this.dragLayer = dragLayer;
    this.animationLayer = animationLayer;

    var slotNumberRemovedFrom = -1;  // slot number that function was removed from at start of drag

    assert && assert( !options.startDrag );
    options.startDrag = function() {

      slotNumberRemovedFrom = -1;

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

    assert && assert( !options.endDrag );
    options.endDrag = function() {

      // move function to animation layer
      dragLayer.removeChild( thisNode );
      animationLayer.addChild( thisNode );

      // Find the closest slot
      var slotNumber = builderNode.getClosestSlot( functionInstance.locationProperty.get() );

      if ( slotNumber === -1 ) {

        // no builder slot, animate back to the carousel
        thisNode.returnToCarousel();
      }
      else {

        // If the slot is occupied, relocate the occupier
        var occupierNode = builderNode.getFunctionNode( slotNumber );
        if ( occupierNode ) {
          if ( builderNode.isValidSlotNumber( slotNumberRemovedFrom ) && Math.abs( slotNumberRemovedFrom - slotNumber ) === 1 ) {

            // swap adjacent slots
            builderNode.removeFunctionNode( occupierNode, slotNumber );
            animationLayer.addChild( occupierNode );
            occupierNode.functionInstance.animateTo( builderNode.getSlotLocation( slotNumberRemovedFrom ),
              FBConstants.FUNCTION_ANIMATION_SPEED,
              function() {
                animationLayer.removeChild( occupierNode );
                builderNode.addFunctionNode( occupierNode, slotNumberRemovedFrom );
              }
            );
          }
          else {

            // return function to the carousel.
            occupierNode.returnToCarousel();
          }
        }

        // put function in builder slot
        functionInstance.animateTo( builderNode.getSlotLocation( slotNumber ),
          FBConstants.FUNCTION_ANIMATION_SPEED,
          function() {
            animationLayer.removeChild( thisNode );
            builderNode.addFunctionNode( thisNode, slotNumber );
          } );
      }
    };

    MovableNode.call( this, functionInstance, options );
  }

  functionBuilder.register( 'FunctionNode', FunctionNode );

  return inherit( MovableNode, FunctionNode, {

    /**
     * Returns function to the carousel.
     * @param {Object} [options]
     * @public
     */
    returnToCarousel: function( options ) {

      options = _.extend( {
        animate: true, // true: animate back to carousel, false: move immediately back to carousel
        animationSpeed: FBConstants.FUNCTION_ANIMATION_SPEED
      }, options );

      // if not already in the carousel ...
      if ( !this.container.containsNode( this ) ) {

        // remove from other parents
        if ( this.dragLayer.hasChild( this ) ) { this.dragLayer.removeChild( this ); }
        if ( this.animationLayer.hasChild( this ) ) { this.animationLayer.removeChild( this ); }
        if ( this.builderNode.containsFunctionNode( this ) ) {
          this.builderNode.removeFunctionNode( this, this.builderNode.getSlotNumber( this ) );
        }

        if ( options.animate ) {

          // animate to the function carousel
          var thisNode = this;
          this.animationLayer.addChild( this );
          this.functionInstance.animateTo( this.container.carouselLocation,
            options.animationSpeed,
            function() {
              thisNode.animationLayer.removeChild( thisNode );
              thisNode.container.addNode( thisNode );
            } );
        }
        else {

          // move immediately to the function carousel
          this.functionInstance.moveTo( this.container.carouselLocation );
          this.container.addNode( this );
        }
      }
    }
  } );
} );
