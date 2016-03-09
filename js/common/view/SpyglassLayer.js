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

    var holeX = builder.slots[ 0 ].location.x + FBConstants.FUNCTION_SIZE.width / 2;
    var holeY = builder.location.y;
    var holesShape = Shape.circle( holeX, holeY, FBConstants.SPYGLASS_RADIUS );

    // @private parent for all cards
    this.cardsParent = new Node( {
      clipArea: holesShape
    } );

    // background color shown in the lenses of the spyglasses, cards pass in front of this
    var holesNode = new Path( holesShape, {
      fill: FBColors.SPYGLASS_LENS
    } );

    // spyglass
    var spyglassNode = new SpyglassNode( {
      lensRadius: FBConstants.SPYGLASS_RADIUS,
      x: holeX,
      y: holeY
    } );

    options.children = [ holesNode, this.cardsParent, spyglassNode ];

    Node.call( this, options );
  }

  functionBuilder.register( 'SpyglassLayer', SpyglassLayer );

  return inherit( Node, SpyglassLayer, {

    addCardNode: function( cardNode ) {
      this.cardsParent.addChild( cardNode );
    },

    removeCardNode: function( cardNode ) {
      this.cardsParent.removeChild( cardNode );
    }
  } );
} );
