// Copyright 2015, University of Colorado Boulder

//TODO migrate to common code? see https://github.com/phetsims/tasks/issues/360
/**
 * Animates a node's location.
 *
 * @author Chris Malley (PixelZoom, Inc)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {Node} node
   * @param {Vector2} destination
   * @param {Object} options
   * @constructor
   */
  function MoveTo( node, destination, options ) {

    options = _.extend( {

      // {number} if constantSpeed:false, this is the total time of the animation, in ms.
      //          if constantSpeed:true, this is the time in ms to move 1 unit of distance
      duration: 1,

      // {boolean} keeps speed constant, regardless of distance
      constantSpeed: true,

      // {function} see Tween.Easing
      easing: TWEEN.Easing.Quadratic.InOut,

      onStart: function() {}, // {function} called when the animation starts
      onUpdate: function() {}, // {function} called on each animation update
      onComplete: function() {}, // {function} called when the animation completes
      onStop: function() {} // {function} called if the animation is stopped
    }, options );

    assert && assert( options.duration >= 0 );

    this.node = node; // @private
    this.onStop = options.onStop; // @private

    // normalize duration
    var duration = options.constantSpeed
      ? ( node.translation.distance( destination ) * options.duration )
      : options.duration;

    // @private
    this.tween = new TWEEN.Tween( node )
      .to( { centerX: destination.x, centerY: destination.y }, duration )
      .easing( options.easing )
      .onStart( function() {
        options.onStart();
      } )
      .onUpdate( function() {
        options.onUpdate();
      } )
      .onComplete( function() {
        options.onComplete();
      } );
  }

  functionBuilder.register( 'MoveTo', MoveTo );

  return inherit( Object, MoveTo, {

    // @public starts the animation
    start: function() {
      this.tween.start();
    },

    // @public stops the animation, onComplete is not called
    stop: function() {
      this.tween.stop();
      this.onStop(); //TODO move this to tween instance when we upgrade to a version that supports onStop
    }
  } );
} );
