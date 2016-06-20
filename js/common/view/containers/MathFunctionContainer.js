// Copyright 2016, University of Colorado Boulder

/**
 * Container for mathematical functions.
 * A container is intended to be put in a carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionContainer = require( 'FUNCTION_BUILDER/common/view/containers/FunctionContainer' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathFunctionNode = require( 'FUNCTION_BUILDER/common/view/functions/MathFunctionNode' );

  /**
   * @param {FunctionCreator} functionCreator - function creator
   * @param {Object} [options]
   * @constructor
   */
  function MathFunctionContainer( functionCreator, options ) {
    FunctionContainer.call( this, functionCreator, MathFunctionNode, options );
  }

  functionBuilder.register( 'MathFunctionContainer', MathFunctionContainer );

  return inherit( FunctionContainer, MathFunctionContainer );
} );
