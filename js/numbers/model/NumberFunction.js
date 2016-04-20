// Copyright 2016, University of Colorado Boulder

/**
 * A numeric function for the 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AbstractFunction = require( 'FUNCTION_BUILDER/common/model/AbstractFunction' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {string} labelString - label shown on the function
   * @param {function(number):number} apply - implementation of the apply function
   * @param {Object} [options]
   * @constructor
   */
  function NumberFunction( labelString, apply, options ) {

    this.labelString = labelString; // @public (read-only) label that appears on the function
    this._apply = apply; // @private

    AbstractFunction.call( this, options );
  }

  functionBuilder.register( 'NumberFunction', NumberFunction );

  return inherit( AbstractFunction, NumberFunction, {

    /**
     * Applies this function.
     *
     * @param {number} value
     * @returns {number}
     * @public
     * @override
     */
    apply: function( value ) {
      assert && assert( typeof value === 'number', 'unsupported value type: ' + ( typeof value ) );
      return this._apply( value );
    }
  } );
} );
