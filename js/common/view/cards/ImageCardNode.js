// Copyright 2015-2023, University of Colorado Boulder

/**
 * Node that displays an image card.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../../phet-core/js/merge.js';
import { Image } from '../../../../../scenery/js/imports.js';
import functionBuilder from '../../../functionBuilder.js';
import ImageCard from '../../model/cards/ImageCard.js';
import CardNode from './CardNode.js';

// constants
const DEFAULT_IMAGE_SCALE = 0.4; // how much to scale images that appear on cards

export default class ImageCardNode extends CardNode {

  /**
   * @param {ImageCard} card
   * @param {CardContainer} inputContainer - container in the input carousel
   * @param {CardContainer} outputContainer - container in the output carousel
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer - parent for this node when it's being dragged or animating
   * @param {Property.<boolean>} seeInsideProperty - for the 'See Inside' feature
   * @param {Object} [options]
   */
  constructor( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty, options ) {

    assert && assert( card instanceof ImageCard );

    options = merge( {
      imageScale: DEFAULT_IMAGE_SCALE
    }, options );

    // {Node} content that is displayed on the card, set by updateContent
    let imageNode = null;

    /**
     * Updates the image displayed on the card.
     * @param {ImageCardNode} cardNode
     * @param {Builder} builder
     * @param {number} numberOfFunctionsToApply
     */
    function updateContent( cardNode, builder, numberOfFunctionsToApply ) {

      // {HTMLCanvasElement} run the input image through the builder
      const canvas = builder.applyFunctions( cardNode.card.canvas, numberOfFunctionsToApply );

      if ( !imageNode ) {

        // create the node
        imageNode = new Image( canvas.toDataURL(), {
          initialWidth: canvas.width,
          initialHeight: canvas.height,
          scale: options.imageScale
        } );
        cardNode.addChild( imageNode );
      }
      else {

        // update the node
        imageNode.setImageWithSize( canvas.toDataURL(), canvas.width, canvas.height );
      }

      // center on the card
      imageNode.center = cardNode.backgroundNode.center;
    }

    super( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty, updateContent, options );
  }

  /**
   * Creates a 'ghost' card that appears in an empty carousel.
   *
   * @param {HTMLImageElement} image - image that appears on the card
   * @param {Object} [options]
   * @returns {Node}
   * @public
   * @static
   * @override
   */
  static createGhostNode( image, options ) {

    options = merge( {
      imageScale: DEFAULT_IMAGE_SCALE
    }, options );

    const contentNode = new Image( image, { scale: options.imageScale } );
    return CardNode.createGhostNode( contentNode, options );
  }
}

functionBuilder.register( 'ImageCardNode', ImageCardNode );