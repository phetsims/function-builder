// Copyright 2015-2023, University of Colorado Boulder

/**
 * Abstract base type for functions with one input and one output.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../../axon/js/Property.js';
import optionize from '../../../../../phet-core/js/optionize.js';
import { TColor } from '../../../../../scenery/js/imports.js';
import functionBuilder from '../../../functionBuilder.js';
import FBConstants from '../../FBConstants.js';
import FBMovable, { FBMovableOptions } from '../FBMovable.js';

// properties of associated FunctionNode, in the model for convenience
type ViewOptions = {
  fill: TColor;
  stroke?: TColor;
  lineWidth?: number;
  lineDash?: number[];
};

type SelfOptions = {
  name: string; // optional name, for internal debugging
  invertible: boolean; // is this function invertible?
} & ViewOptions;

export type AbstractFunctionOptions = SelfOptions & FBMovableOptions;

export default abstract class AbstractFunction<T> extends FBMovable {

  private readonly _invertible: boolean;
  public readonly name: string;
  public readonly viewOptions: ViewOptions; // properties of FunctionNode, in the model for convenience
  public readonly fillProperty: Property<TColor>;

  protected constructor( providedOptions?: AbstractFunctionOptions ) {

    const options = optionize<AbstractFunctionOptions, SelfOptions, FBMovableOptions>()( {

      // SelfOptions
      stroke: 'black',
      lineWidth: 1,
      lineDash: [],

      // FBMovableOptions
      animationSpeed: FBConstants.FUNCTION_ANIMATION_SPEED
    }, providedOptions );

    super( options );

    this._invertible = options.invertible;

    this.name = options.name;
    this.viewOptions = _.pick( options, 'fill', 'stroke', 'lineWidth', 'lineDash' );

    this.fillProperty = new Property( options.fill );
    this.fillProperty.link( fill => {
      this.viewOptions.fill = fill;
    } );
  }

  public override reset(): void {
    super.reset();
    this.fillProperty.reset();
  }

  /**
   * Is this function invertible?
   */
  public getInvertible(): boolean { return this._invertible; }

  public get invertible(): boolean { return this.getInvertible(); }

  /**
   * Applies the function to the input, produces the output.
   * @param input - the input, which should not be modified
   * @returns output, of the same type as input
   */
  public abstract applyFunction( input: T ): T;
}

functionBuilder.register( 'AbstractFunction', AbstractFunction );