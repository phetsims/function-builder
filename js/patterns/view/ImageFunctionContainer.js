// Copyright 2016, University of Colorado Boulder

/**
 * Container for image functions.
 *
 * Responsibilities:
 *
 * - create a specified number of {ImageFunction} function instances, all of the same type
 * - create an associated Node for each instance
 * - handle dragging instances out of the container
 * - decide what to do with an instance when the user stops dragging it
 * - return an instance to the container when it's location is the same as the container
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var ImageFunctionNode = require( 'FUNCTION_BUILDER/patterns/view/ImageFunctionNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableContainer = require( 'FUNCTION_BUILDER/common/view/MovableContainer' );

  /**
   * @param {constructor} FunctionConstructor - constructor for a subtype of {ImageFunction}
   * @param {Object} [options]
   * @constructor
   */
  function ImageFunctionContainer( FunctionConstructor, options ) {

    options = _.extend( {
      size: FBConstants.FUNCTION_SIZE
    }, options );

    this.FunctionConstructor = FunctionConstructor; // @private

    MovableContainer.call( this, options );
  }

  functionBuilder.register( 'ImageFunctionContainer', ImageFunctionContainer );

  return inherit( MovableContainer, ImageFunctionContainer, {

    /**
     * @param {number} numberOfInstances
     * @param {PatternsScene} scene
     * @param {BuilderNode} builderNode
     * @param {Node} worldNode
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
