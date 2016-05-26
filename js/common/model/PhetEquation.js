// Copyright 2016, University of Colorado Boulder

//TODO better name for PhetEquation
/**
 * PhET-specific format of the equation that corresponds to functions in the builder.
 * See format specification in function-builder/doc/equation-formats.md
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {MathFunction[]} mathFunctions - the set of linear functions, in the order that they are applied
   * @param {Object} [options]
   * @constructor
   */
  function PhetEquation( mathFunctions, options ) {

    options = _.extend( {
      xSymbol: FBSymbols.X // {string} string to use for input symbol, appears only in toString
    }, options );

    //TODO

    // @private
    this.xSymbol = options.xSymbol; // {string}
  }

  functionBuilder.register( 'PhetEquation', PhetEquation );

  return inherit( Object, PhetEquation, {

    /**
     * String representation, for debugging and PhET-iO.
     *
     * @returns {string}
     */
    toString: function() {
      //TODO
      return '?';
    }
  } );
} );
