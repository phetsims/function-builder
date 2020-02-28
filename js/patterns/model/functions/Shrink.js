// Copyright 2015-2020, University of Colorado Boulder

/**
 * Shrinks an image.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../../dot/js/Utils.js';
import inherit from '../../../../../phet-core/js/inherit.js';
import merge from '../../../../../phet-core/js/merge.js';
import Image from '../../../../../scenery/js/nodes/Image.js';
import shrinkImage from '../../../../mipmaps/functions/shrink_png.js';
import FBConstants from '../../../common/FBConstants.js';
import ImageFunction from '../../../common/model/functions/ImageFunction.js';
import functionBuilder from '../../../functionBuilder.js';
import FBCanvasUtils from '../FBCanvasUtils.js';

/**
 * @param {Object} [options]
 * @constructor
 */
function Shrink( options ) {

  options = merge( {
    scale: 0.75
  }, options );
  options.name = 'Shrink';
  options.fill = 'rgb( 246, 164, 255 )';

  assert && assert( options.scale > 0 && options.scale < 1 );
  this.scale = options.scale; // @private

  const iconNode = new Image( shrinkImage, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } );

  ImageFunction.call( this, iconNode, options );
}

functionBuilder.register( 'Shrink', Shrink );

/**
 * Converts a value to an even integer.
 * @param {number} value
 * @returns {number}
 */
const toEvenInteger = function( value ) {
  let newValue = Utils.roundSymmetric( value );
  if ( newValue % 2 !== 0 ) {
    newValue++;
  }
  return newValue;
};

export default inherit( ImageFunction, Shrink, {

  /**
   * Applies this function.
   *
   * @param {HTMLCanvasElement} inputCanvas
   * @returns {HTMLCanvasElement}
   * @public
   * @override
   */
  apply: function( inputCanvas ) {

    // Constrain shrinking to even integer dimensions, to prevent anti-aliasing artifacts.
    // See https://github.com/phetsims/function-builder-basics/issues/18
    const width = toEvenInteger( this.scale * inputCanvas.width );
    const height = toEvenInteger( this.scale * inputCanvas.height );

    // scale by drawing into a smaller canvas
    const outputCanvas = FBCanvasUtils.createCanvas( width, height );
    outputCanvas.getContext( '2d' ).drawImage( inputCanvas, 0, 0, outputCanvas.width, outputCanvas.height );
    return outputCanvas;
  }
} );