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
  var EquationsCardNode = require( 'FUNCTION_BUILDER/equations/view/EquationsCardNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SymbolCard = require( 'FUNCTION_BUILDER/common/model/SymbolCard' );

  /**
   * @param {string} symbol - symbol that appears on the card
   * @param {Object} [options]
   * @constructor
   */
  function EquationsCardContainer( symbol, options ) {

    assert && assert( typeof symbol === 'string' );

    options = _.extend( {
      emptyNode: EquationsCardNode.createGhostNode( symbol ) // {Node} shown when the container is empty
    }, options );

    CardContainer.call( this, symbol, options );
  }

  functionBuilder.register( 'EquationsCardContainer', EquationsCardContainer );

  return inherit( CardContainer, EquationsCardContainer, {

    /**
     * Creates the model element for a card.
     * See supertype CardContainer.createCard for params.
     * @protected
     * @override
     */
    createCard: function( value, location ) {
      return new SymbolCard( value, { location: location } );
    },

    /**
     * Creates the view element (Node) for a card.
     * See supertype CardContainer.createCardNode for params.
     * @protected
     * @override
     */
    createCardNode: function( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty ) {
      return new EquationsCardNode( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty );
    }
  } );
} );
