// Copyright 2002-2015, University of Colorado Boulder

/**
 * A function that takes one input and returns one output.
 * Named FBFunction so that it doesn't conflict with JavaScript's built-in Function type.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function FBFunction( options ) {

    options = _.extend( {
      name: null, // {string} name of the function, not visible to the user, used internally for debugging
      image: null, // {HTMLImageElement|MipMapArray} image - image used to represent the function, as loaded by the image.js or mipmap.js plug-ins
      fill: 'white',
      stroke: 'black',
      lineWidth: 1,
      lineDash: null
    }, options );

    this.name = options.name; // @public (read-only)

    // @public (read-only) visual representation, in the model for convenience
    this.image = options.image;
    this.fill = options.fill;
    this.stroke = options.stroke;
    this.lineWidth = options.lineWidth;
    this.lineDash = options.lineDash;
  }

  return inherit( Object, FBFunction, {

    /**
     * Applies the function to the input, produces the output.
     * @param {*} input
     * @returns {*} output, of the same type as input
     */
    apply: function( input ) {
      throw new Error( 'must be implemented by subtypes' );
    }
  } );
} );
