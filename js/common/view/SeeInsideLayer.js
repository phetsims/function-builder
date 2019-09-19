// Copyright 2016, University of Colorado Boulder

/**
 * Layer that implements the 'See Inside' feature. Each function in the builders has a 'window' at its right edge,
 * which lets you see the card change as it moves through the builder. Cards can be grabbed through these windows.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Shape = require( 'KITE/Shape' );

  // constants
  const WINDOW_SIZE = FBConstants.CARD_OPTIONS.size;
  const CORNER_RADIUS = FBConstants.CARD_OPTIONS.cornerRadius;

  /**
   * @param {Builder} builder
   * @param {Object} [options]
   * @constructor
   */
  function SeeInsideLayer( builder, options ) {

    options = options || {};

    // add a window at the right end of each slot
    const windowsShape = new Shape();
    for ( let i = 0; i < builder.numberOfSlots; i++ ) {

      const windowLocation = builder.getWindowLocation( i );
      const windowLeft = windowLocation.x - ( WINDOW_SIZE.width / 2 );
      const windowY = windowLocation.y - ( WINDOW_SIZE.height / 2 );
      if ( i !== 0 ) {
        // move to center of rounded rect, so we don't see a line at rounded corner
        windowsShape.moveTo( windowLocation.x, windowY );
      }
      windowsShape.roundRect( windowLeft, windowY, WINDOW_SIZE.width, WINDOW_SIZE.height, CORNER_RADIUS, CORNER_RADIUS );
    }

    // @private parent for all cards, clip to the windows
    this.cardsParent = new Node( {
      clipArea: windowsShape
    } );

    // background, black because it's dark inside the builder :)
    const backgroundNode = new Path( windowsShape, {
      fill: 'black'
    } );

    // foreground, stroked with builder color, so it looks like we cut out a window
    const foregroundNode = new Path( windowsShape, {
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
