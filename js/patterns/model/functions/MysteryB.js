// Copyright 2015-2020, University of Colorado Boulder

/**
 * Reflects about the y-axis and rotates 90 degrees clockwise.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../../phet-core/js/merge.js';
import functionBuilder from '../../../functionBuilder.js';
import FunctionBuilderStrings from '../../../FunctionBuilderStrings.js';
import FBCanvasUtils from '../FBCanvasUtils.js';
import MysteryImageFunction from './MysteryImageFunction.js';

class MysteryB extends MysteryImageFunction {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {
    super( FunctionBuilderStrings.mysteryB, merge( {
      name: 'MysteryB',
      fill: 'rgb( 249, 144, 99 )'
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
    const outputCanvas = FBCanvasUtils.createCanvas( inputCanvas.height, inputCanvas.width ); // swap width and height!
    const context = outputCanvas.getContext( '2d' );

    // Reflect about the y axis and rotate 90 degrees
    context.translate( outputCanvas.width, outputCanvas.height );
    context.rotate( Math.PI / 2 );
    context.scale( -1, 1 );

    // Draw the input canvas to the output canvas
    context.drawImage( inputCanvas, 0, 0 );

    return outputCanvas;
  }
}

functionBuilder.register( 'MysteryB', MysteryB );

export default MysteryB;