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
  var mysteryAImage = require( 'mipmap!FUNCTION_BUILDER/functions/mysteryA.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function MysteryA( options ) {

    options = _.extend( {
      name: 'mysteryA',
      image: mysteryAImage,
      fill: 'rgb( 127, 225, 173 )'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, MysteryA, {

    apply: function( image ) {
      //TODO
      return image;
    }
  } );
} );
