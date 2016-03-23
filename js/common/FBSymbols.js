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

  var FBSymbols = {
    DIVIDE: '\u00f7',
    MINUS: '\u2212',
    PLUS: '\u002b',
    TIMES: '\u00d7'
  };

  functionBuilder.register( 'FBSymbols', FBSymbols );

  return FBSymbols;
} );
