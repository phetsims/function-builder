// Copyright 2016, University of Colorado Boulder

/**
 * Container for equation functions. This container is intended to be put in a carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EquationFunctionNode = require( 'FUNCTION_BUILDER/equations/view/EquationFunctionNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionContainer = require( 'FUNCTION_BUILDER/common/view/FunctionContainer' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathFunction = require( 'FUNCTION_BUILDER/common/model/MathFunction' );

  /**
   * @param {Object} functionData - data structure for creating EquationFunction instances
   * @param {Object} [options]
   * @constructor
   */
  function EquationFunctionContainer( functionData, options ) {
    this.functionData = functionData; // @private
    FunctionContainer.call( this, options );
  }

  functionBuilder.register( 'EquationFunctionContainer', EquationFunctionContainer );

  return inherit( FunctionContainer, EquationFunctionContainer, {

    /***
     * Creates the model element for a function.
     * See supertype FunctionContainer.createFunctionInstance for params.
     * @returns {AbstractFunction}
     * @protected
     * @abstract
     */
    createFunctionInstance: function( location ) {
      return new MathFunction( this.functionData.apply, this.functionData.operatorString,
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
      return new EquationFunctionNode( functionInstance, container, builderNode, dragLayer );
    }
  } );
} );
