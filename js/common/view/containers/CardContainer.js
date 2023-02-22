// Copyright 2016-2020, University of Colorado Boulder

/**
 * Container for cards.
 * A container is intended to be put in a carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../../phet-core/js/merge.js';
import functionBuilder from '../../../functionBuilder.js';
import FBConstants from '../../FBConstants.js';
import MovableContainer from './MovableContainer.js';

export default class CardContainer extends MovableContainer {

  /**
   * @param {constructor} cardConstructor
   * @param {constructor} cardNodeConstructor
   * @param {*} cardContent - content displayed on the card, type determined by subtype
   * @param {Object} [options]
   */
  constructor( cardConstructor, cardNodeConstructor, cardContent, options ) {

    options = merge( {
      size: FBConstants.CARD_OPTIONS.size,
      emptyNode: cardNodeConstructor.createGhostNode( cardContent ) // {Node} shown when the container is empty
    }, options );

    super( options );

    // @private
    this.cardConstructor = cardConstructor;
    this.cardNodeConstructor = cardNodeConstructor;
    this.cardContent = cardContent;
  }

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
  createCards( numberOfInstances, scene, inputContainer, outputContainer, builderNode,
               dragLayer, seeInsideLayer, seeInsideProperty ) {

    assert && assert( this === inputContainer,
      'cards must be created in the input carousel' );
    assert && assert( inputContainer.isEmpty() && outputContainer.isEmpty(),
      'did you accidentally call this function twice?' );
    assert && assert( inputContainer.carouselPosition && outputContainer.carouselPosition,
      'did you call this before containers were attached to ScreenView?' );

    for ( let i = 0; i < numberOfInstances; i++ ) {

      // model element
      const card = new this.cardConstructor( this.cardContent, { position: inputContainer.carouselPosition } );
      scene.cards.push( card );

      // associated Node
      const cardNode = new this.cardNodeConstructor( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty );

      // put the Node in this container
      this.addNode( cardNode );

      // add to 'see inside' layer, for viewing the card through windows
      seeInsideLayer.addCardNode( cardNode );

      // add a 'mole under the carpet' to the builder, synchronizes with the card's position
      builderNode.addMole( card );
    }
  }
}

functionBuilder.register( 'CardContainer', CardContainer );