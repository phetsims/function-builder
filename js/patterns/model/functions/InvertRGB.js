// Copyright 2015-2020, University of Colorado Boulder

/**
 * Inverts colors in RGB color space.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../../phet-core/js/inherit.js';
import Image from '../../../../../scenery/js/nodes/Image.js';
import invertRGBImage from '../../../../mipmaps/functions/invertRGB_png.js';
import FBConstants from '../../../common/FBConstants.js';
import ImageFunction from '../../../common/model/functions/ImageFunction.js';
import functionBuilder from '../../../functionBuilder.js';
import FBCanvasUtils from '../FBCanvasUtils.js';

/**
 * @param {Object} [options]
 * @constructor
 */
function InvertRGB( options ) {

  options = options || {};
  options.name = 'InvertRGB';
  options.fill = 'black';

  const iconNode = new Image( invertRGBImage, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } );

  ImageFunction.call( this, iconNode, options );
}

functionBuilder.register( 'InvertRGB', InvertRGB );

export default inherit( ImageFunction, InvertRGB, {

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
} );