// Copyright 2016, University of Colorado Boulder

/**
 * 'Ghost' version of image card that appears in empty input carousel container.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var GhostCard = require( 'FUNCTION_BUILDER/common/view/GhostCard' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {HTMLImageElement} image
   * @param {Object} [options]
   * @constructor
   */
  function ImageGhostCard( image, options ) {
    GhostCard.call( this, new Image( image, { scale: FBConstants.CARD_IMAGE_SCALE } ), options );
  }

  functionBuilder.register( 'ImageGhostCard', ImageGhostCard );

  return inherit( GhostCard, ImageGhostCard );
} );
