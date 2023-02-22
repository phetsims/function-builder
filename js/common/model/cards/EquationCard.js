// Copyright 2016-2020, University of Colorado Boulder

/**
 * A card with the right-hand side of an equation on it, e.g. 'x' or '2x'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import functionBuilder from '../../../functionBuilder.js';
import Card from './Card.js';

export default class EquationCard extends Card {

  /**
   * @param {string} xSymbol - the input symbol, typically 'x'
   * @param {Object} [options]
   */
  constructor( xSymbol, options ) {

    assert && assert( typeof xSymbol === 'string' );

    super( options );

    // {string} @public (read-only)
    this.xSymbol = xSymbol;
  }
}

functionBuilder.register( 'EquationCard', EquationCard );