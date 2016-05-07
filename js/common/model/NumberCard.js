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
  var Util = require( 'DOT/Util' );

  /**
   * @param {BigRational} value - see BigRational.js (3rd-party library)
   * @param {Object} [options]
   * @constructor
   */
  function NumberCard( value, options ) {
    this.value = value; // @public (read-only)
    Card.call( this, options );
  }

  functionBuilder.register( 'NumberCard', NumberCard );

  return inherit( Card, NumberCard, {}, {

    /**
     * Convenience function for creating a NumberCard from an integer.
     * @param {number} value
     * @param {Object} [options]
     * @returns {NumberCard}
     * @static
     * @public
     */
    withInteger: function( value, options ) {
      assert && assert( Util.isInteger( value ), 'value is not an integer: ' + value  );
      return new NumberCard( FBUtils.createBigRational( value ), options );
    }
  } );
} );
