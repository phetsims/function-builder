// Copyright 2015-2019, University of Colorado Boulder

/**
 * Node that displays an image card.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const CardNode = require( 'FUNCTION_BUILDER/common/view/cards/CardNode' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const Image = require( 'SCENERY/nodes/Image' );
  const ImageCard = require( 'FUNCTION_BUILDER/common/model/cards/ImageCard' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );

  // constants
  const DEFAULT_IMAGE_SCALE = 0.4; // how much to scale images that appear on cards

  /**
   * @param {ImageCard} card
   * @param {CardContainer} inputContainer - container in the input carousel
   * @param {CardContainer} outputContainer - container in the output carousel
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer - parent for this node when it's being dragged or animating
   * @param {Property.<boolean>} seeInsideProperty - for the 'See Inside' feature
   * @param {Object} [options]
   * @constructor
   */
  function ImageCardNode( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty, options ) {

    assert && assert( card instanceof ImageCard );

    options = merge( {
      imageScale: DEFAULT_IMAGE_SCALE
    }, options );

    // @private {Node} content that is displayed on the card, set by updateContent
    this.imageNode = null;

    // @private scale images uniformly, because using maxWidth/maxHeight could cause an unintended transform
    this.imageScale = options.imageScale;

    CardNode.call( this, card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty, options );
  }

  functionBuilder.register( 'ImageCardNode', ImageCardNode );

  return inherit( CardNode, ImageCardNode, {

    /**
     * Updates the image displayed on the card.
     *
     * @param {Builder} builder
     * @param {number} numberOfFunctionsToApply
     * @protected
     * @override
     */
    updateContent: function( builder, numberOfFunctionsToApply ) {

      // {HTMLCanvasElement} run the input image through the builder
      const canvas = builder.applyFunctions( this.card.canvas, numberOfFunctionsToApply );

      if ( !this.imageNode ) {

        // create the node
        this.imageNode = new Image( canvas.toDataURL(), {
          initialWidth: canvas.width,
          initialHeight: canvas.height,
          scale: this.imageScale
        } );
        this.addChild( this.imageNode );
      }
      else {

        // update the node
        this.imageNode.setImageWithSize( canvas.toDataURL(), canvas.width, canvas.height );
      }

      // center on the card
      this.imageNode.center = this.backgroundNode.center;
    }
  }, {

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
    createGhostNode: function( image, options ) {

      options = merge( {
        imageScale: DEFAULT_IMAGE_SCALE
      }, options );

      const contentNode = new Image( image, { scale: options.imageScale } );
      return CardNode.createGhostNode( contentNode, options );
    }
  } );
} );
