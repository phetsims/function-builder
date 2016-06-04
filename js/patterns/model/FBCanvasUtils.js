// Copyright 2016, University of Colorado Boulder

/**
 * Canvas utility functions, used by image processing functions in the Patterns screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );

  var FBCanvasUtils = {

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
     * Creates a canvas sized for the specified image, draws the image into the canvas.
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
     * Creates a canvas sized for the specified ImageData, draws the ImageData into the canvas.
     *
     * @param {ImageData} imageData
     * @returns {HTMLCanvasElement}
     */
    createCanvasWithImageData: function( imageData ) {
      var canvas = FBCanvasUtils.createCanvas( imageData.width, imageData.height );
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
     * Is the canvas blank? The definition of 'blank' is all transparent pixels.
     *
     * @param {HTMLCanvasElement} canvas
     * @returns {boolean}
     */
    isBlank: function( canvas ) {
      var imageData = FBCanvasUtils.getImageData( canvas );
      for ( var i = 0; i < imageData.data.length - 4; i += 4 ) {
        if ( imageData.data[ i + 3 ] !== 0 ) {
          return false; // we're done when we find one non-transparent pixel
        }
      }
      return true;
    },

    /**
     * Sets the RGBA components of a pixel.
     * ImageData stores the 4 components (RGBA) of a pixel in consecutive locations.
     *
     * @param {ImageData} imageData - underlying pixel data of a Canvas
     * @param {number} pixelIndex - index of a specific pixel
     * @param {number} red
     * @param {number} green
     * @param {number} blue
     * @param {number} alpha
     */
    setPixelRGBA: function( imageData, pixelIndex, red, green, blue, alpha ) {
  
      assert && assert( pixelIndex >= 0 && pixelIndex < imageData.data.length - 4, 'pixelIndex out of range: ' + pixelIndex );
      assert && assert( red >= 0 && red <= 255, 'red out of range: ' + red );
      assert && assert( green >= 0 && green <= 255, 'green out of range: ' + green );
      assert && assert( blue >= 0 && blue <= 255, 'blue out of range: ' + blue );
      assert && assert( alpha >=0 && alpha <= 255, 'alpha out of range: ' + alpha );
  
      imageData.data[ pixelIndex ] = red;
      imageData.data[ pixelIndex + 1 ] = green;
      imageData.data[ pixelIndex + 2 ] = blue;
      imageData.data[ pixelIndex + 3 ] = alpha;
    }
  };

  functionBuilder.register( 'FBCanvasUtils', FBCanvasUtils );

  return FBCanvasUtils;
} );
