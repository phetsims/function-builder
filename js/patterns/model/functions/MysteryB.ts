// Copyright 2015-2023, University of Colorado Boulder

/**
 * Reflects about the y-axis and rotates 90 degrees clockwise.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import functionBuilder from '../../../functionBuilder.js';
import FunctionBuilderStrings from '../../../FunctionBuilderStrings.js';
import FBCanvasUtils from '../FBCanvasUtils.js';
import MysteryImageFunction, { MysteryImageFunctionOptions } from './MysteryImageFunction.js';
import optionize, { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../../phet-core/js/types/StrictOmit.js';

type SelfOptions = EmptySelfOptions;
type MysteryBOptions = SelfOptions & StrictOmit<MysteryImageFunctionOptions, 'name' | 'fill'>;

export default class MysteryB extends MysteryImageFunction {

  public constructor( providedOptions?: MysteryBOptions ) {
    const options = optionize<MysteryBOptions, SelfOptions, MysteryImageFunctionOptions>()( {

      // MysteryImageFunctionOptions
      name: 'MysteryB',
      fill: 'rgb( 249, 144, 99 )'
    }, providedOptions );
    super( FunctionBuilderStrings.mysteryBStringProperty, options );
  }

  public override applyFunction( inputCanvas: HTMLCanvasElement ): HTMLCanvasElement {

    // Create the output canvas
    const outputCanvas = FBCanvasUtils.createCanvas( inputCanvas.height, inputCanvas.width ); // swap width and height!
    const context = outputCanvas.getContext( '2d' )!;
    assert && assert( context );

    // Reflect about the y-axis and rotate 90 degrees
    context.translate( outputCanvas.width, outputCanvas.height );
    context.rotate( Math.PI / 2 );
    context.scale( -1, 1 );

    // Draw the input canvas to the output canvas
    context.drawImage( inputCanvas, 0, 0 );

    return outputCanvas;
  }
}

functionBuilder.register( 'MysteryB', MysteryB );