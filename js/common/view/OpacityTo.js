// Copyright 2015-2016, University of Colorado Boulder

//TODO migrate to common code? see https://github.com/phetsims/tasks/issues/360
/**
 * Animates a node's opacity.
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
   * @param {Object} options
   * @constructor
   */
  function OpacityTo( node, options ) {

    options = _.extend( {

      duration: 500, // {number} duration of the animation, in ms
      startOpacity: node.opacity, // {number} 0-1, initial opacity at start of animation
      endOpacity: 1, // {number} 0-1, opacity at completion of animation

      onStart: function() {}, // {function} called when the animation starts
      onUpdate: function() {}, // {function} called on each animation update
      onComplete: function() {}, // {function} called when the animation completes
      onStop: function() {} // {function} called if the animation is stopped

    }, options );

    assert && assert( options.startOpacity >= 0 && options.startOpacity <= 1 );
    assert && assert( options.endOpacity >= 0 && options.endOpacity <= 1 );
    assert && assert( options.duration >= 0 );

    this.node = node; // @private
    this.onStop = options.onStop; // @private

    var parameters = { opacity: options.startOpacity }; // initial state, modified as the animation proceeds

    // @private
    this.tween = new TWEEN.Tween( parameters )
      .to( { opacity: options.endOpacity }, options.duration )
      .onStart( function() {
        node.opacity = parameters.opacity;
        node.visible = true;
        options.onStart();
      } )
      .onUpdate( function() {
        node.opacity = parameters.opacity;
      } )
      .onComplete( function() {
        options.onComplete();
      } );
  }

  functionBuilder.register( 'OpacityTo', OpacityTo );

  return inherit( Object, OpacityTo, {

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
