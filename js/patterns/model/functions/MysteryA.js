// Copyright 2015-2019, University of Colorado Boulder

/**
 * Reflects about the x axis.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../../phet-core/js/inherit.js';
import merge from '../../../../../phet-core/js/merge.js';
import functionBuilderStrings from '../../../function-builder-strings.js';
import functionBuilder from '../../../functionBuilder.js';
import FBCanvasUtils from '../FBCanvasUtils.js';
import MysteryImageFunction from './MysteryImageFunction.js';

const mysteryAString = functionBuilderStrings.mysteryA;

/**
 * @param {Object} [options]
 * @constructor
 */
function MysteryA( options ) {
  MysteryImageFunction.call( this, mysteryAString, merge( {
    name: 'MysteryA',
    fill: 'rgb( 127, 225, 173 )'
  }, options ) );
}

functionBuilder.register( 'MysteryA', MysteryA );

export default inherit( MysteryImageFunction, MysteryA, {

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
    const outputCanvas = FBCanvasUtils.createCanvas( inputCanvas.width, inputCanvas.height );
    const context = outputCanvas.getContext( '2d' );

    // Reflect about the x axis
    context.translate( 0, outputCanvas.height );
    context.scale( 1, -1 );

    // Draw the input canvas to the output canvas
    context.drawImage( inputCanvas, 0, 0 );

    return outputCanvas;
  }
} );