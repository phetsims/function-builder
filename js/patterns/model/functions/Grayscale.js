// Copyright 2015-2016, University of Colorado Boulder

/**
 * Creates a grayscale image.
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
  var grayScaleImage = require( 'mipmap!FUNCTION_BUILDER/functions/grayscale.png' );

  /**
   * @constructor
   */
  function Grayscale() {
    ImageFunction.call( this, new Image( grayScaleImage, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } ), {
      fill: 'rgb( 232, 232, 232 )',
      invertible: false // converting to grayscale is lossy
    } );
  }

  functionBuilder.register( 'Grayscale', Grayscale );

  return inherit( ImageFunction, Grayscale, {

    /**
     * Applies this function.
     *
     * @param {HTMLCanvasElement} inputCanvas
     * @returns {HTMLCanvasElement}
     * @public
     * @override
     */
    apply: function( inputCanvas ) {

      var imageData = CanvasUtils.getImageData( inputCanvas );

      // Average the red, green and blue values of each pixel. This drains the color from the image.
      var data = imageData.data;
      for ( var i = 0; i < data.length - 4; i += 4 ) {
        var average = ( data[ i ] + data[ i + 1 ] + data[ i + 2 ] ) / 3;
        data[ i ] = average;
        data[ i + 1 ] = average;
        data[ i + 2 ] = average;
      }

      return CanvasUtils.createCanvasWithImageData( imageData );
    }
  } );
} );
