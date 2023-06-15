// Copyright 2015-2023, University of Colorado Boulder

/**
 * Rotates 90 degrees clockwise.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Image } from '../../../../../scenery/js/imports.js';
import rotate90_png from '../../../../mipmaps/functions/rotate90_png.js';
import FBConstants from '../../../common/FBConstants.js';
import ImageFunction, { ImageFunctionOptions } from '../../../common/model/functions/ImageFunction.js';
import functionBuilder from '../../../functionBuilder.js';
import FBCanvasUtils from '../FBCanvasUtils.js';
import optionize, { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;
type Rotate90Options = SelfOptions;

export default class Rotate90 extends ImageFunction {

  public constructor( providedOptions?: Rotate90Options ) {

    const options = optionize<Rotate90Options, SelfOptions, ImageFunctionOptions>()( {

      // ImageFunctionOptions
      name: 'Rotate90',
      fill: 'rgb( 147, 231, 128 )',
      invertible: true
    }, providedOptions );

    const iconNode = new Image( rotate90_png, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } );

    super( iconNode, options );
  }

  public override applyFunction( inputCanvas: HTMLCanvasElement ): HTMLCanvasElement {

    // Create the output canvas
    const outputCanvas = FBCanvasUtils.createCanvas( inputCanvas.height, inputCanvas.width ); // swap width and height!
    const context = outputCanvas.getContext( '2d' )!;
    assert && assert( context );

    // Rotate 90 degrees
    context.translate( outputCanvas.width, 0 );
    context.rotate( Math.PI / 2 );

    // Draw the input canvas to the output canvas
    context.drawImage( inputCanvas, 0, 0 );

    return outputCanvas;
  }
}

functionBuilder.register( 'Rotate90', Rotate90 );