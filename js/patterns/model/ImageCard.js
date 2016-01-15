// Copyright 2016, University of Colorado Boulder

/**
 * A card with an image on it.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AbstractCard = require( 'FUNCTION_BUILDER/common/model/AbstractCard' );
  var CanvasUtils = require( 'FUNCTION_BUILDER/common/model/CanvasUtils' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {HTMLCanvasElement} canvas
   * @param {Object} [options]
   * @constructor
   */
  function ImageCard( canvas, options ) {

    // @public (read-only) do not modify this canvas' pixels or context
    this.canvas = canvas;

    AbstractCard.call( this, options );
  }

  return inherit( AbstractCard, ImageCard, {}, {

    /**
     * Creates an ImageCard from an HTMLImageElement.
     *
     * @param {HTMLImageElement} image
     * @param {Object} [options] - options to ImageCard constructor
     * @returns {ImageCard}
     * @public
     * @static
     */
    withImage: function( image, options ) {
      return new ImageCard( CanvasUtils.createCanvasWithImage( image ), options );
    }
  } );
} );
