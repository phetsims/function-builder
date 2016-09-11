// Copyright 2016, University of Colorado Boulder

/**
 * Symbol used to indicate that a function is not invertible.
 * Consists of the universal 'no' symbol (circle with slash).
 * Displayed on a function when it blocks a card from passing through the builder.
 * Animation gradually fades it out.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Circle = require( 'SCENERY/nodes/Circle' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var OpacityTo = require( 'TWIXT/OpacityTo' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function NotInvertibleSymbolNode( options ) {

    options = _.extend( {
      radius: 20,
      lineWidth: 5,
      stroke: 'red',
      fill: 'white'
    }, options );

    var circleNode = new Circle( options.radius, {
      lineWidth: options.lineWidth,
      stroke: options.stroke,
      fill: options.fill
    } );

    var slashNode = new Line( 0, 0, 2 * options.radius, 0, {
      lineWidth: options.lineWidth,
      stroke: options.stroke,
      rotation: Math.PI / 4,
      center: circleNode.center
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ circleNode, slashNode ];

    // @private {OpacityTo} animation that fades this node out
    this.animation = null;

    Node.call( this, options );
  }

  functionBuilder.register( 'NotInvertibleSymbolNode', NotInvertibleSymbolNode );

  return inherit( Node, NotInvertibleSymbolNode, {

    /**
     * Starts animation.
     *
     * @public
     */
    startAnimation: function() {

      // stop animation if it's already running
      this.animation && this.animation.stop();

      // start animation, show symbol and gradually fade out by modulating opacity
      var thisNode = this;
      this.animation = new OpacityTo( this, {
        startOpacity: 0.85,
        endOpacity: 0,
        duration: 1500, // fade out time, ms
        easing: TWEEN.Easing.Quintic.In, // most of opacity change happens at end of duration
        onStart: function() {
          thisNode.visible = true;
        },
        onComplete: function() {
          thisNode.visible = false;
          thisNode.animation = null;
        }
      } );
      this.animation.start( phet.joist.elapsedTime );
    },

    /**
     * Stops animation. If no animation is in progress, this is a no-op.
     *
     * @public
     */
    stopAnimation: function() {
      if ( this.animation ) {
        this.animation.stop();
        this.visible = false;
      }
    }
  } );
} );
