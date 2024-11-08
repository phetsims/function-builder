// Copyright 2016-2023, University of Colorado Boulder

/**
 * A card with the right-hand side of an equation on it, e.g. 'x' or '2x'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';
import functionBuilder from '../../../functionBuilder.js';
import Card, { CardOptions } from './Card.js';

type SelfOptions = EmptySelfOptions;
type EquationCardOptions = SelfOptions & CardOptions;

export default class EquationCard extends Card {

  public readonly xSymbol: string;

  /**
   * @param xSymbol - the input symbol, typically 'x'
   * @param [providedOptions]
   */
  public constructor( xSymbol: string, providedOptions?: EquationCardOptions ) {

    super( providedOptions );

    this.xSymbol = xSymbol;
  }
}

functionBuilder.register( 'EquationCard', EquationCard );