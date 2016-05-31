// Copyright 2016, University of Colorado Boulder

//TODO better name for PhetEquation
/**
 * PhET-specific format of the equation that corresponds to functions in the builder.
 * See format specification in function-builder/doc/equation-formats.md
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Divide = require( 'FUNCTION_BUILDER/equations/model/functions/Divide' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Plus = require( 'FUNCTION_BUILDER/equations/model/functions/Plus' );
  var RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Times = require( 'FUNCTION_BUILDER/equations/model/functions/Times' );

  // constants
  var ZERO = new RationalNumber( 0, 1 );

  /**
   * @param {MathFunction[]} mathFunctions - the set of linear functions, in the order that they are applied
   * @param {Object} [options]
   * @constructor
   */
  function PhetEquation( mathFunctions, options ) {

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
      currentOperator = currentFunction.operatorString;
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
              operandRange: null
            } ) );
          }
        }
        else {
          stack.push( currentFunction );
        }
      }
      else if ( currentOperator === FBSymbols.TIMES ) {

        if ( currentOperand === 0 ) {

          // times zero clears the stack
          stack = [];
          stack.push( new Times( {
            operand: 0,
            operandRange: null
          } ) );

        }
        else if ( stack.length === 0 ) {
          stack.push( currentFunction );
        }
        else if ( previousOperator === FBSymbols.TIMES ) {

          // collapse adjacent times
          stack.pop();
          stack.push( new Times( {
            operand: previousOperand * currentOperand,
            operandRange: null
          } ) );
        }
        else if ( ( previousOperator === FBSymbols.DIVIDE ) && ( previousOperand === currentOperand ) ) {

          // adjacent times and divide that evaluates to 1
          stack.pop();
        }
        else {
          stack.push( currentFunction );
        }
      }
      else if ( currentOperator === FBSymbols.DIVIDE ) {
        assert && assert( currentOperand !== 0, 'divide by zero is not supported' );

        if ( stack.length === 0 ) {
          stack.push( currentFunction );
        }
        else if ( previousOperator === FBSymbols.DIVIDE ) {

          // collapse adjacent divide
          stack.pop();
          stack.push( new Divide( {
            operand: previousOperand * currentOperand,
            operandRange: null
          } ) );
        }
        else if ( ( previousOperator === FBSymbols.TIMES ) && ( previousOperand === currentOperand ) ) {

          // adjacent times and divide that evaluates to 1
          stack.pop();
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

  functionBuilder.register( 'PhetEquation', PhetEquation );

  return inherit( Object, PhetEquation, {

    /**
     * String representation, for debugging and PhET-iO.
     *
     * @returns {string}
     */
    toString: function() {

      var equation = null; // {string}
      var i = 0; // {number}

      if ( this.mathFunctions.length === 0 ) {

        // x
        equation = this.xSymbol;
      }
      else if ( this.mathFunctions[ 0 ].operatorString === FBSymbols.TIMES &&
                this.mathFunctions[ 0 ].operandProperty.get().valueOf() === 0 ) {

        // constant
        var value = ZERO;
        for ( i = 0; i < this.mathFunctions.length; i++ ) {
          value = this.mathFunctions[ i ].apply( value );
        }
        equation = '' + value.valueOf();
      }
      else {

        var currentFunction = null; // {MathFunction}
        var currentOperator = null; // {string}
        var currentOperand = null; // {number}
        var previousOperator = null; // {string}

        equation = this.xSymbol;

        for ( i = 0; i < this.mathFunctions.length; i++ ) {

          currentFunction = this.mathFunctions[ i ];
          currentOperator = currentFunction.operatorString;
          currentOperand = currentFunction.operandProperty.get().valueOf();

          if ( currentOperator === FBSymbols.PLUS ) {
            assert && assert(
              !previousOperator || ( previousOperator !== FBSymbols.PLUS && previousOperator !== FBSymbols.MINUS ),
              'adjacent plus and minus should have been collapsed' );

            // eg: 2x + 3
            equation = StringUtils.format( '{0} {1} {2}', equation,
              ( currentOperand >= 0 ? FBSymbols.PLUS : FBSymbols.MINUS ), Math.abs( currentOperand ) );
          }
          else if ( currentOperator === FBSymbols.MINUS ) {
            assert && assert(
              !previousOperator || ( previousOperator !== FBSymbols.PLUS && previousOperator !== FBSymbols.MINUS ),
              'adjacent plus and minus should have been collapsed' );

            // eg: 2x - 3
            equation = StringUtils.format( '{0} {1} {2}', equation,
              ( currentOperand >= 0 ? FBSymbols.MINUS : FBSymbols.PLUS ), Math.abs( currentOperand ) );
          }
          else if ( currentOperator === FBSymbols.TIMES ) {
            assert && assert( currentOperand !== 0, 'times zero should have been factored out' );
            assert && assert( !previousOperator || previousOperator !== FBSymbols.TIMES,
              'adjacent times should have been collapsed' );

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
            assert && assert( currentOperand !== 0, 'divide by zero is not supported' );
            assert && assert( !previousOperator || previousOperator !== FBSymbols.DIVIDE,
              'adjacent divide should have been collapsed' );

            if ( equation !== '0' ) {

              // eq: [2x + 1]/3
              equation = StringUtils.format( '[{0}]/{1}', equation, currentOperand );
            }
          }
          else {
            throw new Error( 'invalid operator: ' + currentOperator );
          }

          previousOperator = currentOperator;
        }
      }

      return equation;
    }
  } );
} );
