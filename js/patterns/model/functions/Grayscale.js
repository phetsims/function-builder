// Copyright 2015-2017, University of Colorado Boulder

/**
 * Creates a grayscale image.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBCanvasUtils = require( 'FUNCTION_BUILDER/patterns/model/FBCanvasUtils' );
  const FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const Image = require( 'SCENERY/nodes/Image' );
  const ImageFunction = require( 'FUNCTION_BUILDER/common/model/functions/ImageFunction' );
  const inherit = require( 'PHET_CORE/inherit' );

  // images
  const grayScaleImage = require( 'mipmap!FUNCTION_BUILDER/functions/grayscale.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Grayscale( options ) {

    options = options || {};
    options.name = 'Grayscale';
    options.fill = 'rgb( 232, 232, 232 )';
    options.invertible = false; // converting to grayscale is lossy

    const iconNode = new Image( grayScaleImage, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } );

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

      const imageData = FBCanvasUtils.getImageData( inputCanvas );

      // Average the red, green and blue values of each pixel. This drains the color from the image.
      const data = imageData.data;
      for ( let i = 0; i < data.length - 4; i += 4 ) {
        const average = ( data[ i ] + data[ i + 1 ] + data[ i + 2 ] ) / 3;
        data[ i ] = average;
        data[ i + 1 ] = average;
        data[ i + 2 ] = average;
      }

      return FBCanvasUtils.createCanvasWithImageData( imageData );
    }
  } );
} );
