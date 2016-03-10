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
  var Circle = require( 'SCENERY/nodes/Circle' );
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
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

    var lensesShape = new Shape();  // Shape for all lenses, used for clipArea and background color

    // add a window at the right end of each slot
    for ( var i = 0; i < builder.slots.length; i++ ) {

      // add a window to the clipArea
      var centerX = builder.slots[ i ].location.x + FBConstants.FUNCTION_SIZE.width / 2;
      var centerY = builder.location.y;
      if ( i !== 0 ) {
        lensesShape.moveTo( centerX + FBConstants.SPYGLASS_RADIUS, centerY );
      }
      lensesShape.arc( centerX, centerY, FBConstants.SPYGLASS_RADIUS, 0, Math.PI * 2 );
    }

    // @private parent for all cards, clip to the windows
    this.cardsParent = new Node( {
      clipArea: lensesShape
    } );

    // background, color shown in the windows
    var backgroundNode = new Path( lensesShape, {
      fill: FBColors.SPYGLASS_LENS
    } );

    // foreground, outline of the windows
    var foregroundNode = new Path( lensesShape, {
      stroke: 'black',
      lineWidth: 5
    } );

    options.children = [ backgroundNode, this.cardsParent, foregroundNode ];

    Node.call( this, options );
  }

  functionBuilder.register( 'SeeInsideLayer', SeeInsideLayer );

  return inherit( Node, SeeInsideLayer, {

    /**
     * Adds a card to this layer.
     *
     * @param {CardNode} cardNode
     */
    addCardNode: function( cardNode ) {
      this.cardsParent.addChild( cardNode );
    },

    /**
     * Removes a card from this layer.
     *
     * @param {CardNode} cardNode
     */
    removeCardNode: function( cardNode ) {
      this.cardsParent.removeChild( cardNode );
    }
  } );
} );
