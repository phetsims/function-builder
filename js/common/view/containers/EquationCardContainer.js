// Copyright 2016, University of Colorado Boulder

/**
 * Container for equation cards, eg 'x', '2x + 1'.
 * A container is intended to be put in a carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CardContainer = require( 'FUNCTION_BUILDER/common/view/containers/CardContainer' );
  var EquationCard = require( 'FUNCTION_BUILDER/common/model/cards/EquationCard' );
  var EquationCardNode = require( 'FUNCTION_BUILDER/common/view/cards/EquationCardNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {string} symbol - symbol that appears on the card
   * @param {Object} [options]
   * @constructor
   */
  function EquationCardContainer( symbol, options ) {

    assert && assert( typeof symbol === 'string' );

    options = _.extend( {
      emptyNode: EquationCardNode.createGhostNode( symbol ) // {Node} shown when the container is empty
    }, options );

    CardContainer.call( this, symbol, options );
  }

  functionBuilder.register( 'EquationCardContainer', EquationCardContainer );

  return inherit( CardContainer, EquationCardContainer, {

    /**
     * Creates the model element for a card.
     *
     * @param {string} value - the symbol displayed on the card, typically 'x'
     * @param {Vector2} location - the card's initial location
     * @returns {EquationCard}
     * @protected
     * @override
     */
    createCard: function( value, location ) {
      return new EquationCard( value, { location: location } );
    },

    /**
     * Creates the node for a card.
     * See supertype CardContainer.createCardNode for params.
     *
     * @returns {EquationCardNode}
     * @protected
     * @override
     */
    createCardNode: function( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty ) {
      return new EquationCardNode( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty );
    }
  } );
} );
