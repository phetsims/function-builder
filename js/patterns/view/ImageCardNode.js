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
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ImageCard = require( 'FUNCTION_BUILDER/patterns/model/ImageCard' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {ImageCard} card
   * @param {ImageCardContainer} inputContainer
   * @param {ImageCardContainer} outputContainer
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer
   * @param {Node} animationLayer
   * @param {Object} [options]
   * @constructor
   */
  function ImageCardNode( card, inputContainer, outputContainer, builderNode, dragLayer, animationLayer, options ) {

    assert && assert( card instanceof ImageCard, 'unexpected type: ' + card.constructor.name );

    options = _.extend( {
      imageScale: 0.3
    }, options );

    // @private
    this.imageScale = options.imageScale;
    this.imageNode = null; // {Image} set by updateContent

    CardNode.call( this, card, inputContainer, outputContainer, builderNode, dragLayer, animationLayer, options );
  }

  functionBuilder.register( 'ImageCardNode', ImageCardNode );

  return inherit( CardNode, ImageCardNode, {

    /**
     * Updates the image displayed on the card.
     * @param {Builder} builder
     * @param {number} numberOfFunctionsToApply - how many functions to apply from the builder
     * @protected
     * @override
     */
    updateContent: function( builder, numberOfFunctionsToApply ) {

      // run the card through the builder
      var canvas = builder.applyFunctions( this.card.canvas, numberOfFunctionsToApply );

      // remove the old image
      this.imageNode && this.removeChild( this.imageNode );

      //TODO this.imageNode.setImage would be preferred, but doesn't work reliably with a data URL
      // add the new image
      this.imageNode = new Image( canvas.toDataURL(), {
        initialWidth: canvas.width,
        initialHeight: canvas.height,
        scale: this.imageScale,
        center: this.backgroundNode.center
      } );
      this.addChild( this.imageNode );
    }
  } );
} );
