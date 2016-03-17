// Copyright 2016, University of Colorado Boulder

/**
 * Layer that implements the 'See Inside' feature. Each function in the builders has a 'window' at its right edge,
 * which lets you see the card change as it moves through the builder.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @param {Builder} builder
   * @param {Object} [options]
   * @constructor
   */
  function SeeInsideLayer( builder, options ) {

    options = options || {};
    options.pickable = false; // so that cards in this layer are not pickable

    // add a window at the right end of each slot
    var windowsShape = new Shape();
    for ( var i = 0; i < builder.slots.length; i++ ) {

      var windowX = builder.slots[ i ].location.x +
                    ( FBConstants.FUNCTION_SIZE.width / 2 ) -
                    ( FBConstants.FUNCTION_X_INSET_FACTOR * FBConstants.FUNCTION_SIZE.width / 2 ) -
                    ( FBConstants.CARD_SIZE.width / 2 );
      var windowY = builder.location.y - ( FBConstants.CARD_SIZE.height / 2 );
      if ( i !== 0 ) {
        // move to center of rounded rect, so we don't see a line at rounded corner
        windowsShape.moveTo( windowX + 10, windowY );
      }
      windowsShape.roundRect( windowX, windowY,
        FBConstants.CARD_SIZE.width, FBConstants.CARD_SIZE.height,
        FBConstants.CARD_CORNER_RADIUS, FBConstants.CARD_CORNER_RADIUS );
    }

    // @private parent for all cards, clip to the windows
    this.cardsParent = new Node( {
      clipArea: windowsShape
    } );

    // background, black because it's dark inside the builder :)
    var backgroundNode = new Path( windowsShape, {
      fill: 'black'
    } );

    // foreground, stroked with builder color, so it looks like we cut out a window
    var foregroundNode = new Path( windowsShape, {
      stroke: builder.colorScheme.middle,
      lineWidth: 2
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, this.cardsParent, foregroundNode ];

    Node.call( this, options );
  }

  functionBuilder.register( 'SeeInsideLayer', SeeInsideLayer );

  return inherit( Node, SeeInsideLayer, {

    /**
     * Adds a card to this layer.
     * Cards are added when they are created, and remain in this layer for the lifetime of the sim.
     *
     * @param {CardNode} cardNode
     * @public
     */
    addCardNode: function( cardNode ) {
      this.cardsParent.addChild( cardNode );
    }
  } );
} );
