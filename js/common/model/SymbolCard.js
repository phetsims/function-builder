// Copyright 2016, University of Colorado Boulder

/**
 * An input card with a mathematical symbol on it, e.g. 'x'.
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
   * @param {string} symbol
   * @param {Object} [options]
   * @constructor
   */
  function SymbolCard( symbol, options ) {
    this.symbol = symbol; // @public (read-only)
    Card.call( this, options );
  }

  functionBuilder.register( 'SymbolCard', SymbolCard );

  return inherit( Card, SymbolCard );
} );
