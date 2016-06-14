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
    this.functionCreator = functionCreator; // @private
    FunctionContainer.call( this, options );
  }

  functionBuilder.register( 'ImageFunctionContainer', ImageFunctionContainer );

  return inherit( FunctionContainer, ImageFunctionContainer, {

    /***
     * Creates the model element for a function.
     * See supertype FunctionContainer.createFunctionInstance for params.
     *
     * @returns {AbstractFunction}
     * @protected
     * @abstract
     */
    createFunctionInstance: function( location ) {
      return this.functionCreator.createInstance( { location: this.carouselLocation } );
    },

    /**
     * Creates the view element (Node) for a function.
     * See supertype FunctionContainer.createFunctionNode for params.
     *
     * @returns {ImageFunctionNode}
     * @protected
     * @abstract
     */
    createFunctionNode: function( functionInstance, container, builderNode, dragLayer ) {
      return new ImageFunctionNode( functionInstance, container, builderNode, dragLayer );
    }
  } );
} );
