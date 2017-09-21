// Copyright 2015-2017, University of Colorado Boulder

/**
 * Rotates 180 degrees.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBCanvasUtils = require( 'FUNCTION_BUILDER/patterns/model/FBCanvasUtils' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ImageFunction = require( 'FUNCTION_BUILDER/common/model/functions/ImageFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var rotate180Image = require( 'mipmap!FUNCTION_BUILDER/functions/rotate180.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Rotate180( options ) {

    options = options || {};
    options.name = 'Rotate180';
    options.fill = 'rgb( 147, 231, 128 )';

    var iconNode = new Image( rotate180Image, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } );

    ImageFunction.call( this, iconNode, options );
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
      var outputCanvas = FBCanvasUtils.createCanvas( inputCanvas.width, inputCanvas.height );
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
