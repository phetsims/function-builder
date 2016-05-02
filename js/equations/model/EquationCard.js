// Copyright 2016, University of Colorado Boulder

/**
 * A card with a mathematical equation on it, e.g. 'x' or '2x + 1'.
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
   * @param {string} equation
   * @param {Object} [options]
   * @constructor
   */
  function EquationCard( equation, options ) {
    this.equation = equation; // @public (read-only)
    Card.call( this, options );
  }

  functionBuilder.register( 'EquationCard', EquationCard );

  return inherit( Card, EquationCard );
} );
