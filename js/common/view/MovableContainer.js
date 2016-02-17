// Copyright 2016, University of Colorado Boulder

/**
 * Container for Nodes of type MovableNode.
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
      return ( this.hasChild( node ) );
    },

    /**
     * Adds a Node to the container.
     * @param {MovableNode} node
     * @public
     */
    addNode: function( node ) {
      assert && assert( !this.containsNode( node ), 'node is already in container, ' + node.constructor.name );
      this.addChild( node );
      node.center = this.backgroundNode.center;
    },

    /**
     * Removes a Node from the container.
     * @param {MovableNode} node
     * @private
     */
    removeNode: function( node ) {
      assert && assert( this.containsNode( node ), 'node is not in container, ' + node.constructor.name );
      this.removeChild( node );
    }
  } );
} );
