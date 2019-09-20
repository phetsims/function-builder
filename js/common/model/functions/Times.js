// Copyright 2016-2019, University of Colorado Boulder

/**
 * Times function.
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
  function Times( options ) {

    options = _.extend( {
      fill: 'rgb( 237, 165, 222 )',
      pickerColor: 'rgb( 223, 17, 213 )'
    }, options );

    MathFunction.call( this,
      FBSymbols.TIMES,
      function( input, operand ) { return input.times( operand ); },
      options );
  }

  functionBuilder.register( 'Times', Times );

  return inherit( MathFunction, Times, {

    /**
     * Is this function invertible for the current value of its operand?
     * Multiplication by zero is not invertible, since division by zero is undefined.
     *
     * @public
     * @override
     */
    getInvertible: function() {
      return ( this.operandProperty.get() !== 0 );
    }
  } );
} );
