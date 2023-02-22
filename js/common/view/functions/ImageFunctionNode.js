// Copyright 2015-2020, University of Colorado Boulder

/**
 * Node that displays an image processing function.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import functionBuilder from '../../../functionBuilder.js';
import ImageFunction from '../../model/functions/ImageFunction.js';
import FunctionNode from './FunctionNode.js';

export default class ImageFunctionNode extends FunctionNode {

  /**
   * @param {ImageFunction} functionInstance
   * @param {FunctionContainer} container - container in the function carousel
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer - parent for this node when it's being dragged or animating
   * @param {Object} [options]
   */
  constructor( functionInstance, container, builderNode, dragLayer, options ) {
    assert && assert( functionInstance instanceof ImageFunction );
    super( functionInstance, functionInstance.iconNode, container, builderNode, dragLayer, options );
  }
}

functionBuilder.register( 'ImageFunctionNode', ImageFunctionNode );