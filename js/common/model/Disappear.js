// Copyright 2002-2015, University of Colorado Boulder

/**
 * Make the image disappear.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBFunction = require( 'FUNCTION_BUILDER/common/model/FBFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var disappearImage = require( 'mipmap!FUNCTION_BUILDER/functions/disappear.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Disappear( options ) {

    options = _.extend( {
      name: 'disappear',
      image: disappearImage,
      fill: 'rgb( 246, 164, 255 )'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, Disappear, {

    apply: function( card ) {
      return card.clone(); //TODO return null or fully transparent?
    }

  } );
} );
