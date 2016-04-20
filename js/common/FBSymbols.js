// Copyright 2016, University of Colorado Boulder

/**
 * Math symbols used throughout this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );

  // strings
  var xString = require( 'string!FUNCTION_BUILDER/x' );
  var yString = require( 'string!FUNCTION_BUILDER/y' );

  var FBSymbols = {
    X: xString,
    Y: yString,
    DIVIDE: '\u00f7',
    MINUS: '\u2212',
    PLUS: '\u002b',
    TIMES: '\u00d7',
    EQUALS: '\u003d'
  };

  functionBuilder.register( 'FBSymbols', FBSymbols );

  return FBSymbols;
} );
