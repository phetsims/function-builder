// Copyright 2016, University of Colorado Boulder

/**
 * Node that displays an {ImageCard}, stays synchronized with its location, and handles dragging.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var ImageCardNode = require( 'FUNCTION_BUILDER/common/view/ImageCardNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableNode = require( 'FUNCTION_BUILDER/common/view/MovableNode' );

  /**
   * @param {ImageCard} card
   * @param {Object} [options]
   * @constructor
   */
  function MovableImageCardNode( card, options ) {

    options = _.extend( {

      // dragging the Node moves it to the front
      startDrag: function( movable, event, trail ) {
        event.currentTarget.moveToFront();
      }
    }, options );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ new ImageCardNode( card ) ];

    MovableNode.call( this, card, options );
  }

  functionBuilder.register( 'MovableImageCardNode', MovableImageCardNode );

  return inherit( MovableNode, MovableImageCardNode );
} );
