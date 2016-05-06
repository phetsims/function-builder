// Copyright 2015-2016, University of Colorado Boulder

/**
 * Rotates 180 degrees.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CanvasUtils = require( 'FUNCTION_BUILDER/common/model/CanvasUtils' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ImageFunction = require( 'FUNCTION_BUILDER/common/model/ImageFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var rotate180Image = require( 'mipmap!FUNCTION_BUILDER/functions/rotate180.png' );

  /**
   * @constructor
   */
  function Rotate180() {
    ImageFunction.call( this, new Image( rotate180Image, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } ), {
      fill: 'rgb( 147, 231, 128 )'
    } );
  }

  functionBuilder.register( 'Rotate180', Rotate180 );

  return inherit( ImageFunction, Rotate180, {

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

      // Rotate 180 degrees
      context.translate( outputCanvas.width, outputCanvas.height );
      context.rotate( Math.PI );

      // Draw the input canvas to the output canvas
      context.drawImage( inputCanvas, 0, 0 );

      return outputCanvas;
    }
  } );
} );
