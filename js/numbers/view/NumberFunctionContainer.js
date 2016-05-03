// Copyright 2016, University of Colorado Boulder

/**
 * Container for number functions. This container is intended to be put in a carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionContainer = require( 'FUNCTION_BUILDER/common/view/FunctionContainer' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberFunction = require( 'FUNCTION_BUILDER/numbers/model/NumberFunction' );
  var NumberFunctionNode = require( 'FUNCTION_BUILDER/numbers/view/NumberFunctionNode' );

  /**
   * @param {Object} functionData - data structure for creating NumberFunction instances
   * @param {Object} [options]
   * @constructor
   */
  function NumberFunctionContainer( functionData, options ) {
    this.functionData = functionData; // @private
    FunctionContainer.call( this, options );
  }

  functionBuilder.register( 'NumberFunctionContainer', NumberFunctionContainer );

  return inherit( FunctionContainer, NumberFunctionContainer, {

    /***
     * Creates the model element for a function.
     * See supertype FunctionContainer.createFunctionInstance for params.
     * @returns {AbstractFunction}
     * @protected
     * @abstract
     */
    createFunctionInstance: function( location ) {
      return new NumberFunction( this.functionData.labelString, this.functionData.apply,
        _.extend( {
          location: this.carouselLocation
        }, this.functionData.options )
      );
    },

    /**
     * Creates the view element (Node) for a function.
     * See supertype FunctionContainer.createFunctionNode for params.
     * @returns {Node}
     * @protected
     * @abstract
     */
    createFunctionNode: function( functionInstance, container, builderNode, dragLayer ) {
      return new NumberFunctionNode( functionInstance, container, builderNode, dragLayer );
    }
  } );
} );
