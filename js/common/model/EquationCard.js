// Copyright 2016, University of Colorado Boulder

/**
 * A card with a mathematical symbol or equation on it, e.g. 'x'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Card = require( 'FUNCTION_BUILDER/common/model/Card' );
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
