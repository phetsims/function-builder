// Copyright 2015, University of Colorado Boulder

/**
 * Abstract base type for functions with one input and one output.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Emitter = require( 'AXON/Emitter' );
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
      dragging: false, // {boolean} is the function being dragged by the user when it's instantiated?
      name: null, // {string} optional name of the function, not visible to the user, used internally for debugging

      // default look of the view associated with a function
      image: null, // {HTMLImageElement|MipMapArray} optional image used to represent the function
      fill: 'white', // {Color|string}
      stroke: 'black', // {Color|string}
      lineWidth: 1, // {number}
      lineDash: null // {number[]}

    }, options );

    this.name = options.name; // @public (read-only)

    // @public (read-only) properties related to visual representation, in the model for convenience
    this.viewInfo = _.pick( options, 'image', 'fill', 'stroke', 'lineWidth', 'lineDash');

    this.dragging = options.dragging; // @public {boolean} is the user dragging the function?

    // @public (read-only) emitted when dispose has been called, but before it has executed
    this.disposeCalledEmitter = new Emitter();

    PropertySet.call( this, {
      location: options.location // @public {Vector2} center of the function in the view
    } );

    // @private
    this.disposeAbstractFunction = function() {
      this.disposeCalledEmitter.removeAllListeners();
      this.disposeCalledEmitter = null;
    };
  }

  functionBuilder.register( 'AbstractFunction', AbstractFunction );

  return inherit( PropertySet, AbstractFunction, {

    // @public @override
    dispose: function() {
      this.disposeCalledEmitter.emit();
      PropertySet.prototype.dispose.call( this );
      this.disposeAbstractFunction();
    },

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
