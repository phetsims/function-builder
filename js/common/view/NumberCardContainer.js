// Copyright 2016, University of Colorado Boulder

/**
 * Container for cards in the 'Numbers' screen.
 * This container is intended to be put in a carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CardContainer = require( 'FUNCTION_BUILDER/common/view/CardContainer' );
  var FBUtils = require( 'FUNCTION_BUILDER/common/FBUtils' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberCard = require( 'FUNCTION_BUILDER/common/model/NumberCard' );
  var NumberCardNode = require( 'FUNCTION_BUILDER/common/view/NumberCardNode' );

  /**
   * @param {BigRational} bigRational - a rational number, see BigRational.js
   * @param {Object} [options]
   * @constructor
   */
  function NumberCardContainer( bigRational, options ) {

    assert && FBUtils.instanceofBigRational( bigRational );

    options = _.extend( {
      emptyNode: NumberCardNode.createGhostNode( bigRational ) // {Node} shown when the container is empty
    }, options );

    CardContainer.call( this, bigRational, options );
  }

  functionBuilder.register( 'NumberCardContainer', NumberCardContainer );

  return inherit( CardContainer, NumberCardContainer, {

    /**
     * Creates the model element for a card.
     * See supertype CardContainer.createCard for params.
     *
     * @returns {NumberCard}
     * @protected
     * @override
     */
    createCard: function( value, location ) {
      return new NumberCard( value, { location: location } );
    },

    /**
     * Creates the view element (Node) for a card.
     * See supertype CardContainer.createCardNode for params.
     *
     * @returns {NumberCardNode}
     * @protected
     * @override
     */
    createCardNode: function( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty ) {
      return new NumberCardNode( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty );
    }
  } );
} );
