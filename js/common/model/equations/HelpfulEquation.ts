// Copyright 2016-2023, University of Colorado Boulder

/**
 * For lack of a better name, this equation format was referred to as the "helpful" format in design meetings.
 * It is PhET-specific, and does not correspond to a standard mathematical format. The intent is to create a clear
 * association with the functions that are in the builder, and provide a "bridge" to the slope-intercept format.
 * For details, see the format specification in:
 * https://github.com/phetsims/function-builder/blob/main/doc/equation-formats.md
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../../phet-core/js/merge.js';
import StringUtils from '../../../../../phetcommon/js/util/StringUtils.js';
import functionBuilder from '../../../functionBuilder.js';
import FBSymbols from '../../FBSymbols.js';
import Divide from '../functions/Divide.js';
import Plus from '../functions/Plus.js';
import Times from '../functions/Times.js';
import RationalNumber from '../RationalNumber.js';

// constants
const ZERO = RationalNumber.withInteger( 0 );

export default class HelpfulEquation {

  /**
   * @param {MathFunction[]} mathFunctions - the set of linear functions, in the order that they are applied
   * @param {Object} [options]
   */
  constructor( mathFunctions, options ) {

    options = merge( {
      xSymbol: FBSymbols.X // {string} string to use for input symbol, appears only in toString
    }, options );

    const stack = []; // {MathFunction[]}

    let previousFunction = null; // {MathFunction|null}

    mathFunctions.forEach( currentFunction => {

      // to improve readability
      const currentOperator = currentFunction.operator;
      const currentOperand = currentFunction.operandProperty.value;
      const previousOperator = previousFunction ? previousFunction.operator : null;
      const previousOperand = previousFunction ? previousFunction.operandProperty.value : null;

      if ( currentOperator === FBSymbols.PLUS || currentOperator === FBSymbols.MINUS ) {

        if ( currentOperand === 0 ) {
          // ignore plus or minus zero
        }
        else if ( ( stack.length !== 0 ) && ( previousOperator === FBSymbols.PLUS || previousOperator === FBSymbols.MINUS ) ) {

          // collapse adjacent plus and minus
          stack.pop();

          const rationalNumber = currentFunction.applyFunction( previousFunction.applyFunction( ZERO ) ); // {RandomNumber}
          if ( rationalNumber.valueOf() !== 0 ) {
            stack.push( new Plus( {
              operand: rationalNumber.valueOf(),
              operandRange: null // disable range checking
            } ) );
          }
        }
        else {
          stack.push( currentFunction );
        }
      }
      else if ( currentOperator === FBSymbols.TIMES ) {

        if ( previousOperator === FBSymbols.TIMES ) {

          // collapse adjacent times
          stack.pop();
          stack.push( new Times( {
            operand: previousOperand * currentOperand,
            operandRange: null
          } ) );
        }
        else {
          stack.push( currentFunction );
        }
      }
      else if ( currentOperator === FBSymbols.DIVIDE ) {
        assert && assert( currentOperand !== 0, 'divide by zero is not supported' );

        if ( previousOperator === FBSymbols.DIVIDE ) {

          // collapse adjacent divide
          stack.pop();
          stack.push( new Divide( {
            operand: previousOperand * currentOperand,
            operandRange: null
          } ) );
        }
        else {
          stack.push( currentFunction );
        }
      }
      else {
        throw new Error( `invalid operator: ${currentOperator}` );
      }

      if ( stack.length > 0 ) {
        previousFunction = stack[ stack.length - 1 ];
      }
      else {
        previousFunction = null;
      }
    } );

    // @private
    this.xSymbol = options.xSymbol; // {string}

    // @public
    this.mathFunctions = stack; // {MathFunction[]}
  }

  /**
   * String representation, for debugging. Do not rely on format!
   * Note that the logic flow herein is similar to HelpfulEquationNode's constructor, but constructs a string
   * instead of a Node, and doesn't check logic in case we need to see a malformed equation.
   *
   * @returns {string}
   * @public
   */
  toString() {

    let equation = null; // {string}
    let i = 0; // {number}

    if ( this.mathFunctions.length === 0 ) {

      // x
      equation = this.xSymbol;
    }
    else {

      // local vars to improve readability
      let currentFunction = null; // {MathFunction}
      let currentOperator = null; // {string}
      let currentOperand = null; // {number}

      equation = this.xSymbol;

      for ( i = 0; i < this.mathFunctions.length; i++ ) {

        currentFunction = this.mathFunctions[ i ];
        currentOperator = currentFunction.operator;
        currentOperand = currentFunction.operandProperty.value.valueOf();

        if ( currentOperator === FBSymbols.PLUS ) {

          // eg: 2x + 3
          equation = StringUtils.format( '{0} {1} {2}', equation,
            ( currentOperand >= 0 ? FBSymbols.PLUS : FBSymbols.MINUS ), Math.abs( currentOperand ) );
        }
        else if ( currentOperator === FBSymbols.MINUS ) {

          // eg: 2x - 3
          equation = StringUtils.format( '{0} {1} {2}', equation,
            ( currentOperand >= 0 ? FBSymbols.MINUS : FBSymbols.PLUS ), Math.abs( currentOperand ) );
        }
        else if ( currentOperator === FBSymbols.TIMES ) {
          if ( equation === this.xSymbol ) {

            // eg: 3x
            equation = StringUtils.format( '{0}{1}', currentOperand, equation );
          }
          else {

            // eg: 2(x + 2)
            equation = StringUtils.format( '{0}({1})', currentOperand, equation );
          }
        }
        else if ( currentOperator === FBSymbols.DIVIDE ) {
          if ( equation !== '0' ) {

            // eq: [2x + 1]/3
            // square brackets denote a numerator
            equation = StringUtils.format( '[{0}]/{1}', equation, currentOperand );
          }
        }
        else {
          throw new Error( `invalid operator: ${currentOperator}` );
        }
      }
    }

    return equation;
  }
}

functionBuilder.register( 'HelpfulEquation', HelpfulEquation );