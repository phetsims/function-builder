// Copyright 2015-2020, University of Colorado Boulder

/**
 * Divides the image into 4 quadrants and shifts them clockwise.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../../phet-core/js/merge.js';
import functionBuilder from '../../../functionBuilder.js';
import FunctionBuilderStrings from '../../../FunctionBuilderStrings.js';
import FBCanvasUtils from '../FBCanvasUtils.js';
import MysteryImageFunction from './MysteryImageFunction.js';

class MysteryC extends MysteryImageFunction {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {
    super( FunctionBuilderStrings.mysteryC, merge( {
      name: 'MysteryC',
      fill: 'rgb( 222, 186, 247 )'
    }, options ) );
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

    // Create the output canvas
    const outputCanvas = FBCanvasUtils.createCanvas( inputCanvas.width, inputCanvas.height );
    const context = outputCanvas.getContext( '2d' );

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

export default MysteryC;