// Copyright 2002-2015, University of Colorado Boulder

/**
 * Creates a 2x2 grid of the input card, using 4 colors (#FF51E7, #06FFAF, #FAFF69, #5871FF).
 * All non-transparent pixels in the input are mapped to one of the 4 colors. Each background is one of the 4 colors.
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

    //TODO this function needs to know the card dimensions

    options = _.extend( {
      name: 'warhol',
      image: warholImage,
      fill: 'rgb( 0, 222, 224 )'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, Warhol, {

    apply: function( card ) {
      return card.clone(); //TODO
    }
  } );
} );
