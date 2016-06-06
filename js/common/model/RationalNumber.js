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

    getNumerator: function() { return this.bigRational.numerator.valueOf(); },
    get numerator() { return this.getNumerator(); },

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

    valueOf: function() { return this.bigRational.valueOf(); },

    toString: function() { return this.bigRational.toString(); },

    plus: function( integerValue ) {
      assert && assert( Util.isInteger( integerValue ) );
      return toRationalNumber( this.bigRational.plus( integerValue ) );
    },

    minus: function( integerValue ) {
      assert && assert( Util.isInteger( integerValue ) );
      return toRationalNumber( this.bigRational.minus( integerValue ) );
    },

    times: function( integerValue ) {
      assert && assert( Util.isInteger( integerValue ) );
      return toRationalNumber( this.bigRational.times( integerValue ) );
    },

    divide: function( integerValue ) {
      assert && assert( Util.isInteger( integerValue ) );
      return toRationalNumber( this.bigRational.divide( integerValue ) );
    },

    abs: function() {
      return toRationalNumber( this.bigRational.abs() );
    },

    floor: function() {
      return toRationalNumber( this.bigRational.floor() );
    },
    
    isInteger: function() {
      return ( this.denominator === 1 );
    },

    quotient: function() {
      return this.bigRational.floor().valueOf();
    },

    remainder: function() {
      return toRationalNumber( this.bigRational.minus( this.bigRational.floor() ) );
    }
  }, {

    withInteger: function( integerValue ) {
      assert && assert( Util.isInteger( integerValue ) );
      return new RationalNumber( integerValue, 1 );
    }
  } );
} );
