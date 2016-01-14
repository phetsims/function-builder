// Copyright 2015, University of Colorado Boulder

/**
 * Abstract base type for functions with one input and one output.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AbstractMovable = require( 'FUNCTION_BUILDER/common/model/AbstractMovable' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function AbstractFunction( options ) {

    options = _.extend( {

      // default look of the view associated with a function
      image: null, // {HTMLImageElement|MipMapArray|null} optional image used to represent the function
      fill: 'white', // {Color|string|null}
      stroke: 'black', // {Color|string|null}
      lineWidth: 1, // {number}
      lineDash: null // {number[]|null}

    }, options );

    // @public (read-only) properties related to visual representation, in the model for convenience
    this.viewInfo = _.pick( options, 'image', 'fill', 'stroke', 'lineWidth', 'lineDash' );

    AbstractMovable.call( this, options );
  }

  functionBuilder.register( 'AbstractFunction', AbstractFunction );

  return inherit( AbstractMovable, AbstractFunction, {

    /**
     * Applies the function to the input, produces the output.
     *
     * @param {*} input
     * @returns {*} output, of the same type as input
     * @public
     */
    apply: function( input ) {
      throw new Error( 'must be implemented by subtype' );
    }
  } );
} );
