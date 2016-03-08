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
   * @param {Object} [options]
   * @constructor
   */
  function FunctionNode( functionInstance, container, builderNode, dragLayer, options ) {

    options = options || {};

    assert && assert( options.children, 'requires children to specify the look of the FunctionNode' );

    var thisNode = this;

    // @private
    this.functionInstance = functionInstance;
    this.container = container;
    this.builderNode = builderNode;
    this.dragLayer = dragLayer;

    assert && assert( !options.startDrag );
    options.startDrag = function() {

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
        dragLayer.addChild( thisNode );
        functionInstance.moveTo( slotLocation.plus( FBConstants.FUNCTION_POP_OUT_OFFSET ) );
      }
      else {

        // function was grabbed while in the dragLayer, do nothing
        assert && assert( dragLayer.hasChild( thisNode ) );
      }

      assert && assert( dragLayer.hasChild( thisNode ) );
    };

    assert && assert( !options.endDrag );
    options.endDrag = function() {

      // Find the closest slot
      var slotNumber = builderNode.getClosestSlot( functionInstance.locationProperty.get() );

      if ( slotNumber === -1 ) {

        // return function to the carousel
        thisNode.returnToCarousel();
      }
      else {

        // put function in builder slot
        thisNode.pickable = false;
        functionInstance.animateTo( builderNode.getSlotLocation( slotNumber ),
          FBConstants.FUNCTION_ANIMATION_SPEED,
          function() {

            //TODO if an adjacent slot is empty, move the occupying function there
            // If the slot is occupied, return the occupying function to the carousel.
            var occupierNode = builderNode.getFunctionNode( slotNumber );
            occupierNode && occupierNode.returnToCarousel();

            dragLayer.removeChild( thisNode );
            builderNode.addFunctionNode( thisNode, slotNumber );
            thisNode.pickable = true;
          } );
      }
    };

    MovableNode.call( this, functionInstance, options );
  }

  functionBuilder.register( 'FunctionNode', FunctionNode );

  return inherit( MovableNode, FunctionNode, {

    /**
     * Returns this function to the carousel.
     *
     * @param {Object} [options]
     * @public
     */
    returnToCarousel: function( options ) {

      options = _.extend( {
        animate: true, // true: animate back to carousel, false: move immediate back to carousel
        animationSpeed: FBConstants.FUNCTION_ANIMATION_SPEED
      }, options );

      if ( !this.container.containsNode( this ) ) {

        this.pickable = false; // prevent user from grabbing function

        // if in the builder, move to the world
        if ( this.builderNode.containsFunctionNode( this ) ) {
          var slotNumber = this.builderNode.getSlotNumber( this );
          this.builderNode.removeFunctionNode( this, slotNumber );
          this.dragLayer.addChild( this );
        }

        if ( options.animate ) {

          // animate to the function carousel
          var thisNode = this;
          this.functionInstance.animateTo( this.container.carouselLocation,
            options.animationSpeed,
            function() {
              thisNode.dragLayer.removeChild( thisNode );
              thisNode.container.addNode( thisNode );
              thisNode.pickable = true;
            } );
        }
        else {

          // move immediately to the function carousel
          this.dragLayer.removeChild( this );
          this.functionInstance.moveTo( this.container.carouselLocation );
          this.container.addNode( this );
          this.pickable = true;
        }
      }
    }
  } );
} );
