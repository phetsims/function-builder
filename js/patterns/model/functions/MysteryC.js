// Copyright 2015-2019, University of Colorado Boulder

/**
 * Divides the image into 4 quadrants and shifts them clockwise.
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
  const mysteryCString = require( 'string!FUNCTION_BUILDER/mysteryC' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function MysteryC( options ) {
    MysteryImageFunction.call( this, mysteryCString, _.extend( {
      name: 'MysteryC',
      fill: 'rgb( 222, 186, 247 )'
    }, options ) );
  }

  functionBuilder.register( 'MysteryC', MysteryC );

  return inherit( MysteryImageFunction, MysteryC, {

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
  } );
} );
