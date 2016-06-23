// Copyright 2015-2016, University of Colorado Boulder

/**
 * Reflects about the x axis.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBCanvasUtils = require( 'FUNCTION_BUILDER/patterns/model/FBCanvasUtils' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MysteryImageFunction = require( 'FUNCTION_BUILDER/patterns/model/functions/MysteryImageFunction' );

  // strings
  var mysteryAString = require( 'string!FUNCTION_BUILDER/mysteryA' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function MysteryA( options ) {
    MysteryImageFunction.call( this, mysteryAString, _.extend( {
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
      var outputCanvas = FBCanvasUtils.createCanvas( inputCanvas.width, inputCanvas.height );
      var context = outputCanvas.getContext( '2d' );

      // Reflect about the x axis
      context.translate( 0, outputCanvas.height );
      context.scale( 1, -1 );

      // Draw the input canvas to the output canvas
      context.drawImage( inputCanvas, 0, 0 );

      return outputCanvas;
    }
  } );
} );
