// Copyright 2015-2023, University of Colorado Boulder

/**
 * Divides the image into 4 quadrants and shifts them clockwise.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import functionBuilder from '../../../functionBuilder.js';
import FunctionBuilderStrings from '../../../FunctionBuilderStrings.js';
import FBCanvasUtils from '../FBCanvasUtils.js';
import MysteryImageFunction, { MysteryImageFunctionOptions } from './MysteryImageFunction.js';
import optionize, { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;
type MysteryCOptions = SelfOptions;

export default class MysteryC extends MysteryImageFunction {

  public constructor( providedOptions?: MysteryCOptions ) {
    const options = optionize<MysteryCOptions, SelfOptions, MysteryImageFunctionOptions>()( {

      // MysteryImageFunctionOptions
      name: 'MysteryC',
      fill: 'rgb( 222, 186, 247 )',
      invertible: true
    }, providedOptions );
    super( FunctionBuilderStrings.mysteryCStringProperty, options );
  }

  public override applyFunction( inputCanvas: HTMLCanvasElement ): HTMLCanvasElement {

    // Create the output canvas
    const outputCanvas = FBCanvasUtils.createCanvas( inputCanvas.width, inputCanvas.height );
    const context = outputCanvas.getContext( '2d' )!;
    assert && assert( context );

    // Divide into 4 quadrants and shift clockwise

    // upper-left to upper-right
    context.drawImage( inputCanvas,
      0, 0,
      inputCanvas.width / 2, inputCanvas.height / 2,
      inputCanvas.width / 2, 0,
      inputCanvas.width / 2, inputCanvas.height / 2 );

    // upper-right to lower-right
    context.drawImage( inputCanvas,
      inputCanvas.width / 2, 0,
      inputCanvas.width / 2, inputCanvas.height / 2,
      inputCanvas.width / 2, inputCanvas.height / 2,
      inputCanvas.width / 2, inputCanvas.height / 2 );

    // lower-right to lower-left
    context.drawImage( inputCanvas,
      inputCanvas.width / 2, inputCanvas.height / 2,
      inputCanvas.width / 2, inputCanvas.height / 2,
      0, inputCanvas.height / 2,
      inputCanvas.width / 2, inputCanvas.height / 2 );

    // lower-right to upper-left
    context.drawImage( inputCanvas,
      0, inputCanvas.height / 2,
      inputCanvas.width / 2, inputCanvas.height / 2,
      0, 0,
      inputCanvas.width / 2, inputCanvas.height / 2 );

    return outputCanvas;
  }
}

functionBuilder.register( 'MysteryC', MysteryC );