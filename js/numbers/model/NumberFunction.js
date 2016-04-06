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
   * @param {Object} functionData - see NumbersScene
   * @param {Object} [options]
   * @constructor
   */
  function NumberFunction( functionData, options ) {

    options = options || {};
    options.fill = functionData.fill;
    options.invertible = functionData.invertible;

    this.labelString = functionData.labelString; // @public (read-only) label that appears on the function
    this.applyFunction = functionData.apply; // @private

    AbstractFunction.call( this, options );
  }

  functionBuilder.register( 'NumberFunction', NumberFunction );

  return inherit( AbstractFunction, NumberFunction, {

    apply: function( value ) {
      return this.applyFunction( value );
    }
  } );
} );
