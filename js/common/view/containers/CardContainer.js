// Copyright 2016, University of Colorado Boulder

/**
 * Container for cards.
 * A container is intended to be put in a carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableContainer = require( 'FUNCTION_BUILDER/common/view/containers/MovableContainer' );

  /**
   * @param {constructor} cardConstructor
   * @param {constructor} cardNodeConstructor
   * @param {*} cardContent - content displayed on the card, type determined by subtype
   * @param {Object} [options]
   * @constructor
   */
  function CardContainer( cardConstructor, cardNodeConstructor, cardContent, options ) {

    options = _.extend( {
      size: FBConstants.CARD_OPTIONS.size,
      emptyNode: cardNodeConstructor.createGhostNode( cardContent ) // {Node} shown when the container is empty
    }, options );

    // @private
    this.cardConstructor = cardConstructor;
    this.cardNodeConstructor = cardNodeConstructor;
    this.cardContent = cardContent;

    MovableContainer.call( this, options );
  }

  functionBuilder.register( 'CardContainer', CardContainer );

  return inherit( MovableContainer, CardContainer, {

    /**
     * Creates cards and puts them in the container.
     *
     * @param {number} numberOfInstances - number of instances of the card to create
     * @param {Scene} scene
     * @param {CardContainer} inputContainer - container in the input carousel
     * @param {CardContainer} outputContainer - container in the output carousel
     * @param {BuilderNode} builderNode
     * @param {Node} dragLayer - parent for a CardNode when it's being dragged or animating
     * @param {SeeInsideLayer} seeInsideLayer
     * @param {Property.<boolean>} seeInsideProperty
     * @public
     */
    createCards: function( numberOfInstances, scene, inputContainer, outputContainer, builderNode,
                           dragLayer, seeInsideLayer, seeInsideProperty ) {

      assert && assert( this === inputContainer,
        'cards must be created in the input carousel' );
      assert && assert( inputContainer.isEmpty() && outputContainer.isEmpty(),
        'did you accidentally call this function twice?' );
      assert && assert( inputContainer.carouselLocation && outputContainer.carouselLocation,
        'did you call this before containers were attached to ScreenView?' );

      for ( var i = 0; i < numberOfInstances; i++ ) {

        // model element
        var card = new this.cardConstructor( this.cardContent, { location: inputContainer.carouselLocation } );
        scene.cards.push( card );

        // associated Node
        var cardNode = new this.cardNodeConstructor( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty );

        // put the Node in this container
        this.addNode( cardNode );

        // add to 'see inside' layer, for viewing the card through windows
        seeInsideLayer.addCardNode( cardNode );

        // add a 'mole under the carpet' to the builder, synchronizes with the card's location
        builderNode.addMole( card );
      }
    }
  } );
} );
