// Copyright 2015-2016, University of Colorado Boulder

/**
 * Abstract base type for functions with one input and one output.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Movable = require( 'FUNCTION_BUILDER/common/model/Movable' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function AbstractFunction( options ) {

    options = _.extend( {

      // {boolean} is this function invertible?
      invertible: true,

      // {number} distance/second when animating
      animationSpeed: FBConstants.FUNCTION_ANIMATION_SPEED,

      // default look of the view associated with a function
      fill: 'white', // {Color|string|null}
      stroke: 'black', // {Color|string|null}
      lineWidth: 1, // {number}
      lineDash: null // {number[]|null}

    }, options );

    //TODO this may need to be mutable to support 'times' function with dynamic operand (spinner)
    // @public (read-only)
    this.invertible = options.invertible;

    // @public (read-only) properties related to visual representation, in the model for convenience
    this.viewOptions = _.pick( options, 'fill', 'stroke', 'lineWidth', 'lineDash' );

    Movable.call( this, options );
  }

  functionBuilder.register( 'AbstractFunction', AbstractFunction );

  return inherit( Movable, AbstractFunction, {

    /**
     * Applies the function to the input, produces the output.
     *
     * @param {*} input
     * @returns {*} output, of the same type as input
     * @public
     * @abstract
     */
    apply: function( input ) {
      throw new Error( 'must be implemented by subtype' );
    }
  } );
} );
