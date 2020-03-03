// Copyright 2016-2020, University of Colorado Boulder

/***
 * Carousel for 'output' cards, those cards that have been run through the builder.
 * Extends Carousel by adding numberOfCardsProperty, used to disable 'eraser' button when carousel is empty.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Carousel from '../../../../sun/js/Carousel.js';
import functionBuilder from '../../functionBuilder.js';

class OutputCardsCarousel extends Carousel {

  /**
   * @param {CardContainer[]} containers - containers in the carousel
   * @param {Object} [options]
   */
  constructor( containers, options ) {

    super( containers, options );

    // @public (read-only) {Property.<number>} of cards in the carousel
    this.numberOfCardsProperty = new NumberProperty( getNumberOfCards( containers ), {
      numberType: 'Integer'
    } );

    // update numberOfCardsProperty as cards are added/removed
    const containerListener = () => {
      this.numberOfCardsProperty.set( getNumberOfCards( containers ) );
    };
    containers.forEach( container => {

      // unlink unnecessary, instances exist for lifetime of the sim
      container.numberOfItemsProperty.link( function( numberOfItems ) {
        containerListener();
      } );
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
    this.items.forEach( function( container ) {
      container.getContents().forEach( function( cardNode ) {
        container.removeNode( cardNode );
        cardNode.moveToInputCarousel();
      } );
    } );
    assert && assert( getNumberOfCards( this.items ) === 0 );
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
  containers.forEach( function( container ) {
    numberOfCards += container.numberOfItemsProperty.get();
  } );
  return numberOfCards;
}

functionBuilder.register( 'OutputCardsCarousel', OutputCardsCarousel );

export default OutputCardsCarousel;