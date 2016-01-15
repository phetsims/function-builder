// Copyright 2016, University of Colorado Boulder

/**
 * Node associated with a card, stays synchronized with the card's location and handles dragging.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CardNode = require( 'FUNCTION_BUILDER/common/view/CardNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableNode = require( 'FUNCTION_BUILDER/common/view/MovableNode' );

  /**
   * @param {AbstractCard} card
   * @param {Object} [options]
   * @constructor
   */
  function MovableCardNode( card, options ) {

    options = _.extend( {

      // dragging the Node moves it to the front
      startDrag: function( movable, event, trail ) {
        event.currentTarget.moveToFront();
      }
    }, options );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ new CardNode( card ) ];

    MovableNode.call( this, card, options );
  }

  functionBuilder.register( 'MovableCardNode', MovableCardNode );

  return inherit( MovableNode, MovableCardNode );
} );
