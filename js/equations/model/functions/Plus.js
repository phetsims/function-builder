// Copyright 2016, University of Colorado Boulder

/**
 * Plus function.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathFunction = require( 'FUNCTION_BUILDER/common/model/MathFunction' );

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
