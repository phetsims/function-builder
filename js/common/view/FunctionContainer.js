// Copyright 2016, University of Colorado Boulder

/**
 * Base type for function containers.
 * A function that is in a carousel is a descendant of this type of container.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableContainer = require( 'FUNCTION_BUILDER/common/view/MovableContainer' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function FunctionContainer( options ) {

    options = _.extend( {
      size: FBConstants.FUNCTION_SIZE
    }, options );

    MovableContainer.call( this, options );
  }

  functionBuilder.register( 'FunctionContainer', FunctionContainer );

  return inherit( MovableContainer, FunctionContainer, {

    /**
     * Creates functions and puts them in the container.
     *
     * @param {number} numberOfInstances
     * @param {Scene} scene
     * @param {BuilderNode} builderNode
     * @param {Node} dragLayer
     * @public
     */
    createFunctions: function( numberOfInstances, scene, builderNode, dragLayer ) {

      assert && assert( this.carouselLocation );

      for ( var i = 0; i < numberOfInstances; i++ ) {

        // model element
        var functionInstance = this.createFunctionInstance( this.carouselLocation );
        scene.functionInstances.push( functionInstance );

        // associated Node
        var functionNode = this.createFunctionNode( functionInstance, this, builderNode, dragLayer );

        // put the Node in this container
        this.addNode( functionNode );
      }
    },

    /***
     * Creates the model element for a function.
     *
     * @param {Vector2} location - the function's initial location
     * @returns {AbstractFunction}
     * @protected
     * @abstract
     */
    createFunctionInstance: function( location ) {
      throw new Error( 'must be implemented by subtype' );
    },

    /**
     * Creates the view element (Node) for a function.
     *
     * @param {AbstractFunction} functionInstance
     * @param {FunctionContainer} container
     * @param {BuilderNode} builderNode
     * @param {Node} dragLayer
     * @returns {Node}
     * @protected
     * @abstract
     */
    createFunctionNode: function( functionInstance, container, builderNode, dragLayer ) {
      throw new Error( 'must be implemented by subtype' );
    }
  } );
} );
