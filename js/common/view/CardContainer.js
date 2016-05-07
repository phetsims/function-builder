// Copyright 2016, University of Colorado Boulder

/**
 * Base type for card containers.
 * This container is intended to be put in a carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableContainer = require( 'FUNCTION_BUILDER/common/view/MovableContainer' );

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

    //TODO preferable to set these through options, since they are only assigned once
    // @public
    this.addFirstCallback = null; // {function(*)|null} called after the first card is added to an empty container
    this.removeLastCallback = null; // {function(*)|null} called after the last card is removed from a container

    MovableContainer.call( this, options );
  }

  functionBuilder.register( 'CardContainer', CardContainer );

  return inherit( MovableContainer, CardContainer, {

    /**
     * Adds a Node to the container.
     *
     * @param {Node} node
     */
    addNode: function( node ) {
      var wasEmpty = this.isEmpty();
      MovableContainer.prototype.addNode.call( this, node );
      if ( this.addFirstCallback && wasEmpty ) {
        this.addFirstCallback( this.value );
      }
    },

    /**
     * Removes a Node from the container.
     *
     * @param {Node} node
     */
    removeNode: function( node ) {
      MovableContainer.prototype.removeNode.call( this, node );
      if ( this.removeLastCallback && this.isEmpty() ) {
        this.removeLastCallback( this.value );
      }
    },

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

      assert && assert( this === inputContainer, 'cards must be created in the input carousel' );
      assert && assert( inputContainer.carouselLocation );
      assert && assert( outputContainer.carouselLocation );

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
