// Copyright 2016, University of Colorado Boulder

/**
 * Container for equation cards (eg 'x', '2x + 1').
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CardContainer = require( 'FUNCTION_BUILDER/common/view/CardContainer' );
  var EquationCard = require( 'FUNCTION_BUILDER/equations/model/EquationCard' );
  var EquationCardNode = require( 'FUNCTION_BUILDER/equations/view/EquationCardNode' );
  var EquationGhostCard = require( 'FUNCTION_BUILDER/equations/view/EquationGhostCard' );
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
      emptyNode: new EquationGhostCard( symbol ) // {Node} shown when the container is empty
    }, options );

    CardContainer.call( this, symbol, options );
  }

  functionBuilder.register( 'EquationCardContainer', EquationCardContainer );

  return inherit( CardContainer, EquationCardContainer, {

    /**
     * Creates the model element for a card.
     * See supertype CardContainer.createCard for params.
     * @public
     * @override
     */
    createCard: function( value, location ) {
      return new EquationCard( value, { location: location } );
    },

    /**
     * Creates the view element (Node) for a card.
     * See supertype CardContainer.createCardNode for params.
     * @public
     * @override
     */
    createCardNode: function( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty ) {
      return new EquationCardNode( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty );
    }
  } );
} );