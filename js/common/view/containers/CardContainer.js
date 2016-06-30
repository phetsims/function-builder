// Copyright 2016, University of Colorado Boulder

/**
 * Base type for card containers.
 * A container is intended to be put in a carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableContainer = require( 'FUNCTION_BUILDER/common/view/containers/MovableContainer' );

  /**
   * @param {*} value - value of the card, type determined by subtype
   * @param {Object} [options]
   * @constructor
   */
  function CardContainer( value, options ) {

    options = _.extend( {
      size: FBConstants.CARD_OPTIONS.size
    }, options );

    // @private
    this.value = value;

    MovableContainer.call( this, options );
  }

  functionBuilder.register( 'CardContainer', CardContainer );

  return inherit( MovableContainer, CardContainer, {

    /**
     * Creates cards and puts them in the container.
     *
     * @param {number} numberOfInstances
     * @param {Scene} scene
     * @param {CardContainer} inputContainer
     * @param {CardContainer} outputContainer
     * @param {BuilderNode} builderNode
     * @param {Node} dragLayer
     * @param {SeeInsideLayer} seeInsideLayer
     * @param {Property.<boolean>} seeInsideProperty
     * @public
     */
    createCards: function( numberOfInstances, scene, inputContainer, outputContainer, builderNode,
                           dragLayer, seeInsideLayer, seeInsideProperty ) {

      assert && assert( this === inputContainer,
        'cards must be created in the input carousel' );
      assert && assert( inputContainer.isEmpty() && outputContainer.isEmpty(),
        'did you accidentally call this function twice?' );
      assert && assert( inputContainer.carouselLocation && outputContainer.carouselLocation,
        'did you call this before containers were attached to ScreenView?' );

      for ( var i = 0; i < numberOfInstances; i++ ) {

        // model element
        var card = this.createCard( this.value, inputContainer.carouselLocation );
        scene.cards.push( card );

        // associated Node
        var cardNode = new this.createCardNode( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty );

        // put the Node in this container
        this.addNode( cardNode );

        // add to 'see inside' layer, for viewing the card through windows
        seeInsideLayer.addCardNode( cardNode );

        // add a 'mole under the carpet' to the builder, synchronizes with the card's location
        builderNode.addMole( card );
      }
    },

    /***
     * Creates the model element for a card.
     *
     * @param {*} value - the card's value, type determined by subtype
     * @param {Vector2} location - the card's initial location
     * @returns {Card}
     * @protected
     * @abstract
     */
    createCard: function( value, location ) {
      throw new Error( 'must be implemented by subtype' );
    },

    /**
     * Creates the view element (Node) for a card.
     *
     * @param {Card} card
     * @param {CardContainer} inputContainer
     * @param {CardContainer} outputContainer
     * @param {BuilderNode} builderNode
     * @param {Node} dragLayer
     * @param {SeeInsideLayer} seeInsideProperty
     * @returns {CardNode}
     * @protected
     * @abstract
     */
    createCardNode: function( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty ) {
      throw new Error( 'must be implemented by subtype' );
    }
  } );
} );
