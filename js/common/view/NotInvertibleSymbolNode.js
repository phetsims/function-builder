// Copyright 2016-2019, University of Colorado Boulder

/**
 * Symbol used to indicate that a function is not invertible.
 * Consists of the universal 'no' symbol (circle with slash).
 * Displayed on a function when it blocks a card from passing through the builder.
 * Animation gradually fades it out.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Animation = require( 'TWIXT/Animation' );
  const Circle = require( 'SCENERY/nodes/Circle' );
  const Easing = require( 'TWIXT/Easing' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Node = require( 'SCENERY/nodes/Node' );

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

    const circleNode = new Circle( options.radius, {
      lineWidth: options.lineWidth,
      stroke: options.stroke,
      fill: options.fill
    } );

    const slashNode = new Line( 0, 0, 2 * options.radius, 0, {
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

      const self = this;

      // stop animation if it's already running
      this.animation && this.animation.stop();

      // start animation, show symbol and gradually fade out by modulating opacity
      this.animation = new Animation( {
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
