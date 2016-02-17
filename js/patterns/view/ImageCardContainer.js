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
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var ImageCard = require( 'FUNCTION_BUILDER/patterns/model/ImageCard' );
  var ImageCardNode = require( 'FUNCTION_BUILDER/patterns/view/ImageCardNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableContainer = require( 'FUNCTION_BUILDER/common/view/MovableContainer' );

  /**
   * @param {HTMLImageElement} image - images that appears on the card
   * @param {Object} [options]
   * @constructor
   */
  function ImageCardContainer( image, options ) {

    options = _.extend( {
      size: FBConstants.CARD_SIZE
    }, options );

    this.image = image; // @private

    MovableContainer.call( this, options );
  }

  functionBuilder.register( 'ImageCardContainer', ImageCardContainer );

  return inherit( MovableContainer, ImageCardContainer, {

    /**
     * @param {number} numberOfInstances
     * @param {PatternsScene} scene
     * @param {ImageCardContainer} inputContainer
     * @param {ImageCardContainer} outputContainer
     * @param {BuilderNode} builderNode
     * @param {Node} worldNode
     * @public
     */
    createCards: function( numberOfInstances, scene, inputContainer, outputContainer, builderNode, worldNode ) {

      assert && assert( this === inputContainer );
      assert && assert( inputContainer.carouselLocation );
      assert && assert( outputContainer.carouselLocation );

      for ( var i = 0; i < numberOfInstances; i++ ) {

        // model element
        var card = ImageCard.withImage( this.image, {
          location: inputContainer.carouselLocation
        } );
        scene.cards.push( card );

        // associated Node
        var cardNode = new ImageCardNode( card, inputContainer, outputContainer, builderNode, worldNode );

        // put the Node in this container
        this.pushNode( cardNode );
      }
    }
  } );
} );
