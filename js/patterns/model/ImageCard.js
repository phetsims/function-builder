// Copyright 2016, University of Colorado Boulder

/**
 * A card with an image on it.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AbstractCard = require( 'FUNCTION_BUILDER/common/model/AbstractCard' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {HTMLCanvasElement} canvas
   * @param {Object} [options]
   * @constructor
   */
  function ImageCard( canvas, options ) {

    // @public (read-only) do not modify this canvas' pixels or context
    this.canvas = canvas;

    AbstractCard.call( this, options );
  }

  return inherit( AbstractCard, ImageCard );
} );
