// Copyright 2015, University of Colorado Boulder

//TODO migrate to common code?
/**
 * Fades in a node over time by modulating its opacity.
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
  function FadeIn( node, options ) {

    options = _.extend( {
      duration: 500, // {number} duration in ms to go from 0 to 1 opacity
      onStart: function() {}, // {function} called when the animation starts
      onComplete: function() {}, // {function} called when the animation completes
      onStop: function() {} // {function} called if the animation is stopped
    }, options );

    this.node = node; // @private
    this.onStop = options.onStop; // @private

    var parameters = { opacity: 0 }; // initial state, modified as the animation proceeds

    // @private
    this.tween = new TWEEN.Tween( parameters )
      .to( { opacity: 1 }, options.duration )
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

  functionBuilder.register( 'FadeIn', FadeIn );

  return inherit( Object, FadeIn, {

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
