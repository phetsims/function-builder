// Copyright 2016-2023, University of Colorado Boulder

/**
 * RationalNumber is a wrapper around BigRational.js. Since this wraps only the portion of BigRational.js needed by
 * this simulation, it's unlikely to be useful in other sims, and inappropriate to move to a common-code repository.
 *
 * This implementation requires BigInteger.js and BigRational.js to be added to phet.preload in package.json.
 * See https://github.com/peterolson/BigRational.js
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import functionBuilder from '../../functionBuilder.js';

// The subset of the BigInteger API that we are using.
type BigInteger = {
  valueOf: () => number;
};

// The subset of the BigRational API that we are using.
type BigRational = {
  numerator: BigInteger;
  denominator: BigInteger;
  valueOf: () => number;
  plus: ( value: number ) => BigRational;
  minus: ( value: number ) => BigRational;
  times: ( value: number ) => BigRational;
  divide: ( value: number ) => BigRational;
  abs: () => BigRational;
  toString: () => string;
};

export default class RationalNumber {

  private readonly bigRational: BigRational;

  public constructor( numerator: number, denominator: number ) {

    assert && assert( Number.isInteger( numerator ) );
    assert && assert( Number.isInteger( denominator ) );

    // @ts-expect-error bigRat is a global created by preloading BigRational.js.
    // PhET does not currently have a way to address this.
    this.bigRational = bigRat( numerator, denominator );
  }

  /**
   * Gets the numerator. Assumes that BigRational stores its value in reduced form.
   */
  public getNumerator(): number { return this.bigRational.numerator.valueOf(); }

  public get numerator(): number { return this.getNumerator(); }

  /**
   * Gets the denominator. Assumes that BigRational stores its value in reduced form.
   */
  public getDenominator(): number { return this.bigRational.denominator.valueOf(); }

  public get denominator(): number { return this.getDenominator(); }

  /**
   * Two rational numbers are equal if their values are equal.
   * E.g. they can have different numerators and denominators, but still represent the same number.
   */
  public equals( rationalNumber: RationalNumber ): boolean {
    return ( rationalNumber.valueOf() === this.valueOf() );
  }

  /**
   * Gets the value of this RationalNumber.
   */
  public valueOf(): number {
    return this.bigRational.valueOf();
  }

  /**
   * String representation, do not rely on the format of this!
   */
  public toString(): string {
    return this.bigRational.toString();
  }

  /**
   * Adds this RationalNumber and an integer, returns a new instance.
   */
  public plus( integerValue: number ): RationalNumber {
    assert && assert( Number.isInteger( integerValue ) );
    return toRationalNumber( this.bigRational.plus( integerValue ) );
  }

  /**
   * Subtracts this RationalNumber and an integer, returns a new instance.
   */
  public minus( integerValue: number ): RationalNumber {
    assert && assert( Number.isInteger( integerValue ) );
    return toRationalNumber( this.bigRational.minus( integerValue ) );
  }

  /**
   * Multiplies this RationalNumber and an integer, returns a new instance.
   */
  public times( integerValue: number ): RationalNumber {
    assert && assert( Number.isInteger( integerValue ) );
    return toRationalNumber( this.bigRational.times( integerValue ) );
  }

  /**
   * Divides this RationalNumber by an integer, returns a new instance.
   */
  public divide( integerValue: number ): RationalNumber {
    assert && assert( Number.isInteger( integerValue ) );
    return toRationalNumber( this.bigRational.divide( integerValue ) );
  }

  /**
   * Absolute value of this RationalNumber, returns a new instance.
   */
  public abs(): RationalNumber {
    return toRationalNumber( this.bigRational.abs() );
  }

  /**
   * Is this RationalNumber an integer?
   */
  public isInteger(): boolean {
    return ( this.valueOf() % 1 === 0 );
  }

  /**
   * Gets the whole number part of this RationalNumber's value.
   */
  public wholeNumberPart(): number {
    const value = this.bigRational.valueOf();
    return ( value < 0 ? -1 : 1 ) * Math.floor( Math.abs( value ) );
  }

  /**
   * Gets the fractional part of this RationalNumber's value, returns a new instance.
   */
  public fractionPart(): RationalNumber {
    return this.minus( this.wholeNumberPart() );
  }

  /**
   * Creates a RationalNumber from an integer.
   */
  public static withInteger( integerValue: number ): RationalNumber {
    assert && assert( Number.isInteger( integerValue ) );
    return new RationalNumber( integerValue, 1 );
  }
}

/**
 * Converts a BigRational to a RationalNumber
 */
function toRationalNumber( bigRational: BigRational ): RationalNumber {

  // BigRational.js does not export type BigRational. This verification works only when unminified.
  assert && assert( bigRational.constructor.name === 'BigRational' );
  return new RationalNumber( bigRational.numerator.valueOf(), bigRational.denominator.valueOf() );
}

functionBuilder.register( 'RationalNumber', RationalNumber );