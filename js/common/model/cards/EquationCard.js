// Copyright 2016-2019, University of Colorado Boulder

/**
 * A card with the right-hand side of an equation on it, e.g. 'x' or '2x'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../../phet-core/js/inherit.js';
import functionBuilder from '../../../functionBuilder.js';
import Card from './Card.js';

/**
 * @param {string} xSymbol - the input symbol, typically 'x'
 * @param {Object} [options]
 * @constructor
 */
function EquationCard( xSymbol, options ) {

  assert && assert( typeof xSymbol === 'string' );

  // {string} @public (read-only)
  this.xSymbol = xSymbol;

  Card.call( this, options );
}

functionBuilder.register( 'EquationCard', EquationCard );

inherit( Card, EquationCard );
export default EquationCard;