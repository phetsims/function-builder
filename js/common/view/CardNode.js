// Copyright 2016, University of Colorado Boulder

/**
 * Base type for card nodes.
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
   * @param {ImageFunction} card
   * @param {ImageFunctionContainer} inputContainer
   * @param {ImageFunctionContainer} outputContainer
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer
   * @param {Node} foregroundAnimationLayer
   * @param {Object} [options]
   * @constructor
   */
  function CardNode( card, inputContainer, outputContainer, builderNode, dragLayer, foregroundAnimationLayer, options ) {

    options = options || {};

    assert && assert( options.children, 'requires children to specify the look of the CardNode' );

    var thisNode = this;

    // @private
    this.card = card;
    this.inputContainer = inputContainer;
    this.outputContainer = outputContainer;
    this.builderNode = builderNode;
    this.dragLayer = dragLayer;
    this.foregroundAnimationLayer = foregroundAnimationLayer;

    assert && assert( !options.startDrag );
    options.startDrag = function() {

      if ( inputContainer.containsNode( thisNode ) ) {

        // card is in the input carousel, pop it out
        inputContainer.removeNode( thisNode );
        dragLayer.addChild( thisNode );
        card.moveTo( inputContainer.carouselLocation.plus( FBConstants.CARD_POP_OUT_OFFSET ) );
      }
      else if ( outputContainer.containsNode( thisNode ) ) {

        // card is in the output carousel, pop it out
        outputContainer.removeNode( thisNode );
        dragLayer.addChild( thisNode );
        card.moveTo( outputContainer.carouselLocation.plus( FBConstants.CARD_POP_OUT_OFFSET ) );
      }
      else if ( foregroundAnimationLayer.hasChild( thisNode ) ) {

        // card was animating back to carousel when user grabbed it
        foregroundAnimationLayer.removeChild( thisNode );
        dragLayer.addChild( thisNode );
      }
      else
      {
        //TODO remove card from builder apparatus?
        // card was grabbed while in dragLayer, do nothing
      }

      assert && assert( dragLayer.hasChild( thisNode ) );
    };

    // When the user stops dragging a function, decide what to do with it.
    assert && assert( !options.endDrag );
    options.endDrag = function() {

      //TODO temporary, send the card to the closest carousel
      var xMiddle = inputContainer.carouselLocation.x + ( outputContainer.carouselLocation.x - inputContainer.carouselLocation.x ) / 2;
      if ( card.locationProperty.get().x < xMiddle ) {

        // return to input carousel
        thisNode.returnToInputCarousel();
      }
      else {

        // return to output carousel
        card.animateTo( outputContainer.carouselLocation,
          FBConstants.CARD_ANIMATION_SPEED,
          function() {
            dragLayer.removeChild( thisNode );
            outputContainer.addNode( thisNode );
          } );
      }
    };

    card.locationProperty.link( function( location ) {
      //TODO change card image based on location relative to builder slots
    } );

    MovableNode.call( this, card, options );
  }

  functionBuilder.register( 'CardNode', CardNode );

  return inherit( MovableNode, CardNode, {

    /**
     * Returns this card to the input carousel.
     *
     * @param {Object} [options]
     * @public
     */
    returnToInputCarousel: function( options ) {

      options = _.extend( {
        animate: true, // true: animate back to carousel, false: move immediate back to carousel
        animationSpeed: FBConstants.CARD_ANIMATION_SPEED
      }, options );

      if ( !this.inputContainer.containsNode( this ) ) {

        // if in the output container, move to the foreground
        if ( this.outputContainer.containsNode( this ) ) {
          this.outputContainer.removeNode( this );
          this.foregroundAnimationLayer.addChild( this );
        }
        else if ( this.dragLayer.hasChild( this ) ) {
          this.dragLayer.removeChild( this );
          this.foregroundAnimationLayer.addChild( this );
        }

        if ( options.animate ) {

          // animate to the input carousel
          var thisNode = this;
          this.card.animateTo( this.inputContainer.carouselLocation,
            options.animationSpeed,
            function() {
              thisNode.foregroundAnimationLayer.removeChild( thisNode );
              thisNode.inputContainer.addNode( thisNode );
            } );
        }
        else {

          // move immediately to the input carousel
          this.foregroundAnimationLayer.removeChild( this );
          this.card.moveTo( this.inputContainer.carouselLocation );
          this.inputContainer.addNode( this );
        }
      }
    }
  } );
} );
