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
   * @param {number} numberOfInstances - number of instances to create
   * @param {Node} parentNode - parent for Nodes when they are outside the container
   * @param {PatternsScene} scene
   * @param {Object} [options]
   * @constructor
   */
  function ImageCardContainerNode( image, numberOfInstances, parentNode, scene, options ) {

    options = _.extend( {
      popOutOffset: FBConstants.CARD_POP_OUT_OFFSET,
      size: FBConstants.CARD_SIZE
    }, options );

    var thisNode = this;

    // When the user stops dragging a function, decide what to do with it.
    options.endDrag = function( cardNode, event, trail ) {

      var card = cardNode.movable;

      assert && assert( card.containerLocation, 'card has no containerLocation' );

      //TODO temporary, move back to input carousel
      card.destination = card.containerLocation;
    };

    MovableContainerNode.call( this, parentNode, options );

    // Populate the container
    for ( var i = 0; i < numberOfInstances; i++ ) {

      // IIFE to create a closure for each function instance
      (function() {

        // model element
        var card = ImageCard.withImage( image );
        scene.cards.push( card );

        // associated Node
        var cardNode = new MovableImageCardNode( card, {
          endDrag: options.endDrag
        } );

        // put the Node in the container
        thisNode.push( cardNode );

        // return the Node to the container
        card.locationProperty.lazyLink( function( location ) {
          assert && assert( card.containerLocation, 'card has no containerLocation' );
          if ( !card.dragging && location.equals( card.containerLocation ) ) {
            thisNode.push( cardNode );
          }
        } );
      })();
    }
  }

  functionBuilder.register( 'ImageCardContainerNode', ImageCardContainerNode );

  return inherit( MovableContainerNode, ImageCardContainerNode, {

    /**
     * Adjusts initial locations of all cards in the container.
     * @public
     */
    adjustInitialLocations: function() {

      // compute the location of this Node in the model coordinate frame
      var viewLocation = this.parentToGlobalPoint( this.center );
      var modelLocation = this.parentNode.globalToLocalPoint( viewLocation );

      this.nodes.forEach( function( node ) {
        //TODO replace this with: node.movable.locationProperty.initialValue = modelLocation.copy();
        node.movable.containerLocation = modelLocation.copy();
      } );
    }
  } );
} );
