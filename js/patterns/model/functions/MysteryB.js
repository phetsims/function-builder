// Copyright 2015-2016, University of Colorado Boulder

/**
 * Reflects about the y-axis and rotates 90 degrees clockwise.
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
  var mysteryBString = require( 'string!FUNCTION_BUILDER/mysteryB' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function MysteryB( options ) {
    MysteryImageFunction.call( this, mysteryBString, _.extend( {
      name: 'MysteryB',
      fill: 'rgb( 249, 144, 99 )'
    }, options ) );
  }

  functionBuilder.register( 'MysteryB', MysteryB );

  return inherit( MysteryImageFunction, MysteryB, {

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
      var outputCanvas = FBCanvasUtils.createCanvas( inputCanvas.height, inputCanvas.width ); // swap width and height!
      var context = outputCanvas.getContext( '2d' );

      // Reflect about the y axis and rotate 90 degrees
      context.translate( outputCanvas.width, outputCanvas.height );
      context.rotate( Math.PI / 2 );
      context.scale( -1, 1 );

      // Draw the input canvas to the output canvas
      context.drawImage( inputCanvas, 0, 0 );

      return outputCanvas;
    }
  } );
} );
