// Copyright 2015-2023, University of Colorado Boulder

/**
 * Creates a grayscale image.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Image } from '../../../../../scenery/js/imports.js';
import grayscale_png from '../../../../mipmaps/functions/grayscale_png.js';
import FBConstants from '../../../common/FBConstants.js';
import ImageFunction, { ImageFunctionOptions } from '../../../common/model/functions/ImageFunction.js';
import functionBuilder from '../../../functionBuilder.js';
import FBCanvasUtils from '../FBCanvasUtils.js';
import optionize, { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;
type GrayscaleOptions = SelfOptions;

export default class Grayscale extends ImageFunction {

  public constructor( providedOptions?: GrayscaleOptions ) {

    const options = optionize<GrayscaleOptions, SelfOptions, ImageFunctionOptions>()( {

      // ImageFunctionOptions
      name: 'Grayscale',
      fill: 'rgb( 232, 232, 232 )',
      invertible: false // converting to grayscale is lossy
    }, providedOptions );

    const iconNode = new Image( grayscale_png, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } );

    super( iconNode, options );
  }

  public override applyFunction( inputCanvas: HTMLCanvasElement ): HTMLCanvasElement {

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
}

functionBuilder.register( 'Grayscale', Grayscale );