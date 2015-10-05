// Copyright 2002-2015, University of Colorado Boulder

/**
 * Inverts colors in RGB color space.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBFunction = require( 'FUNCTION_BUILDER/common/model/FBFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var invertRGBImage = require( 'mipmap!FUNCTION_BUILDER/functions/invertRGB.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function InvertRGB( options ) {

    options = _.extend( {
      name: 'invertRGB',
      image: invertRGBImage,
      fill: 'black'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, InvertRGB, {

    apply: function( card ) {

      //// invert colors
      //var data = imageData.data;
      //for ( var i = 0; i < data.length; i += 4 ) {
      //  data[ i ] = 255 - data[ i ];
      //  data[ i + 1 ] = 255 - data[ i + 1 ];
      //  data[ i + 2 ] = 255 - data[ i + 2 ];
      //  data[ i + 3 ] = 255;
      //}

      return card.clone(); //TODO
    }
  } );
} );
