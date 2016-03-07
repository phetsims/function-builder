// Copyright 2016, University of Colorado Boulder

/**
 * Container for image functions.
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

    /**
     * Creates functions and puts them in the container.
     *
     * @param {number} numberOfInstances
     * @param {PatternsScene} scene
     * @param {BuilderNode} builderNode
     * @param {Node} worldNode
     * @override
     * @public
     */
    createFunctions: function( numberOfInstances, scene, builderNode, worldNode ) {

      assert && assert( this.carouselLocation );

      for ( var i = 0; i < numberOfInstances; i++ ) {

        // model element
        var functionInstance = new this.FunctionConstructor( {
          location: this.carouselLocation
        } );
        scene.functionInstances.push( functionInstance );

        // associated Node
        var functionNode = new ImageFunctionNode( functionInstance, this, builderNode, worldNode );

        // put the Node in this container
        this.addNode( functionNode );
      }
    }
  } );
} );
