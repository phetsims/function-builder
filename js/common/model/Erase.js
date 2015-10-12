// Copyright 2002-2015, University of Colorado Boulder

/**
 * Erases the image.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Card = require( 'FUNCTION_BUILDER/common/model/Card' );
  var FBFunction = require( 'FUNCTION_BUILDER/common/model/FBFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var eraseImage = require( 'mipmap!FUNCTION_BUILDER/functions/erase.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Erase( options ) {

    options = _.extend( {
      name: 'disappear',
      image: eraseImage,
      fill: 'rgb( 0, 222, 224 )'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, Erase, {

    /**
     * Applies this function to a card.
     * @param {Card} card
     * @returns {Card}
     */
    apply: function( card ) {

      // Create a new, blank imageData object
      var imageData = card.canvas.getContext( '2d' ).createImageData( card.canvas.width, card.canvas.height );

      return Card.withImageData( card.name + '.' + this.name, imageData );
    }
  } );
} );
