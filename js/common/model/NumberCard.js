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

  /**
   * @param {BigRational} bigRational - see BigRational.js (3rd-party library)
   * @param {Object} [options]
   * @constructor
   */
  function NumberCard( bigRational, options ) {

    assert && assert( bigRational.constructor.name === 'BigRational' );

    // {BigRational} @public (read-only)
    this.bigRational = bigRational;

    Card.call( this, options );
  }

  functionBuilder.register( 'NumberCard', NumberCard );

  return inherit( Card, NumberCard );
} );
