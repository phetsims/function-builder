// Copyright 2015-2016, University of Colorado Boulder

/**
 * Rotates 90 degrees clockwise.
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
  var ImageFunction = require( 'FUNCTION_BUILDER/patterns/model/ImageFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var rotate90Image = require( 'mipmap!FUNCTION_BUILDER/functions/rotate90.png' );

  /**
   * @constructor
   */
  function Rotate90() {
    ImageFunction.call( this, new Image( rotate90Image, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } ), {
      fill: 'rgb( 147, 231, 128 )'
    } );
  }

  functionBuilder.register( 'Rotate90', Rotate90 );

  return inherit( ImageFunction, Rotate90, {

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
