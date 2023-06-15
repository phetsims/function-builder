// Copyright 2016-2023, University of Colorado Boulder

/**
 * Abstract base type for all image-processing functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import functionBuilder from '../../../functionBuilder.js';
import AbstractFunction, { AbstractFunctionOptions } from './AbstractFunction.js';
import { Node } from '../../../../../scenery/js/imports.js';
import { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;

export type ImageFunctionOptions = SelfOptions & AbstractFunctionOptions;

export default abstract class ImageFunction extends AbstractFunction<HTMLCanvasElement> {

  public readonly iconNode: Node;

  /**
   * @param iconNode - icon that represents the function type
   * @param [providedOptions]
   */
  protected constructor( iconNode: Node, providedOptions?: ImageFunctionOptions ) {
    super( providedOptions );
    this.iconNode = iconNode;
  }
}

functionBuilder.register( 'ImageFunction', ImageFunction );