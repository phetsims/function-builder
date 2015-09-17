// Copyright 2002-2015, University of Colorado Boulder

/**
 * A stack of CardNode.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CardNode = require( 'FUNCTION_BUILDER/common/view/CardNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function CardStackNode( options ) {

    options = _.extend( {
      image: null, // {HTMLImageElement|MipMapArray|null}
      numberOfCards: 2,
      xOffset: 5,
      yOffset: 5
    }, options );
    options.children = [];

    // Create a stack of overlapping cards
    var previousNode = null;
    for ( var i = 0; i < options.numberOfCards; i++ ) {
      var cardNode = new CardNode( {
        image: options.image,
        left: previousNode ? ( previousNode.left + options.xOffset ) : 0,
        top: previousNode ? ( previousNode.top + options.yOffset ) : 0
      } );
      options.children.push( cardNode );
      previousNode = cardNode;
    }

    Node.call( this, options );
  }

  return inherit( Node, CardStackNode );
} );
