// Copyright 2016-2023, University of Colorado Boulder

/***
 * Carousel for 'output' cards, those cards that have been run through the builder.
 * Extends Carousel by adding numberOfCardsProperty, used to disable 'eraser' button when carousel is empty.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Carousel from '../../../../sun/js/Carousel.js';
import functionBuilder from '../../functionBuilder.js';

export default class OutputCardsCarousel extends Carousel {

  /**
   * @param {CarouselItem[]} carouselItems
   * @param {Object} [options]
   */
  constructor( carouselItems, options ) {

    super( carouselItems, options );

    // @private - the containers are the nodes created by the Carousel
    this.containers = this.carouselItemNodes;

    // @public (read-only) {Property.<number>} of cards in the carousel
    this.numberOfCardsProperty = new NumberProperty( getNumberOfCards( this.containers ), {
      numberType: 'Integer'
    } );

    // update numberOfCardsProperty as cards are added/removed
    const containerListener = () => {
      this.numberOfCardsProperty.set( getNumberOfCards( this.containers ) );
    };
    this.containers.forEach( container => {

      // unlink unnecessary, instances exist for lifetime of the sim
      container.numberOfItemsProperty.link( numberOfItems => containerListener() );
    } );
  }

  // @public @override
  reset() {
    this.erase();
    super.reset();
  }

  /**
   * Erases the output carousel by moving all cards to the input carousel immediately, no animation.
   *
   * @public
   */
  erase() {
    this.containers.forEach( container => {
      container.getContents().forEach( cardNode => {
        container.removeNode( cardNode );
        cardNode.moveToInputCarousel();
      } );
    } );
    assert && assert( getNumberOfCards( this.carouselItemNodes ) === 0 );
  }
}

/**
 * Gets the number of cards in a set of containers.
 *
 * @param {CardContainer[]} containers
 * @returns {number}
 */
function getNumberOfCards( containers ) {
  let numberOfCards = 0;
  containers.forEach( container => {
    numberOfCards += container.numberOfItemsProperty.get();
  } );
  return numberOfCards;
}

functionBuilder.register( 'OutputCardsCarousel', OutputCardsCarousel );