// Copyright 2015-2021, University of Colorado Boulder

/**
 * Abstract base type for functions with one input and one output.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../../axon/js/Property.js';
import merge from '../../../../../phet-core/js/merge.js';
import functionBuilder from '../../../functionBuilder.js';
import FBConstants from '../../FBConstants.js';
import FBMovable from '../FBMovable.js';

class AbstractFunction extends FBMovable {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

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

    super( options );

    // @private
    this._invertible = options.invertible;

    // @public (read-only)
    this.name = options.name;

    // @public (read-only) properties of FunctionNode, in the model for convenience
    this.viewOptions = _.pick( options, 'fill', 'stroke', 'lineWidth', 'lineDash' );

    // @public {Property.<Color|string>}
    this.fillProperty = new Property( options.fill );
    this.fillProperty.link( fill => {
      this.viewOptions.fill = fill;
    } );
  }

  // @public @override
  reset() {
    super.reset();
    this.fillProperty.reset();
  }

  /**
   * Is this function invertible?
   *
   * @returns {boolean}
   * @public
   */
  getInvertible() { return this._invertible; }

  get invertible() { return this.getInvertible(); }

  /**
   * Applies the function to the input, produces the output.
   *
   * @param {*} input - the input, which should not be modified
   * @returns {*} output, of the same type as input
   * @public
   * @abstract
   */
  applyFunction( input ) {
    throw new Error( 'must be implemented by subtype' );
  }
}

functionBuilder.register( 'AbstractFunction', AbstractFunction );

export default AbstractFunction;