// Copyright 2018, University of Colorado Boulder

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
  var Animation = require( 'TWIXT/Animation' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var Easing = require( 'TWIXT/Easing' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );

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

    // @private {Animation} animation that fades this node out
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

      var self = this;

      // stop animation if it's already running
      this.animation && this.animation.stop();

      // start animation, show symbol and gradually fade out by modulating opacity
      this.animation = new Animation( {
        stepper: 'timer', // animation is controlled by the global phet-core timer
        duration: 1.5, // seconds
        easing: Easing.QUADRATIC_IN_OUT,
        object: this,
        attribute: 'opacity',
        from: 0.85,
        to: 0
      } );

      this.animation.endedEmitter.addListener( function endedListener() {
        self.visible = false;
        self.animation.endedEmitter.removeListener( endedListener );
        self.animation = null;
      } );

      this.visible = true;
      this.animation.start();
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
