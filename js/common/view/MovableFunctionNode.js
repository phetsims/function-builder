// Copyright 2002-2015, University of Colorado Boulder

/**
 * Node associated with an {AbstractFunction}, stays synchronized with the card's location and handles dragging.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableNode = require( 'FUNCTION_BUILDER/common/view/MovableNode' );

  /**
   * @param {AbstractFunction} functionInstance
   * @param {Object} [options]
   * @constructor
   */
  function MovableFunctionNode( functionInstance, options ) {

    options = _.extend( {

      // dragging the Node moves it to the front
      startDrag: function( movable, event, trail ) {
        event.currentTarget.moveToFront();
      }
    }, options );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ new FunctionNode( functionInstance ) ];

    MovableNode.call( this, functionInstance, options );
  }

  functionBuilder.register( 'MovableFunctionNode', MovableFunctionNode );

  return inherit( MovableNode, MovableFunctionNode );
} );
