// Copyright 2015-2016, University of Colorado Boulder

/**
 * Node for a Movable model element.
 * Stays synchronized with the Movable's location and handles dragging.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  /**
   * @param {Movable} movable
   * @param {Object} [options]
   * @constructor
   */
  function MovableNode( movable, options ) {

    options = _.extend( {

      allowTouchSnag: true, // {boolean} allow touch swipes across this Node to pick it up
      cursor: 'pointer',
      startDrag: null, // {function|null} Called at the start of each drag sequence
      endDrag: null, // {function|null} Called at the end of each drag sequence

      // {function(Movable, Vector2, Vector2) moves the Movable while dragging
      translateMovable: function( movable, location, delta ) { movable.moveTo( location ); },

      // {function(Node, Vector2)} moves the Node when the Movable's location changes
      translateNode: function( node, location ) { node.center = location; }

    }, options );

    assert && assert( options.children, 'requires children to specify the look of the Movable' );

    var thisNode = this;

    this.movable = movable; // @public

    Node.call( this, options );

    // unlink unnecessary, instances exist for lifetime of the sim
    movable.locationProperty.link( function( location ) {
        options.translateNode( thisNode, location );
      }
    );

    var startDragOffset; // {Vector2} where the drag started relative to locationProperty, in parent view coordinates

    // @private
    this.dragHandler = new SimpleDragHandler( {

      allowTouchSnag: options.allowTouchSnag,

      start: function( event, trail ) {

        movable.dragging = true;
        options.startDrag && options.startDrag();

        // compute startDragOffset after calling options.startDrag, since options.startDrag may change parent
        var parent = thisNode.getParents()[ 0 ]; // MovableNode can have multiple parents, can't use globalToParentPoint
        startDragOffset = parent.globalToLocalPoint( event.pointer.point ).minus( movable.locationProperty.get() );
      },

      // No need to constrain drag bounds because Movables return to carousel or builder when released.
      drag: function( event, trail ) {
        var previousLocation = movable.locationProperty.get();
        var parent = thisNode.getParents()[ 0 ]; // MovableNode can have multiple parents, can't use globalToParentPoint
        var location = parent.globalToLocalPoint( event.pointer.point ).minus( startDragOffset );
        var delta = location.minus( previousLocation );
        options.translateMovable( movable, location, delta );
      },

      end: function( event, trail ) {
        movable.dragging = false;
        options.endDrag && options.endDrag();
      }
    } );
    this.addInputListener( this.dragHandler );
  }

  functionBuilder.register( 'MovableNode', MovableNode );

  return inherit( Node, MovableNode, {

    //TODO Replace when general support is added to scenery, see https://github.com/phetsims/scenery/issues/218.
    /**
     * Cancels a drag that is in progress.
     * If no drag is in progress, this is a no-op.
     * @public
     */
    cancelDrag: function() {
      if ( this.movable.dragging ) {
        this.dragHandler.endDrag( null /* event */ );
      }
    }
  } );
} );
