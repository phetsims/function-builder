// Copyright 2016, University of Colorado Boulder

/**
 * Container for image cards.
 * A container is intended to be put in a carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CardContainer = require( 'FUNCTION_BUILDER/common/view/containers/CardContainer' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var ImageCard = require( 'FUNCTION_BUILDER/common/model/cards/ImageCard' );
  var ImageCardNode = require( 'FUNCTION_BUILDER/common/view/cards/ImageCardNode' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {HTMLImageElement} image - images that appears on the card
   * @param {Object} [options]
   * @constructor
   */
  function ImageCardContainer( image, options ) {

    options = _.extend( {
      emptyNode: ImageCardNode.createGhostNode( image ) // {Node} shown when the container is empty
    }, options );

    CardContainer.call( this, image, options );
  }

  functionBuilder.register( 'ImageCardContainer', ImageCardContainer );

  return inherit( CardContainer, ImageCardContainer, {

    /**
     * Creates the model element for a card.
     *
     * @param {HTMLImageElement} value - the image displayed on the card
     * @param {Vector2} location - the card's initial location
     * @returns {ImageCard}
     * @protected
     * @override
     */
    createCard: function( value, location ) {
      return new ImageCard( value, { location: location } );
    },

    /**
     * Creates the node for a card.
     * See supertype CardContainer.createCardNode for params.
     *
     * @returns {ImageCardNode}
     * @protected
     * @override
     */
    createCardNode: function( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty ) {
      return new ImageCardNode( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty );
    }
  } );
} );
