// Copyright 2015-2020, University of Colorado Boulder

/**
 * Erases the image.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Image from '../../../../../scenery/js/nodes/Image.js';
import eraseImage from '../../../../mipmaps/functions/erase_png.js';
import FBConstants from '../../../common/FBConstants.js';
import ImageFunction from '../../../common/model/functions/ImageFunction.js';
import functionBuilder from '../../../functionBuilder.js';
import FBCanvasUtils from '../FBCanvasUtils.js';

class Erase extends ImageFunction {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = options || {};
    options.name = 'Erase';
    options.fill = 'rgb( 0, 222, 224 )';
    options.invertible = false; // lossy, erased image data cannot be restored

    const iconNode = new Image( eraseImage, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } );

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

    // blank image data (transparent black pixels), same dimensions as input
    const imageData = inputCanvas.getContext( '2d' ).createImageData( inputCanvas.width, inputCanvas.height );
    return FBCanvasUtils.createCanvasWithImageData( imageData );
  }
}

functionBuilder.register( 'Erase', Erase );

export default Erase;