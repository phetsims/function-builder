// Copyright 2015-2016, University of Colorado Boulder

/**
 * Reflects about the x axis.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CanvasUtils = require( 'FUNCTION_BUILDER/common/model/CanvasUtils' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var ImageFunction = require( 'FUNCTION_BUILDER/patterns/model/ImageFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var mysteryAImage = require( 'mipmap!FUNCTION_BUILDER/functions/mysteryA.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function MysteryA( options ) {

    options = _.extend( {
      fill: 'rgb( 127, 225, 173 )'
    }, options );

    ImageFunction.call( this, mysteryAImage, options );
  }

  functionBuilder.register( 'MysteryA', MysteryA );

  return inherit( ImageFunction, MysteryA, {

    /**
     * Applies this function.
     * @param {HTMLCanvasElement} inputCanvas
     * @returns {HTMLCanvasElement}
     * @public
     * @override
     */
    apply: function( inputCanvas ) {

      // Create the output canvas
      var outputCanvas = CanvasUtils.createCanvas( inputCanvas.width, inputCanvas.height );
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
