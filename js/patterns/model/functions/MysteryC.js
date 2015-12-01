// Copyright 2015, University of Colorado Boulder

/**
 * Chops the image into 4 quadrants and shifts them clockwise.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CanvasUtils = require( 'FUNCTION_BUILDER/common/model/CanvasUtils' );
  var FBFunction = require( 'FUNCTION_BUILDER/common/model/FBFunction' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var mysteryCImage = require( 'mipmap!FUNCTION_BUILDER/functions/mysteryC.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function MysteryC( options ) {

    options = _.extend( {
      name: 'mysteryC',
      image: mysteryCImage,
      fill: 'rgb( 222, 186, 247 )'
    }, options );

    FBFunction.call( this, options );
  }

  functionBuilder.register( 'MysteryC', MysteryC );

  return inherit( FBFunction, MysteryC, {

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
