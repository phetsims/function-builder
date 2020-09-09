// Copyright 2016-2020, University of Colorado Boulder

/**
 * Node for a Movable model element.
 * Stays synchronized with the Movable's position and handles dragging.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import functionBuilder from '../../functionBuilder.js';

class MovableNode extends Node {

  /**
   * @param {Movable} movable
   * @param {Object} [options]
   */
  constructor( movable, options ) {

    options = merge( {

      draggable: true, // {boolean} is this node draggable?
      allowTouchSnag: true, // {boolean} allow touch swipes across this Node to pick it up
      cursor: 'pointer',
      startDrag: null, // {function|null} Called at the start of each drag sequence
      endDrag: null, // {function|null} Called at the end of each drag sequence

      // {function(Movable, Vector2, Vector2) moves the Movable while dragging
      translateMovable: ( movable, position, delta ) => movable.moveTo( position ),

      // {function(Node, Vector2)} moves the Node when the Movable's position changes
      translateNode: ( node, position ) => { node.center = position; }

    }, options );

    assert && assert( options.children, 'requires children to specify the look of the Movable' );

    super( options );

    this.movable = movable; // @public

    // unlink unnecessary, instances exist for lifetime of the sim
    movable.positionProperty.link( position => {
        options.translateNode( this, position );
      }
    );

    let startDragOffset; // {Vector2} where the drag started relative to positionProperty, in parent view coordinates

    // @private
    if ( options.draggable ) {
      const dragListener = new DragListener( {

        allowTouchSnag: options.allowTouchSnag,

        start: ( event, trail ) => {

          movable.dragging = true;
          options.startDrag && options.startDrag();

          // compute startDragOffset after calling options.startDrag, since options.startDrag may change parent
          const parent = this.getParents()[ 0 ]; // MovableNode can have multiple parents, can't use globalToParentPoint
          startDragOffset = parent.globalToLocalPoint( event.pointer.point ).minus( movable.positionProperty.get() );
        },

        // No need to constrain drag bounds because Movables return to carousel or builder when released.
        drag: ( event, trail ) => {
          const previousPosition = movable.positionProperty.get();
          const parent = this.getParents()[ 0 ]; // MovableNode can have multiple parents, can't use globalToParentPoint
          const position = parent.globalToLocalPoint( event.pointer.point ).minus( startDragOffset );
          const delta = position.minus( previousPosition );
          options.translateMovable( movable, position, delta );
        },

        end: ( event, trail ) => {
          movable.dragging = false;
          options.endDrag && options.endDrag();
        }
      } );
      this.addInputListener( dragListener );
    }
  }
}

functionBuilder.register( 'MovableNode', MovableNode );

export default MovableNode;