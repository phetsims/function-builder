// Copyright 2016, University of Colorado Boulder

/**
 * Various utility functions for this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );

  var FBUtils = {

    //TODO generally useful?
    /**
     * Does an object have a set of properties? Use this to verify duck typing.
     *
     * @param {*} object
     * @param {string[]} properties
     * @returns {boolean}
     */
    hasOwnProperties: function( object, properties ) {
      return ( _.difference( properties, _.keys( object ) ).length === 0 );
    },

    /**
     * Is an object a builder color scheme? Use this to verify duck typing.
     *
     * @param {*} object
     * @returns {boolean}
     */
    isaBuilderColorScheme: function( object ) {
      return FBUtils.hasOwnProperties( object, [ 'top', 'middle', 'bottom', 'ends' ] );
    }
  };

  functionBuilder.register( 'FBUtils', FBUtils );

  return FBUtils;
} );
