// Copyright 2016, University of Colorado Boulder

/**
 * Manages the lifecycle of {ImageCard} instances.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var ImageCard = require( 'FUNCTION_BUILDER/patterns/model/ImageCard' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableImageCardNode = require( 'FUNCTION_BUILDER/patterns/view/MovableImageCardNode' );

  /**
   * @param {PatternsScene} scene
   * @param {Node} parentNode
   * @constructor
   */
  function ImageCardListener( scene, parentNode ) {
    this.scene = scene; // @private
    this.parentNode = parentNode; // @private
  }

  functionBuilder.register( 'ImageCardListener', ImageCardListener );

  return inherit( Object, ImageCardListener, {

    // dispose not needed, instances of this type exist for the lifetime of the sim

    /**
     * When a card instance is created, add it to the model and view.
     * When the card is returned to the input carousel, dispose of it.
     * When the card is disposed of, clean up the model and view.
     *
     * Pass this function to ImageCardCreatorNode via options.createdListener.
     *
     * @param {ImageCard} card - the instance that was created
     * @public
     */
    createdListener: function( card ) {

      assert && assert( arguments.length === 1, 'does the associated Emitter call emit1?' );
      assert && assert( card instanceof ImageCard, 'unexpected card type: ' + card.constructor.name );

      var thisListener = this;

      // add card to model
      thisListener.scene.addCard( card );

      // create a Node for the card
      var cardNode = new MovableImageCardNode( card, {

        startDrag: function( card, event, trail ) {
          //TODO If the card is in an output carousel, remove it.
        },

        // When done dragging the card ...
        endDrag: thisListener.endDrag.bind( thisListener )
      } );
      thisListener.parentNode.addChild( cardNode );

      /**
       * Use an IIFE to create a closure for future management of this card and its Node.
       * @param {ImageCard} card
       * @param {Node} cardNode
       */
      (function( card, cardNode ) {

        // card has animated back to the input carousel
        var locationListener = function( location ) {
          if ( !card.dragging && location.equals( card.locationProperty.initialValue ) ) {
            card.dispose();
          }
        };
        card.locationProperty.link( locationListener );

        // card has been disposed of
        card.disposeCalledEmitter.addListener( function( card ) {

          assert && assert( arguments.length === 1, 'does the associated Emitter call emit1?' );
          assert && assert( card instanceof ImageCard, 'unexpected type: ' + card.constructor.name );

          // clean up the instance
          card.locationProperty.unlink( locationListener );
          thisListener.scene.removeCard( card );

          // clean up the node
          thisListener.parentNode.removeChild( cardNode );
          cardNode.dispose();
        } );
      })( card, cardNode );
    },

    /**
     * When the user stops dragging a card, decide what to do with it.
     *
     * @param {ImageCard} card
     * @param {Event} event
     * @param {Trail} trail
     * @public
     */
    endDrag: function( card, event, trail ) {

      assert && assert( card instanceof ImageCard, 'unexpected type: ' + card.constructor.name );

      //TODO temporary, return card to carousel
      card.destination = card.locationProperty.initialValue;
    }
  } );
} );
