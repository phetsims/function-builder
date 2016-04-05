// Copyright 2015-2016, University of Colorado Boulder

/**
 * Utility functions for Canvas operations.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );

  var CanvasUtils = {

    /**
     * Creates a canvas with the specified dimensions.
     *
     * @param {number} width
     * @param {number} height
     * @returns {HTMLCanvasElement}
     */
    createCanvas: function( width, height ) {
      var canvas = document.createElement( 'canvas' );
      canvas.width = width;
      canvas.height = height;
      return canvas;
    },

    /**
     * Creates a canvas sized for the specified image.
     *
     * @param {HTMLImageElement} image
     * @returns {HTMLCanvasElement}
     */
    createCanvasWithImage: function( image ) {
      var canvas = document.createElement( 'canvas' );
      canvas.width = image.width;
      canvas.height = image.height;
      var context = canvas.getContext( '2d' );
      context.drawImage( image, 0, 0 );
      return canvas;
    },

    /**
     * Creates a canvas sized for the specified image data.
     *
     * @param {ImageData} imageData
     * @returns {HTMLCanvasElement}
     */
    createCanvasWithImageData: function( imageData ) {
      var canvas = CanvasUtils.createCanvas( imageData.width, imageData.height );
      canvas.getContext( '2d' ).putImageData( imageData, 0, 0 );
      return canvas;
    },

    /**
     * Gets the image data associated with a canvas.
     *
     * @param {HTMLCanvasElement} canvas
     * @returns {ImageData}
     */
    getImageData: function( canvas ) {
      return canvas.getContext( '2d' ).getImageData( 0, 0, canvas.width, canvas.height );
    },

    /**
     * Creates blank image data with the same dimensions as some canvas.
     *
     * @param {HTMLCanvasElement} canvas
     * @returns {ImageData}
     */
    createImageData: function( canvas ) {
      return canvas.getContext( '2d' ).createImageData( canvas.width, canvas.height );
    }
  };

  functionBuilder.register( 'CanvasUtils', CanvasUtils );

  return CanvasUtils;
} );
