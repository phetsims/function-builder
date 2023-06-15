// Copyright 2015-2023, University of Colorado Boulder

/**
 * Shrinks an image.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../../dot/js/Utils.js';
import merge from '../../../../../phet-core/js/merge.js';
import { Image } from '../../../../../scenery/js/imports.js';
import shrink_png from '../../../../mipmaps/functions/shrink_png.js';
import FBConstants from '../../../common/FBConstants.js';
import ImageFunction from '../../../common/model/functions/ImageFunction.js';
import functionBuilder from '../../../functionBuilder.js';
import FBCanvasUtils from '../FBCanvasUtils.js';

export default class Shrink extends ImageFunction {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      scale: 0.75
    }, options );
    options.name = 'Shrink';
    options.fill = 'rgb( 246, 164, 255 )';

    assert && assert( options.scale > 0 && options.scale < 1 );

    const iconNode = new Image( shrink_png, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } );

    super( iconNode, options );

    this.scale = options.scale; // @private
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
    assert && assert( this.scale !== undefined, 'apply was called before constructor completed' );

    // Constrain shrinking to even integer dimensions, to prevent anti-aliasing artifacts.
    // See https://github.com/phetsims/function-builder-basics/issues/18
    const width = toEvenInteger( this.scale * inputCanvas.width );
    const height = toEvenInteger( this.scale * inputCanvas.height );

    // scale by drawing into a smaller canvas
    const outputCanvas = FBCanvasUtils.createCanvas( width, height );
    outputCanvas.getContext( '2d' ).drawImage( inputCanvas, 0, 0, outputCanvas.width, outputCanvas.height );
    return outputCanvas;
  }
}

/**
 * Converts a value to an even integer.
 * @param {number} value
 * @returns {number}
 */
function toEvenInteger( value ) {
  let newValue = Utils.roundSymmetric( value );
  if ( newValue % 2 !== 0 ) {
    newValue++;
  }
  return newValue;
}

functionBuilder.register( 'Shrink', Shrink );