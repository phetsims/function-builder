// Copyright 2016, University of Colorado Boulder

/**
 * A mathematical function with dynamic operand.
 * Can be applied to either a rational number or a mathematical equation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AbstractFunction = require( 'FUNCTION_BUILDER/common/model/AbstractFunction' );
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
      operandRange: new Range( -3, 3 ), // {Range} range of operandProperty
      zeroOperandValid: true // {boolean} is zero a valid operand?
    }, options );

    assert && assert( options.operandRange.contains( options.operand ) );
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
    this.operandProperty = new Property( options.operand );
    this.operandProperty.lazyLink( function( operand ) {

      // validate operand
      assert && assert( options.operandMutable, 'operand is not mutable' );
      assert && assert( options.operandRange.contains( operand ), 'operand out of range: ' + operand );
      assert && assert( !( operand === 0 && !options.zeroOperandValid ), 'zero operand not valid' );
    } );

    AbstractFunction.call( this, options );
  }

  functionBuilder.register( 'MathFunction', MathFunction );

  return inherit( AbstractFunction, MathFunction, {

    /**
     * Applies this function.
     *
     * @param {RationalNumber|string} input - rational number or mathematical equation
     * @returns {RationalNumber|string} output, of same type as input
     * @public
     * @override
     */
    apply: function( input ) {
      if ( typeof input === 'string' ) {
        return input + ' ' + this.operatorString + this.operandProperty.get();
      }
      else {
        assert && assert( input instanceof RationalNumber );
        return this._apply( input, this.operandProperty.get() );
      }
    }
  } );
} );
