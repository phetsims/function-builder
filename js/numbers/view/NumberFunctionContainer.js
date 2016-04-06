// Copyright 2016, University of Colorado Boulder

//TODO much in common with ImageFunctionContainer
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
        var functionInstance = new NumberFunction( this.functionData, {
          location: this.carouselLocation
        } );
        scene.functionInstances.push( functionInstance );

        // associated Node
        var functionNode = new NumberFunctionNode( functionInstance, this, builderNode, dragLayer );

        // put the Node in this container
        this.addNode( functionNode );
      }
    }
  } );
} );
