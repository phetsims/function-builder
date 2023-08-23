// Copyright 2016-2023, University of Colorado Boulder

/**
 * Base type for FBMovable containers.
 * A container is intended to be put in a carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Emitter from '../../../../../axon/js/Emitter.js';
import NumberProperty from '../../../../../axon/js/NumberProperty.js';
import Dimension2 from '../../../../../dot/js/Dimension2.js';
import { Color, Node, NodeOptions, NodeTranslationOptions, Rectangle } from '../../../../../scenery/js/imports.js';
import functionBuilder from '../../../functionBuilder.js';
import FBQueryParameters from '../../FBQueryParameters.js';
import optionize from '../../../../../phet-core/js/optionize.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import Property from '../../../../../axon/js/Property.js';
import FBMovableNode from '../FBMovableNode.js';

type SelfOptions = {
  size?: Dimension2; // size of the container
  emptyNode?: Node | null; // node that's visible when the container is empty
};
export type MovableContainerOptions = SelfOptions & NodeTranslationOptions;


export default class MovableContainer extends Node {

  private readonly backgroundNode: Node; // for layout
  private readonly contentsParent: Node;

  // The position of the container when it's visible in the carousel. This is set after carousel is attached to scene.
  public carouselPosition: Vector2 | null;

  public readonly numberOfItemsProperty: Property<number>; // number of items in the container
  public readonly addEmitter: Emitter<[ FBMovableNode ]>; // emit is called when a Node is added
  public readonly removeEmitter: Emitter<[ FBMovableNode ]>; // emit is called when a Node is removed

  protected constructor( providedOptions?: MovableContainerOptions ) {

    const options = optionize<MovableContainerOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      size: new Dimension2( 100, 100 ),
      emptyNode: null
    }, providedOptions );

    // invisible background, so that an empty container has dimensions
    const backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height, {

      // transparent instead of null because we need bounds for the items in the Carousels
      stroke: FBQueryParameters.showContainers ? 'red' : Color.transparent
    } );

    // parent for contents of the container
    const contentsParent = new Node();

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode ];
    options.emptyNode && options.children.push( options.emptyNode );
    options.children.push( contentsParent );

    super( options );

    this.backgroundNode = backgroundNode;
    this.contentsParent = contentsParent;
    this.carouselPosition = null;

    this.numberOfItemsProperty = new NumberProperty( 0, { numberType: 'Integer' } );

    this.addEmitter = new Emitter( {
      parameters: [ { valueType: Node } ]
    } );

    this.removeEmitter = new Emitter( {
      parameters: [ { valueType: Node } ]
    } );
  }

  /**
   * Is the specified Node in the container?
   */
  public containsNode( node: FBMovableNode ): boolean {
    return ( this.contentsParent.hasChild( node ) );
  }

  /**
   * Adds a Node to the container.
   */
  public addNode( node: FBMovableNode ): void {

    const carouselPosition = this.carouselPosition!;
    assert && assert( carouselPosition, 'addNode was called before carouselPosition was set' );

    // add the node
    this.contentsParent.addChild( node );
    node.movable.moveTo( carouselPosition );
    node.center = this.backgroundNode.center;

    // update count
    this.numberOfItemsProperty.value = this.numberOfItemsProperty.value + 1;

    // notify observers
    this.addEmitter.emit( node );
  }

  /**
   * Removes a Node from the container.
   */
  public removeNode( node: FBMovableNode ): void {

    // remove the node
    this.contentsParent.removeChild( node );

    // update count
    this.numberOfItemsProperty.value = this.numberOfItemsProperty.value - 1;

    // notify observers
    this.removeEmitter.emit( node );
  }

  /**
   * Returns a copy of the contents of the container.
   */
  public getContents(): FBMovableNode[] {
    const nodes = this.contentsParent.getChildren() as FBMovableNode[];
    assert && assert( _.every( nodes, node => node instanceof FBMovableNode ), 'expected all contents to be FBMovableNode' );
    return nodes;
  }

  /**
   * Is the container empty?
   */
  public isEmpty(): boolean {
    return ( this.numberOfItemsProperty.value === 0 );
  }
}

functionBuilder.register( 'MovableContainer', MovableContainer );