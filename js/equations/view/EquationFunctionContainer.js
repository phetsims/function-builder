// Copyright 2016, University of Colorado Boulder

//TODO much in common with EquationFunctionContainer
/**
 * Container for equation functions. This container is intended to be put in a carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EquationFunction = require( 'FUNCTION_BUILDER/equations/model/EquationFunction' );
  var EquationFunctionNode = require( 'FUNCTION_BUILDER/equations/view/EquationFunctionNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionContainer = require( 'FUNCTION_BUILDER/common/view/FunctionContainer' );
  var inherit = require( 'PHET_CORE/inherit' );

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

    /**
     * Creates functions and puts them in the container.
     * See supertype FunctionContainer.createFunctions for params.
     * @override
     * @public
     */
    createFunctions: function( numberOfInstances, scene, builderNode, dragLayer ) {

      assert && assert( this.carouselLocation );

      for ( var i = 0; i < numberOfInstances; i++ ) {

        // model element
        var functionOptions = _.extend( {
          location: this.carouselLocation
        }, this.functionData.options );
        var functionInstance = new EquationFunction(
          this.functionData.operatorString, this.functionData.apply, functionOptions );

        // associated Node
        var functionNode = new EquationFunctionNode( functionInstance, this, builderNode, dragLayer );
        scene.functionInstances.push( functionInstance );

        // put the Node in this container
        this.addNode( functionNode );
      }
    }
  } );
} );
