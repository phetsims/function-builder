// Copyright 2015-2016, University of Colorado Boulder

/**
 * Inverts colors in RGB color space.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CanvasUtils = require( 'FUNCTION_BUILDER/common/model/CanvasUtils' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var ImageFunction = require( 'FUNCTION_BUILDER/patterns/model/ImageFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var invertRGBImage = require( 'mipmap!FUNCTION_BUILDER/functions/invertRGB.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function InvertRGB( options ) {

    options = _.extend( {}, options, {
      fill: 'black'
    } );

    ImageFunction.call( this, invertRGBImage, options );
  }

  functionBuilder.register( 'InvertRGB', InvertRGB );

  return inherit( ImageFunction, InvertRGB, {

    /**
     * Applies this function.
     * @param {HTMLCanvasElement} inputCanvas
     * @returns {HTMLCanvasElement}
     * @public
     * @override
     */
    apply: function( inputCanvas ) {

      var imageData = CanvasUtils.getImageData( inputCanvas );

      // invert colors for non-transparent pixels
      var data = imageData.data;
      for ( var i = 0; i < data.length; i += 4 ) {
        if ( data[ i + 3 ] !== 0 ) {
          data[ i ] = 255 - data[ i ];
          data[ i + 1 ] = 255 - data[ i + 1 ];
          data[ i + 2 ] = 255 - data[ i + 2 ];
          data[ i + 3 ] = 255;
        }
      }

      return CanvasUtils.createCanvasWithImageData( imageData );
    }
  } );
} );
