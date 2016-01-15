// Copyright 2016, University of Colorado Boulder

/**
 * Node that displays an {ImageFunction}, stays synchronized with its location, and handles dragging.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var ImageFunctionNode = require( 'FUNCTION_BUILDER/patterns/view/ImageFunctionNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableNode = require( 'FUNCTION_BUILDER/common/view/MovableNode' );

  /**
   * @param {ImageFunction} functionInstance
   * @param {Object} [options]
   * @constructor
   */
  function MovableImageFunctionNode( functionInstance, options ) {

    options = _.extend( {

      // dragging the Node moves it to the front
      startDrag: function( movable, event, trail ) {
        event.currentTarget.moveToFront();
      }
    }, options );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ new ImageFunctionNode( functionInstance ) ];

    MovableNode.call( this, functionInstance, options );
  }

  functionBuilder.register( 'MovableImageFunctionNode', MovableImageFunctionNode );

  return inherit( MovableNode, MovableImageFunctionNode );
} );
