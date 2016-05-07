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

  /**
   * @param {function(number,number):number} apply - implementation of the apply function for numbers
   * @param {string} operatorString - string representation of the operator
   * @param {Object} [options]
   * @constructor
   */
  function MathFunction( apply, operatorString, options ) {

    options = _.extend( {
      operand: 1, // {number} initial value of operandProperty
      operandRange: new Range( -3, 3 ), // {Range} range of operandProperty
      zeroOperandValid: true, // {boolean} is zero a valid operand?
      isInvertibleWithOperand: null // {function:boolean|null} is this function invertible for specified operand?
    }, options );

    assert && assert( options.operandRange.contains( options.operand ) );
    assert && assert( !( options.operand === 0 && !options.zeroOperandValid ),
      'default value zero is not a valid operand' );

    this.operatorString = operatorString; // @public (read-only)
    this._apply = apply; // @private
    this.operandRange = options.operandRange; // @public (read-only)
    this.zeroOperandValid = options.zeroOperandValid; // @public (read-only)
    this.isInvertibleWithOperand = options.isInvertibleWithOperand; // @private

    // @public
    this.operandProperty = new Property( options.operand );
    this.operandProperty.link( function( operand ) {

      // validate operand
      assert && assert( options.operandRange.contains( operand ), 'operand out of range: ' + operand );
      assert && assert( !( operand === 0 && !options.zeroOperandValid ), 'zero operand not valid' );
    } );

    AbstractFunction.call( this, options );
  }

  functionBuilder.register( 'MathFunction', MathFunction );

  return inherit( AbstractFunction, MathFunction, {

    /**
     * Is this function invertible for the current value of its operand?
     * @public
     * @override
     */
    getInvertible: function() {
      if ( this.isInvertibleWithOperand ) {
        return this.isInvertibleWithOperand( this.operandProperty.get() );
      }
      else {
        return AbstractFunction.prototype.getInvertible.call( this );
      }
    },

    /**
     * Applies this function.
     *
     * @param {BigRational|string} input - rational number (see BigRational.js) or mathematical equation
     * @returns {BigRational|string}
     * @public
     * @override
     */
    apply: function( input ) {
      if ( typeof input === 'string' ) {
        return input + ' ' + this.operatorString + this.operandProperty.get();
      }
      else {
        return this._apply( input, this.operandProperty.get() );
      }
    }
  } );
} );
