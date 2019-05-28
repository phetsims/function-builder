// Copyright 2016, University of Colorado Boulder

/**
 * For lack of a better name, this equation format was referred to as the "helpful" format in design meetings.
 * It is PhET-specific, and does not correspond to a standard mathematical format. The intent is to create a clear
 * association with the functions that are in the builder, and provide a "bridge" to the slope-intercept format.
 * For details, see the format specification in:
 * https://github.com/phetsims/function-builder/blob/master/doc/equation-formats.md
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Divide = require( 'FUNCTION_BUILDER/common/model/functions/Divide' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Plus = require( 'FUNCTION_BUILDER/common/model/functions/Plus' );
  var RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Times = require( 'FUNCTION_BUILDER/common/model/functions/Times' );

  // constants
  var ZERO = RationalNumber.withInteger( 0 );

  /**
   * @param {MathFunction[]} mathFunctions - the set of linear functions, in the order that they are applied
   * @param {Object} [options]
   * @constructor
   */
  function HelpfulEquation( mathFunctions, options ) {

    options = _.extend( {
      xSymbol: FBSymbols.X // {string} string to use for input symbol, appears only in toString
    }, options );

    var stack = []; // {MathFunction[]}

    // local vars to improve readability
    var currentFunction = null; // {MathFunction}
    var currentOperator = null; // {string}
    var currentOperand = null; // {number}
    var previousFunction = null; // {MathFunction}
    var previousOperator = null; // {string}
    var previousOperand = null; // {number}
    var rationalNumber = ZERO; // {RationalNumber}

    for ( var i = 0; i < mathFunctions.length; i++ ) {

      currentFunction = mathFunctions[ i ];
      currentOperator = currentFunction.operator;
      currentOperand = currentFunction.operandProperty.get();

      if ( currentOperator === FBSymbols.PLUS || currentOperator === FBSymbols.MINUS ) {

        if ( currentOperand === 0 ) {
          // ignore plus or minus zero
        }
        else if ( ( stack.length !== 0 ) && ( previousOperator === FBSymbols.PLUS || previousOperator === FBSymbols.MINUS ) ) {

          // collapse adjacent plus and minus
          stack.pop();

          rationalNumber = currentFunction.apply( previousFunction.apply( ZERO ) ); // {RandomNumber}
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
        throw new Error( 'invalid operator: ' + currentOperator );
      }

      if ( stack.length > 0 ) {
        previousFunction = stack[ stack.length - 1 ];
        previousOperator = currentOperator;
        previousOperand = previousFunction.operandProperty.get();
      }
      else {
        previousFunction = null;
        previousOperator = null;
        previousOperand = null;
      }
    }

    // @private
    this.xSymbol = options.xSymbol; // {string}

    // @public
    this.mathFunctions = stack; // {MathFunction[]}
  }

  functionBuilder.register( 'HelpfulEquation', HelpfulEquation );

  return inherit( Object, HelpfulEquation, {

    /**
     * String representation, for debugging. Do not rely on format!
     * Note that the logic flow herein is similar to HelpfulEquationNode's constructor, but constructs a string
     * instead of a Node, and doesn't check logic in case we need to see a malformed equation.
     *
     * @returns {string}
     * @public
     */
    toString: function() {

      var equation = null; // {string}
      var i = 0; // {number}

      if ( this.mathFunctions.length === 0 ) {

        // x
        equation = this.xSymbol;
      }
      else {

        // local vars to improve readability
        var currentFunction = null; // {MathFunction}
        var currentOperator = null; // {string}
        var currentOperand = null; // {number}

        equation = this.xSymbol;

        for ( i = 0; i < this.mathFunctions.length; i++ ) {

          currentFunction = this.mathFunctions[ i ];
          currentOperator = currentFunction.operator;
          currentOperand = currentFunction.operandProperty.get().valueOf();

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
            throw new Error( 'invalid operator: ' + currentOperator );
          }
        }
      }

      return equation;
    }
  } );
} );
