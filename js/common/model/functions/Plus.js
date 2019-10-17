// Copyright 2016-2019, University of Colorado Boulder

/**
 * Plus function.
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
  function Plus( options ) {

    options = merge( {
      fill: 'rgb( 246, 203, 144 )',
      pickerColor: 'rgb( 227, 114, 42 )'
    }, options );

    MathFunction.call( this,
      FBSymbols.PLUS,
      function( input, operand ) { return input.plus( operand ); },
      options );
  }

  functionBuilder.register( 'Plus', Plus );

  return inherit( MathFunction, Plus );
} );
