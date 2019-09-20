// Copyright 2016-2019, University of Colorado Boulder

/**
 * The 'mole under the carpet' view of a card while it's inside the builder.
 * Shows the transparent outline of a card.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * @param {Card} card
   * @param {Vector2} builderLocation
   * @param {Object} [options]
   * @constructor
   */
  function MoleCardNode( card, builderLocation, options ) {

    options = _.extend( {
      size: FBConstants.CARD_OPTIONS.size,
      cornerRadius: FBConstants.CARD_OPTIONS.cornerRadius,
      fill: 'white',
      stroke: 'black',
      lineWidth: 2,
      opacity: 0.2
    }, options );

    Rectangle.call( this, 0, 0, options.size.width, options.size.height, options );

    const self = this;

    // unlink unnecessary, instances exist for lifetime of the sim
    card.locationProperty.link( function( location ) {
      self.center = location.minus( builderLocation );
    } );
  }

  functionBuilder.register( 'MoleCardNode', MoleCardNode );

  return inherit( Rectangle, MoleCardNode );
} );
