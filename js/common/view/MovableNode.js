// Copyright 2002-2016, University of Colorado Boulder

/**
 * Node for a Movable model element.
 * Stays synchronized with the Movable and handles dragging.
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
       * {function} called at the start of each drag sequence
       *
       * @param {Movable} movable
       * @param {Event} event
       * @param {Trail} trail
       */
      startDrag: function( movable, event, trail ) {},

      /**
       * {function} called at the end of each drag sequence
       *
       * @param {Movable} movable
       * @param {Event} event
       * @param {Trail} trail
       */
      endDrag: function( movable, event, trail ) {},

      /**
       * Moves the node to the Movable's location.
       *
       * @param {Node} node
       * @param {Vector2} location
       */
      translateNode: function( node, location ) {
        node.center = location;
      }

    }, options );

    assert && assert( options.children, 'requires children to specify the look of the Movable' );

    Node.call( this, options );

    // move to the model location
    var thisNode = this;
    function locationObserver( location ) {
      options.translateNode( thisNode, location );
    }
    movable.locationProperty.link( locationObserver );

    // drag the function instance
    this.addInputListener( new SimpleDragHandler( {

      //TODO cancel drag if movable is disposed of during a drag cycle, scenery#218

      allowTouchSnag: true,

      start: function( event, trail ) {
        movable.dragging = true;
        options.startDrag( movable, event, trail );
      },

      // No need to constrain drag bounds because functions return to carousel or builder when released.
      // @param { {Vector2} delta, {Vector2} oldPosition, {Vector2} position } } translationParams
      translate: function( translationParams ) {
        movable.setLocationDelta( translationParams.delta );
      },

      end: function( event, trail ) {
        movable.dragging = false;
        options.endDrag( movable, event, trail );
      }
    } ) );

    // @private
    this.disposeMovableNode = function() {
      movable.locationProperty.unlink( locationObserver );
    };
  }

  functionBuilder.register( 'MovableNode', MovableNode );

  return inherit( Node, MovableNode, {

    // @public
    dispose: function() {
      functionBuilder.log && functionBuilder.log( this.constructor.name + '.dispose' );
      this.disposeMovableNode();
    }
  } );
} );
