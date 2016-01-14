// Copyright 2015-2016, University of Colorado Boulder

/**
 * Base type for cards.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Movable = require( 'FUNCTION_BUILDER/common/model/Movable' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function AbstractCard( options ) {

    options = _.extend( {
      animationSpeed: FBConstants.CARD_ANIMATION_SPEED
    }, options );

    Movable.call( this, options );
  }

  functionBuilder.register( 'AbstractCard', AbstractCard );

  return inherit( Movable, AbstractCard );
} );
