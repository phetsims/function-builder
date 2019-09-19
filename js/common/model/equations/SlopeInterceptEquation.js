// Copyright 2016, University of Colorado Boulder

/**
 * Slope-intercept form of a set of linear functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );

  /**
   * @param {MathFunction[]} mathFunctions - the set of linear functions, in the order that they are applied
   * @param {Object} [options]
   * @constructor
   */
  function SlopeInterceptEquation( mathFunctions, options ) {

    options = _.extend( {
      xSymbol: FBSymbols.X // {string} string to use for input symbol, appears only in toString
    }, options );

    let slope = new RationalNumber( 1, 1 );
    let intercept = new RationalNumber( 0, 1 );

    for ( let i = 0; i < mathFunctions.length; i++ ) {

      const mathFunction = mathFunctions[ i ];

      if ( mathFunction.operator === FBSymbols.PLUS ) {
        intercept = intercept.plus( mathFunction.operandProperty.get() );
      }
      else if ( mathFunction.operator === FBSymbols.MINUS ) {
        intercept = intercept.minus( mathFunction.operandProperty.get() );
      }
      else if ( mathFunction.operator === FBSymbols.TIMES ) {
        slope = slope.times( mathFunction.operandProperty.get() );
        intercept = intercept.times( mathFunction.operandProperty.get() );
      }
      else if ( mathFunction.operator === FBSymbols.DIVIDE ) {
        slope = slope.divide( mathFunction.operandProperty.get() );
        intercept = intercept.divide( mathFunction.operandProperty.get() );
      }
      else {
        throw new Error( 'unsupported operator ' + mathFunction.operator );
      }
    }

    // @private
    this.xSymbol = options.xSymbol;

    // @public (read-only)
    this.slope = slope; // {RationalNumber}
    this.intercept = intercept; // {RationalNumber}
  }

  functionBuilder.register( 'SlopeInterceptEquation', SlopeInterceptEquation );

  return inherit( Object, SlopeInterceptEquation, {

    /**
     * String representation, for debugging and (perhaps) PhET-iO.
     * Note that the logic flow herein is similar to SlopeInterceptEquationNode's constructor,
     * but constructs a string instead of a Node.
     *
     * @returns {string}
     * @public
     */
    toString: function() {

      let equation = '';

      // slope
      if ( this.slope.valueOf() !== 0 ) {
        if ( this.slope.valueOf() === 1 ) {
          equation = this.xSymbol;
        }
        else if ( this.slope.isInteger() ) {
          equation = this.slope.valueOf() + this.xSymbol;
        }
        else {
          equation = '(' + this.slope.numerator + '/' + this.slope.denominator + ')' + this.xSymbol;
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
