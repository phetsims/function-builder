// Copyright 2015, University of Colorado Boulder

/**
 * A card with an image on it.
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
   * @param {HTMLCanvasElement} canvas - canvas that contains the card's image
   * @param {Object} [options]
   * @constructor
   */
  function Card( canvas, options ) {

    options = _.extend( {
      location: new Vector2( 0, 0 ), // {Vector2} initial location of the function in view coordinate frame
      dragging: false // {boolean} is the function being dragged by the user when it's instantiated?
    }, options );

    this.canvas = canvas; // @public (read-only) do not modify this canvas' pixels or context

    this.dragging = options.dragging; // @public {boolean} is the user dragging the function?

    // @public (read-only) emitted when dispose has been called, but before it has executed
    this.disposeCalledEmitter = new Emitter();

    PropertySet.call( this, {
      location: options.location // @public {Vector2} center of the function's node in the view coordinate frame
    } );

    // @private
    this.disposeCard = function() {
      this.disposeCalledEmitter.removeAllListeners();
      this.disposeCalledEmitter = null;
    };
  }

  functionBuilder.register( 'Card', Card );

  return inherit( PropertySet, Card, {

    // @public @override
    dispose: function() {
      functionBuilder.log && functionBuilder.log( this.constructor.name + '.dispose' );
      assert && assert( this.disposeCalledEmitter, 'called dispose twice?' );
      this.disposeCalledEmitter.emit();
      PropertySet.prototype.dispose.call( this );
      this.disposeCard();
    }
  } );
} );
