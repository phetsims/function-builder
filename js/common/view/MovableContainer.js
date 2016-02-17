// Copyright 2016, University of Colorado Boulder

/**
 * Container for Nodes of type MovableNode. Behaves like a stack (last in, first out).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // constants
  var STROKE_BACKGROUND = FBQueryParameters.DEV; // {boolean} stroke the background, so we can see an empty container

  /**
   * @param {Object} [options]
   * @constructor
   */
  function MovableContainer( options ) {

    options = _.extend( {
      size: new Dimension2( 100, 100 ) // {Dimension2} size of the container
    }, options );

    this.nodes = []; // @protected {MovableNode[]} contents of the container, in stacking order

    // @public location of container when it's visible in the carousel. Set after carousel is attached to scene.
    this.carouselLocation = null;

    // @private
    this.backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height, {
      stroke: STROKE_BACKGROUND ? 'red' : null
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ this.backgroundNode ];

    Node.call( this, options );
  }

  functionBuilder.register( 'MovableContainer', MovableContainer );

  return inherit( Node, MovableContainer, {

    /**
     * Is the specified Node in the container?
     * @param {MovableNode} node
     * @returns {boolean}
     */
    containsNode: function( node ) {
      return ( this.nodes.indexOf( node ) !== -1 );
    },

    /**
     * Adds a Node to the container.
     * @param {MovableNode} node
     * @public
     */
    pushNode: function( node ) {

      assert && assert( !this.containsNode( node ), 'attempted to push Node twice, ' + node.constructor.name );

      // previous top node is no longer interactive
      if ( this.nodes.length > 0 ) {
        this.nodes[ this.nodes.length - 1 ].pickable = false;
      }

      // add to top of container
      this.nodes.push( node );
      this.addChild( node );
      node.center = this.backgroundNode.center;
    },

    /**
     * Removes the Node that was most recently added to the container (last in, first out).
     * @returns {MovableNode}
     * @private
     */
    popNode: function() {

      assert && assert( this.nodes.length > 0, 'container is empty' );

      // remove top node from container
      var node = this.nodes.pop();
      this.removeChild( node );

      // new top node is interactive
      if ( this.nodes.length > 0 ) {
        this.nodes[ this.nodes.length - 1 ].pickable = true;
      }

      return node;
    }
  } );
} );
