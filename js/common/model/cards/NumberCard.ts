// Copyright 2016-2023, University of Colorado Boulder

/**
 * A card with a rational number on it.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import functionBuilder from '../../../functionBuilder.js';
import RationalNumber from '../RationalNumber.js';
import Card from './Card.js';

export default class NumberCard extends Card {

  /**
   * @param {RationalNumber} rationalNumber - the input number, an integer
   * @param {Object} [options]
   */
  constructor( rationalNumber, options ) {

    assert && assert( rationalNumber instanceof RationalNumber );
    assert && assert( rationalNumber.isInteger() );

    super( options );

    // {RationalNumber} @public (read-only)
    this.rationalNumber = rationalNumber;
  }
}

functionBuilder.register( 'NumberCard', NumberCard );