// Copyright 2016-2023, University of Colorado Boulder

/**
 * A card with an image on it.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';
import functionBuilder from '../../../functionBuilder.js';
import FBCanvasUtils from '../../../patterns/model/FBCanvasUtils.js';
import Card, { CardOptions } from './Card.js';

type SelfOptions = EmptySelfOptions;
type ImageCardOptions = SelfOptions & CardOptions;

export default class ImageCard extends Card {

  public readonly image: HTMLImageElement;
  private _canvas: HTMLCanvasElement | null; // created on demand by getCanvas

  /**
   * @param image - the input image
   * @param [providedOptions]
   */
  public constructor( image: HTMLImageElement, providedOptions?: ImageCardOptions ) {

    super( providedOptions );

    this.image = image;
    this._canvas = null;
  }

  /**
   * Gets the card's image as a canvas, so that it can be transformed by image functions.
   * The canvas is created on demand.
   */
  public getCanvas(): HTMLCanvasElement {
    if ( !this._canvas ) {
      this._canvas = FBCanvasUtils.createCanvasWithImage( this.image );
    }
    return this._canvas;
  }

  public get canvas(): HTMLCanvasElement { return this.getCanvas(); }
}

functionBuilder.register( 'ImageCard', ImageCard );