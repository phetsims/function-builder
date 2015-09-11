// Copyright 2002-2015, University of Colorado Boulder

/**
 * Fades out a node over time by modulating its opacity.
 *
 * @author Chris Malley (PixelZoom, Inc)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param node
   * @param options
   * @constructor
   */
  function FadeOut( node, options ) {

    options = _.extend( {
      duration: 500, // {number} duration in ms to go from 1 to 0 opacity
      onStart: function() {}, // {function} called when the animation starts
      onComplete: function() {}, // {function} called when the animation completes
      onStop: function() {} // {function} called if the animation is stopped
    }, options );

    this.node = node; // @private
    this.onStop = options.onStop; // @private

    var parameters = { opacity: 1 }; // initial state, modified as the animation proceeds

    // @private
    this.tween = new TWEEN.Tween( parameters )
      .to( { opacity: 0 }, options.duration )
      .onStart( function() {
        node.opacity = 1;
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

  return inherit( Object, FadeOut, {

    start: function() {
      this.tween.start();
    },

    stop: function() {
      this.tween.stop();
      this.onStop(); //TODO move this to tween instance when we upgrade to a version that supports onStop
    }
  } );
} );
