// Copyright 2015-2017, University of Colorado Boulder

/**
 * Creates a grayscale image.
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
  var grayScaleImage = require( 'mipmap!FUNCTION_BUILDER/functions/grayscale.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Grayscale( options ) {

    options = options || {};
    options.name = 'Grayscale';
    options.fill = 'rgb( 232, 232, 232 )';
    options.invertible = false; // converting to grayscale is lossy

    var iconNode = new Image( grayScaleImage, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } );

    ImageFunction.call( this, iconNode, options );
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

      var imageData = FBCanvasUtils.getImageData( inputCanvas );

      // Average the red, green and blue values of each pixel. This drains the color from the image.
      var data = imageData.data;
      for ( var i = 0; i < data.length - 4; i += 4 ) {
        var average = ( data[ i ] + data[ i + 1 ] + data[ i + 2 ] ) / 3;
        data[ i ] = average;
        data[ i + 1 ] = average;
        data[ i + 2 ] = average;
      }

      return FBCanvasUtils.createCanvasWithImageData( imageData );
    }
  } );
} );
