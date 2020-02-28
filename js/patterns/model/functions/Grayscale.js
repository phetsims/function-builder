// Copyright 2015-2020, University of Colorado Boulder

/**
 * Creates a grayscale image.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../../phet-core/js/inherit.js';
import Image from '../../../../../scenery/js/nodes/Image.js';
import grayScaleImage from '../../../../mipmaps/functions/grayscale_png.js';
import FBConstants from '../../../common/FBConstants.js';
import ImageFunction from '../../../common/model/functions/ImageFunction.js';
import functionBuilder from '../../../functionBuilder.js';
import FBCanvasUtils from '../FBCanvasUtils.js';

/**
 * @param {Object} [options]
 * @constructor
 */
function Grayscale( options ) {

  options = options || {};
  options.name = 'Grayscale';
  options.fill = 'rgb( 232, 232, 232 )';
  options.invertible = false; // converting to grayscale is lossy

  const iconNode = new Image( grayScaleImage, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } );

  ImageFunction.call( this, iconNode, options );
}

functionBuilder.register( 'Grayscale', Grayscale );

export default inherit( ImageFunction, Grayscale, {

  /**
   * Applies this function.
   *
   * @param {HTMLCanvasElement} inputCanvas
   * @returns {HTMLCanvasElement}
   * @public
   * @override
   */
  apply: function( inputCanvas ) {

    const imageData = FBCanvasUtils.getImageData( inputCanvas );

    // Average the red, green and blue values of each pixel. This drains the color from the image.
    const data = imageData.data;
    for ( let i = 0; i < data.length - 4; i += 4 ) {
      const average = ( data[ i ] + data[ i + 1 ] + data[ i + 2 ] ) / 3;
      data[ i ] = average;
      data[ i + 1 ] = average;
      data[ i + 2 ] = average;
    }

    return FBCanvasUtils.createCanvasWithImageData( imageData );
  }
} );