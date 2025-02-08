// Copyright 2015-2025, University of Colorado Boulder

/**
 * Erases the image.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';
import Image from '../../../../../scenery/js/nodes/Image.js';
import erase_png from '../../../../mipmaps/functions/erase_png.js';
import FBConstants from '../../../common/FBConstants.js';
import ImageFunction, { ImageFunctionOptions } from '../../../common/model/functions/ImageFunction.js';
import functionBuilder from '../../../functionBuilder.js';
import FBCanvasUtils from '../FBCanvasUtils.js';

type SelfOptions = EmptySelfOptions;
type EraseOptions = SelfOptions;

export default class Erase extends ImageFunction {

  public constructor( providedOptions?: EraseOptions ) {

    const options = optionize<EraseOptions, SelfOptions, ImageFunctionOptions>()( {

      // ImageFunctionOptions
      name: 'Erase',
      fill: 'rgb( 0, 222, 224 )',
      invertible: false // lossy, erased image data cannot be restored
    }, providedOptions );

    const iconNode = new Image( erase_png, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } );

    super( iconNode, options );
  }

  /**
   * Applies this function.
   */
  public override applyFunction( inputCanvas: HTMLCanvasElement ): HTMLCanvasElement {

    const context = inputCanvas.getContext( '2d' )!;
    assert && assert( context );

    // blank image data (transparent black pixels), same dimensions as input
    const imageData = context.createImageData( inputCanvas.width, inputCanvas.height );
    return FBCanvasUtils.createCanvasWithImageData( imageData );
  }
}

functionBuilder.register( 'Erase', Erase );