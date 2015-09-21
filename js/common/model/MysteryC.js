// Copyright 2002-2015, University of Colorado Boulder

/**
 * Reflects about the y-axis and rotates 90 degrees clockwise.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBFunction = require( 'FUNCTION_BUILDER/common/model/FBFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var mysteryCImage = require( 'mipmap!FUNCTION_BUILDER/functions/mysteryC.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function MysteryC( options ) {

    options = _.extend( {
      name: 'mysteryC',
      image: mysteryCImage,
      fill: 'rgb( 222, 186, 247 )'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, MysteryC, {

    apply: function( card ) {
      return card.clone(); //TODO
    }
  } );
} );
