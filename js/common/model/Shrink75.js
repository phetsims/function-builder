// Copyright 2015, University of Colorado Boulder

/**
 * Shrinks by 75%.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CanvasUtils = require( 'FUNCTION_BUILDER/common/model/CanvasUtils' );
  var FBFunction = require( 'FUNCTION_BUILDER/common/model/FBFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var shrink75Image = require( 'mipmap!FUNCTION_BUILDER/functions/shrink75.png' );

  // constants
  var SCALE = 0.75;

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Shrink75( options ) {

    options = _.extend( {
      name: 'shrink75',
      image: shrink75Image,
      fill: 'rgb( 246, 164, 255 )'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, Shrink75, {

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

      // Scale
      var translationFactor = 0.5 * ( 1 - SCALE );
      context.translate( translationFactor * outputCanvas.width, translationFactor * outputCanvas.height );
      context.scale( SCALE, SCALE );

      // Draw the input canvas to the output canvas
      context.drawImage( inputCanvas, 0, 0 );

      return outputCanvas;
    }
  } );
} );
