// Copyright 2016, University of Colorado Boulder

/**
 * Various utility functions for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );

  var FBUtils = {

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
      return FBUtils.hasOwnProperties( object, [
        'top',    // top color for vertical gradient
        'middle', // middle color for vertical gradient
        'bottom', // bottom color for vertical gradient
        'ends'    // color for builder ends
      ] );
    },

    // global created by BigRational.js preload, encapsulated here
    createBigRational: bigRat
  };

  functionBuilder.register( 'FBUtils', FBUtils );

  return FBUtils;
} );
