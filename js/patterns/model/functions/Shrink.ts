// Copyright 2015-2024, University of Colorado Boulder

/**
 * Shrinks an image.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../../dot/js/Utils.js';
import optionize from '../../../../../phet-core/js/optionize.js';
import Image from '../../../../../scenery/js/nodes/Image.js';
import shrink_png from '../../../../mipmaps/functions/shrink_png.js';
import FBConstants from '../../../common/FBConstants.js';
import ImageFunction, { ImageFunctionOptions } from '../../../common/model/functions/ImageFunction.js';
import functionBuilder from '../../../functionBuilder.js';
import FBCanvasUtils from '../FBCanvasUtils.js';

type SelfOptions = {
  scale?: number; // how much to scale the image, [0,1]
};
type ShrinkOptions = SelfOptions;

export default class Shrink extends ImageFunction {

  private readonly scale: number;

  public constructor( providedOptions?: ShrinkOptions ) {

    const options = optionize<ShrinkOptions, SelfOptions, ImageFunctionOptions>()( {

      // SelfOptions
      scale: 0.75,

      // ImageFunctionOptions
      name: 'Shrink',
      fill: 'rgb( 246, 164, 255 )',
      invertible: true
    }, providedOptions );

    assert && assert( options.scale > 0 && options.scale < 1 );

    const iconNode = new Image( shrink_png, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } );

    super( iconNode, options );

    this.scale = options.scale;
  }

  public override applyFunction( inputCanvas: HTMLCanvasElement ): HTMLCanvasElement {
    assert && assert( this.scale !== undefined, 'apply was called before constructor completed' );

    // Constrain shrinking to even integer dimensions, to prevent antialiasing artifacts.
    // See https://github.com/phetsims/function-builder-basics/issues/18
    const width = toEvenInteger( this.scale * inputCanvas.width );
    const height = toEvenInteger( this.scale * inputCanvas.height );

    // scale by drawing into a smaller canvas
    const outputCanvas = FBCanvasUtils.createCanvas( width, height );
    const context = outputCanvas.getContext( '2d' )!;
    assert && assert( context );
    context.drawImage( inputCanvas, 0, 0, outputCanvas.width, outputCanvas.height );
    return outputCanvas;
  }
}

/**
 * Converts a value to an even integer.
 */
function toEvenInteger( value: number ): number {
  let newValue = Utils.roundSymmetric( value );
  if ( newValue % 2 !== 0 ) {
    newValue++;
  }
  return newValue;
}

functionBuilder.register( 'Shrink', Shrink );