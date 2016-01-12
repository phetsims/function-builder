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

      location: new Vector2( 0, 0 ), // {Vector2} initial location of the function in view coordinate frame
      dragging: false, // {boolean} is the function being dragged by the user when it's instantiated?

      // default look of the view associated with a function
      image: null, // {HTMLImageElement|MipMapArray|null} optional image used to represent the function
      fill: 'white', // {Color|string|null}
      stroke: 'black', // {Color|string|null}
      lineWidth: 1, // {number}
      lineDash: null // {number[]|null}

    }, options );

    // @public (read-only) properties related to visual representation, in the model for convenience
    this.viewInfo = _.pick( options, 'image', 'fill', 'stroke', 'lineWidth', 'lineDash');

    this.dragging = options.dragging; // @public {boolean} is the user dragging the function?

    // @public (read-only) emitted when dispose has been called, but before it has executed
    this.disposeCalledEmitter = new Emitter();

    PropertySet.call( this, {
      location: options.location // @public {Vector2} center of the function's node in the view coordinate frame
    } );

    // @private
    this.disposeAbstractFunction = function() {
      assert && assert( this.disposeCalledEmitter, 'called dispose twice?' );
      this.disposeCalledEmitter.emit();
      this.disposeCalledEmitter.removeAllListeners();
      this.disposeCalledEmitter = null;
      PropertySet.prototype.dispose.call( this );
    };
  }

  functionBuilder.register( 'AbstractFunction', AbstractFunction );

  return inherit( PropertySet, AbstractFunction, {

    // @public @override
    dispose: function() {
      functionBuilder.log && functionBuilder.log( this.constructor.name + '.dispose' );
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
