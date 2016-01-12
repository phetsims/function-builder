// Copyright 2015, University of Colorado Boulder

//TODO much in common with AbstractFunction
/**
 * Base type for cards.
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
  function Card( options ) {

    options = _.extend( {
      location: new Vector2( 0, 0 ), // {Vector2} initial location of the function in view coordinate frame
      dragging: false // {boolean} is the function being dragged by the user when it's instantiated?
    }, options );

    this.dragging = options.dragging; // @public {boolean} is the user dragging the function?

    // @public (read-only) emitted when dispose has been called, but before it has executed
    this.disposeCalledEmitter = new Emitter();

    PropertySet.call( this, {
      location: options.location // @public {Vector2} center of the function's node in the view coordinate frame
    } );

    // @private
    this.disposeCard = function() {
      assert && assert( this.disposeCalledEmitter, 'called dispose twice?' );
      this.disposeCalledEmitter.emit();
      this.disposeCalledEmitter.removeAllListeners();
      this.disposeCalledEmitter = null;
    };
  }

  functionBuilder.register( 'Card', Card );

  return inherit( PropertySet, Card, {

    // @public @override
    dispose: function() {
      functionBuilder.log && functionBuilder.log( this.constructor.name + '.dispose' );
      this.disposeCard(); // first!
      PropertySet.prototype.dispose.call( this );
    }
  } );
} );
