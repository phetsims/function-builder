// Copyright 2002-2015, University of Colorado Boulder

/**
 * Reflects about the x axis.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBFunction = require( 'FUNCTION_BUILDER/common/model/FBFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var mysteryBImage = require( 'mipmap!FUNCTION_BUILDER/functions/mysteryB.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function MysteryB( options ) {

    options = _.extend( {
      name: 'mysteryB',
      image: mysteryBImage,
      fill: 'rgb( 249, 144, 99 )'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, MysteryB, {

    apply: function( image ) {
      //TODO
      return image;
    }
  } );
} );
