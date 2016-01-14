// Copyright 2016, University of Colorado Boulder

/**
 * Abstract base type for any model element that is movable.
 * When the user drags this model element, it moves immediately to the desired destination.
 * When the destination is set programmatically, it animates to the desired destination.
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
  function AbstractMovable( options ) {

    options = _.extend( {
      location: new Vector2( 0, 0 ), // {Vector2} initial location of the function in view coordinate frame
      dragging: false // {boolean} is the function being dragged by the user when it's instantiated?
    }, options );

    PropertySet.call( this, {

      // @public (read-only) {Vector2} center of the function's node in the view coordinate frame
      // DO NOT set this directly! Use setLocation or destination.
      location: options.location
    } );

    // @public {Vector2} set this to animate to a location
    this.destination = options.location.copy();

    // @public {boolean} is the user dragging the function?
    this.dragging = options.dragging;

    // @public (read-only) emitted when dispose has been called, but before it has executed
    this.disposeCalledEmitter = new Emitter();

    // @private
    this.disposeAbstractMovable = function() {
      assert && assert( this.disposeCalledEmitter, 'called dispose twice?' );
      this.disposeCalledEmitter.emit1( this );
      this.disposeCalledEmitter.removeAllListeners();
      this.disposeCalledEmitter = null;
    };
  }

  functionBuilder.register( 'AbstractMovable', AbstractMovable );

  return inherit( PropertySet, AbstractMovable, {

    /**
     * Ensures that this instance is eligible for GC.
     *
     * @public
     * @override
     */
    dispose: function() {
      functionBuilder.log && functionBuilder.log( this.constructor.name + '.dispose' );
      this.disposeAbstractMovable(); // first!
      PropertySet.prototype.dispose.call( this );
    },

    /**
     * Sets the location immediately, without animation.
     *
     * @param {Vector2} location
     */
    setLocation: function( location ) {
      this.destination = location;
      this.locationProperty.set( location );
    },

    /**
     * Sets the location based on some delta from the current location.
     *
     * @param {Vector2} delta
     */
    setLocationDelta: function( delta ) {
      this.setLocation( this.locationProperty.get().plus( delta ) );
    },

    /**
     * Animates translation of the function instance, when it's not being dragged by the user.
     *
     * @param {number} dt - time since the previous step, in seconds
     * @public
     */
    step: function( dt ) {

      //NOTE: Checking this.dragging isn't logically necessary here, but is a performance enhancement.
      if ( !this.dragging && !this.locationProperty.get().equals( this.destination ) ) {

        // animate to the destination
        var totalDistance = this.locationProperty.get().distance( this.destination );
        var stepDistance = FBConstants.FUNCTION_ANIMATION_SPEED * dt; //TODO options.animationSpeed

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
          var stepAngle = Math.atan2( this.destination.y - this.locationProperty.get().y, this.destination.x - this.locationProperty.get().x );
          var stepVector = Vector2.createPolar( stepDistance, stepAngle );
          this.locationProperty.set( this.locationProperty.get().plus( stepVector ) );
        }
      }
    }
  } );
} );
