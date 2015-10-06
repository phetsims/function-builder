// Copyright 2002-2015, University of Colorado Boulder

/**
 * Chops the image into 4 quadrants and shifts them clockwise.
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

    //TODO this function needs to know the card dimensions

    options = _.extend( {
      name: 'mysteryA',
      image: mysteryAImage,
      fill: 'rgb( 127, 225, 173 )'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, MysteryA, {

    apply: function( card ) {
      return card.clone(); //TODO
    }
  } );
} );
