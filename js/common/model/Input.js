// Copyright 2002-2015, University of Colorado Boulder

/**
 * An input to a function.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {string} name - name of the input, not visible to the user, used internally for debugging
   * @param {HTMLImageElement} image - image used to represent the input, as loaded by the image.js or mipmap.js plug-ins
   * @constructor
   */
  function Input( name, image ) {

    this.name = name; // @public (read-only)
    this.image = image; // @public (read-only)
  }

  return inherit( Object, Input );
} );
