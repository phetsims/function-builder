// Copyright 2016, University of Colorado Boulder

/**
 * A mathematical function with (optionally) dynamic operand.
 * Can be applied to either a rational number or a MathFunction[].
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AbstractFunction = require( 'FUNCTION_BUILDER/common/model/functions/AbstractFunction' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );

  /**
   * @param {string} operatorString - string representation of the operator
   * @param {function(number,number):number} apply - implementation of the apply function for numbers
   * @param {Object} [options]
   * @constructor
   */
  function MathFunction( operatorString, apply, options ) {

    options = _.extend( {
      operand: 1, // {number} initial value of operandProperty
      operandMutable: true, // {boolean} is the operand mutable?
      operandRange: new Range( -3, 3 ), // {Range|null} optional range of operandProperty
      zeroOperandValid: true // {boolean} is zero a valid operand?
    }, options );

    assert && assert( !options.operandRange || options.operandRange.contains( options.operand ) );
    assert && assert( !( options.operand === 0 && !options.zeroOperandValid ),
      'default value zero is not a valid operand' );

    // @public (read-only)
    this.operatorString = operatorString;
    this.operandMutable = options.operandMutable;
    this.operandRange = options.operandRange;
    this.zeroOperandValid = options.zeroOperandValid;

    // @private
    this._apply = apply;

    // @public
    this.operandProperty = new Property( options.operand ); // {Property.<number>}
    this.operandProperty.lazyLink( function( operand ) {

      // validate operand
      assert && assert( options.operandMutable, 'operand is not mutable' );
      assert && assert( !options.operandRange || options.operandRange.contains( operand ), 'operand out of range: ' + operand );
      assert && assert( !( operand === 0 && !options.zeroOperandValid ), 'zero operand not valid' );
    } );

    AbstractFunction.call( this, options );
  }

  functionBuilder.register( 'MathFunction', MathFunction );

  return inherit( AbstractFunction, MathFunction, {

    // @public
    reset: function() {
      AbstractFunction.prototype.reset.call( this );
      this.operandProperty.reset();
    },

    /**
     * Applies this function.
     *
     * @param {RationalNumber|MathFunction[]} input - rational number or array of MathFunction
     * @returns {RationalNumber|MathFunction[]} output, of same type as input
     * @public
     * @override
     */
    apply: function( input ) {
      if ( input instanceof RationalNumber ) {
        return this._apply( input, this.operandProperty.get() );
      }
      else if ( Array.isArray( input ) ) {
        input.push( this );
        return input;
      }
      else {
        throw new Error( 'unsupported input type' );
      }
    }
  } );
} );
