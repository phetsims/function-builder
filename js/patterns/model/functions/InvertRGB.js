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
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ImageFunction = require( 'FUNCTION_BUILDER/common/model/ImageFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var invertRGBImage = require( 'mipmap!FUNCTION_BUILDER/functions/invertRGB.png' );

  /**
   * @constructor
   */
  function InvertRGB() {
    ImageFunction.call( this, new Image( invertRGBImage, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } ), {
      fill: 'black'
    } );
  }

  functionBuilder.register( 'InvertRGB', InvertRGB );

  return inherit( ImageFunction, InvertRGB, {

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
