// Copyright 2016, University of Colorado Boulder

/**
 *  Listens for creation of {ImageCard} instances.
 *
 *  Responsibilities:
 *
 *  - add the instance to the model
 *  - create a Node for the instance
 *  - remove the Node when the instance is disposed of
 *  - decide what to do with the instance when the user stops dragging it
 *
 *  @author Chris Malley (PixelZoom, Inc.)
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
  function ImageCardCreatedListener( scene, parentNode ) {
    this.scene = scene; // @private
    this.parentNode = parentNode; // @private
  }

  functionBuilder.register( 'ImageCardCreatedListener', ImageCardCreatedListener );

  return inherit( Object, ImageCardCreatedListener, {

    /**
     * When a card instance is created, add it to the model and view.
     * Pass this function to ImageCardCreatorNode via options.createdEmitterListener
     *
     * @param {ImageCard} card - the instance that was created
     * @public
     */
    createdEmitterListener: function( card ) {

      assert && assert( arguments.length === 1, 'does the associated Emitter call emit1?' );
      assert && assert( card instanceof ImageCard, 'unexpected card type: ' + card.constructor.name );

      // add card to model
      this.scene.addCard( card );

      // create a Node for the card
      var cardNode = new MovableImageCardNode( card, {

        // If the card is in an output carousel, remove it.
        startDrag: function( functionInstance, event, trail ) {
          //TODO
        },

        // When done dragging the card ...
        endDrag: this.endDrag.bind( this )
      } );
      this.parentNode.addChild( cardNode );

      // Create a closure for future management of this functionInstance.
      (function( functionInstance, scene, parentNode ) {

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
          assert && assert( card instanceof ImageCard, 'unexpected card type: ' + card.constructor.name );

          // clean up the instance
          card.locationProperty.unlink( locationListener );
          scene.removeCard( card );

          // clean up the node
          parentNode.removeChild( cardNode );
          cardNode.dispose();
        } );
      })( card, this.scene, this.parentNode );
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

      functionBuilder.log && functionBuilder.log( this.constructor.name + '.endDrag' );
      assert && assert( card instanceof ImageCard, 'unexpected card type: ' + card.constructor.name );

      //TODO temporary, return card to carousel
      card.destination = card.locationProperty.initialValue;
    }
  } );
} );
