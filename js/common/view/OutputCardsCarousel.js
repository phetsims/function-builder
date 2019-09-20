// Copyright 2016-2019, University of Colorado Boulder

/***
 * Carousel for 'output' cards, those cards that have been run through the builder.
 * Extends Carousel by adding numberOfCardsProperty, used to disable 'eraser' button when carousel is empty.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Carousel = require( 'SUN/Carousel' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const NumberProperty = require( 'AXON/NumberProperty' );

  /**
   * @param {CardContainer[]} containers - containers in the carousel
   * @param {Object} [options]
   * @constructor
   */
  function OutputCardsCarousel( containers, options ) {

    Carousel.call( this, containers, options );

    // @public (read-only) {Property.<number>} of cards in the carousel
    this.numberOfCardsProperty = new NumberProperty( getNumberOfCards( containers ), {
      numberType: 'Integer'
    } );

    // update numberOfCardsProperty as cards are added/removed
    const self = this;
    const containerListener = function() {
      self.numberOfCardsProperty.set( getNumberOfCards( containers ) );
    };
    containers.forEach( function( container ) {

      // unlink unnecessary, instances exist for lifetime of the sim
      container.numberOfItemsProperty.link( function( numberOfItems ) {
        containerListener();
      } );
    } );
  }

  functionBuilder.register( 'OutputCardsCarousel', OutputCardsCarousel );

  /**
   * Gets the number of cards in a set of containers.
   *
   * @param {CardContainer[]} containers
   * @returns {number}
   */
  var getNumberOfCards = function( containers ) {
    let numberOfCards = 0;
    containers.forEach( function( container ) {
      numberOfCards += container.numberOfItemsProperty.get();
    } );
    return numberOfCards;
  };

  return inherit( Carousel, OutputCardsCarousel, {

    // @public @override
    reset: function() {
      this.erase();
      Carousel.prototype.reset.call( this );
    },

    /**
     * Erases the output carousel by moving all cards to the input carousel immediately, no animation.
     *
     * @public
     */
    erase: function() {
      this.items.forEach( function( container ) {
        container.getContents().forEach( function( cardNode ) {
          container.removeNode( cardNode );
          cardNode.moveToInputCarousel();
        } );
      } );
      assert && assert( getNumberOfCards( this.items ) === 0 );
    }
  } );
} );
