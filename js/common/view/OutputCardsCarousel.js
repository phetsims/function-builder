// Copyright 2016, University of Colorado Boulder

/***
 * Carousel for 'output' cards, those cards that have been run through the builder.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Carousel = require( 'SUN/Carousel' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {Node[]} items - items in the carousel
   * @param {Object} [options]
   * @constructor
   */
  function OutputCardsCarousel( items, options ) {
    Carousel.call( this, items, options );
  }

  functionBuilder.register( 'OutputCardsCarousel', OutputCardsCarousel );

  return inherit( Carousel, OutputCardsCarousel, {

    // @public @override
    reset: function() {
      this.erase();
      Carousel.prototype.reset.call( this );
    },

    /**
     * Erases the output carousel.
     * All visible cards are animated to the input carousel.
     * Other cards are moved immediately (no animation) to the input carousel.
     *
     * @public
     */
    erase: function() {
      var thisCarousel = this;
      this.items.forEach( function( container ) {
        var children = container.getChildren();
        var visible = thisCarousel.isItemVisible( container ); // animate only visible cards
        for ( var i = 0; i < children.length; i++ ) {
          var child = children[ i ];
          var isTopCard = true;
          if ( child.returnToInputCarousel ) {
            child.returnToInputCarousel( {
              animate: visible && isTopCard, // animate only the top card
              animationSpeed: FBConstants.ERASE_CARDS_ANIMATION_SPEED
            } );
            isTopCard = false;
          }
        }
      } );
    }
  } );
} );
