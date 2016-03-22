// Copyright 2016, University of Colorado Boulder

/**
 * output = input + 3
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberFunction = require( 'FUNCTION_BUILDER/numbers/model/NumberFunction' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Plus3( options ) {
    options = _.extend( {}, options, {
      fill: 'rgb( 235, 191, 109 )'
    } );
    NumberFunction.call( this, '\u002b 3', options );
  }

  functionBuilder.register( 'Plus3', Plus3 );

  return inherit( NumberFunction, Plus3, {

    /**
     * Applies this function.
     * @param {number} input
     * @returns {number}
     * @public
     * @override
     */
    apply: function( input ) {
      return input + 3;
    }
  } );
} );
