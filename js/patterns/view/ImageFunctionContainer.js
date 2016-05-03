// Copyright 2016, University of Colorado Boulder

/**
 * Container for image functions. This container is intended to be put in a carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionContainer = require( 'FUNCTION_BUILDER/common/view/FunctionContainer' );
  var ImageFunctionNode = require( 'FUNCTION_BUILDER/patterns/view/ImageFunctionNode' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {constructor} FunctionConstructor - constructor for a subtype of {ImageFunction}
   * @param {Object} [options]
   * @constructor
   */
  function ImageFunctionContainer( FunctionConstructor, options ) {
    this.FunctionConstructor = FunctionConstructor; // @private
    FunctionContainer.call( this, options );
  }

  functionBuilder.register( 'ImageFunctionContainer', ImageFunctionContainer );

  return inherit( FunctionContainer, ImageFunctionContainer, {

    /***
     * Creates the model element for a function.
     * See supertype FunctionContainer.createFunctionInstance for params.
     * @returns {AbstractFunction}
     * @protected
     * @abstract
     */
    createFunctionInstance: function( location ) {
      return new this.FunctionConstructor( { location: this.carouselLocation } );
    },

    /**
     * Creates the view element (Node) for a function.
     * See supertype FunctionContainer.createFunctionNode for params.
     * @returns {Node}
     * @protected
     * @abstract
     */
    createFunctionNode: function( functionInstance, container, builderNode, dragLayer ) {
      return new ImageFunctionNode( functionInstance, container, builderNode, dragLayer );
    }
  } );
} );
