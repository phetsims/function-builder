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
    var previousFunction = null; // {MathFunction}
    var currentOperator = null; // {string}
    var previousOperator = null; // {string}
    var value = 0; // {number}

    for ( var i = 0; i < mathFunctions.length; i++ ) {

      currentFunction = mathFunctions[ i ];
      currentOperator = currentFunction.operatorString;

      if ( currentOperator === FBSymbols.PLUS || currentOperator === FBSymbols.MINUS ) {

        if ( currentFunction.operandProperty.get() === 0 ) {
          // ignore plus or minus zero
        }
        else if ( stack.length !== 0 && ( previousOperator === FBSymbols.PLUS || previousOperator === FBSymbols.MINUS ) ) {

          // collapse adjacent plus and minus
          stack.pop();

          value = currentFunction.apply( previousFunction.apply( ZERO ) ); // {RandomNumber}
          if ( value.valueOf() !== 0 ) {
            stack.push( new Plus( {
              operand: value,
              operandRange: null
            } ) );
          }
        }
        else {
          stack.push( currentFunction );
        }
      }
      else if ( currentOperator === FBSymbols.TIMES ) {

        if ( currentFunction.operandProperty.get() === 0 ) {

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
            operand: previousFunction.operandProperty.get() * currentFunction.operandProperty.get(),
            operandRange: null
          } ) );
        }
        else if ( previousOperator === FBSymbols.DIVIDE && ( previousFunction.operandProperty.get() === currentFunction.operandProperty.get() ) ) {

          // adjacent times and divide that evaluates to 1
          stack.pop();
        }
        else {
          stack.push( currentFunction );
        }
      }
      else if ( currentOperator === FBSymbols.DIVIDE ) {
        assert && assert( currentFunction.operandProperty.get() !== 0, 'division by zero is not supported' );

        if ( stack.length === 0 ) {
          stack.push( currentFunction );
        }
        else if ( previousOperator === FBSymbols.DIVIDE ) {

          // collapse adjacent divide
          stack.pop();
          stack.push( new Divide( {
            operand: previousFunction.operandProperty.get() * currentFunction.operandProperty.get(),
            operandRange: null
          } ) );
        }
        else if ( previousOperator === FBSymbols.TIMES && ( previousFunction.operandProperty.get() === currentFunction.operandProperty.get() ) ) {

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
      }
      else {
        previousFunction = null;
        previousOperator = null;
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
                this.mathFunctions[ 0 ].operandProperty.get() === 0 ) {

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

        equation = this.xSymbol;

        for ( i = 0; i < this.mathFunctions.length; i++ ) {

          currentFunction = this.mathFunctions[ i ];
          currentOperator = currentFunction.operatorString;
          currentOperand = currentFunction.operandProperty.get();

          if ( currentOperator === FBSymbols.PLUS ) {

              // eg: 2x + 3
              equation = StringUtils.format( '{0} {1} {2}', equation,
                ( currentOperand >= 0 ? FBSymbols.PLUS : FBSymbols.MINUS ), currentOperand );
          }
          else if ( currentOperator === FBSymbols.MINUS ) {

              // eg: 2x - 3
              equation = StringUtils.format( '{0} {1} {2}', equation,
                ( currentOperand >= 0 ? FBSymbols.MINUS : FBSymbols.PLUS ), currentOperand );
          }
          else if ( currentOperator === FBSymbols.TIMES ) {
            assert && assert( currentOperand !== 0, 'times zero should have been factored out in constructor' );
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
