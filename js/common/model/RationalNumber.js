// Copyright 2016, University of Colorado Boulder

/**
 * Support for rational number operations needed by this sim.
 * Numerator and denominator must be integers throughout, verified via assertions.
 * This is a wrapper around the BigRational 3rd-party library.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Util = require( 'DOT/Util' );

  // constants
  var BIG_RAT = bigRat; // global created when BigRational.js is run as a preload

  /**
   * @param {number} numerator
   * @param {number} denominator
   * @constructor
   */
  function RationalNumber( numerator, denominator ) {
    assert && assertValid( numerator, denominator );
    this._numerator = numerator; // @private
    this._denominator = denominator; // @private
  }

  /**
   * Validates numerator and denominator. This function is called only if assert is defined,
   * so don't put any code in here except assertions.
   *
   * @param {number} numerator
   * @param {number} denominator
   * @private
   */
  var assertValid = function( numerator, denominator ) {
    assert( typeof numerator !== 'undefined', 'numerator is undefined' );
    assert( typeof denominator !== 'undefined', 'denominator is undefined' );
    assert( Util.isInteger( numerator ), 'numerator is not an integer: ' + numerator );
    assert( Util.isInteger( denominator ), 'denominator is not an integer: ' + denominator );
    assert( denominator !== 0, 'denominator is zero' );
  };

  return inherit( Object, RationalNumber, {

    // @public
    getNumerator: function() {
      return this._numerator;
    },
    get numerator() { return this.getNumerator(); },

    // @public
    getDenominator: function() {
      return this._denomimator;
    },
    get denominator() { return this.getDenominator(); },

    /**
     * @param {number} numerator
     * @param {number} denominator
     * @returns {RationalNumber}
     * @public
     */
    plus: function( numerator, denominator ) {
      assert && assertValid( numerator, denominator );
      var r = BIG_RAT( this.numerator, this.denominator ).plus( numerator, denominator );
      return new RationalNumber( r.numerator, r.denominator );
    },

    /**
     * @param {number} numerator
     * @param {number} denominator
     * @returns {RationalNumber}
     * @public
     */
    minus: function( numerator, denominator ) {
      assert && assertValid( numerator, denominator );
      var r = BIG_RAT( this.numerator, this.denominator ).minus( numerator, denominator );
      return new RationalNumber( r.numerator, r.denominator );
    },

    /**
     * @param {number} numerator
     * @param {number} denominator
     * @returns {RationalNumber}
     * @public
     */
    times: function( numerator, denominator ) {
      assert && assertValid( numerator, denominator );
      var r = BIG_RAT( this.numerator, this.denominator ).times( numerator, denominator );
      return new RationalNumber( r.numerator, r.denominator );
    },

    /**
     * @param {number} numerator
     * @param {number} denominator
     * @returns {RationalNumber}
     * @public
     */
    divide: function( numerator, denominator ) {
      assert && assertValid( numerator, denominator );
      var r = BIG_RAT( this.numerator, this.denominator ).divide( numerator, denominator );
      return new RationalNumber( r.numerator, r.denominator );
    },

    /**
     * @param {RationalNumber} r
     * @returns {boolean}
     */
    equals: function( r ) {
      assert && assert( r instanceof RationalNumber );
      return ( r.numerator === this.numerator && r.denominator === this.denominator );
    }
  }, {

    /**
     * Convenience function for creating a RationalNumber from an integer.
     * @param {number} value
     * @returns {RationalNumber}
     */
    withInteger: function( value ) {
      assert( Util.isInteger( value ), 'value is not an integer: ' + value );
      return new RationalNumber( value, 1 );
    }
  } );
} );