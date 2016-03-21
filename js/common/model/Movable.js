// Copyright 2016, University of Colorado Boulder

/**
 * A model element that is movable.
 * It has a current location and a desired destination.
 * When the user drags the model element, it moves immediately to the desired destination.
 * When the destination is set programmatically, it animates to the desired destination.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Movable( options ) {

    options = _.extend( {
      location: new Vector2( 0, 0 ), // {Vector2} initial location
      dragging: false // {boolean} is this instance being dragged by the user?
    }, options );

    PropertySet.call( this, {
      location: options.location // @public (read-only) {Vector2} DO NOT set this directly! Use moveTo or animateTo.
    } );

    // @private {number} distance/second when animating, set using animateTo
    this.animationSpeed = 100;

    // @private {Vector2} destination to animate to, set using animateTo
    this.destination = options.location.copy();

    // @private {function|null} called when animation to destination completes
    this.animationCompletedCallback = null;

    // @public {boolean} is the user dragging this instance?
    this.dragging = options.dragging;
  }

  functionBuilder.register( 'Movable', Movable );

  return inherit( PropertySet, Movable, {

    /**
     * Moves immediately to the specified location, without animation.
     *
     * @param {Vector2} location
     * @public
     */
    moveTo: function( location ) {
      this.destination = location;
      this.locationProperty.set( location );
    },

    /**
     * Animates to the specified location. When animation is completed, call optional callback.
     *
     * @param {Vector2} destination
     * @param {number} animationSpeed - distance moved per second when animating
     * @param {function} [animationCompletedCallback]
     * @public
     */
    animateTo: function( destination, animationSpeed, animationCompletedCallback ) {
      this.destination = destination;
      this.animationSpeed = animationSpeed;
      this.animationCompletedCallback = animationCompletedCallback;
    },

    /**
     * Animates location, when not being dragged by the user.
     *
     * @param {number} dt - time since the previous step, in seconds
     * @public
     */
    step: function( dt ) {
      if ( !this.dragging && !this.locationProperty.get().equals( this.destination ) ) {

        // distance from destination
        var totalDistance = this.locationProperty.get().distance( this.destination );

        // distance to move on this step
        var stepDistance = this.animationSpeed * dt;

        if ( totalDistance < stepDistance ) {

          // move directly to the destination
          this.locationProperty.set( this.destination );

          // callback, which may set a new callback
          var saveAnimationCompletedCallback = this.animationCompletedCallback;
          this.animationCompletedCallback && this.animationCompletedCallback();
          if ( saveAnimationCompletedCallback === this.animationCompletedCallback ) {
            this.animationCompletedCallback = null;
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
