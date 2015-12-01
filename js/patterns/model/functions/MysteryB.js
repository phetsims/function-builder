// Copyright 2015, University of Colorado Boulder

/**
 * Reflects about the y-axis and rotates 90 degrees clockwise.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CanvasUtils = require( 'FUNCTION_BUILDER/common/model/CanvasUtils' );
  var AbstractFunction = require( 'FUNCTION_BUILDER/common/model/AbstractFunction' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var mysteryBImage = require( 'mipmap!FUNCTION_BUILDER/functions/mysteryB.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function MysteryB( options ) {

    options = _.extend( {
      name: 'mysteryB',
      image: mysteryBImage,
      fill: 'rgb( 249, 144, 99 )'
    }, options );

    AbstractFunction.call( this, options );
  }

  functionBuilder.register( 'MysteryB', MysteryB );

  return inherit( AbstractFunction, MysteryB, {

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
