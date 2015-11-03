// Copyright 2002-2015, University of Colorado Boulder

/**
 * A card with an image on it.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {string} name - name of the card, not visible to the user, used internally for debugging
   * @param {HTMLCanvasElement} canvas - canvas that contains the card's image
   * @constructor
   */
  function Card( name, canvas ) {
    this.name = name; // @public (read-only)
    this.canvas = canvas; // @public (read-only) do not modify this canvas' pixels or context
  }

  return inherit( Object, Card );
} );
