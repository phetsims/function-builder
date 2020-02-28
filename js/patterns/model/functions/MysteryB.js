// Copyright 2015-2020, University of Colorado Boulder

/**
 * Reflects about the y-axis and rotates 90 degrees clockwise.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../../phet-core/js/inherit.js';
import merge from '../../../../../phet-core/js/merge.js';
import functionBuilderStrings from '../../../function-builder-strings.js';
import functionBuilder from '../../../functionBuilder.js';
import FBCanvasUtils from '../FBCanvasUtils.js';
import MysteryImageFunction from './MysteryImageFunction.js';

const mysteryBString = functionBuilderStrings.mysteryB;

/**
 * @param {Object} [options]
 * @constructor
 */
function MysteryB( options ) {
  MysteryImageFunction.call( this, mysteryBString, merge( {
    name: 'MysteryB',
    fill: 'rgb( 249, 144, 99 )'
  }, options ) );
}

functionBuilder.register( 'MysteryB', MysteryB );

export default inherit( MysteryImageFunction, MysteryB, {

  /**
   * Applies this function.
   *
   * @param {HTMLCanvasElement} inputCanvas
   * @returns {HTMLCanvasElement}
   * @public
   * @override
   */
  apply: function( inputCanvas ) {

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
} );