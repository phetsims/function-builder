// Copyright 2016-2024, University of Colorado Boulder

/**
 * A card with a rational number on it.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';
import functionBuilder from '../../../functionBuilder.js';
import RationalNumber from '../RationalNumber.js';
import Card, { CardOptions } from './Card.js';

type SelfOptions = EmptySelfOptions;
type NumberCardOptions = SelfOptions & CardOptions;

export default class NumberCard extends Card {

  public readonly rationalNumber: RationalNumber;

  /**
   * @param rationalNumber - the input number, an integer
   * @param [providedOptions]
   */
  public constructor( rationalNumber: RationalNumber, providedOptions?: NumberCardOptions ) {

    assert && assert( rationalNumber.isInteger() );

    super( providedOptions );

    this.rationalNumber = rationalNumber;
  }
}

functionBuilder.register( 'NumberCard', NumberCard );