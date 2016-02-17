// Copyright 2002-2016, University of Colorado Boulder

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

      cursor: 'pointer',

      /**
       * Called at the start of each drag sequence.
       * {function(Event, Trail)|null}
       */
      startDrag: null,

      /**
       * Called at the end of each drag sequence.
       * {function(Event, Trail)|null}
       */
      endDrag: null,

      /**
       * Moves the node to the Movable's location.
       * By default, the location corresponds to the Node's center.
       *
       * @param {Node} node
       * @param {Vector2} location
       */
      translateNode: function( node, location ) {
        node.center = location;
      }
    }, options );

    assert && assert( options.children, 'requires children to specify the look of the Movable' );

    this.movable = movable; // @public

    Node.call( this, options );

    // move to the model location
    var thisNode = this;
    function locationObserver( location ) {
      options.translateNode( thisNode, location );
    }
    movable.locationProperty.link( locationObserver );

    // @private drag the function instance
    var dragHandler = new SimpleDragHandler( {

      // allow touch swipes across this Node to pick it up
      allowTouchSnag: true,

      start: function( event, trail ) {
        movable.dragging = true;
        options.startDrag && options.startDrag( event, trail );
      },

      // No need to constrain drag bounds because functions return to carousel or builder when released.
      // @param { {Vector2} delta, {Vector2} oldPosition, {Vector2} position } translationParams
      translate: function( translationParams ) {
        var location = movable.locationProperty.get().plus( translationParams.delta );
        movable.moveTo( location );
      },

      end: function( event, trail ) {
        movable.dragging = false;
        options.endDrag && options.endDrag( event, trail );
      }
    } );
    this.addInputListener( dragHandler );
  }

  functionBuilder.register( 'MovableNode', MovableNode );

  return inherit( Node, MovableNode );
} );
