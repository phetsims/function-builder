// Copyright 2016, University of Colorado Boulder

/**
 * An input card with an image on it.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Card = require( 'FUNCTION_BUILDER/common/model/Card' );
  var CanvasUtils = require( 'FUNCTION_BUILDER/common/model/CanvasUtils' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {HTMLCanvasElement} canvas - image data, stored as a canvas so that it can be easily transformed
   * @param {Object} [options]
   * @constructor
   */
  function ImageCard( canvas, options ) {

    // @public (read-only) do not modify this canvas' pixels or context
    this.canvas = canvas;

    Card.call( this, options );
  }

  functionBuilder.register( 'ImageCard', ImageCard );

  return inherit( Card, ImageCard, {}, {

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
