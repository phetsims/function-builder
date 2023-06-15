// Copyright 2015-2023, University of Colorado Boulder

/**
 * Reflects about the x-axis.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import functionBuilder from '../../../functionBuilder.js';
import FunctionBuilderStrings from '../../../FunctionBuilderStrings.js';
import FBCanvasUtils from '../FBCanvasUtils.js';
import MysteryImageFunction, { MysteryImageFunctionOptions } from './MysteryImageFunction.js';
import optionize, { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;
type MysteryAOptions = SelfOptions;

export default class MysteryA extends MysteryImageFunction {

  public constructor( providedOptions?: MysteryAOptions ) {
    const options = optionize<MysteryAOptions, SelfOptions, MysteryImageFunctionOptions>()( {

      // MysteryImageFunctionOptions
      name: 'MysteryA',
      fill: 'rgb( 127, 225, 173 )',
      invertible: true
    }, providedOptions );
    super( FunctionBuilderStrings.mysteryAStringProperty, options );
  }

  public override applyFunction( inputCanvas: HTMLCanvasElement ): HTMLCanvasElement {

    // Create the output canvas
    const outputCanvas = FBCanvasUtils.createCanvas( inputCanvas.width, inputCanvas.height );
    const context = outputCanvas.getContext( '2d' )!;
    assert && assert( context );

    // Reflect about the x-axis
    context.translate( 0, outputCanvas.height );
    context.scale( 1, -1 );

    // Draw the input canvas to the output canvas
    context.drawImage( inputCanvas, 0, 0 );

    return outputCanvas;
  }
}

functionBuilder.register( 'MysteryA', MysteryA );