// Copyright 2016, University of Colorado Boulder

/**
 * Base type for all number functions.
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
   * @param {Object} [options]
   * @constructor
   */
  function NumberFunction( labelString, options ) {
    this.labelString = labelString; // @public (read-only) label that appears on the function
    AbstractFunction.call( this, options );
  }

  functionBuilder.register( 'NumberFunction', NumberFunction );

  return inherit( AbstractFunction, NumberFunction );
} );
