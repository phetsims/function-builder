// Copyright 2015, University of Colorado Boulder

/**
 * Abstract base type for functions with one input and one output.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function AbstractFunction( options ) {

    options = _.extend( {

      location: new Vector2( 0, 0 ), // {Vector2} initial location of the function
      name: null, // {string} optional name of the function, not visible to the user, used internally for debugging
      image: null, // {HTMLImageElement|MipMapArray} optional image used to represent the function

      // default look
      fill: 'white',
      stroke: 'black',
      lineWidth: 1,
      lineDash: null

    }, options );

    this.name = options.name; // @public (read-only)

    // @public (read-only) properties related to visual representation, in the model for convenience
    this.image = options.image;
    this.fill = options.fill;
    this.stroke = options.stroke;
    this.lineWidth = options.lineWidth;
    this.lineDash = options.lineDash;

    PropertySet.call( this, {
      location: options.location // @public {Vector2} location of the function
    } );
  }

  functionBuilder.register( 'AbstractFunction', AbstractFunction );

  return inherit( PropertySet, AbstractFunction, {

    /**
     * Applies the function to the input, produces the output.
     * @param {*} input
     * @returns {*} output, of the same type as input
     * @public
     */
    apply: function( input ) {
      throw new Error( 'must be implemented by subtype' );
    }
  } );
} );
