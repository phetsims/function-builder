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
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var ANIMATION_DISTANCE_THRESHOLD = 10; // anything closer than this moves immediately to the destination

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

    PropertySet.call( this, {
      // @public (read-only) {Vector2} center of the function's node in the view coordinate frame
      location: options.location
    } );

    // @private set this using setDestination, instead of setting locationProperty
    this.destination = options.location.copy();

    // @public (read-only) properties related to visual representation, in the model for convenience
    this.viewInfo = _.pick( options, 'image', 'fill', 'stroke', 'lineWidth', 'lineDash' );

    this.dragging = options.dragging; // @public {boolean} is the user dragging the function?

    // @public (read-only) emitted when dispose has been called, but before it has executed
    this.disposeCalledEmitter = new Emitter();

    // @private
    this.disposeAbstractFunction = function() {
      assert && assert( this.disposeCalledEmitter, 'called dispose twice?' );
      this.disposeCalledEmitter.emit1( this );
      this.disposeCalledEmitter.removeAllListeners();
      this.disposeCalledEmitter = null;
    };
  }

  functionBuilder.register( 'AbstractFunction', AbstractFunction );

  return inherit( PropertySet, AbstractFunction, {

    /**
     * Ensures that this instance is eligible for GC.
     *
     * @public
     * @override
     */
    dispose: function() {
      functionBuilder.log && functionBuilder.log( this.constructor.name + '.dispose' );
      this.disposeAbstractFunction(); // first!
      PropertySet.prototype.dispose.call( this );
    },

    /**
     * Applies the function to the input, produces the output.
     *
     * @param {*} input
     * @returns {*} output, of the same type as input
     * @public
     */
    apply: function( input ) {
      throw new Error( 'must be implemented by subtype' );
    },

    /**
     * Sets the destination of this instance. Use this instead of setting locationProperty.
     *
     * @param {Vector2} destination
     */
    setDestination: function( destination ) {
      this.destination = destination;
      if ( this.dragging ) {
        this.locationProperty.set( destination );
      }
    },

    /**
     * Animates translation of the function instance, when it's not being dragged by the user.
     *
     * @param {number} dt - time since the previous step, in seconds
     * @public
     */
    step: function( dt ) {
      if ( !this.dragging && !this.locationProperty.get().equals( this.destination ) ) {

        // animate to the destination
        var totalDistance = this.locationProperty.get().distance( this.destination );
        var stepDistance = FBConstants.FUNCTION_ANIMATION_SPEED * dt;

        if ( Math.abs( totalDistance - stepDistance ) < ANIMATION_DISTANCE_THRESHOLD ) {

          // close enough, move directly to the destination
          this.locationProperty.set( this.destination );

          //TODO this responsibility belongs elsewhere
          if ( this.locationProperty.get().equals( this.locationProperty.initialValue ) ) {
            // function has been returned to the Carousel
            this.dispose();
          }
        }
        else {

          // move one step towards the destination
          var location = this.locationProperty.get();
          var stepAngle = Math.atan2( this.destination.y - this.location.y, this.destination.x - this.location.x );
          var stepVector = Vector2.createPolar( stepDistance, stepAngle );
          this.locationProperty.set( this.locationProperty.get().plus( stepVector ) );
        }
      }
    }
  } );
} );
