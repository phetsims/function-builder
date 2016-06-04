// Copyright 2016, University of Colorado Boulder

/**
 * Divide function.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathFunction = require( 'FUNCTION_BUILDER/common/model/functions/MathFunction' );

  /**
   * @param {Object} options
   * @constructor
   */
  function Divide( options ) {

    options = _.extend( {
      fill: 'rgb( 183, 200, 249 )',
      pickerColor: 'rgb( 14, 89, 218 )'
    }, options );
    options.zeroOperandValid = false; // zero is not a valid operand, since division by zero is undefined

    MathFunction.call( this,
      FBSymbols.DIVIDE,
      function( input, operand ) { return input.divide( operand ); },
      options );
  }

  functionBuilder.register( 'Divide', Divide );

  return inherit( MathFunction, Divide );
} );
