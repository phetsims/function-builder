// Copyright 2016, University of Colorado Boulder

/**
 * Container for cards in the 'Numbers' screen.
 * A container is intended to be put in a carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CardContainer = require( 'FUNCTION_BUILDER/common/view/CardContainer' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberCard = require( 'FUNCTION_BUILDER/common/model/NumberCard' );
  var NumberCardNode = require( 'FUNCTION_BUILDER/common/view/NumberCardNode' );
  var RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );

  /**
   * @param {RationalNumber} rationalNumber - a rational number, see rationalNumber.js
   * @param {Object} [options]
   * @constructor
   */
  function NumberCardContainer( rationalNumber, options ) {

    assert && assert( rationalNumber instanceof RationalNumber );

    options = _.extend( {
      emptyNode: NumberCardNode.createGhostNode( rationalNumber ) // {Node} shown when the container is empty
    }, options );

    CardContainer.call( this, rationalNumber, options );
  }

  functionBuilder.register( 'NumberCardContainer', NumberCardContainer );

  return inherit( CardContainer, NumberCardContainer, {

    /**
     * Creates the model element for a card.
     *
     * @param {RationalNumber} value
     * @param {Vector2} location
     * @returns {NumberCard}
     * @protected
     * @override
     */
    createCard: function( value, location ) {
      return new NumberCard( value, { location: location } );
    },

    /**
     * Creates the node for a {NumberCard} card.
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
