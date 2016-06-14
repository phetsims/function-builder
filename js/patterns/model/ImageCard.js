// Copyright 2016, University of Colorado Boulder

/**
 * An input card with an image on it.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Card = require( 'FUNCTION_BUILDER/common/model/cards/Card' );
  var FBCanvasUtils = require( 'FUNCTION_BUILDER/patterns/model/FBCanvasUtils' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {HTMLImageElement} image - the input image
   * @param {Object} [options]
   * @constructor
   */
  function ImageCard( image, options ) {

    // {HTMLCanvasElement} @public (read-only)
    this.image = image;

    // @private created on demand by getCanvas
    this._canvas = null;

    Card.call( this, options );
  }

  functionBuilder.register( 'ImageCard', ImageCard );

  return inherit( Card, ImageCard, {

    /**
     * Gets the card's image as a canvas, so that it can be transformed by image functions.
     * The canvas is created on demand.
     *
     * @returns {HTMLCanvasElement}
     */
    getCanvas: function() {
      if ( !this._canvas ) {
        this._canvas = FBCanvasUtils.createCanvasWithImage( this.image );
      }
      return this._canvas;
    },
    get canvas() { return this.getCanvas(); }
  } );
} );
