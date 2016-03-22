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
  var NumberFunctionNode = require( 'FUNCTION_BUILDER/numbers/view/NumberFunctionNode' );

  /**
   * @param {constructor} FunctionConstructor - constructor for a subtype of {NumberFunction}
   * @param {Object} [options]
   * @constructor
   */
  function NumberFunctionContainer( FunctionConstructor, options ) {
    this.FunctionConstructor = FunctionConstructor; // @private
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
    createFunctions: function( numberOfInstances, scene, builderNode, dragLayer, animationLayer ) {

      assert && assert( this.carouselLocation );

      for ( var i = 0; i < numberOfInstances; i++ ) {

        // model element
        var functionInstance = new this.FunctionConstructor( {
          location: this.carouselLocation
        } );
        scene.functionInstances.push( functionInstance );

        // associated Node
        var functionNode = new NumberFunctionNode( functionInstance, this, builderNode, dragLayer, animationLayer );

        // put the Node in this container
        this.addNode( functionNode );
      }
    }
  } );
} );
