// Copyright 2016-2020, University of Colorado Boulder

/**
 * Abstract base type for all image-processing functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import functionBuilder from '../../../functionBuilder.js';
import AbstractFunction from './AbstractFunction.js';

class ImageFunction extends AbstractFunction {

  /**
   * @param {Node} iconNode - icon that represents the function type
   * @param {Object} [options]
   */
  constructor( iconNode, options ) {
    super( options );
    this.iconNode = iconNode; // @public (read-only)
  }
}

functionBuilder.register( 'ImageFunction', ImageFunction );

export default ImageFunction;