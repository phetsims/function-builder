// Copyright 2016, University of Colorado Boulder

/**
 * Container for functions in the 'Mystery' screen.
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
  var MysteryFunctionNode = require( 'FUNCTION_BUILDER/common/view/functions/MysteryFunctionNode' );

  /**
   * @param {FunctionCreator} functionCreator - function creator
   * @param {Object} [options]
   * @constructor
   */
  function MysteryFunctionContainer( functionCreator, options ) {
    FunctionContainer.call( this, functionCreator, MysteryFunctionNode, options );
  }

  functionBuilder.register( 'MysteryFunctionContainer', MysteryFunctionContainer );

  return inherit( FunctionContainer, MysteryFunctionContainer );
} );
