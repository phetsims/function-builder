// Copyright 2016, University of Colorado Boulder

/**
 * A card with the right-hand side of an equation on it, e.g. 'x' or '2x'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Card = require( 'FUNCTION_BUILDER/common/model/cards/Card' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

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

  return inherit( Card, EquationCard );
} );
