// Copyright 2002-2015, University of Colorado Boulder

/**
 * A card with a picture on it.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {string} name - name of the card, not visible to the user, used internally for debugging
   * @param {HTMLImageElement|MipMapArray} image - image on the card, as loaded by the image.js or mipmap.js plug-ins
   * @constructor
   */
  function Card( name, image ) {

    this.name = name; // @public (read-only)
    this.image = image; // @public (read-only)
    this.size = new Dimension2( 60, 60 )
  }

  return inherit( Object, Card, {

    clone: function() {
      return new Card( this.name, this.image );
    }
  } );
} );
