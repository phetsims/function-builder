// Copyright 2016-2019, University of Colorado Boulder

/**
 * Base type for Movable containers.
 * A container is intended to be put in a carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var Emitter = require( 'AXON/Emitter' );
  var FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function MovableContainer( options ) {

    options = _.extend( {
      size: new Dimension2( 100, 100 ), // {Dimension2} size of the container
      emptyNode: null // {Node|null} node that's visible when the container is empty
    }, options );

    // @public location of container when it's visible in the carousel. Set after carousel is attached to scene.
    this.carouselLocation = null;

    // @private invisible background, so that an empty container has dimensions
    this.backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height, {
      stroke: FBQueryParameters.showContainers ? 'red' : null
    } );

    // @private parent for contents of the container
    this.contentsParent = new Node();

    // @public (read-only) number of items in the container
    this.numberOfItemsProperty = new NumberProperty( 0, { numberType: 'Integer' } );

    // @public emit is called when a Node is added
    this.addEmitter = new Emitter( {
      parameters: [ { valueType: Node } ]
    } );

    // @public emit is called when a Node is removed
    this.removeEmitter = new Emitter( {
      parameters: [ { valueType: Node } ]
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ this.backgroundNode ];
    options.emptyNode && options.children.push( options.emptyNode );
    options.children.push( this.contentsParent );

    Node.call( this, options );
  }

  functionBuilder.register( 'MovableContainer', MovableContainer );

  return inherit( Node, MovableContainer, {

    /**
     * Is the specified Node in the container?
     *
     * @param {MovableNode} node
     * @returns {boolean}
     * @public
     */
    containsNode: function( node ) {
      return ( this.contentsParent.hasChild( node ) );
    },

    /**
     * Adds a Node to the container.
     *
     * @param {MovableNode} node
     * @public
     */
    addNode: function( node ) {

      // add the node
      this.contentsParent.addChild( node );
      node.movable.moveTo( this.carouselLocation );
      node.center = this.backgroundNode.center;

      // update count
      this.numberOfItemsProperty.set( this.numberOfItemsProperty.get() + 1 );

      // notify observers
      this.addEmitter.emit( node );
    },

    /**
     * Removes a Node from the container.
     *
     * @param {MovableNode} node
     * @public
     */
    removeNode: function( node ) {

      // remove the node
      this.contentsParent.removeChild( node );

      // update count
      this.numberOfItemsProperty.set( this.numberOfItemsProperty.get() - 1 );

      // notify observers
      this.removeEmitter.emit( node );
    },

    /**
     * Gets the contents of the container.
     *
     * @returns {MovableNode[]} a copy of the set of Nodes in the container
     * @public
     */
    getContents: function() {
      return this.contentsParent.getChildren();
    },

    /**
     * Is the container empty?
     *
     * @returns {boolean}
     */
    isEmpty: function() {
      return ( this.numberOfItemsProperty.get() === 0 );
    }
  } );
} );
