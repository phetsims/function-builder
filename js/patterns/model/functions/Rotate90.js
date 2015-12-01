// Copyright 2015, University of Colorado Boulder

/**
 * Rotates 90 degrees clockwise.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AbstractFunction = require( 'FUNCTION_BUILDER/common/model/AbstractFunction' );
  var CanvasUtils = require( 'FUNCTION_BUILDER/common/model/CanvasUtils' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var rotate90Image = require( 'mipmap!FUNCTION_BUILDER/functions/rotate90.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Rotate90( options ) {

    options = _.extend( {
      name: 'rotate90',
      image: rotate90Image,
      fill: 'rgb( 147, 231, 128 )'
    }, options );

    AbstractFunction.call( this, options );
  }

  functionBuilder.register( 'Rotate90', Rotate90 );

  return inherit( AbstractFunction, Rotate90, {

    /**
     * Applies this function.
     * @param {HTMLCanvasElement} inputCanvas
     * @returns {HTMLCanvasElement}
     * @public
     * @override
     */
    apply: function( inputCanvas ) {

      // Create the output canvas
      var outputCanvas = CanvasUtils.createCanvas( inputCanvas.height, inputCanvas.width ); // swap width and height!
      var context = outputCanvas.getContext( '2d' );

      // Rotate 90 degrees
      context.translate( outputCanvas.width, 0 );
      context.rotate( Math.PI / 2 );

      // Draw the input canvas to the output canvas
      context.drawImage( inputCanvas, 0, 0 );

      return outputCanvas;
    }

  } );
} );
