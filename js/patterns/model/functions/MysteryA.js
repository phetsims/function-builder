// Copyright 2015-2022, University of Colorado Boulder

/**
 * Reflects about the x axis.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../../phet-core/js/merge.js';
import functionBuilder from '../../../functionBuilder.js';
import FunctionBuilderStrings from '../../../FunctionBuilderStrings.js';
import FBCanvasUtils from '../FBCanvasUtils.js';
import MysteryImageFunction from './MysteryImageFunction.js';

export default class MysteryA extends MysteryImageFunction {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {
    super( FunctionBuilderStrings.mysteryAStringProperty, merge( {
      name: 'MysteryA',
      fill: 'rgb( 127, 225, 173 )'
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

    // Reflect about the x axis
    context.translate( 0, outputCanvas.height );
    context.scale( 1, -1 );

    // Draw the input canvas to the output canvas
    context.drawImage( inputCanvas, 0, 0 );

    return outputCanvas;
  }
}

functionBuilder.register( 'MysteryA', MysteryA );