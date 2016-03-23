// Copyright 2016, University of Colorado Boulder

/**
 * output = ( input + 3 ) * 2
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberFunction = require( 'FUNCTION_BUILDER/numbers/model/NumberFunction' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Plus3Times2( options ) {
    options = _.extend( {}, options, {
      fill: 'rgb( 135, 196, 229 )' //TODO double function, other half has fill: 'rgb( 222, 220, 205 )'
    } );
    NumberFunction.call( this, FBSymbols.PLUS + ' ? ' + FBSymbols.TIMES + ' ?', options );
  }

  functionBuilder.register( 'Plus3Times2', Plus3Times2 );

  return inherit( NumberFunction, Plus3Times2, {

    /**
     * Applies this function.
     * @param {number} input
     * @returns {number}
     * @public
     * @override
     */
    apply: function( input ) {
      return ( input + 3 ) * 2;
    }
  } );
} );
