// Copyright 2016, University of Colorado Boulder

/**
 * A card with a rational number on it.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Card = require( 'FUNCTION_BUILDER/common/model/Card' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );

  /**
   * @param {RationalNumber} rationalNumber - the input number
   * @param {Object} [options]
   * @constructor
   */
  function NumberCard( rationalNumber, options ) {

    assert && assert( rationalNumber instanceof RationalNumber );

    // {RationalNumber} @public (read-only)
    this.rationalNumber = rationalNumber;

    Card.call( this, options );
  }

  functionBuilder.register( 'NumberCard', NumberCard );

  return inherit( Card, NumberCard );
} );
