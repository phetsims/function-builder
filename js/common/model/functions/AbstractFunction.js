// Copyright 2015-2019, University of Colorado Boulder

/**
 * Abstract base type for functions with one input and one output.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const Movable = require( 'FUNCTION_BUILDER/common/model/Movable' );
  const Property = require( 'AXON/Property' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function AbstractFunction( options ) {

    options = merge( {

      // {string} optional name, for internal debugging
      name: null,

      // {boolean} is this function invertible?
      invertible: true,

      // {number} distance/second when animating
      animationSpeed: FBConstants.FUNCTION_ANIMATION_SPEED,

      // properties of associated FunctionNode, in the model for convenience
      fill: 'white', // {Color|string|null}
      stroke: 'black', // {Color|string|null}
      lineWidth: 1, // {number}
      lineDash: [] // {number[]|null}

    }, options );

    const self = this;

    // @private
    this._invertible = options.invertible;

    // @public (read-only)
    this.name = options.name;

    // @public (read-only) properties of FunctionNode, in the model for convenience
    this.viewOptions = _.pick( options, 'fill', 'stroke', 'lineWidth', 'lineDash' );

    // @public {Property.<Color|string>}
    this.fillProperty = new Property( options.fill );
    this.fillProperty.link( function( fill ) {
      self.viewOptions.fill = fill;
    } );

    Movable.call( this, options );
  }

  functionBuilder.register( 'AbstractFunction', AbstractFunction );

  return inherit( Movable, AbstractFunction, {

    // @public @override
    reset: function() {
      Movable.prototype.reset.call( this );
      this.fillProperty.reset();
    },

    /**
     * Is this function invertible?
     *
     * @returns {boolean}
     * @public
     */
    getInvertible: function() { return this._invertible; },
    get invertible() { return this.getInvertible(); },

    /**
     * Applies the function to the input, produces the output.
     *
     * @param {*} input - the input, which should not be modified
     * @returns {*} output, of the same type as input
     * @public
     * @abstract
     */
    apply: function( input ) {
      throw new Error( 'must be implemented by subtype' );
    }
  } );
} );
