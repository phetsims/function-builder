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
     * Erases the output carousel by moving all cards to the input carousel immediately, no animation.
     * @public
     */
    erase: function() {
      this.items.forEach( function( container ) {
        var children = container.getChildren();
        for ( var i = 0; i < children.length; i++ ) {
          var child = children[ i ];
          if ( child.returnToInputCarousel ) {
            child.returnToInputCarousel( { animate: false } );
          }
        }
      } );
    }
  } );
} );
