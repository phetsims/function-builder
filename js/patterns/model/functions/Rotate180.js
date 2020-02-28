// Copyright 2015-2020, University of Colorado Boulder

/**
 * Rotates 180 degrees.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../../phet-core/js/inherit.js';
import Image from '../../../../../scenery/js/nodes/Image.js';
import rotate180Image from '../../../../mipmaps/functions/rotate180_png.js';
import FBConstants from '../../../common/FBConstants.js';
import ImageFunction from '../../../common/model/functions/ImageFunction.js';
import functionBuilder from '../../../functionBuilder.js';
import FBCanvasUtils from '../FBCanvasUtils.js';

/**
 * @param {Object} [options]
 * @constructor
 */
function Rotate180( options ) {

  options = options || {};
  options.name = 'Rotate180';
  options.fill = 'rgb( 147, 231, 128 )';

  const iconNode = new Image( rotate180Image, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } );

  ImageFunction.call( this, iconNode, options );
}

functionBuilder.register( 'Rotate180', Rotate180 );

export default inherit( ImageFunction, Rotate180, {

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

    // Rotate 180 degrees
    context.translate( outputCanvas.width, outputCanvas.height );
    context.rotate( Math.PI );

    // Draw the input canvas to the output canvas
    context.drawImage( inputCanvas, 0, 0 );

    return outputCanvas;
  }
} );