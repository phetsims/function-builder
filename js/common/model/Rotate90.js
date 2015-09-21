// Copyright 2002-2015, University of Colorado Boulder

/**
 * Rotates 90 degrees clockwise.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBFunction = require( 'FUNCTION_BUILDER/common/model/FBFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var rotate90Image = require( 'mipmap!FUNCTION_BUILDER/functions/rotate90.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Rotate90( options ) {

    options = _.extend( {
      name: 'rotate90',
      image: rotate90Image,
      fill: 'rgb( 147, 231, 128 )'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, Rotate90, {

    apply: function( card ) {
      return card.clone(); //TODO
    }
  } );
} );
