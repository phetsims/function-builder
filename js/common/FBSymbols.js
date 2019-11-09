// Copyright 2016-2019, University of Colorado Boulder

/**
 * Math symbols used throughout this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );

  // strings
  const xString = require( 'string!FUNCTION_BUILDER/x' );
  const yString = require( 'string!FUNCTION_BUILDER/y' );

  const FBSymbols = {
    X: xString,
    Y: yString,
    DIVIDE: MathSymbols.DIVIDE,
    MINUS: MathSymbols.MINUS,
    PLUS: MathSymbols.PLUS,
    TIMES: MathSymbols.TIMES,
    EQUAL_TO: MathSymbols.EQUAL_TO
  };

  functionBuilder.register( 'FBSymbols', FBSymbols );

  return FBSymbols;
} );
