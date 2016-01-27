// Copyright 2016, University of Colorado Boulder

/**
 * Container for Nodes of type MovableNode.
 * Behaves like a stack (last in, first out).
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
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var STROKE_BACKGROUND = FBQueryParameters.DEV; // {boolean} stroke the background, so we can see an empty container

  /**
   * @param {Node} parentNode - Nodes are attached to this parent when they are outside the container
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
    //TODO container shouldn't need this, figure out how to get rid of it
    this.location = options.location; // @public
    this.popOutOffset = options.popOutOffset.copy(); // @private

    this.nodes = []; // @public (read-only) {MovableNode[]} contents of the container, in stacking order

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
      movableNode: null,

      allowTouchSnag: true,

      start: function( event, trail ) {

        // remove the node from the container
        this.movableNode = thisNode.pop();

        // get the model element
        this.movable = this.movableNode.movable;
        this.movable.dragging = true;

        //TODO replace with: var modelLocation = thisNode.location
        // compute the model location
        var viewLocation = event.currentTarget.parentToGlobalPoint( event.currentTarget.center );
        var modelLocation = thisNode.parentNode.getParent().globalToLocalPoint( viewLocation );

        //TODO this should be initialized correctly in the first place
        // save location so that we know where to put the Movable back in the container
        thisNode.location = modelLocation;

        // pop out of the container
        this.movable.setLocation( modelLocation.plus( thisNode.popOutOffset ) );

        options.startDrag && options.startDrag( this.movable, event, trail );
      },

      translate: function( translationParams ) {
        var location = this.movable.locationProperty.get().plus( translationParams.delta );
        this.movable.setLocation( options.dragBounds.closestPointTo( location ) );
      },

      end: function( event, trail ) {
        this.movable.dragging = false;
        options.endDrag && options.endDrag( this.movable, this.movableNode, event, trail );
        this.movable = null;
        this.movableNode = null;
      }
    } ) );
    this.cursor = 'pointer';
  }

  functionBuilder.register( 'MovableContainerNode', MovableContainerNode );

  return inherit( Node, MovableContainerNode, {

    /**
     * Adds a Node to the container.
     * @param {MovableNode} node
     * @public
     */
    push: function( node ) {

      assert && assert( this.nodes.indexOf( node ) === -1, 'attempted to add twice' );

      // remove from parent
      if ( this.parentNode.hasChild( node ) ) {
        this.parentNode.removeChild( node );
      }

      // add to top of container
      node.pickable = false;
      node.movable.locationLocked = true;
      this.nodes.push( node );
      this.addChild( node );
      node.center = this.backgroundNode.center;

      // container is interactive when not empty
      this.pickable = true;
    },

    /**
     * Removes the Node that was most recently added to the container (last in, first out).
     * @returns {MovableNode}
     * @private
     */
    pop: function() {

      assert && assert( this.nodes.length > 0, 'container is empty' );

      // remove top node from container
      var node = this.nodes.pop();
      this.removeChild( node );
      node.movable.locationLocked = false;
      node.pickable = true;

      // container is interactive when not empty
      this.pickable = ( this.nodes.length > 0 );

      // add to parent
      this.parentNode.addChild( node );

      return node;
    }
  } );
} );
