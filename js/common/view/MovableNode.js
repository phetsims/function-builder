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
      startDrag: null, // {function|null} Called at the start of each drag sequence
      endDrag: null, // {function|null} Called at the end of each drag sequence

      // {function(Movable, Vector2) moves the Movable while dragging
      translateMovable: function( movable, location ) { movable.moveTo( location ); },

      // {function(Node, Vector2)} moves the Node when the Movable's location changes
      translateNode: function( node, location ) { node.center = location; }

    }, options );

    assert && assert( options.children, 'requires children to specify the look of the Movable' );

    Node.call( this, options );

    // unlink not necessary, all instances exist for the lifetime of the sim
    var thisNode = this;
    movable.locationProperty.link( function( location ) {
        options.translateNode( thisNode, location );
      }
    );

    this.addInputListener( new SimpleDragHandler( {

      // allow touch swipes across this Node to pick it up
      allowTouchSnag: true,

      start: function( event, trail ) {
        movable.dragging = true;
        options.startDrag && options.startDrag();
      },

      //TODO translate allows point to get disconnected from Node, use drag instead
      // No need to constrain drag bounds because functions return to carousel or builder when released.
      // @param { {Vector2} delta, {Vector2} oldPosition, {Vector2} position } translationParams
      translate: function( translationParams ) {
        var location = movable.locationProperty.get().plus( translationParams.delta );
        options.translateMovable( movable, location );
      },

      end: function( event, trail ) {
        movable.dragging = false;
        options.endDrag && options.endDrag();
      }
    } ) );
  }

  functionBuilder.register( 'MovableNode', MovableNode );

  return inherit( Node, MovableNode );
} );
