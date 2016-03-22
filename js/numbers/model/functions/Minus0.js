// Copyright 2016, University of Colorado Boulder

/**
  * output = input - 0
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
  function Minus0( options ) {
    options = _.extend( {}, options, {
      fill: 'rgb( 255, 246, 187 )'
    } );
    NumberFunction.call( this, '\u2212 ?', options );
  }

  functionBuilder.register( 'Minus0', Minus0 );

  return inherit( NumberFunction, Minus0, {

    /**
     * Applies this function.
     * @param {number} input
     * @returns {number}
     * @public
     * @override
     */
    apply: function( input ) {
      return input;
    }
  } );
} );
