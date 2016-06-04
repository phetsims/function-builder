// Copyright 2016, University of Colorado Boulder

/**
 * Minus function.
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
  function Minus( options ) {

    options = _.extend( {
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
