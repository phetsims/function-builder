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
  var FBCanvasUtils = require( 'FUNCTION_BUILDER/patterns/model/FBCanvasUtils' );
  var Color = require( 'SCENERY/util/Color' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Grayscale = require( 'FUNCTION_BUILDER/patterns/model/functions/Grayscale' );
  var Identity = require( 'FUNCTION_BUILDER/patterns/model/functions/Identity' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ImageFunction = require( 'FUNCTION_BUILDER/common/model/functions/ImageFunction' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Shrink = require( 'FUNCTION_BUILDER/patterns/model/functions/Shrink' );

  // images
  var warholImage = require( 'mipmap!FUNCTION_BUILDER/functions/warhol.png' );

  /**
   * Color maps, for mapping grayscale intensity to RGB.
   *
   * Intensity range is [0,255], where 0 is darkest, 255 is brightest. For the purposes of color mapping, the intensity
   * range is divided into equal 'bands', based on the number of colors in the map. Each pixel in the grayscale image
   * is examined, its intensity is computed, and the corresponding color is used from the color map.
   *
   * For example, if COLOR_MAP has 4 colors, then there will be 4 intensity bands (0-64, 65-127, 128-192, 193-255)
   * which map to indices 0-3 (respectively) of the map.  If a pixel's intensity is 68, then COLOR_MAP[1] will
   * be used as the color for the pixel.
   *
   * @type {Color[]}
   */
  var LEFT_TOP_COLOR_MAP = [ new Color( 0, 0, 255 ), new Color( 0, 255, 0 ), new Color( 255, 0, 0 ), new Color( 255, 255, 0 ) ];
  var RIGHT_TOP_COLOR_MAP = [ new Color( 0, 100, 255 ), new Color( 165, 255, 0 ), new Color( 255, 0, 132 ), new Color( 255, 215, 140 ) ];
  var LEFT_BOTTOM_COLOR_MAP = [ new Color( 19, 31, 24 ), new Color( 76, 76, 76 ), new Color( 65, 0, 89 ), new Color( 255, 125, 18 ) ];
  var RIGHT_BOTTOM_COLOR_MAP = [ new Color( 145, 132, 98 ), new Color( 184, 45, 63 ), new Color( 25, 78, 125 ), new Color( 55, 211, 37 ) ];

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Warhol( options ) {

    options = options || {};
    options.fill = 'rgb( 250, 186, 75 )';
    options.invertible = false; // grayscale conversion and intensity mapping are both lossy

    // @private
    this.shrink = new Shrink( { scale: 0.5 } );
    this.grayscale = new Grayscale();
    this.identity = new Identity();

    var iconNode = new Image( warholImage, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } );

    ImageFunction.call( this, iconNode, options );
  }

  functionBuilder.register( 'Warhol', Warhol );

  /**
   * Applies a color map, based on intensity of the pixels in the input.
   * While it's tempting to implement this as a subtype of ImageFunction,
   * doing so would increase the number of Canvases created when applying Warhol.
   *
   * @param {ImageData} inputData
   * @param {ImageData} outputData
   * @param {Color[]} colorMap
   * @returns {ImageData}
   */
  var applyColorMap = function( inputData, outputData, colorMap ) {
    assert && assert( inputData.data.length === outputData.data.length );
    for ( var i = 0; i < inputData.data.length - 4; i += 4 ) {

      // Convert RGB (0-255) to intensity (0-255), using the non-linear luma coding scheme employed in video systems
      // (e.g. NTSC, PAL, SECAM).  See https://en.wikipedia.org/wiki/Grayscale or the NTSC CCIR 601 specification.
      var intensity = 0.2989 * inputData.data[ i ] + 0.5870 * inputData.data[ i + 1 ] + 0.1140 * inputData.data[ i + 2 ];
      assert && assert( intensity >= 0 && intensity <= 255, 'intensity out of range: ' + intensity );

      // map intensity to a color map
      var colorIndex = Math.floor( intensity / ( 256 / colorMap.length ) );
      assert && assert( colorIndex >= 0 && colorIndex < colorMap.length, 'colorIndex out of range: ' + colorIndex );

      // apply the color map
      var color = colorMap[ colorIndex ];
      FBCanvasUtils.setPixelRGBA( outputData, i, color.red, color.green, color.blue, inputData.data[ i + 3 ] );
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

      var outputCanvas = null;

      if ( FBCanvasUtils.isBlank( inputCanvas ) ) {

        // The input canvas is blank, apply Identity instead of Warhol.
        outputCanvas = this.identity.apply( inputCanvas );
      }
      else {

        // Shrink the image by 50%.
        // Do this first so that we're processing fewer pixels in subsequent operations.
        var halfCanvas = this.shrink.apply( inputCanvas );

        // Put the image on an opaque background, so we have no transparent pixels.
        var opaqueCanvas = FBCanvasUtils.createCanvasWithImage( halfCanvas, {
          fillStyle: 'white'
        } );

        // Convert the image to grayscale
        var grayscaleCanvas = this.grayscale.apply( opaqueCanvas );
        var grayscaleData = FBCanvasUtils.getImageData( grayscaleCanvas );

        // Create the output canvas, with same dimensions as inputCanvas
        outputCanvas = FBCanvasUtils.createCanvas( inputCanvas.width, inputCanvas.height );
        var outputContext = outputCanvas.getContext( '2d' );

        // Create a 'scratch' ImageData that will hold the result of mapping grayscale to colors.
        // This gets reused for each color mapping, so be sure to draw the data to the output canvas
        // before proceeding with the next mapping.
        var scratchData = halfCanvas.getContext( '2d' ).createImageData( halfCanvas.width, halfCanvas.height );

        // Draw a color-mapped image to each quadrant of the output canvas, using a different map in each quadrant.
        outputContext.putImageData( applyColorMap( grayscaleData, scratchData, LEFT_TOP_COLOR_MAP ),
          0, 0 );
        outputContext.putImageData( applyColorMap( grayscaleData, scratchData, RIGHT_TOP_COLOR_MAP ),
          outputCanvas.width / 2, 0 );
        outputContext.putImageData( applyColorMap( grayscaleData, scratchData, LEFT_BOTTOM_COLOR_MAP ),
          0, outputCanvas.height / 2 );
        outputContext.putImageData( applyColorMap( grayscaleData, scratchData, RIGHT_BOTTOM_COLOR_MAP ),
          outputCanvas.width / 2, outputCanvas.height / 2 );
      }

      return outputCanvas;
    }
  }, {

    // @public for use by FBIconFactory.createPatternsScreenIcon
    LEFT_TOP_COLOR_MAP: LEFT_TOP_COLOR_MAP,
    RIGHT_TOP_COLOR_MAP: RIGHT_TOP_COLOR_MAP,
    LEFT_BOTTOM_COLOR_MAP: LEFT_BOTTOM_COLOR_MAP,
    RIGHT_BOTTOM_COLOR_MAP: RIGHT_BOTTOM_COLOR_MAP
  } );
} );
