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
  var MathFunction = require( 'FUNCTION_BUILDER/common/model/MathFunction' );
  var MathFunctionNode = require( 'FUNCTION_BUILDER/common/view/MathFunctionNode' );

  /**
   * @param {Object} functionData - data structure for creating MathFunction instances
   * @param {Object} [options]
   * @constructor
   */
  function MathFunctionContainer( functionData, options ) {

    options = _.extend( {
      operandMutable: false // {boolean} is the function operand mutable?
    }, options );

    this.functionData = functionData; // @private
    this.operandMutable = options.operandMutable; // @private

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
      return new MathFunction( this.functionData.apply, this.functionData.operatorString,
        _.extend( {
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
      return new MathFunctionNode( functionInstance, container, builderNode, dragLayer, {
        operandMutable: this.operandMutable
      } );
    }
  } );
} );
