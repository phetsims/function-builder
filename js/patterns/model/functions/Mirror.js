// Copyright 2015-2019, University of Colorado Boulder

/**
 * Creates a mirror image, a reflection about the y axis.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../../phet-core/js/inherit.js';
import Image from '../../../../../scenery/js/nodes/Image.js';
import mirrorImage from '../../../../mipmaps/functions/mirror_png.js';
import FBConstants from '../../../common/FBConstants.js';
import ImageFunction from '../../../common/model/functions/ImageFunction.js';
import functionBuilder from '../../../functionBuilder.js';
import FBCanvasUtils from '../FBCanvasUtils.js';

/**
 * @param {Object} [options]
 * @constructor
 */
function Mirror( options ) {

  options = options || {};
  options.name = 'Mirror';
  options.fill = 'rgb( 128, 197, 237 )';

  const iconNode = new Image( mirrorImage, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } );

  ImageFunction.call( this, iconNode, options );
}

functionBuilder.register( 'Mirror', Mirror );

export default inherit( ImageFunction, Mirror, {

  /**
   * Applies this function.
   *
   * @param {HTMLCanvasElement} inputCanvas
   * @returns {HTMLCanvasElement}
   * @public
   * @override
   */
  apply: function( inputCanvas ) {

    // Create the output canvas
    const outputCanvas = FBCanvasUtils.createCanvas( inputCanvas.width, inputCanvas.height );
    const context = outputCanvas.getContext( '2d' );

    // Reflect about the y axis
    context.translate( outputCanvas.width, 0 );
    context.scale( -1, 1 );

    // Draw the input canvas to the output canvas
    context.drawImage( inputCanvas, 0, 0 );

    return outputCanvas;
  }
} );