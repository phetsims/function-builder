// Copyright 2015-2017, University of Colorado Boulder

/**
 * Inverts colors in RGB color space.
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
  const invertRGBImage = require( 'mipmap!FUNCTION_BUILDER/functions/invertRGB.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function InvertRGB( options ) {

    options = options || {};
    options.name = 'InvertRGB';
    options.fill = 'black';

    var iconNode = new Image( invertRGBImage, { scale: FBConstants.PATTERNS_FUNCTION_ICON_SCALE } );

    ImageFunction.call( this, iconNode, options );
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

      var imageData = FBCanvasUtils.getImageData( inputCanvas );

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

      return FBCanvasUtils.createCanvasWithImageData( imageData );
    }
  } );
} );
