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
    this.card = card;
    this.builder = builderNode.builder;
    this.imageScale = options.imageScale;
    this.imageNode = null;

    CardNode.call( this, card, inputContainer, outputContainer, builderNode, dragLayer, animationLayer, options );

    var thisNode = this;
    this.numberOfFunctionsToApplyProperty.link( function( numberOfFunctionsToApply ) {
      thisNode.updateImage( numberOfFunctionsToApply );
    } );

    builderNode.builder.functionChangedEmitter.addListener( function() {
      thisNode.updateImage( thisNode.numberOfFunctionsToApplyProperty.get() );
    } );
  }

  functionBuilder.register( 'ImageCardNode', ImageCardNode );

  return inherit( CardNode, ImageCardNode, {

    //TODO this unnecessarily updates cards in the input carousel when functions change
    // @private updates the image on the card
    updateImage: function( numberOfFunctionsToApply ) {

      var slots = this.builder.slots;

      assert && assert( ( numberOfFunctionsToApply >= 0 ) && ( numberOfFunctionsToApply <= slots.length ) );

      // run the card's canvas through the applicable functions
      var canvas = this.card.canvas;
      for ( var i = 0; i < numberOfFunctionsToApply; i++ ) {
        var slot = slots[ i ];
        if ( !slot.isEmpty() ) {
          canvas = slot.functionInstance.apply( canvas );
        }
      }

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
