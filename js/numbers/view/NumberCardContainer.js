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
  var NumberCard = require( 'FUNCTION_BUILDER/numbers/model/NumberCard' );
  var NumberCardNode = require( 'FUNCTION_BUILDER/numbers/view/NumberCardNode' );
  var NumberGhostCard = require( 'FUNCTION_BUILDER/numbers/view/NumberGhostCard' );
  var Util = require( 'DOT/Util' );

  /**
   * @param {number} value - number that appears on the card
   * @param {Object} [options]
   * @constructor
   */
  function NumberCardContainer( value, options ) {

    assert && assert( Util.isInteger( value ) );

    options = _.extend( {
      showGhostCard: false // {boolean} whether to show a 'ghost' card when the container is empty
    }, options );

    if ( options.showGhostCard ) {
      options.emptyNode = new NumberGhostCard( value );
    }

    CardContainer.call( this, value, options );
  }

  functionBuilder.register( 'NumberCardContainer', NumberCardContainer );

  return inherit( CardContainer, NumberCardContainer, {

    /**
     * Creates the model element for a card.
     * See supertype CardContainer.createCard for params.
     * @public
     * @override
     */
    createCard: function( value, location ) {
      return NumberCard.withInteger( value, { location: location } )
    },

    /**
     * Creates the view element (Node) for a card.
     * See supertype CardContainer.createCardNode for params.
     * @public
     * @override
     */
    createCardNode: function( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty ) {
      return new NumberCardNode( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty );
    }
  } );
} );
