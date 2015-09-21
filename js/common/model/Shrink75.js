// Copyright 2002-2015, University of Colorado Boulder

/**
 * Shrinks by 75%.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBFunction = require( 'FUNCTION_BUILDER/common/model/FBFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

  // images
  var shrink75Image = require( 'mipmap!FUNCTION_BUILDER/functions/shrink75.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Shrink75( options ) {

    options = _.extend( {
      name: 'shrink75',
      image: shrink75Image,
      fill: 'rgb( 250, 186, 75 )'
    }, options );

    FBFunction.call( this, options );
  }

  return inherit( FBFunction, Shrink75, {

    apply: function( image ) {
      //TODO
      return image;
    }
  } );
} );
