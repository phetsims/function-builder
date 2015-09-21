// Copyright 2002-2015, University of Colorado Boulder

/**
 * A function. Named FBFunction so that it doesn't conflict with JavaScript's built-in Function type.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {string} name - name of the function, not visible to the user, used internally for debugging
   * @param {Object} [options]
   * @constructor
   */
  function FBFunction( name, options ) {

    options = _.extend( {
      image: null, // {HTMLImageElement|MipMapArray} image - image used to represent the function, as loaded by the image.js or mipmap.js plug-ins
      fill: 'white',
      stroke: 'black',
      lineWidth: 1,
      lineDash: null
    }, options );

    this.name = name; // @public (read-only)

    // @public (read-only) visual representation, in the model for convenience
    this.image = options.image;
    this.fill = options.fill;
    this.stroke = options.stroke;
    this.lineWidth = options.lineWidth;
    this.lineDash = options.lineDash;
  }

  return inherit( Object, FBFunction );
} );
