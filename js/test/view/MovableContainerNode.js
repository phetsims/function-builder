// Copyright 2016, University of Colorado Boulder

/**
 * Container for Nodes of type MovableNode.
 * When a Node is in the container, it's location is locked, so that the container has full control of placement.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var STROKE_BACKGROUND = FBQueryParameters.DEV; // {boolean} stroke the background, so we can see an empty container

  /**
   * @param {Node} parentNode
   * @param {Object} [options]
   * @constructor
   */
  function MovableContainerNode( parentNode, options ) {

    options = _.extend( {

      // {Dimension2} size of Nodes in the container
      size: new Dimension2( 100, 100 ),

      // {Vector2} location where Nodes should enter/exit this container
      location: new Vector2( 0, 0 ),

      /**
       * {Vector2} How much to translate a Node when it's remove from the container,
       * makes the instance appear to 'pop out' of the container.
       */
      popOutOffset: new Vector2( 0, 0 ),

      // {Bounds2} constrain dragging to these bounds
      dragBounds: Bounds2.EVERYTHING.copy(),

      startDrag: null,
      endDrag: null

    }, options );

    this.parentNode = parentNode; // @private
    this.location = options.location; // @public
    this.popOutOffset = options.popOutOffset.copy(); // @private

    this.nodes = []; // @public (read-only) {MovableNode[]} contents of the container

    // @private
    this.backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height, {
      stroke: STROKE_BACKGROUND ? 'red' : null
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ this.backgroundNode ];

    Node.call( this, options );

    var thisNode = this;
    this.addInputListener( new SimpleDragHandler( {

      movable: null,

      allowTouchSnag: true,

      start: function( event, trail ) {
        var node = thisNode.pop();
        this.movable = node.movable;
        this.movable.dragging = true;
        this.movable.setLocation( thisNode.location.plus( thisNode.popOutOffset ) ); // pop out of container
        options.startDrag && options.startDrag( this.movable, event, trail );
      },

      translate: function( translationParams ) {
        var location = this.movable.locationProperty.get().plus( translationParams.delta );
        this.movable.setLocation( options.dragBounds.closestPointTo( location ) );
      },

      end: function( event, trail ) {
        this.movable.dragging = false;
        options.endDrag && options.endDrag( this.movable, event, trail );
        this.movable = null;
      }
    } ) );
    this.cursor = 'pointer';
  }

  return inherit( Node, MovableContainerNode, {

    /**
     * Adds a Node to the container and notifies observers.
     * @param {MovableNode} node
     * @public
     */
    push: function( node ) {

      assert && assert( this.nodes.indexOf( node ) === -1, 'attempted to add twice' );

      // remove from parent
      if ( this.parentNode.hasChild( node ) ) {
        this.parentNode.removeChild( node );
      }

      // add to container
      node.pickable = false;
      node.movable.locationLocked = true;
      this.nodes.push( node );
      this.addChild( node );
      node.center = this.backgroundNode.center;
    },

    /**
     * Removes the Node that was most recently added to
     * the container (last in, first out), and notifies observers.
     * @returns {MovableNode}
     * @private
     */
    pop: function() {

      assert && assert( this.nodes.length > 0, 'container is empty' );

      // remove from container
      var node = this.nodes.pop();
      this.removeChild( node );
      node.movable.locationLocked = false;
      node.pickable = true;

      // add to parent
      this.parentNode.addChild( node );

      return node;
    }
  } );
} );
