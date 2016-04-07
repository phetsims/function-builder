// Copyright 2015-2016, University of Colorado Boulder

/**
 * Applies a 'Warhol effect' to an image.
 * The basic approach is described at http://chennanni.com/archives/1111.
 *
 * Steps to 'Warhol' an image:
 *
 * 1. Scale the image by 50%.
 * 2. Convert the image to grayscale.
 * 3. Use intensity of pixels in the grayscale image to map pixels to colors.
 * 4. Draw the color-mapped image into 1 of the 4 quadrants.
 * 5. Repeat steps 3 & 4 for each quadrant, using a different color map.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CanvasUtils = require( 'FUNCTION_BUILDER/common/model/CanvasUtils' );
  var Color = require( 'SCENERY/util/Color' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var ImageFunction = require( 'FUNCTION_BUILDER/patterns/model/ImageFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var warholImage = require( 'mipmap!FUNCTION_BUILDER/functions/warhol.png' );

  // constants
  var LEFT_TOP_COLOR_MAP = [ new Color( 0, 0, 255 ), new Color( 0, 255, 0 ), new Color( 255, 0, 0 ), new Color( 255, 255, 0 ) ];
  var RIGHT_TOP_COLOR_MAP = [ new Color( 0, 100, 255 ), new Color( 165, 255, 0 ), new Color( 255, 0, 132 ), new Color( 255, 215, 140 ) ];
  var LEFT_BOTTOM_COLOR_MAP = [ new Color( 19, 31, 24 ), new Color( 76, 76, 76 ), new Color( 65, 0, 89 ), new Color( 255, 125, 18 ) ];
  var RIGHT_BOTTOM_COLOR_MAP = [ new Color( 145, 132, 98 ), new Color( 184, 45, 63 ), new Color( 25, 78, 125 ), new Color( 25, 25, 47 ) ];

  var PROCESS_BACKGROUND = false; // should the background of the image be processed?

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Warhol( options ) {

    options = _.extend( {}, options, {
      fill: 'rgb( 250, 186, 75 )',
      invertible: false
    } );

    ImageFunction.call( this, warholImage, options );
  }

  functionBuilder.register( 'Warhol', Warhol );

  /**
   * Sets the RGBA components of a pixel.
   *
   * @param {ImageData} imageData - underlying pixel data of a Canvas
   * @param {number} index - index of a specific pixel
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   * @param {number} alpha
   */
  var setPixelRGBA = function( imageData, index, red, green, blue, alpha ) {

    assert && assert( index >= 0 && index < imageData.data.length - 4 );
    assert && assert( red >= 0 && red <= 255 );
    assert && assert( green >= 0 && green <= 255 );
    assert && assert( blue >= 0 && blue <= 255 );
    assert && assert( alpha >=0 && alpha <= 255 );

    imageData.data[ index ] = red;
    imageData.data[ index + 1 ] = green;
    imageData.data[ index + 2 ] = blue;
    imageData.data[ index + 3 ] = alpha;
  };

  //TODO use Grayscale.js
  /**
   * Converts pixel data to grayscale.
   *
   * @param {ImageData} imageData - underlying pixel data of a Canvas
   * @returns {ImageData}
   */
  var applyGrayscale = function( imageData ) {
    for ( var i = 0; i < imageData.data.length - 4; i += 4 ) {

      // Convert transparent background pixels to opaque white
      if ( PROCESS_BACKGROUND && imageData.data[ i + 3 ] === 0 ) {
        setPixelRGBA( imageData, i, 255, 255, 255, 255 );
      }

      // Convert to grayscale by averaging the red, green and blue values of each pixel.
      // This drains the color from the image.
      var average = ( imageData.data[ i ] + imageData.data[ i + 1 ] + imageData.data[ i + 2 ] ) / 3;
      setPixelRGBA( imageData, i, average, average, average, imageData.data[ i + 3 ] );
    }
    return imageData;
  };

  /**
   * Applies a color map, based on intensity of the pixels in the input.
   *
   * @param {ImageData} inputData
   * @param {ImageData} outputData
   * @param {Color[]} colorMap
   * @returns {ImageData}
   */
  var applyColorMap = function( inputData, outputData, colorMap ) {
    assert && assert( inputData.data.length === outputData.data.length );
    for ( var i = 0; i < inputData.data.length - 4; i += 4 ) {

      // convert RGB to intensity, see NTSC CCIR 601 specification
      var intensity = 0.2989 * inputData.data[ i ] + 0.5870 * inputData.data[ i + 1 ] + 0.1140 * inputData.data[ i + 2 ];
      assert && assert( intensity >= 0 && intensity <= 255, 'intensity out of range: ' + intensity );

      // map intensity to a color map
      var colorIndex = Math.floor( intensity / ( 256 / colorMap.length ) );
      assert && assert( colorIndex >= 0 && colorIndex < colorMap.length, 'colorIndex out of range: ' + colorIndex );

      // apply the color map
      var color = colorMap[ colorIndex ];
      setPixelRGBA( outputData, i, color.red, color.green, color.blue, inputData.data[ i + 3 ] );
    }
    return outputData;
  };

  return inherit( ImageFunction, Warhol, {

    /**
     * Applies this function.
     *
     * @param {HTMLCanvasElement} inputCanvas
     * @returns {HTMLCanvasElement}
     * @public
     * @override
     */
    apply: function( inputCanvas ) {

      // Draw the input into a half-size canvas, effectively scaling by 50%
      var halfCanvas = CanvasUtils.createCanvas( inputCanvas.width / 2, inputCanvas.height / 2 );
      var halfContext = halfCanvas.getContext( '2d' );
      halfContext.drawImage( inputCanvas, 0, 0, halfCanvas.width, halfCanvas.height );

      // Convert the scaled image to grayscale
      var grayscaleData = applyGrayscale( halfContext.getImageData( 0, 0, halfCanvas.width, halfCanvas.height ) );

      // Create blank ImageData that will hold the result of mapping grayscale to colors.
      var colorMappedData = halfContext.createImageData( halfCanvas.width, halfCanvas.height );

      // Create the output canvas
      var outputCanvas = CanvasUtils.createCanvas( inputCanvas.width, inputCanvas.height );
      var outputContext = outputCanvas.getContext( '2d' );

      // Draw the scaled image in each quadrant with a different color map applied.
      outputContext.putImageData( applyColorMap( grayscaleData, colorMappedData, LEFT_TOP_COLOR_MAP ),
        0, 0, 0, 0, outputCanvas.width / 2, outputCanvas.height / 2 );
      outputContext.putImageData( applyColorMap( grayscaleData, colorMappedData, RIGHT_TOP_COLOR_MAP ),
        outputCanvas.width / 2, 0, 0, 0, outputCanvas.width / 2, outputCanvas.height / 2 );
      outputContext.putImageData( applyColorMap( grayscaleData, colorMappedData, LEFT_BOTTOM_COLOR_MAP ),
        0, outputCanvas.height / 2, 0, 0, outputCanvas.width / 2, outputCanvas.height / 2 );
      outputContext.putImageData( applyColorMap( grayscaleData, colorMappedData, RIGHT_BOTTOM_COLOR_MAP ),
        outputCanvas.width / 2, outputCanvas.height / 2, 0, 0, outputCanvas.width / 2, outputCanvas.height / 2 );

      return outputCanvas;
    }
  } );
} );
