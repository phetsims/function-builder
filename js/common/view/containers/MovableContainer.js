// Copyright 2016-2021, University of Colorado Boulder

/**
 * Base type for FBMovable containers.
 * A container is intended to be put in a carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Emitter from '../../../../../axon/js/Emitter.js';
import NumberProperty from '../../../../../axon/js/NumberProperty.js';
import Dimension2 from '../../../../../dot/js/Dimension2.js';
import merge from '../../../../../phet-core/js/merge.js';
import { Node, Rectangle } from '../../../../../scenery/js/imports.js';
import functionBuilder from '../../../functionBuilder.js';
import FBQueryParameters from '../../FBQueryParameters.js';

class MovableContainer extends Node {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      size: new Dimension2( 100, 100 ), // {Dimension2} size of the container
      emptyNode: null // {Node|null} node that's visible when the container is empty
    }, options );

    // invisible background, so that an empty container has dimensions
    const backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height, {
      stroke: FBQueryParameters.showContainers ? 'red' : null
    } );

    // parent for contents of the container
    const contentsParent = new Node();

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode ];
    options.emptyNode && options.children.push( options.emptyNode );
    options.children.push( contentsParent );

    super( options );

    // @private
    this.backgroundNode = backgroundNode;
    this.contentsParent = contentsParent;

    // @public position of container when it's visible in the carousel. Set after carousel is attached to scene.
    this.carouselPosition = null;

    // @public (read-only) number of items in the container
    this.numberOfItemsProperty = new NumberProperty( 0, { numberType: 'Integer' } );

    // @public emit is called when a Node is added
    this.addEmitter = new Emitter( {
      parameters: [ { valueType: Node } ]
    } );

    // @public emit is called when a Node is removed
    this.removeEmitter = new Emitter( {
      parameters: [ { valueType: Node } ]
    } );
  }

  /**
   * Is the specified Node in the container?
   * @param {MovableNode} node
   * @returns {boolean}
   * @public
   */
  containsNode( node ) {
    return ( this.contentsParent.hasChild( node ) );
  }

  /**
   * Adds a Node to the container.
   * @param {MovableNode} node
   * @public
   */
  addNode( node ) {

    // add the node
    this.contentsParent.addChild( node );
    node.movable.moveTo( this.carouselPosition );
    node.center = this.backgroundNode.center;

    // update count
    this.numberOfItemsProperty.set( this.numberOfItemsProperty.get() + 1 );

    // notify observers
    this.addEmitter.emit( node );
  }

  /**
   * Removes a Node from the container.
   * @param {MovableNode} node
   * @public
   */
  removeNode( node ) {

    // remove the node
    this.contentsParent.removeChild( node );

    // update count
    this.numberOfItemsProperty.set( this.numberOfItemsProperty.get() - 1 );

    // notify observers
    this.removeEmitter.emit( node );
  }

  /**
   * Gets the contents of the container.
   * @returns {MovableNode[]} a copy of the set of Nodes in the container
   * @public
   */
  getContents() {
    return this.contentsParent.getChildren();
  }

  /**
   * Is the container empty?
   * @returns {boolean}
   * @public
   */
  isEmpty() {
    return ( this.numberOfItemsProperty.get() === 0 );
  }
}

functionBuilder.register( 'MovableContainer', MovableContainer );

export default MovableContainer;