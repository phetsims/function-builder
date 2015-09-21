// Copyright 2002-2015, University of Colorado Boulder

/**
 * Creates a grayscale image.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBFunction = require( 'FUNCTION_BUILDER/common/model/FBFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var grayScaleImage = require( 'mipmap!FUNCTION_BUILDER/functions/grayscale.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Grayscale( options ) {

    options = _.extend( {
      name: 'grayscale',
      image: grayScaleImage,
      fill: 'rgb( 232, 232, 232 )'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, Grayscale, {

    apply: function( image ) {
      //TODO
      return image;
    }
  } );
} );
