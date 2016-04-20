// Copyright 2016, University of Colorado Boulder

/**
 * Node that displays an {ImageCard}.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CardNode = require( 'FUNCTION_BUILDER/common/view/CardNode' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ImageCard = require( 'FUNCTION_BUILDER/patterns/model/ImageCard' );
  var inherit = require( 'PHET_CORE/inherit' );

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

    assert && assert( card instanceof ImageCard, 'unexpected type: ' + card.constructor.name );

    options = _.extend( {
      imageScale: FBConstants.CARD_IMAGE_SCALE
    }, options );

    // @private
    this.imageNode = new Image( card.canvas.toDataURL(), {
      initialWidth: card.canvas.width,
      initialHeight: card.canvas.height,
      scale: options.imageScale
    } );

    CardNode.call( this, card, this.imageNode, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty, options );
  }

  functionBuilder.register( 'ImageCardNode', ImageCardNode );

  return inherit( CardNode, ImageCardNode, {

    /**
     * Updates the image displayed on the card.
     * See supertype CardNode.updateContent for params.
     * @protected
     * @override
     */
    updateContent: function( builder, numberOfFunctionsToApply ) {

      // {HTMLCanvasElement} run the input image through the builder
      var canvas = builder.applyFunctions( this.card.canvas, numberOfFunctionsToApply );

      // display the output image
      this.imageNode.setImageWithSize( canvas.toDataURL(), canvas.width, canvas.height );
      this.imageNode.center = this.backgroundNode.center;
    }
  } );
} );
