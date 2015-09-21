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
  var warholImage = require( 'mipmap!FUNCTION_BUILDER/functions/warhol.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Warhol( options ) {

    options = _.extend( {
      name: 'warhol',
      image: warholImage,
      fill: 'rgb( 0, 222, 224 )'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, Warhol, {

    apply: function( image ) {
      //TODO
      return image;
    }
  } );
} );
