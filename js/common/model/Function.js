// Copyright 2002-2015, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {string} name - name of the function, not visible to the user, used internally for debugging
   * @param {HTMLImageElement} image - image used to represent the function, as loaded by the image.js or mipmap.js plug-ins
   * @constructor
   */
  function Function( name, image ) {

    this.name = name; // @public (read-only)
    this.image = image; // @public (read-only)
  }

  return inherit( Object, Function );
} );
