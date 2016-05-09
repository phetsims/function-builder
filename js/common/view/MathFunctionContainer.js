// Copyright 2016, University of Colorado Boulder

/**
 * Container for mathematical functions.
 * This container is intended to be put in a carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionContainer = require( 'FUNCTION_BUILDER/common/view/FunctionContainer' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathFunctionNode = require( 'FUNCTION_BUILDER/common/view/MathFunctionNode' );

  /**
   * @param {Object} functionData - function constructors and options
   * @param {Object} [options]
   * @constructor
   */
  function MathFunctionContainer( functionData, options ) {

    this.functionData = functionData; // @private

    FunctionContainer.call( this, options );
  }

  functionBuilder.register( 'MathFunctionContainer', MathFunctionContainer );

  return inherit( FunctionContainer, MathFunctionContainer, {

    /***
     * Creates the model element for a function.
     * See supertype FunctionContainer.createFunctionInstance for params.
     *
     * @returns {MathFunction}
     * @protected
     * @abstract
     */
    createFunctionInstance: function( location ) {
      var FunctionConstructor = this.functionData.functionConstructor;
      return new FunctionConstructor( _.extend( {
          location: this.carouselLocation
        }, this.functionData.options )
      );
    },

    /**
     * Creates the view element for a function.
     * See supertype FunctionContainer.createFunctionNode for params.
     *
     * @returns {MathFunctionNode}
     * @protected
     * @abstract
     */
    createFunctionNode: function( functionInstance, container, builderNode, dragLayer ) {
      return new MathFunctionNode( functionInstance, container, builderNode, dragLayer );
    }
  } );
} );
