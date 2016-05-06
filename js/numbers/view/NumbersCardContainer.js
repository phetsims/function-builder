// Copyright 2016, University of Colorado Boulder

/**
 * Container for number cards.
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
  var NumbersCardNode = require( 'FUNCTION_BUILDER/numbers/view/NumbersCardNode' );
  var Util = require( 'DOT/Util' );

  /**
   * @param {number} value - number that appears on the card
   * @param {Object} [options]
   * @constructor
   */
  function NumbersCardContainer( value, options ) {

    assert && assert( Util.isInteger( value ) );

    options = _.extend( {
      emptyNode: NumbersCardNode.createGhostNode( value ) // {Node} shown when the container is empty
    }, options );

    CardContainer.call( this, value, options );
  }

  functionBuilder.register( 'NumbersCardContainer', NumbersCardContainer );

  return inherit( CardContainer, NumbersCardContainer, {

    /**
     * Creates the model element for a card.
     * See supertype CardContainer.createCard for params.
     * @protected
     * @override
     */
    createCard: function( value, location ) {
      return NumberCard.withInteger( value, { location: location } );
    },

    /**
     * Creates the view element (Node) for a card.
     * See supertype CardContainer.createCardNode for params.
     * @protected
     * @override
     */
    createCardNode: function( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty ) {
      return new NumbersCardNode( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty );
    }
  } );
} );
