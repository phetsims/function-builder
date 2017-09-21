// Copyright 2016-2017, University of Colorado Boulder

/**
 * Container for functions.
 * A container is intended to be put in a carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableContainer = require( 'FUNCTION_BUILDER/common/view/containers/MovableContainer' );

  /**
   * @param {FunctionCreator} functionCreator - creates function instances
   * @param {constructor} functionNodeConstructor - constructor for subtype of FunctionNode
   * @param {Object} [options]
   * @constructor
   */
  function FunctionContainer( functionCreator, functionNodeConstructor, options ) {

    options = _.extend( {
      size: FBConstants.FUNCTION_SIZE
    }, options );

    // @private
    this.functionCreator = functionCreator;
    this.functionNodeConstructor = functionNodeConstructor;

    MovableContainer.call( this, options );
  }

  functionBuilder.register( 'FunctionContainer', FunctionContainer );

  return inherit( MovableContainer, FunctionContainer, {

    /**
     * Gets the constructor associated with this container.
     * @returns {constructor} constructor for a subtype of AbstractFunction
     */
    getFunctionConstructor: function() {
      return this.functionCreator.functionConstructor;
    },

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
      assert && assert( this.isEmpty(), 'did you accidentally call this function twice?' );

      for ( var i = 0; i < numberOfInstances; i++ ) {

        // model element
        var functionInstance = this.functionCreator.createInstance( { location: this.carouselLocation } );
        scene.functionInstances.push( functionInstance );

        // associated Node
        var functionNode = new this.functionNodeConstructor( functionInstance, this, builderNode, dragLayer );

        // put the Node in this container
        this.addNode( functionNode );
      }
    }
  } );
} );
