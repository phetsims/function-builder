// Copyright 2015-2023, University of Colorado Boulder

/**
 * Creates a mirror image, a reflection about the y axis.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Image } from '../../../../../scenery/js/imports.js';
import mirror_png from '../../../../mipmaps/functions/mirror_png.js';
import FBConstants from '../../../common/FBConstants.js';
import ImageFunction, { ImageFunctionOptions } from '../../../common/model/functions/ImageFunction.js';
import functionBuilder from '../../../functionBuilder.js';
import FBCanvasUtils from '../FBCanvasUtils.js';
import optionize, { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;
type MirrorOptions = SelfOptions;

export default class Mirror extends ImageFunction {

  public constructor( providedOptions?: MirrorOptions ) {

    const options = optionize<MirrorOptions, SelfOptions, ImageFunctionOptions>()( {

      // ImageFunctionOptions
      name: 'Mirror',
      fill: 'rgb( 128, 197, 237 )',
      invertible: true
    }, providedOptions );

    const iconNode = new Image( mirror_png, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } );

    super( iconNode, options );
  }

  public override applyFunction( inputCanvas: HTMLCanvasElement ): HTMLCanvasElement {

    // Create the output canvas
    const outputCanvas = FBCanvasUtils.createCanvas( inputCanvas.width, inputCanvas.height );
    const context = outputCanvas.getContext( '2d' )!;
    assert && assert( context );

    // Reflect about the y-axis
    context.translate( outputCanvas.width, 0 );
    context.scale( -1, 1 );

    // Draw the input canvas to the output canvas
    context.drawImage( inputCanvas, 0, 0 );

    return outputCanvas;
  }
}

functionBuilder.register( 'Mirror', Mirror );