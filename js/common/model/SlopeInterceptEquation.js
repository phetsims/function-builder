// Copyright 2016, University of Colorado Boulder

/**
 * Slope-intercept form of a set of linear functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );

  /**
   * @param {string} inputSymbol - symbol for the input, typically 'x'
   * @param {MathFunction[]} mathFunctions - the set of linear functions, in the order that they are applied
   * @constructor
   */
  function SlopeInterceptEquation( inputSymbol, mathFunctions ) {

    var slope = new RationalNumber( 1, 1 );
    var intercept = new RationalNumber( 0, 1 );

    for ( var i = 0; i < mathFunctions.length; i++ ) {

      var mathFunction = mathFunctions[ i ];

      if ( mathFunction.operatorString === FBSymbols.PLUS ) {
        intercept = intercept.plus( mathFunction.operandProperty.get() );
      }
      else if ( mathFunction.operatorString === FBSymbols.MINUS ) {
        intercept = intercept.minus( mathFunction.operandProperty.get() );
      }
      else if ( mathFunction.operatorString === FBSymbols.TIMES ) {
        slope = slope.times( mathFunction.operandProperty.get() );
        intercept = intercept.times( mathFunction.operandProperty.get() );
      }
      else if ( mathFunction.operatorString === FBSymbols.DIVIDE ) {
        slope = slope.divide( mathFunction.operandProperty.get() );
        intercept = intercept.divide( mathFunction.operandProperty.get() );
      }
      else {
        throw new Error( 'unsupported operator ' + mathFunction.operatorString );
      }
    }

    // @public (read-only)
    this.inputSymbol = inputSymbol; // {string}
    this.slope = slope; // {RationalNumber}
    this.intercept = intercept; // {RationalNumber}
  }

  functionBuilder.register( 'SlopeInterceptEquation', SlopeInterceptEquation );

  return inherit( Object, SlopeInterceptEquation, {

    /**
     * String representation, for debugging use only, do not rely on this format.
     * @returns {string}
     */
    toString: function() {

      var equation = '';

      // slope
      if ( this.slope.valueOf() !== 0 ) {
        if ( this.slope.valueOf() === 1 ) {
          equation = this.inputSymbol;
        }
        else if ( this.slope.isInteger() ) {
          equation = this.slope.valueOf() + this.inputSymbol;
        }
        else {
          equation = '(' + this.slope.numerator + '/' + this.slope.denominator + ')' + this.inputSymbol;
        }
      }

      // intercept
      if ( this.intercept.valueOf() !== 0 ) {

        if ( this.intercept.valueOf() > 0 ) {
          equation = equation + ' ' + FBSymbols.PLUS;
        }
        else {
          equation = equation + ' ' + FBSymbols.MINUS;
        }

        if ( this.intercept.isInteger() ) {
          equation = equation + ' ' + Math.abs( this.intercept.valueOf() );
        }
        else {
          equation = equation + ' ' + Math.abs( this.intercept.numerator ) + '/' + Math.abs( this.intercept.denominator );
        }
      }

      return equation;
    }
  } );
} );
