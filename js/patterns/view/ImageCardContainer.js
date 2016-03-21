// Copyright 2016, University of Colorado Boulder

/**
 * Container for image cards.
 * An image card that is in a carousel is a descendant of this type of container.
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
  var ImageGhostCard = require( 'FUNCTION_BUILDER/patterns/view/ImageGhostCard' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {HTMLImageElement} image - images that appears on the card
   * @param {Object} [options]
   * @constructor
   */
  function ImageCardContainer( image, options ) {

    options = _.extend( {
      showGhostCard: false // {boolean} whether to show a 'ghost' card when the container is empty
    }, options );

    this.image = image; // @private

    if ( options.showGhostCard ) {
      options.emptyNode = new ImageGhostCard( image );
    }

    CardContainer.call( this, options );
  }

  functionBuilder.register( 'ImageCardContainer', ImageCardContainer );

  return inherit( CardContainer, ImageCardContainer, {

    /**
     * Creates cards and puts them in the container.
     * See supertype CardContainer.createCards for params.
     * @override
     * @public
     */
    createCards: function( numberOfInstances, scene, inputContainer, outputContainer, builderNode, dragLayer, animationLayer, seeInsideLayer ) {

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
        var cardNode = new ImageCardNode( card, inputContainer, outputContainer, builderNode, dragLayer, animationLayer );

        // put the Node in this container
        this.addNode( cardNode );

        // add to 'see inside' layer, for viewing the card through windows
        seeInsideLayer.addCardNode( cardNode );

        // add a 'mole under the carpet' to the builder, synchronizes with the card's location
        builderNode.addMole( card );
      }
    }
  } );
} );
