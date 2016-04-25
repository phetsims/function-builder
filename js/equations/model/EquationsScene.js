// Copyright 2016, University of Colorado Boulder

/**
 * The scene for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Range = require( 'DOT/Range' );
  var Scene = require( 'FUNCTION_BUILDER/common/model/Scene' );

  // constants
  var CARD_NUMBERS_RANGE = new Range( -4, 6 );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function EquationsScene( options ) {

    /**
     * Numbers for the input cards, in the order that they appear in the input carousel.
     * @type {HTMLImageElement[]}
     * @public (read-only)
     */
    this.cardNumbers = [];
    for ( var i = CARD_NUMBERS_RANGE.min; i <= CARD_NUMBERS_RANGE.max; i++ ) {
      this.cardNumbers.push( i );
    }
    //TODO how to add 'x' symbol card, which is unlike the other cards?

    /**
     * Data structures for creating {EquationFunction} instances,
     * in the order that they appear in the function carousel.
     * @type {Object[]}
     * @public (read-only)
     */
    this.functionData = [

      // plus
      {
        labelString: FBSymbols.PLUS,
        apply: function( input, operand ) { return input + operand; },
        options: {
          fill: 'rgb( 246, 203, 144 )',
          pickerColor: 'rgb( 227, 114, 42 )'
        }
      },

      // minus
      {
        labelString: FBSymbols.MINUS,
        apply: function( input, operand ) { return input - operand; },
        options: {
          fill: 'rgb( 152, 231, 156 )',
          pickerColor: 'rgb( 25, 168, 52 )'
        }
      },

      // times
      {
        labelString: FBSymbols.TIMES,
        apply: function( input, operand ) { return input * operand; },
        options: {
          fill: 'rgb( 237, 165, 222 )',
          pickerColor: 'rgb( 223, 17, 213 )',

          // multiplication by zero is not invertible
          isInvertibleWithOperand: function( operand ) { return ( operand !== 0 ); }
        }
      },

      // divide
      {
        labelString: FBSymbols.DIVIDE,
        apply: function( input, operand ) { return input / operand; },
        options: {
          fill: 'rgb( 183, 200, 249 )',
          pickerColor: 'rgb( 14, 89, 218 )',

          // zero is not a valid operand, since division by zero is undefined
          zeroOperandValid: false
        }
      }

      //TODO how to add 'A' and 'B' mystery functions, which are unlike the other functions?
      // A : ( x - 2 ) * 2 : rgb( 28, 191, 167 )
      // B : ( x / 2 ) + 1 : rgb( 252, 241, 157 )
    ];

    Scene.call( this, options );
  }

  functionBuilder.register( 'EquationsScene', EquationsScene );

  return inherit( Scene, EquationsScene );
} );
