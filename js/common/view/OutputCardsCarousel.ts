// Copyright 2016-2023, University of Colorado Boulder

/***
 * Carousel for 'output' cards, those cards that have been run through the builder.
 * Extends Carousel by adding numberOfCardsProperty, used to disable 'eraser' button when carousel is empty.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import { NodeTranslationOptions } from '../../../../scenery/js/imports.js';
import Carousel, { CarouselItem, CarouselOptions } from '../../../../sun/js/Carousel.js';
import functionBuilder from '../../functionBuilder.js';
import CardContainer from './containers/CardContainer.js';

type SelfOptions = EmptySelfOptions;

type OutputCardsCarouselOptions = SelfOptions & NodeTranslationOptions &
  PickOptional<CarouselOptions, 'itemsPerPage' | 'defaultPageNumber'>;

export default class OutputCardsCarousel extends Carousel {

  // The containers are the nodes created by the Carousel.
  private readonly containers: CardContainer[];

  // Number of cards in the carousel
  public readonly numberOfCardsProperty: Property<number>;

  public constructor( carouselItems: CarouselItem[], providedOptions?: OutputCardsCarouselOptions ) {

    const options = optionize<OutputCardsCarouselOptions, SelfOptions, CarouselOptions>()( {

      // CarouselOptions
      isDisposable: false,
      orientation: 'vertical',
      separatorsVisible: true,
      spacing: 20,
      margin: 10
    }, providedOptions );

    super( carouselItems, options );

    this.containers = this.carouselItemNodes as CardContainer[];
    assert && assert( _.every( this.containers, container => container instanceof CardContainer ) );

    this.numberOfCardsProperty = new NumberProperty( getNumberOfCards( this.containers ), {
      numberType: 'Integer'
    } );

    // update numberOfCardsProperty as cards are added/removed
    const containerListener = () => {
      this.numberOfCardsProperty.value = getNumberOfCards( this.containers );
    };
    this.containers.forEach( container => {
      container.numberOfItemsProperty.link( numberOfItems => containerListener() );
    } );
  }

  public override reset(): void {
    this.erase();
    super.reset();
  }

  /**
   * Erases the output carousel by moving all cards to the input carousel immediately, no animation.
   */
  public erase(): void {
    this.containers.forEach( container => {
      container.getContents().forEach( cardNode => {
        container.removeNode( cardNode );
        // @ts-expect-error getContents should return CardNode[] for CardContainer
        cardNode.moveToInputCarousel();
      } );
    } );
    assert && assert( getNumberOfCards( this.containers ) === 0 );
  }
}

/**
 * Gets the number of cards in a set of containers.
 */
function getNumberOfCards( containers: CardContainer[] ): number {
  let numberOfCards = 0;
  containers.forEach( container => {
    numberOfCards += container.numberOfItemsProperty.value;
  } );
  return numberOfCards;
}

functionBuilder.register( 'OutputCardsCarousel', OutputCardsCarousel );