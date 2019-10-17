// Copyright 2016-2019, University of Colorado Boulder

/**
 * Minus function.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MathFunction = require( 'FUNCTION_BUILDER/common/model/functions/MathFunction' );
  const merge = require( 'PHET_CORE/merge' );

  /**
   * @param {Object} options
   * @constructor
   */
  function Minus( options ) {

    options = merge( {
      fill: 'rgb( 152, 231, 156 )',
      pickerColor: 'rgb( 25, 168, 52 )'
    }, options );

    MathFunction.call( this,
      FBSymbols.MINUS,
      function( input, operand ) { return input.minus( operand ); },
      options );
  }

  functionBuilder.register( 'Minus', Minus );

  return inherit( MathFunction, Minus );
} );
