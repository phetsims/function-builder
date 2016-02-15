// Copyright 2016, University of Colorado Boulder

/**
 * Container for {ImageCard} instances.
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
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableContainerNode = require( 'FUNCTION_BUILDER/common/view/MovableContainerNode' );
  var MovableImageCardNode = require( 'FUNCTION_BUILDER/patterns/view/MovableImageCardNode' );

  /**
   * @param {HTMLImageElement} image - images that appears on the card
   * @param {Node} parentNode - parent for Nodes when they are outside the container
   * @param {PatternsScene} scene
   * @param {Object} [options]
   * @constructor
   */
  function ImageCardContainerNode( image, parentNode, scene, options ) {

    options = _.extend( {
      popOutOffset: FBConstants.CARD_POP_OUT_OFFSET,
      size: FBConstants.CARD_SIZE
    }, options );

    var thisNode = this;

    // When the user stops dragging a function, decide what to do with it.
    options.endDrag = function( cardNode, event, trail ) {

      var card = cardNode.movable;

      //TODO temporary, move back to input carousel
      card.destination = card.locationProperty.initialValue;
    };

    MovableContainerNode.call( this, parentNode, options );

    // Populates the container
    this._populateContainer = function( numberOfInstances, location ) {
      for ( var i = 0; i < numberOfInstances; i++ ) {

        // IIFE to create a closure for each card
        (function() {

          // model element
          var card = ImageCard.withImage( image, {
            location: location
          } );
          scene.cards.push( card );

          // associated Node
          var cardNode = new MovableImageCardNode( card, {
            endDrag: options.endDrag
          } );

          // put the Node in the container
          thisNode.pushNode( cardNode );

          // return the Node to the container
          card.locationProperty.lazyLink( function( location ) {
            if ( !card.dragging && location.equals( card.locationProperty.initialValue ) ) {
              thisNode.pushNode( cardNode );
            }
          } );
        })();
      }
    };
  }

  functionBuilder.register( 'ImageCardContainerNode', ImageCardContainerNode );

  return inherit( MovableContainerNode, ImageCardContainerNode, {

    populateContainer: function( numberOfInstances, location ) {
      this._populateContainer( numberOfInstances, location );
    }
  } );
} );
