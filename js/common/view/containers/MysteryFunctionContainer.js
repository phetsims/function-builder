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

    this.functionCreator = functionCreator; // @private

    FunctionContainer.call( this, options );
  }

  functionBuilder.register( 'MysteryFunctionContainer', MysteryFunctionContainer );

  return inherit( FunctionContainer, MysteryFunctionContainer, {

    /***
     * Creates the model element for a function.
     *
     * @param {Vector2} location
     * @returns {MathFunction}
     * @protected
     * @abstract
     */
    createFunctionInstance: function( location ) {
      return this.functionCreator.createInstance( { location: this.carouselLocation } );
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
      return new MysteryFunctionNode( functionInstance, container, builderNode, dragLayer );
    }
  } );
} );
