// Copyright 2016-2019, University of Colorado Boulder

/**
 * A card with a rational number on it.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../../phet-core/js/inherit.js';
import functionBuilder from '../../../functionBuilder.js';
import RationalNumber from '../RationalNumber.js';
import Card from './Card.js';

/**
 * @param {RationalNumber} rationalNumber - the input number, an integer
 * @param {Object} [options]
 * @constructor
 */
function NumberCard( rationalNumber, options ) {

  assert && assert( rationalNumber instanceof RationalNumber );
  assert && assert( rationalNumber.isInteger() );

  // {RationalNumber} @public (read-only)
  this.rationalNumber = rationalNumber;

  Card.call( this, options );
}

functionBuilder.register( 'NumberCard', NumberCard );

inherit( Card, NumberCard );
export default NumberCard;