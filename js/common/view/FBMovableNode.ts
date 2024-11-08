// Copyright 2016-2023, University of Colorado Boulder

/**
 * Node for a FBMovable model element.
 * Stays synchronized with the FBMovable's position and handles dragging.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { DragListener, Node, NodeOptions } from '../../../../scenery/js/imports.js';
import functionBuilder from '../../functionBuilder.js';
import FBMovable from '../model/FBMovable.js';

type SelfOptions = {
  draggable?: boolean; // is this node draggable?
  allowTouchSnag?: boolean; // allow touch swipes across this Node to pick it up
  startDrag?: ( () => void ) | null; // Called at the start of each drag sequence
  endDrag?: ( () => void ) | null;  // Called at the end of each drag sequence

  // moves the FBMovable while dragging
  translateMovable?: ( movable: FBMovable, position: Vector2, delta: Vector2 ) => void;

  // moves the Node when the FBMovable's position changes
  translateNode?: ( node: Node, position: Vector2 ) => void;
};

export type MovableNodeOptions = SelfOptions;

export default class FBMovableNode extends Node {

  public readonly movable: FBMovable;

  public constructor( movable: FBMovable, providedOptions?: MovableNodeOptions ) {

    const options = optionize<MovableNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      draggable: true,
      allowTouchSnag: true,
      startDrag: null,
      endDrag: null,
      translateMovable: ( movable: FBMovable, position: Vector2, delta: Vector2 ) => movable.moveTo( position ),
      translateNode: ( node: Node, position: Vector2 ) => { node.center = position; },

      // NodeOptions
      cursor: 'pointer'

    }, providedOptions );

    assert && assert( options.children, 'requires children to specify the look of the FBMovable' );

    super( options );

    this.movable = movable;

    // removePositionListener is unnecessary, because instances exist for lifetime of the sim.
    movable.addPositionListener( position => {
        options.translateNode( this, position );
      }
    );

    if ( options.draggable ) {

      // where the drag started relative to positionProperty, in parent view coordinates
      let startDragOffset: Vector2;

      const dragListener = new DragListener( {

        allowTouchSnag: options.allowTouchSnag,

        start: ( event, trail ) => {

          movable.dragging = true;
          options.startDrag && options.startDrag();

          // compute startDragOffset after calling options.startDrag, since options.startDrag may change parent
          const parent = this.getParents()[ 0 ]; // MovableNode can have multiple parents, can't use globalToParentPoint
          startDragOffset = parent.globalToLocalPoint( event.pointer.point ).minus( movable.position );

          // We need to provide the bounds for the Node to keep in view because this implementation uses DAG and
          // the AnimatedPanZoomListener cannot find the unique Trail to keep in view.
          // TODO: This can likely be removed if https://github.com/phetsims/scenery/issues/1361 is addressed.
          const uniqueTrails = _.filter( this.getTrails(), trail => trail.containsNode( parent ) );
          assert && assert( uniqueTrails.length === 1, 'No trail found through parent, or no unique trail found' );
          dragListener.setCreatePanTargetBoundsFromTrail( uniqueTrails[ 0 ] );
        },

        // No need to constrain drag bounds because Movables return to carousel or builder when released.
        drag: ( event, trail ) => {
          const previousPosition = movable.position;
          const parent = this.getParents()[ 0 ]; // MovableNode can have multiple parents, can't use globalToParentPoint
          const position = parent.globalToLocalPoint( event.pointer.point ).minus( startDragOffset );
          const delta = position.minus( previousPosition );
          options.translateMovable( movable, position, delta );
        },

        end: () => {
          movable.dragging = false;
          options.endDrag && options.endDrag();
        }
      } );
      this.addInputListener( dragListener );
    }
  }
}

functionBuilder.register( 'FBMovableNode', FBMovableNode );