// Copyright 2016, University of Colorado Boulder

/**
 * A wrapper around the portion of BigRational.js needed by this simulation.
 * Requires BigInteger.js and BigRational.js to be added to phet.preload in package.json.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Util = require( 'DOT/Util' );

  /**
   * @param numerator
   * @param denominator
   * @constructor
   */
  function RationalNumber( numerator, denominator ) {

    assert && assert( Util.isInteger( numerator ) );
    assert && assert( Util.isInteger( denominator ) );

    // @private {BigRational} bigRat is a global created by preloading BigRational.js
    this.bigRational = bigRat( numerator, denominator );
  }

  functionBuilder.register( 'RationalNumber', RationalNumber );

  /**
   * Converts a BigRational to a RationalNumber
   * @param {BigRational} bigRational
   * @returns {RationalNumber}
   */
  var toRationalNumber = function( bigRational ) {

    // BigRational.js does not export type BigRational. This verification works only when unminified.
    assert && assert( bigRational.constructor.name === 'BigRational' );
    return new RationalNumber( bigRational.numerator.valueOf(), bigRational.denominator.valueOf() );
  };

  return inherit( Object, RationalNumber, {

    /**
     * Gets the numerator. Assumes that BigRational stores its value in reduced form.
     *
     * @returns {number}
     */
    getNumerator: function() { return this.bigRational.numerator.valueOf(); },
    get numerator() { return this.getNumerator(); },

    /**
     * Gets the denominator. Assumes that BigRational stores its value in reduced form.
     *
     * @returns {number}
     */
    getDenominator: function() { return this.bigRational.denominator.valueOf(); },
    get denominator() { return this.getDenominator(); },

    /**
     * Two rational numbers are equal if their values are equal.
     * E.g. they can have different numerators and denominators, but still represent the same number.
     *
     * @param {RationalNumber} rationalNumber
     * @returns {boolean}
     */
    equals: function( rationalNumber ) {
      return ( rationalNumber.valueOf() === this.valueOf() );
    },

    /**
     * Gets the value of this RationalNumber.
     *
     * @returns {number}
     */
    valueOf: function() { return this.bigRational.valueOf(); },

    /**
     * String representation, do not rely on the format of this!
     *
     * @returns {string}
     */
    toString: function() { return this.bigRational.toString(); },

    /**
     * Adds this RationalNumber and an integer, returns a new instance.
     *
     * @param {number} integerValue
     * @returns {RationalNumber}
     */
    plus: function( integerValue ) {
      assert && assert( Util.isInteger( integerValue ) );
      return toRationalNumber( this.bigRational.plus( integerValue ) );
    },

    /**
     * Subtracts this RationalNumber and an integer, returns a new instance.
     *
     * @param {number} integerValue
     * @returns {RationalNumber}
     */
    minus: function( integerValue ) {
      assert && assert( Util.isInteger( integerValue ) );
      return toRationalNumber( this.bigRational.minus( integerValue ) );
    },

    /**
     * Multiplies this RationalNumber and an integer, returns a new instance.
     *
     * @param {number} integerValue
     * @returns {RationalNumber}
     */
    times: function( integerValue ) {
      assert && assert( Util.isInteger( integerValue ) );
      return toRationalNumber( this.bigRational.times( integerValue ) );
    },

    /**
     * Divides this RationalNumber by an integer, returns a new instance.
     *
     * @param {number} integerValue
     * @returns {RationalNumber}
     */
    divide: function( integerValue ) {
      assert && assert( Util.isInteger( integerValue ) );
      return toRationalNumber( this.bigRational.divide( integerValue ) );
    },

    /**
     * Absolute value of this RationalNumber, returns a new instance.
     *
     * @returns {RationalNumber}
     */
    abs: function() {
      return toRationalNumber( this.bigRational.abs() );
    },

    /**
     * Is this RationalNumber an integer?
     *
     * @returns {boolean}
     */
    isInteger: function() {
      return ( this.valueOf() % 1 === 0 );
    },

    /**
     * Gets the whole number part of this RationalNumber's value.
     *
     * @returns {number}
     */
    wholeNumberPart: function() {
      var value = this.bigRational.valueOf();
      return ( value < 0 ? -1 : 1 ) * Math.floor( Math.abs( value ) );
    },

    /**
     * Gets the fractional part of this RationalNumber's value, returns a new instance.
     *
     * @returns {RationalNumber}
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
     */
    withInteger: function( integerValue ) {
      assert && assert( Util.isInteger( integerValue ) );
      return new RationalNumber( integerValue, 1 );
    }
  } );
} );
