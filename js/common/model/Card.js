// Copyright 2002-2015, University of Colorado Boulder

/**
 * A card with a picture on it.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {string} name - name of the card, not visible to the user, used internally for debugging
   * @param {HTMLCanvasElement} canvas - canvas that contains the card's image
   * @constructor
   */
  function Card( name, canvas ) {

    this.name = name; // @public (read-only)
    this.canvas = canvas; // @public (read-only)
  }

  return inherit( Object, Card, {

    getImageData: function() {
      return this.canvas.getContext( '2d' ).getImageData( 0, 0, this.canvas.width, this.canvas.height );
    }
  }, {

    /**
     * Creates a card using an image.
     * @param {string} name - name of the card, not visible to the user, used internally for debugging
     * @param {HTMLImageElement} image
     * @returns {Card}
     * @static
     */
    withImage: function( name, image ) {

      var canvas = document.createElement( 'canvas' );
      canvas.width = image.width;
      canvas.height = image.height;
      var context = canvas.getContext( '2d' );

      context.drawImage( image, 0, 0 );

      return new Card( name, canvas );
    },

    /**
     * Creates a card using ImageData.
     * @param {string} name - name of the card, not visible to the user, used internally for debugging
     * @param {ImageData} imageData
     * @returns {Card}
     * @static
     */
    withImageData: function( name, imageData ) {

      var canvas = document.createElement( 'canvas' );
      canvas.width = imageData.width;
      canvas.height = imageData.height;
      var context = canvas.getContext( '2d' );

      context.putImageData( imageData, 0, 0, 0, 0, canvas.width, canvas.height );

      return new Card( name, canvas );
    }
  } );
} );
