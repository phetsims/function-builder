// Copyright 2015-2016, University of Colorado Boulder

/**
 * Chops the image into 4 quadrants and shifts them clockwise.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CanvasUtils = require( 'FUNCTION_BUILDER/common/model/CanvasUtils' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var ImageFunction = require( 'FUNCTION_BUILDER/common/model/ImageFunction' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );

  // strings
  var mysteryCString = require( 'string!FUNCTION_BUILDER/mysteryC' );

  /**
   * @constructor
   */
  function MysteryC() {

    var iconNode = new SubSupText( mysteryCString, {
      subScale: 0.4,
      font: FBConstants.PATTERNS_FUNCTION_FONT,
      maxWidth: 0.5 * FBConstants.FUNCTION_SIZE.width
    } );

    ImageFunction.call( this, iconNode, {
      fill: 'rgb( 222, 186, 247 )'
    } );
  }

  functionBuilder.register( 'MysteryC', MysteryC );

  return inherit( ImageFunction, MysteryC, {

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
