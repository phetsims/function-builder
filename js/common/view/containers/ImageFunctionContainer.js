// Copyright 2016, University of Colorado Boulder

/**
 * Container for image functions.
 * A container is intended to be put in a carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionContainer = require( 'FUNCTION_BUILDER/common/view/containers/FunctionContainer' );
  var ImageFunctionNode = require( 'FUNCTION_BUILDER/common/view/functions/ImageFunctionNode' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {FunctionCreator} functionCreator - creates function instances
   * @param {Object} [options]
   * @constructor
   */
  function ImageFunctionContainer( functionCreator, options ) {
    FunctionContainer.call( this, functionCreator, ImageFunctionNode, options );
  }

  functionBuilder.register( 'ImageFunctionContainer', ImageFunctionContainer );

  return inherit( FunctionContainer, ImageFunctionContainer );
} );
