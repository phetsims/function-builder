// Copyright 2015-2023, University of Colorado Boulder

/**
 * A model element that is movable.
 * It has a current position and a desired destination.
 * When the user drags the model element, it moves immediately to the desired destination.
 * When the destination is set programmatically, it animates to the desired destination.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Disposable from '../../../../axon/js/Disposable.js';
import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import optionize from '../../../../phet-core/js/optionize.js';
import functionBuilder from '../../functionBuilder.js';

type SelfOptions = {
  position?: Vector2; // initial position
  dragging?: boolean; // Is this instance being dragged by the user?
  animationSpeed?: number; // distance/second when animating
};

export type FBMovableOptions = SelfOptions;

export default class FBMovable {

  // Use moveTo or animateTo to set position.
  private readonly positionProperty: Property<Vector2>;

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
    Disposable.assertNotDisposable();
  }

  public reset(): void {

    // call moveTo instead of positionProperty.set, so that any animation in progress is cancelled
    this.moveTo( this.positionProperty.initialValue );
  }

  public get position(): Vector2 {
    return this.positionProperty.value;
  }

  /**
   * Adds a listener that is notified when this FBMovable's position changes.
   */
  public addPositionListener( listener: ( position: Vector2 ) => void ): void {
    this.positionProperty.link( listener );
  }

  /**
   * Moves immediately to the specified position, without animation.
   */
  public moveTo( position: Vector2 ): void {
    this.animationCompletedCallback = null; // cancels any pending callback
    this.destination = position;
    this.positionProperty.value = position;
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
    return !this.dragging && ( !this.positionProperty.value.equals( this.destination ) || !!this.animationCompletedCallback );
  }

  /**
   * Animates position, when not being dragged by the user.
   * @param dt - time since the previous step, in seconds
   */
  public step( dt: number ): void {
    if ( this.isAnimating() ) {

      // distance from destination
      const totalDistance = this.positionProperty.value.distance( this.destination );

      // distance to move on this step
      const stepDistance = this.animationSpeed * dt;

      if ( totalDistance <= stepDistance ) {

        // move directly to the destination
        this.positionProperty.value = this.destination;

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
          this.destination.y - this.positionProperty.value.y,
          this.destination.x - this.positionProperty.value.x );
        const stepVector = Vector2.createPolar( stepDistance, stepAngle );
        this.positionProperty.value = this.positionProperty.value.plus( stepVector );
      }
    }
  }
}

functionBuilder.register( 'FBMovable', FBMovable );