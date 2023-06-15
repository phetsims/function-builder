// Copyright 2015-2023, University of Colorado Boulder

/**
 * Rotates 180 degrees.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Image } from '../../../../../scenery/js/imports.js';
import rotate180_png from '../../../../mipmaps/functions/rotate180_png.js';
import FBConstants from '../../../common/FBConstants.js';
import ImageFunction, { ImageFunctionOptions } from '../../../common/model/functions/ImageFunction.js';
import functionBuilder from '../../../functionBuilder.js';
import FBCanvasUtils from '../FBCanvasUtils.js';
import optionize, { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;
type Rotate180Options = SelfOptions;

export default class Rotate180 extends ImageFunction {

  public constructor( providedOptions?: Rotate180Options ) {

    const options = optionize<Rotate180Options, SelfOptions, ImageFunctionOptions>()( {

      // ImageFunctionOptions
      name: 'Rotate180',
      fill: 'rgb( 147, 231, 128 )',
      invertible: true
    }, providedOptions );

    const iconNode = new Image( rotate180_png, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } );

    super( iconNode, options );
  }

  public override applyFunction( inputCanvas: HTMLCanvasElement ): HTMLCanvasElement {

    // Create the output canvas
    const outputCanvas = FBCanvasUtils.createCanvas( inputCanvas.width, inputCanvas.height );
    const context = outputCanvas.getContext( '2d' )!;
    assert && assert( context );

    // Rotate 180 degrees
    context.translate( outputCanvas.width, outputCanvas.height );
    context.rotate( Math.PI );

    // Draw the input canvas to the output canvas
    context.drawImage( inputCanvas, 0, 0 );

    return outputCanvas;
  }
}

functionBuilder.register( 'Rotate180', Rotate180 );