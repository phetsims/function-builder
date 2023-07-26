// Copyright 2016-2023, University of Colorado Boulder

/**
 * Symbol used to indicate that a function is not invertible.
 * Consists of the universal 'no' symbol (circle with slash).
 * Displayed on a function when it blocks a card from passing through the builder.
 * Animation gradually fades it out.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BannedNode, { BannedNodeOptions } from '../../../../scenery-phet/js/BannedNode.js';
import Animation from '../../../../twixt/js/Animation.js';
import Easing from '../../../../twixt/js/Easing.js';
import functionBuilder from '../../functionBuilder.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;

type NotInvertibleSymbolNodeOptions = SelfOptions & BannedNodeOptions;

export default class NotInvertibleSymbolNode extends BannedNode {

  private animation: Animation | null; // animation that fades this Node out

  public constructor( providedOptions?: NotInvertibleSymbolNodeOptions ) {

    const options = optionize<NotInvertibleSymbolNodeOptions, SelfOptions, BannedNodeOptions>()( {

      // BannedNodeOptions
      fill: 'white'
    }, providedOptions );

    super( options );

    this.animation = null;
  }

  /**
   * Starts animation.
   */
  public startAnimation(): void {

    // stop animation if it's already running
    this.animation && this.animation.stop();

    // start animation, show symbol and gradually fade out by modulating opacity
    this.animation = new Animation( {
      duration: 1.5, // seconds
      easing: Easing.QUADRATIC_IN_OUT,
      object: this,
      // @ts-expect-error TODO https://github.com/phetsims/twixt/issues/31
      attribute: 'opacity',
      from: 0.85,
      to: 0
    } );

    const endedListener = () => {
      this.visible = false;
      this.animation && this.animation.endedEmitter.removeListener( endedListener );
      this.animation = null;
    };

    this.animation.endedEmitter.addListener( endedListener );

    this.visible = true;
    this.animation.start();
  }

  /**
   * Stops animation. If no animation is in progress, this is a no-op.
   */
  public stopAnimation(): void {
    if ( this.animation ) {
      this.animation.stop();
      this.visible = false;
    }
  }
}

functionBuilder.register( 'NotInvertibleSymbolNode', NotInvertibleSymbolNode );