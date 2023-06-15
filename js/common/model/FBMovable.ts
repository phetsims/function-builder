// Copyright 2015-2023, University of Colorado Boulder

/**
 * A model element that is movable.
 * It has a current position and a desired destination.
 * When the user drags the model element, it moves immediately to the desired destination.
 * When the destination is set programmatically, it animates to the desired destination.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import functionBuilder from '../../functionBuilder.js';
import optionize from '../../../../phet-core/js/optionize.js';
import Property from '../../../../axon/js/Property.js';

type SelfOptions = {
  position?: Vector2; // initial position
  dragging?: boolean; // Is this instance being dragged by the user?
  animationSpeed?: number; // distance/second when animating
};

export type FBMovableOptions = SelfOptions;

export default class FBMovable {

  // DO NOT set this directly! Use moveTo or animateTo.
  public readonly positionProperty: Property<Vector2>;

  public dragging: boolean; // Is this instance being dragged by the user?
  private readonly animationSpeed: number; // distance/second when animating
  private destination: Vector2; // destination to animate to, set using animateTo
  private animationCompletedCallback: ( () => void ) | null; // called when animation to destination completes, set using animateTo

  protected constructor( providedOptions?: FBMovableOptions ) {

    const options = optionize<FBMovableOptions, SelfOptions>()( {

      // SelfOptions
      position: new Vector2( 0, 0 ),
      dragging: false,
      animationSpeed: 100
    }, providedOptions );

    this.positionProperty = new Vector2Property( options.position );

    this.dragging = options.dragging;

    this.animationSpeed = options.animationSpeed;
    this.destination = options.position.copy();
    this.animationCompletedCallback = null;
  }

  public dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
  }

  public reset(): void {

    // call moveTo instead of positionProperty.set, so that any animation in progress is cancelled
    this.moveTo( this.positionProperty.initialValue );
  }

  /**
   * Moves immediately to the specified position, without animation.
   */
  public moveTo( position: Vector2 ): void {
    this.animationCompletedCallback = null; // cancels any pending callback
    this.destination = position;
    this.positionProperty.set( position );
  }

  /**
   * Animates to the specified position. When animation is completed, call optional callback.
   */
  public animateTo( destination: Vector2, animationCompletedCallback?: () => void ): void {
    this.destination = destination;
    this.animationCompletedCallback = animationCompletedCallback || null;
  }

  /**
   * Is the FBMovable animating?
   */
  public isAnimating(): boolean {
    return !this.dragging && ( !this.positionProperty.get().equals( this.destination ) || !!this.animationCompletedCallback );
  }

  /**
   * Animates position, when not being dragged by the user.
   * @param dt - time since the previous step, in seconds
   */
  public step( dt: number ): void {
    if ( this.isAnimating() ) {

      // distance from destination
      const totalDistance = this.positionProperty.get().distance( this.destination );

      // distance to move on this step
      const stepDistance = this.animationSpeed * dt;

      if ( totalDistance <= stepDistance ) {

        // move directly to the destination
        this.positionProperty.set( this.destination );

        // callback, which may set a new callback
        const saveAnimationCompletedCallback = this.animationCompletedCallback;
        this.animationCompletedCallback && this.animationCompletedCallback();
        if ( saveAnimationCompletedCallback === this.animationCompletedCallback ) {
          this.animationCompletedCallback = null;
        }
      }
      else {

        // move one step towards the destination
        const stepAngle = Math.atan2(
          this.destination.y - this.positionProperty.get().y,
          this.destination.x - this.positionProperty.get().x );
        const stepVector = Vector2.createPolar( stepDistance, stepAngle );
        this.positionProperty.set( this.positionProperty.get().plus( stepVector ) );
      }
    }
  }
}

functionBuilder.register( 'FBMovable', FBMovable );