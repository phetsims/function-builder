// Copyright 2016, University of Colorado Boulder

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

  /**
   * @param {Object} options
   * @constructor
   */
  function Plus( options ) {

    options = _.extend( {
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
