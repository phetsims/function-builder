// Copyright 2016, University of Colorado Boulder

/**
 * output = ( input * 2 ) - 3
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
  function Times2Minus3( options ) {
    options = _.extend( {}, options, {
      fill: 'rgb( 165, 209, 167 )' //TODO double function, other half has fill: 'rgb( 255, 246, 187 )'
    } );
    NumberFunction.call( this, '? ? , ? ?', options );
  }

  functionBuilder.register( 'Times2Minus3', Times2Minus3 );

  return inherit( NumberFunction, Times2Minus3, {

    /**
     * Applies this function.
     * @param {number} input
     * @returns {number}
     * @public
     * @override
     */
    apply: function( input ) {
      return ( input * 2 ) - 3;
    }
  } );
} );
