// Copyright 2016-2019, University of Colorado Boulder

/**
 * A wrapper around BigRational.js. Since this wraps only the portion of BigRational.js needed by this simulation,
 * it's unlikely to be useful in other sims, and inappropriate to move to a common-code repository.
 *
 * Requires BigInteger.js and BigRational.js to be added to phet.preload in package.json.
 * See https://github.com/peterolson/BigRational.js
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../dot/js/Utils.js';
import inherit from '../../../../phet-core/js/inherit.js';
import functionBuilder from '../../functionBuilder.js';

/**
 * @param numerator
 * @param denominator
 * @constructor
 */
function RationalNumber( numerator, denominator ) {

  assert && assert( Utils.isInteger( numerator ) );
  assert && assert( Utils.isInteger( denominator ) );

  // @private {BigRational} bigRat is a global created by preloading BigRational.js
  this.bigRational = bigRat( numerator, denominator );
}

functionBuilder.register( 'RationalNumber', RationalNumber );

/**
 * Converts a BigRational to a RationalNumber
 * @param {BigRational} bigRational
 * @returns {RationalNumber}
 */
const toRationalNumber = function( bigRational ) {

  // BigRational.js does not export type BigRational. This verification works only when unminified.
  assert && assert( bigRational.constructor.name === 'BigRational' );
  return new RationalNumber( bigRational.numerator.valueOf(), bigRational.denominator.valueOf() );
};

export default inherit( Object, RationalNumber, {

  /**
   * Gets the numerator. Assumes that BigRational stores its value in reduced form.
   *
   * @returns {number}
   * @public
   */
  getNumerator: function() { return this.bigRational.numerator.valueOf(); },
  get numerator() { return this.getNumerator(); },

  /**
   * Gets the denominator. Assumes that BigRational stores its value in reduced form.
   *
   * @returns {number}
   * @public
   */
  getDenominator: function() { return this.bigRational.denominator.valueOf(); },
  get denominator() { return this.getDenominator(); },

  /**
   * Two rational numbers are equal if their values are equal.
   * E.g. they can have different numerators and denominators, but still represent the same number.
   *
   * @param {RationalNumber} rationalNumber
   * @returns {boolean}
   * @public
   */
  equals: function( rationalNumber ) {
    return ( rationalNumber.valueOf() === this.valueOf() );
  },

  /**
   * Gets the value of this RationalNumber.
   *
   * @returns {number}
   * @public
   */
  valueOf: function() { return this.bigRational.valueOf(); },

  /**
   * String representation, do not rely on the format of this!
   *
   * @returns {string}
   * @public
   */
  toString: function() { return this.bigRational.toString(); },

  /**
   * Adds this RationalNumber and an integer, returns a new instance.
   *
   * @param {number} integerValue
   * @returns {RationalNumber}
   * @public
   */
  plus: function( integerValue ) {
    assert && assert( Utils.isInteger( integerValue ) );
    return toRationalNumber( this.bigRational.plus( integerValue ) );
  },

  /**
   * Subtracts this RationalNumber and an integer, returns a new instance.
   *
   * @param {number} integerValue
   * @returns {RationalNumber}
   * @public
   */
  minus: function( integerValue ) {
    assert && assert( Utils.isInteger( integerValue ) );
    return toRationalNumber( this.bigRational.minus( integerValue ) );
  },

  /**
   * Multiplies this RationalNumber and an integer, returns a new instance.
   *
   * @param {number} integerValue
   * @returns {RationalNumber}
   * @public
   */
  times: function( integerValue ) {
    assert && assert( Utils.isInteger( integerValue ) );
    return toRationalNumber( this.bigRational.times( integerValue ) );
  },

  /**
   * Divides this RationalNumber by an integer, returns a new instance.
   *
   * @param {number} integerValue
   * @returns {RationalNumber}
   * @public
   */
  divide: function( integerValue ) {
    assert && assert( Utils.isInteger( integerValue ) );
    return toRationalNumber( this.bigRational.divide( integerValue ) );
  },

  /**
   * Absolute value of this RationalNumber, returns a new instance.
   *
   * @returns {RationalNumber}
   * @public
   */
  abs: function() {
    return toRationalNumber( this.bigRational.abs() );
  },

  /**
   * Is this RationalNumber an integer?
   *
   * @returns {boolean}
   * @public
   */
  isInteger: function() {
    return ( this.valueOf() % 1 === 0 );
  },

  /**
   * Gets the whole number part of this RationalNumber's value.
   *
   * @returns {number}
   * @public
   */
  wholeNumberPart: function() {
    const value = this.bigRational.valueOf();
    return ( value < 0 ? -1 : 1 ) * Math.floor( Math.abs( value ) );
  },

  /**
   * Gets the fractional part of this RationalNumber's value, returns a new instance.
   *
   * @returns {RationalNumber}
   * @public
   */
  fractionPart: function() {
    return this.minus( this.wholeNumberPart() );
  }
}, {

  /**
   * Creates a RationalNumber from an integer.
   *
   * @param {number} integerValue
   * @returns {RationalNumber}
   * @public
   * @static
   */
  withInteger: function( integerValue ) {
    assert && assert( Utils.isInteger( integerValue ) );
    return new RationalNumber( integerValue, 1 );
  }
} );