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
  var MathSymbols = require( 'SCENERY_PHET/MathSymbols' );

  // strings
  var xString = require( 'string!FUNCTION_BUILDER/x' );
  var yString = require( 'string!FUNCTION_BUILDER/y' );

  var FBSymbols = {
    X: xString,
    Y: yString,
    DIVIDE: MathSymbols.DIVIDE,
    MINUS: MathSymbols.MINUS,
    PLUS: MathSymbols.PLUS,
    TIMES: MathSymbols.TIMES,
    EQUAL_TO: MathSymbols.EQUAL_TO //TODO rename EQUAL_TO
  };

  functionBuilder.register( 'FBSymbols', FBSymbols );

  return FBSymbols;
} );
