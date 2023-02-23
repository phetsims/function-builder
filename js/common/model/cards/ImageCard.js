// Copyright 2016-2023, University of Colorado Boulder

/**
 * A card with an image on it.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import functionBuilder from '../../../functionBuilder.js';
import FBCanvasUtils from '../../../patterns/model/FBCanvasUtils.js';
import Card from './Card.js';

export default class ImageCard extends Card {

  /**
   * @param {HTMLImageElement} image - the input image
   * @param {Object} [options]
   */
  constructor( image, options ) {

    super( options );

    // {HTMLCanvasElement} @public (read-only)
    this.image = image;

    // @private created on demand by getCanvas
    this._canvas = null;
  }

  /**
   * Gets the card's image as a canvas, so that it can be transformed by image functions.
   * The canvas is created on demand.
   * @returns {HTMLCanvasElement}
   * @public
   */
  getCanvas() {
    if ( !this._canvas ) {
      this._canvas = FBCanvasUtils.createCanvasWithImage( this.image );
    }
    return this._canvas;
  }

  get canvas() { return this.getCanvas(); }
}

functionBuilder.register( 'ImageCard', ImageCard );