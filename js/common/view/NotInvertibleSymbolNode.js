// Copyright 2016-2020, University of Colorado Boulder

/**
 * Symbol used to indicate that a function is not invertible.
 * Consists of the universal 'no' symbol (circle with slash).
 * Displayed on a function when it blocks a card from passing through the builder.
 * Animation gradually fades it out.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import BannedNode from '../../../../scenery-phet/js/BannedNode.js';
import Animation from '../../../../twixt/js/Animation.js';
import Easing from '../../../../twixt/js/Easing.js';
import functionBuilder from '../../functionBuilder.js';

export default class NotInvertibleSymbolNode extends BannedNode {

  /**
   * @param {Object} [options]
   * @constructor
   */
  constructor( options ) {

    options = merge( {
      fill: 'white'
    }, options );

    super( options );

    // @private {Animation|null} animation that fades this node out
    this.animation = null;
  }

  /**
   * Starts animation.
   *
   * @public
   */
  startAnimation() {

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

    const endedListener = () => {
      this.visible = false;
      this.animation.endedEmitter.removeListener( endedListener );
      this.animation = null;
    };

    this.animation.endedEmitter.addListener( endedListener );

    this.visible = true;
    this.animation.start();
  }

  /**
   * Stops animation. If no animation is in progress, this is a no-op.
   *
   * @public
   */
  stopAnimation() {
    if ( this.animation ) {
      this.animation.stop();
      this.visible = false;
    }
  }
}

functionBuilder.register( 'NotInvertibleSymbolNode', NotInvertibleSymbolNode );