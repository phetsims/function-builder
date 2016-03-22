// Copyright 2016, University of Colorado Boulder

/**
 * A card with a number on it.
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
   * @param {number} value
   * @param {Object} [options]
   * @constructor
   */
  function NumberCard( value, options ) {
    this.value = value; // @public (read-only)
    Card.call( this, options );
  }

  functionBuilder.register( 'NumberCard', NumberCard );

  return inherit( Card, NumberCard );
} );
