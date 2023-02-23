// Copyright 2015-2023, University of Colorado Boulder

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

import { Color, Image } from '../../../../../scenery/js/imports.js';
import warhol_png from '../../../../mipmaps/functions/warhol_png.js';
import FBConstants from '../../../common/FBConstants.js';
import ImageFunction from '../../../common/model/functions/ImageFunction.js';
import functionBuilder from '../../../functionBuilder.js';
import FBCanvasUtils from '../FBCanvasUtils.js';
import Grayscale from './Grayscale.js';
import Identity from './Identity.js';
import Shrink from './Shrink.js';

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
const LEFT_TOP_COLOR_MAP = [ new Color( 0, 0, 255 ), new Color( 0, 255, 0 ), new Color( 255, 0, 0 ), new Color( 255, 255, 0 ) ];
const RIGHT_TOP_COLOR_MAP = [ Color.YELLOW, Color.RED, Color.GREEN, new Color( 40, 40, 255 ) ];
const LEFT_BOTTOM_COLOR_MAP = [ new Color( 19, 31, 24 ), new Color( 76, 76, 76 ), Color.YELLOW, Color.MAGENTA ];
const RIGHT_BOTTOM_COLOR_MAP = [ new Color( 0, 100, 255 ), new Color( 165, 255, 0 ), new Color( 255, 0, 132 ), new Color( 255, 215, 140 ) ];

export default class Warhol extends ImageFunction {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = options || {};
    options.name = 'Warhol';
    options.fill = 'rgb( 250, 186, 75 )';
    options.invertible = false; // grayscale conversion and intensity mapping are both lossy

    const iconNode = new Image( warhol_png, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } );

    super( iconNode, options );

    // @private
    this.shrink = new Shrink( { scale: 0.5 } );
    this.grayscale = new Grayscale();
    this.identity = new Identity();
  }

  /**
   * Applies this function.
   *
   * @param {HTMLCanvasElement} inputCanvas
   * @returns {HTMLCanvasElement}
   * @public
   * @override
   */
  applyFunction( inputCanvas ) {
    assert && assert( this.shrink !== undefined, 'apply was called before constructor completed' );

    let outputCanvas = null;

    if ( FBCanvasUtils.isBlank( inputCanvas ) ) {

      // The input canvas is blank, apply Identity instead of Warhol.
      outputCanvas = this.identity.applyFunction( inputCanvas );
    }
    else {

      // Shrink the image by 50%.
      // Do this first so that we're processing fewer pixels in subsequent operations.
      const halfCanvas = this.shrink.applyFunction( inputCanvas );

      // Put the image on an opaque background, so we have no transparent pixels.
      const opaqueCanvas = FBCanvasUtils.createCanvasWithImage( halfCanvas, {
        fillStyle: 'white'
      } );

      // Convert the image to grayscale
      const grayscaleCanvas = this.grayscale.applyFunction( opaqueCanvas );
      const grayscaleData = FBCanvasUtils.getImageData( grayscaleCanvas );

      // Create the output canvas, with same dimensions as inputCanvas
      outputCanvas = FBCanvasUtils.createCanvas( inputCanvas.width, inputCanvas.height );
      const outputContext = outputCanvas.getContext( '2d' );

      // Create a 'scratch' ImageData that will hold the result of mapping grayscale to colors.
      // This gets reused for each color mapping, so be sure to draw the data to the output canvas
      // before proceeding with the next mapping.
      const scratchData = halfCanvas.getContext( '2d' ).createImageData( halfCanvas.width, halfCanvas.height );

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
}

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
function applyColorMap( inputData, outputData, colorMap ) {
  assert && assert( inputData.data.length === outputData.data.length );
  for ( let i = 0; i < inputData.data.length - 4; i += 4 ) {

    // Convert RGB (0-255) to intensity (0-255), using the non-linear luma coding scheme employed in video systems
    // (e.g. NTSC, PAL, SECAM).  See https://en.wikipedia.org/wiki/Grayscale or the NTSC CCIR 601 specification.
    const intensity = 0.2989 * inputData.data[ i ] + 0.5870 * inputData.data[ i + 1 ] + 0.1140 * inputData.data[ i + 2 ];
    assert && assert( intensity >= 0 && intensity <= 255, `intensity out of range: ${intensity}` );

    // map intensity to a color map
    const colorIndex = Math.floor( intensity / ( 256 / colorMap.length ) );
    assert && assert( colorIndex >= 0 && colorIndex < colorMap.length, `colorIndex out of range: ${colorIndex}` );

    // apply the color map
    const color = colorMap[ colorIndex ];
    FBCanvasUtils.setPixelRGBA( outputData, i, color.red, color.green, color.blue, inputData.data[ i + 3 ] );
  }
  return outputData;
}

// @public for use by FBIconFactory.createPatternsScreenIcon
Warhol.LEFT_TOP_COLOR_MAP = LEFT_TOP_COLOR_MAP;
Warhol.RIGHT_TOP_COLOR_MAP = RIGHT_TOP_COLOR_MAP;
Warhol.LEFT_BOTTOM_COLOR_MAP = LEFT_BOTTOM_COLOR_MAP;
Warhol.RIGHT_BOTTOM_COLOR_MAP = RIGHT_BOTTOM_COLOR_MAP;

functionBuilder.register( 'Warhol', Warhol );