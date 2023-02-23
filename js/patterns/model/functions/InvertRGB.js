// Copyright 2015-2023, University of Colorado Boulder

/**
 * Inverts colors in RGB color space.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Image } from '../../../../../scenery/js/imports.js';
import invertRGB_png from '../../../../mipmaps/functions/invertRGB_png.js';
import FBConstants from '../../../common/FBConstants.js';
import ImageFunction from '../../../common/model/functions/ImageFunction.js';
import functionBuilder from '../../../functionBuilder.js';
import FBCanvasUtils from '../FBCanvasUtils.js';

export default class InvertRGB extends ImageFunction {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = options || {};
    options.name = 'InvertRGB';
    options.fill = 'black';

    const iconNode = new Image( invertRGB_png, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } );

    super( iconNode, options );
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

    const imageData = FBCanvasUtils.getImageData( inputCanvas );

    // invert colors for non-transparent pixels
    const data = imageData.data;
    for ( let i = 0; i < data.length; i += 4 ) {
      if ( data[ i + 3 ] !== 0 ) {
        data[ i ] = 255 - data[ i ];
        data[ i + 1 ] = 255 - data[ i + 1 ];
        data[ i + 2 ] = 255 - data[ i + 2 ];
        data[ i + 3 ] = 255;
      }
    }

    return FBCanvasUtils.createCanvasWithImageData( imageData );
  }
}

functionBuilder.register( 'InvertRGB', InvertRGB );