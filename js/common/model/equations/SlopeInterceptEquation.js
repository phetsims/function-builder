// Copyright 2016-2023, University of Colorado Boulder

/**
 * Slope-intercept form of a set of linear functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../../phet-core/js/merge.js';
import functionBuilder from '../../../functionBuilder.js';
import FBSymbols from '../../FBSymbols.js';
import RationalNumber from '../RationalNumber.js';

export default class SlopeInterceptEquation {

  /**
   * @param {MathFunction[]} mathFunctions - the set of linear functions, in the order that they are applied
   * @param {Object} [options]
   */
  constructor( mathFunctions, options ) {

    options = merge( {
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
        throw new Error( `unsupported operator ${mathFunction.operator}` );
      }
    }

    // @private
    this.xSymbol = options.xSymbol;

    // @public (read-only)
    this.slope = slope; // {RationalNumber}
    this.intercept = intercept; // {RationalNumber}
  }

  /**
   * String representation, for debugging and (perhaps) PhET-iO.
   * Note that the logic flow herein is similar to SlopeInterceptEquationNode's constructor,
   * but constructs a string instead of a Node.
   *
   * @returns {string}
   * @public
   */
  toString() {

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
        equation = `(${this.slope.numerator}/${this.slope.denominator})${this.xSymbol}`;
      }
    }

    // intercept
    if ( this.intercept.valueOf() !== 0 ) {

      if ( this.intercept.valueOf() > 0 ) {
        equation = `${equation} ${FBSymbols.PLUS}`;
      }
      else {
        equation = `${equation} ${FBSymbols.MINUS}`;
      }

      if ( this.intercept.isInteger() ) {
        equation = `${equation} ${Math.abs( this.intercept.valueOf() )}`;
      }
      else {
        equation = `${equation} ${Math.abs( this.intercept.numerator )}/${Math.abs( this.intercept.denominator )}`;
      }
    }

    return equation;
  }
}

functionBuilder.register( 'SlopeInterceptEquation', SlopeInterceptEquation );