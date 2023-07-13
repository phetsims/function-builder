// Copyright 2016-2023, University of Colorado Boulder

/**
 * Container for functions.
 * A container is intended to be put in a carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../../phet-core/js/merge.js';
import functionBuilder from '../../../functionBuilder.js';
import FBConstants from '../../FBConstants.js';
import MovableContainer from './MovableContainer.js';

export default class FunctionContainer extends MovableContainer {

  /**
   * @param {FunctionCreator} functionCreator - creates function instances
   * @param {constructor} functionNodeConstructor - constructor for subtype of FunctionNode
   * @param {Object} [options]
   */
  constructor( functionCreator, functionNodeConstructor, options ) {

    options = merge( {
      size: FBConstants.FUNCTION_SIZE
    }, options );

    super( options );

    // @private
    this.functionCreator = functionCreator;
    this.functionNodeConstructor = functionNodeConstructor;
  }

  /**
   * Gets the constructor associated with this container.
   * @returns {constructor} constructor for a subtype of AbstractFunction
   * @public
   */
  getFunctionConstructor() {
    return this.functionCreator.functionConstructor;
  }

  /**
   * Creates functions and puts them in the container.
   *
   * @param {number} numberOfInstances
   * @param {FBScene} scene
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer
   * @public
   */
  createFunctions( numberOfInstances, scene, builderNode, dragLayer ) {

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
}

functionBuilder.register( 'FunctionContainer', FunctionContainer );