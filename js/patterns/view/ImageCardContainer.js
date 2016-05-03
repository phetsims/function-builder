// Copyright 2016, University of Colorado Boulder

/**
 * Container for image cards.
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
      emptyNode: new ImageGhostCard( image ) // {Node} shown when the container is empty
    }, options );

    CardContainer.call( this, image, options );
  }

  functionBuilder.register( 'ImageCardContainer', ImageCardContainer );

  return inherit( CardContainer, ImageCardContainer, {

    /**
     * Creates the model element for a card.
     * See supertype CardContainer.createCard for params.
     * @protected
     * @override
     */
    createCard: function( value, location ) {
      return ImageCard.withImage( value, { location: location } );
    },

    /**
     * Creates the view element (Node) for a card.
     * See supertype CardContainer.createCardNode for params.
     * @protected
     * @override
     */
    createCardNode: function( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty ) {
      return new ImageCardNode( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty );
    }
  } );
} );
