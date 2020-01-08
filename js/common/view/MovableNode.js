// Copyright 2016-2019, University of Colorado Boulder

/**
 * Node for a Movable model element.
 * Stays synchronized with the Movable's position and handles dragging.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  /**
   * @param {Movable} movable
   * @param {Object} [options]
   * @constructor
   */
  function MovableNode( movable, options ) {

    options = merge( {

      draggable: true, // {boolean} is this node draggable?
      allowTouchSnag: true, // {boolean} allow touch swipes across this Node to pick it up
      cursor: 'pointer',
      startDrag: null, // {function|null} Called at the start of each drag sequence
      endDrag: null, // {function|null} Called at the end of each drag sequence

      // {function(Movable, Vector2, Vector2) moves the Movable while dragging
      translateMovable: function( movable, position, delta ) { movable.moveTo( position ); },

      // {function(Node, Vector2)} moves the Node when the Movable's position changes
      translateNode: function( node, position ) { node.center = position; }

    }, options );

    assert && assert( options.children, 'requires children to specify the look of the Movable' );

    const self = this;

    this.movable = movable; // @public

    Node.call( this, options );

    // unlink unnecessary, instances exist for lifetime of the sim
    movable.positionProperty.link( function( position ) {
        options.translateNode( self, position );
      }
    );

    let startDragOffset; // {Vector2} where the drag started relative to positionProperty, in parent view coordinates

    // @private
    if ( options.draggable ) {
      const dragHandler = new SimpleDragHandler( {

        allowTouchSnag: options.allowTouchSnag,

        start: function( event, trail ) {

          movable.dragging = true;
          options.startDrag && options.startDrag();

          // compute startDragOffset after calling options.startDrag, since options.startDrag may change parent
          const parent = self.getParents()[ 0 ]; // MovableNode can have multiple parents, can't use globalToParentPoint
          startDragOffset = parent.globalToLocalPoint( event.pointer.point ).minus( movable.positionProperty.get() );
        },

        // No need to constrain drag bounds because Movables return to carousel or builder when released.
        drag: function( event, trail ) {
          const previousPosition = movable.positionProperty.get();
          const parent = self.getParents()[ 0 ]; // MovableNode can have multiple parents, can't use globalToParentPoint
          const position = parent.globalToLocalPoint( event.pointer.point ).minus( startDragOffset );
          const delta = position.minus( previousPosition );
          options.translateMovable( movable, position, delta );
        },

        end: function( event, trail ) {
          movable.dragging = false;
          options.endDrag && options.endDrag();
        }
      } );
      this.addInputListener( dragHandler );
    }
  }

  functionBuilder.register( 'MovableNode', MovableNode );

  return inherit( Node, MovableNode );
} );
