// Copyright 2015-2019, University of Colorado Boulder

/**
 * A model element that is movable.
 * It has a current location and a desired destination.
 * When the user drags the model element, it moves immediately to the desired destination.
 * When the destination is set programmatically, it animates to the desired destination.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2Property = require( 'DOT/Vector2Property' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Movable( options ) {

    options = _.extend( {
      location: new Vector2( 0, 0 ), // {Vector2} initial location
      dragging: false, // {boolean} is this instance being dragged by the user?
      animationSpeed: 100 // {number} distance/second when animating
    }, options );

    // @public (read-only) DO NOT set this directly! Use moveTo or animateTo.
    this.locationProperty = new Vector2Property( options.location );

    // @public
    this.dragging = options.dragging;

    // @private
    this.animationSpeed = options.animationSpeed;

    // @private {Vector2} destination to animate to, set using animateTo
    this.destination = options.location.copy();

    // @private {function|null} called when animation to destination completes, set using animateTo
    this.animationCompletedCallback = null;
  }

  functionBuilder.register( 'Movable', Movable );

  return inherit( Object, Movable, {

    // @public
    reset: function() {

      // call moveTo instead of locationProperty.set, so that any animation in progress is cancelled
      this.moveTo( this.locationProperty.initialValue );
    },

    /**
     * Moves immediately to the specified location, without animation.
     *
     * @param {Vector2} location
     * @public
     */
    moveTo: function( location ) {
      this.animationCompletedCallback = null; // cancels any pending callback
      this.destination = location;
      this.locationProperty.set( location );
    },

    /**
     * Animates to the specified location. When animation is completed, call optional callback.
     *
     * @param {Vector2} destination
     * @param {function} [animationCompletedCallback]
     * @public
     */
    animateTo: function( destination, animationCompletedCallback ) {
      this.destination = destination;
      this.animationCompletedCallback = animationCompletedCallback || null;
    },

    /**
     * Is the Movable animating?
     *
     * @returns {boolean}
     * @public
     */
    isAnimating: function() {
      return !this.dragging && ( !this.locationProperty.get().equals( this.destination ) || this.animationCompletedCallback );
    },

    /**
     * Animates location, when not being dragged by the user.
     *
     * @param {number} dt - time since the previous step, in seconds
     * @public
     */
    step: function( dt ) {
      if ( this.isAnimating() ) {

        // distance from destination
        const totalDistance = this.locationProperty.get().distance( this.destination );

        // distance to move on this step
        const stepDistance = this.animationSpeed * dt;

        if ( totalDistance <= stepDistance ) {

          // move directly to the destination
          this.locationProperty.set( this.destination );

          // callback, which may set a new callback
          const saveAnimationCompletedCallback = this.animationCompletedCallback;
          this.animationCompletedCallback && this.animationCompletedCallback();
          if ( saveAnimationCompletedCallback === this.animationCompletedCallback ) {
            this.animationCompletedCallback = null;
          }
        }
        else {

          // move one step towards the destination
          const stepAngle = Math.atan2(
            this.destination.y - this.locationProperty.get().y,
            this.destination.x - this.locationProperty.get().x );
          const stepVector = Vector2.createPolar( stepDistance, stepAngle );
          this.locationProperty.set( this.locationProperty.get().plus( stepVector ) );
        }
      }
    }
  } );
} );
