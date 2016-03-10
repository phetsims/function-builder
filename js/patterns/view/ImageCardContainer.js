// Copyright 2016, University of Colorado Boulder

/**
 * Container for image cards.
 *
 * Responsibilities:
 *
 * - create a specified number of {ImageCard} card instances, all of the same type
 * - create an associated Node for each instance
 * - handle dragging instances out of the container
 * - decide what to do with an instance when the user stops dragging it
 * - return an instance to the container when it's location is the same as the container
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CardContainer = require( 'FUNCTION_BUILDER/common/view/CardContainer' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var ImageCard = require( 'FUNCTION_BUILDER/patterns/model/ImageCard' );
  var ImageCardNode = require( 'FUNCTION_BUILDER/patterns/view/ImageCardNode' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {HTMLImageElement} image - images that appears on the card
   * @param {Object} [options]
   * @constructor
   */
  function ImageCardContainer( image, options ) {
    this.image = image; // @private
    CardContainer.call( this, options );
  }

  functionBuilder.register( 'ImageCardContainer', ImageCardContainer );

  return inherit( CardContainer, ImageCardContainer, {

    /**
     * Creates functions and puts them in the container.
     *
     * @param {number} numberOfInstances
     * @param {PatternsScene} scene
     * @param {ImageCardContainer} inputContainer
     * @param {ImageCardContainer} outputContainer
     * @param {BuilderNode} builderNode
     * @param {Node} dragLayer
     * @param {Node} foregroundAnimationLayer
     * @param {SeeInsideLayer} seeInsideLayer
     * @override
     * @public
     */
    createCards: function( numberOfInstances, scene, inputContainer, outputContainer, builderNode, dragLayer, foregroundAnimationLayer, seeInsideLayer ) {

      assert && assert( this === inputContainer, 'cards must be created in the input carousel' );
      assert && assert( inputContainer.carouselLocation );
      assert && assert( outputContainer.carouselLocation );

      for ( var i = 0; i < numberOfInstances; i++ ) {

        // model element
        var card = ImageCard.withImage( this.image, {
          location: inputContainer.carouselLocation
        } );
        scene.cards.push( card );

        // associated Node
        var cardNode = new ImageCardNode( card, inputContainer, outputContainer, builderNode, dragLayer, foregroundAnimationLayer );
        seeInsideLayer.addCardNode( cardNode );//TODO add/remove like MoleNode?

        // put the Node in this container
        this.addNode( cardNode );
      }
    }
  } );
} );
