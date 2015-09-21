// Copyright 2002-2015, University of Colorado Boulder

/**
 * TODO
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBFunction = require( 'FUNCTION_BUILDER/common/model/FBFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var mirrorImage = require( 'mipmap!FUNCTION_BUILDER/functions/mirror.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Mirror( options ) {

    options = _.extend( {
      name: 'mirror',
      image: mirrorImage,
      fill: 'rgb( 128, 197, 237 )'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, Mirror, {

    apply: function( image ) {
      //TODO
      return image;
    }
  } );
} );
