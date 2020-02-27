// Copyright 2016-2019, University of Colorado Boulder

/**
 * A mathematical function with (optionally) dynamic operand.
 * Can be applied to either a rational number or a MathFunction[].
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../../axon/js/NumberProperty.js';
import Range from '../../../../../dot/js/Range.js';
import Utils from '../../../../../dot/js/Utils.js';
import inherit from '../../../../../phet-core/js/inherit.js';
import merge from '../../../../../phet-core/js/merge.js';
import functionBuilder from '../../../functionBuilder.js';
import RationalNumber from '../RationalNumber.js';
import AbstractFunction from './AbstractFunction.js';

/**
 * @param {string} operator - string representation of the operator
 * @param {function(RationalNumber,number):RationalNumber} applyRationalNumber - implementation of the apply function for rational numbers
 * @param {Object} [options]
 * @constructor
 */
function MathFunction( operator, applyRationalNumber, options ) {

  options = merge( {
    operand: 1, // {number} initial value of operandProperty, an integer
    operandRange: new Range( -3, 3 ), // {Range|null} optional range of operandProperty
    zeroOperandValid: true, // {boolean} is zero a valid operand?
    pickerColor: 'white' // {Color|string} color used for NumberPicker UI component
  }, options );

  assert && assert( Utils.isInteger( options.operand ) );
  assert && assert( !options.operandRange || options.operandRange.contains( options.operand ) );
  assert && assert( !( options.operand === 0 && !options.zeroOperandValid ),
    'default value zero is not a valid operand' );

  // @public (read-only)
  this.operator = operator;
  this.operandRange = options.operandRange;
  this.zeroOperandValid = options.zeroOperandValid;

  // @private
  this.applyRationalNumber = applyRationalNumber;

  // @public
  this.operandProperty = new NumberProperty( options.operand ); // {Property.<number>}
  // unlink unnecessary, instance owns this Property
  this.operandProperty.lazyLink( function( operand ) {

    // validate operand
    assert && assert( Utils.isInteger( operand ) );
    assert && assert( !options.operandRange || options.operandRange.contains( operand ), 'operand out of range: ' + operand );
    assert && assert( !( operand === 0 && !options.zeroOperandValid ), 'zero operand not valid' );
  } );

  AbstractFunction.call( this, options );

  this.viewOptions.pickerColor = options.pickerColor;
}

functionBuilder.register( 'MathFunction', MathFunction );

export default inherit( AbstractFunction, MathFunction, {

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
      return this.applyRationalNumber( input, this.operandProperty.get() );
    }
    else if ( Array.isArray( input ) ) {
      return input.concat( this );
    }
    else {
      throw new Error( 'unsupported input type' );
    }
  }
} );