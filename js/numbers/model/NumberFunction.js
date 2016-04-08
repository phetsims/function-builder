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
   * @param {string} labelString
   * @param {function(number):number} apply
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

    apply: function( value ) {
      return this._apply( value );
    }
  } );
} );
