// Copyright 2016-2020, University of Colorado Boulder

/**
 * Container for functions.
 * A container is intended to be put in a carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../../phet-core/js/inherit.js';
import merge from '../../../../../phet-core/js/merge.js';
import functionBuilder from '../../../functionBuilder.js';
import FBConstants from '../../FBConstants.js';
import MovableContainer from './MovableContainer.js';

/**
 * @param {FunctionCreator} functionCreator - creates function instances
 * @param {constructor} functionNodeConstructor - constructor for subtype of FunctionNode
 * @param {Object} [options]
 * @constructor
 */
function FunctionContainer( functionCreator, functionNodeConstructor, options ) {

  options = merge( {
    size: FBConstants.FUNCTION_SIZE
  }, options );

  // @private
  this.functionCreator = functionCreator;
  this.functionNodeConstructor = functionNodeConstructor;

  MovableContainer.call( this, options );
}

functionBuilder.register( 'FunctionContainer', FunctionContainer );

export default inherit( MovableContainer, FunctionContainer, {

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

    assert && assert( this.carouselPosition );
    assert && assert( this.isEmpty(), 'did you accidentally call this function twice?' );

    for ( let i = 0; i < numberOfInstances; i++ ) {

      // model element
      const functionInstance = this.functionCreator.createInstance( { position: this.carouselPosition } );
      scene.functionInstances.push( functionInstance );

      // associated Node
      const functionNode = new this.functionNodeConstructor( functionInstance, this, builderNode, dragLayer );

      // put the Node in this container
      this.addNode( functionNode );
    }
  }
} );