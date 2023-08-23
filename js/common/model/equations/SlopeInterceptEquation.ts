// Copyright 2016-2023, University of Colorado Boulder

/**
 * Slope-intercept form of a set of linear functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import functionBuilder from '../../../functionBuilder.js';
import FBSymbols from '../../FBSymbols.js';
import RationalNumber from '../RationalNumber.js';
import MathFunction from '../functions/MathFunction.js';

export default class SlopeInterceptEquation {

  public readonly slope: RationalNumber;
  public readonly intercept: RationalNumber;
  private readonly xSymbol: string;

  /**
   * @param mathFunctions - the set of linear functions, in the order that they are applied
   * @param xSymbol - string to use for input symbol, appears only in toString
   */
  public constructor( mathFunctions: MathFunction[], xSymbol = FBSymbols.X ) {

    let slope = new RationalNumber( 1, 1 );
    let intercept = new RationalNumber( 0, 1 );

    for ( let i = 0; i < mathFunctions.length; i++ ) {

      const mathFunction = mathFunctions[ i ];

      if ( mathFunction.operator === FBSymbols.PLUS ) {
        intercept = intercept.plus( mathFunction.operandProperty.value );
      }
      else if ( mathFunction.operator === FBSymbols.MINUS ) {
        intercept = intercept.minus( mathFunction.operandProperty.value );
      }
      else if ( mathFunction.operator === FBSymbols.TIMES ) {
        slope = slope.times( mathFunction.operandProperty.value );
        intercept = intercept.times( mathFunction.operandProperty.value );
      }
      else if ( mathFunction.operator === FBSymbols.DIVIDE ) {
        slope = slope.divide( mathFunction.operandProperty.value );
        intercept = intercept.divide( mathFunction.operandProperty.value );
      }
      else {
        throw new Error( `unsupported operator ${mathFunction.operator}` );
      }
    }

    this.slope = slope;
    this.intercept = intercept;
    this.xSymbol = xSymbol;
  }

  /**
   * String representation, for debugging and (perhaps) PhET-iO.
   * Note that the logic flow herein is similar to SlopeInterceptEquationNode's constructor,
   * but constructs a string instead of a Node.
   */
  public toString(): string {

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