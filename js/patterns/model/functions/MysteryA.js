// Copyright 2015-2017, University of Colorado Boulder

/**
 * Reflects about the x axis.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBCanvasUtils = require( 'FUNCTION_BUILDER/patterns/model/FBCanvasUtils' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MysteryImageFunction = require( 'FUNCTION_BUILDER/patterns/model/functions/MysteryImageFunction' );

  // strings
  const mysteryAString = require( 'string!FUNCTION_BUILDER/mysteryA' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function MysteryA( options ) {
    MysteryImageFunction.call( this, mysteryAString, _.extend( {
      name: 'MysteryA',
      fill: 'rgb( 127, 225, 173 )'
    }, options ) );
  }

  functionBuilder.register( 'MysteryA', MysteryA );

  return inherit( MysteryImageFunction, MysteryA, {

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
} );
