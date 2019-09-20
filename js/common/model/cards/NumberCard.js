// Copyright 2016-2019, University of Colorado Boulder

/**
 * A card with a rational number on it.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Card = require( 'FUNCTION_BUILDER/common/model/cards/Card' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );

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

  return inherit( Card, NumberCard );
} );
