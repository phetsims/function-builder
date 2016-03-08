// Copyright 2016, University of Colorado Boulder

/**
 * The 'mole under the carpet' view of a card while it's inside the builder.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * @param {CardNode} cardNode
   * @param {Vector2} builderLocation
   * @constructor
   */
  function MoleNode( cardNode, builderLocation ) {

    this.cardNode = cardNode; // @private
    this.builderLocation = builderLocation; // @private

    Rectangle.call( this, 0, 0, cardNode.width, cardNode.height, {
      stroke: 'black'
    } );

    var thisNode = this;
    var locationObserver = function( location ) {
      thisNode.center = location.minus( thisNode.builderLocation );
    };
    cardNode.card.locationProperty.link( locationObserver );

    // @private
    this.disposeMoleNode = function() {
      cardNode.card.locationProperty.unlink( locationObserver );
    };
  }

  functionBuilder.register( 'MoleNode', MoleNode );

  return inherit( Rectangle, MoleNode, {

    // @public
    dispose: function() {
      this.disposeMoleNode();
    }
  } );
} );
