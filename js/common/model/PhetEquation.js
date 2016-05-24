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
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {string} xSymbol - symbol for the input, typically 'x'
   * @param {MathFunction[]} mathFunctions - the set of linear functions, in the order that they are applied
   * @constructor
   */
  function PhetEquation( xSymbol, mathFunctions ) {

    //TODO

    // @public (read-only)
    this.xSymbol = xSymbol; // {string}
  }

  functionBuilder.register( 'PhetEquation', PhetEquation );

  return inherit( Object, PhetEquation );
} );
