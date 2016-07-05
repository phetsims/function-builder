// Copyright 2016, University of Colorado Boulder

/**
 * Node that displays an image card.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CardNode = require( 'FUNCTION_BUILDER/common/view/cards/CardNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ImageCard = require( 'FUNCTION_BUILDER/common/model/cards/ImageCard' );
  var inherit = require( 'PHET_CORE/inherit' );

  // constants
  var DEFAULT_IMAGE_SCALE = 0.4; // how much to scale images that appear on cards

  /**
   * @param {ImageCard} card
   * @param {ImageCardContainer} inputContainer - container in the input carousel
   * @param {ImageCardContainer} outputContainer - container in the output carousel
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer - parent for this node when it's being dragged or animating
   * @param {Property.<boolean>} seeInsideProperty - for the 'See Inside' feature
   * @param {Object} [options]
   * @constructor
   */
  function ImageCardNode( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty, options ) {

    assert && assert( card instanceof ImageCard );

    options = _.extend( {
      imageScale: DEFAULT_IMAGE_SCALE
    }, options );

    assert && assert( !options.contentNode, 'this card sets its own contentNode' );
    options.contentNode = new Image( card.image, {
      scale: options.imageScale
    } );

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

      var imageNode = this.contentNode;

      if ( numberOfFunctionsToApply === 0 ) {

        // performance optimization
        imageNode.setImageWithSize( this.card.image, this.card.image.width, this.card.image.height );
      }
      else {

        // {HTMLCanvasElement} run the input image through the builder
        var canvas = builder.applyFunctions( this.card.canvas, numberOfFunctionsToApply );

        // display the output image
        imageNode.setImageWithSize( canvas.toDataURL(), canvas.width, canvas.height );
      }

      // center on the card
      this.centerContent();
    }
  }, {

    /**
     * Creates a 'ghost' card that appears in an empty carousel.
     *
     * @param {HTMLImageElement} image - image that appears on the card
     * @param {Object} [options]
     * @return {Node}
     * @public
     * @static
     * @override
     */
    createGhostNode: function( image, options ) {

      options = _.extend( {
        imageScale: DEFAULT_IMAGE_SCALE
      }, options );

      var contentNode = new Image( image, { scale: options.imageScale } );
      return CardNode.createGhostNode( contentNode, options );
    }
  } );
} );
