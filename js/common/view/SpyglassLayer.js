// Copyright 2016, University of Colorado Boulder

/**
 * Layer that implements the spyglass feature.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var SpyglassNode = require( 'FUNCTION_BUILDER/common/view/SpyglassNode' );

  /**
   * @param {Builder} builder
   * @param {Object} [options]
   * @constructor
   */
  function SpyglassLayer( builder, options ) {

    options = options || {};

    var spyglassesParent = new Node(); // parent for all spyglasses

    var lensesShape = new Shape();  // Shape for all lenses, used for clipArea and background color

    // add a spyglass at the right end of each slot
    for ( var i = 0; i < builder.slots.length; i++ ) {

      // add a lens to the clipArea
      var lensX = builder.slots[ i ].location.x + FBConstants.FUNCTION_SIZE.width / 2;
      var lensY = builder.location.y;
      if ( i !== 0 ) {
        lensesShape.moveTo( lensX + FBConstants.SPYGLASS_RADIUS, lensY );
      }
      lensesShape.arc( lensX, lensY, FBConstants.SPYGLASS_RADIUS, 0, Math.PI * 2 );

      // spyglass
      spyglassesParent.addChild( new SpyglassNode( {
        lensRadius: FBConstants.SPYGLASS_RADIUS,
        x: lensX,
        y: lensY
      } ) );
    }

    // @private parent for all cards
    this.cardsParent = new Node( {
      clipArea: lensesShape
    } );

    // background color shown in the lenses of the spyglasses, cards pass in front of this
    var holesNode = new Path( lensesShape, {
      fill: FBColors.SPYGLASS_LENS
    } );

    options.children = [ holesNode, this.cardsParent, spyglassesParent ];

    Node.call( this, options );
  }

  functionBuilder.register( 'SpyglassLayer', SpyglassLayer );

  return inherit( Node, SpyglassLayer, {

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
