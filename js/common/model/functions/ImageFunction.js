// Copyright 2016-2019, University of Colorado Boulder

/**
 * Abstract base type for all image-processing functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../../phet-core/js/inherit.js';
import functionBuilder from '../../../functionBuilder.js';
import AbstractFunction from './AbstractFunction.js';

/**
 * @param {Node} iconNode - icon that represents the function type
 * @param {Object} [options]
 * @constructor
 */
function ImageFunction( iconNode, options ) {
  this.iconNode = iconNode; // @public (read-only)
  AbstractFunction.call( this, options );
}

functionBuilder.register( 'ImageFunction', ImageFunction );

inherit( AbstractFunction, ImageFunction );
export default ImageFunction;