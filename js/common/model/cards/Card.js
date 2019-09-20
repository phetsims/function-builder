// Copyright 2015-2019, University of Colorado Boulder

/**
 * Base type for cards. Other than providing 'input' information to the builder, cards have no responsibility
 * for what is displayed on them. That is handled by CardNode and its subtypes.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Movable = require( 'FUNCTION_BUILDER/common/model/Movable' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Card( options ) {

    options = _.extend( {
      animationSpeed: FBConstants.CARD_ANIMATION_SPEED  // {number} distance/second when animating
    }, options );

    Movable.call( this, options );
  }

  functionBuilder.register( 'Card', Card );

  return inherit( Movable, Card );
} );
