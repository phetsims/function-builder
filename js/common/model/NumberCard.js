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
  var FBUtils = require( 'FUNCTION_BUILDER/common/FBUtils' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {BigRational} bigRational - a rational number, see BigRational.js
   * @param {Object} [options]
   * @constructor
   */
  function NumberCard( bigRational, options ) {

    assert && FBUtils.instanceofBigRational( bigRational );

    // {BigRational} @public (read-only)
    this.bigRational = bigRational;

    Card.call( this, options );
  }

  functionBuilder.register( 'NumberCard', NumberCard );

  return inherit( Card, NumberCard );
} );
