// Copyright 2016, University of Colorado Boulder

//TODO generalize this pattern, see https://github.com/phetsims/scenery-phet/issues/214
//TODO lots in common with FunctionCreatorNode
/**
 * For each card image, an instance of this node is placed in input cards carousel.
 * It has the following responsibilities:
 *
 * - displays a card's icon
 * - creates {AbstractCard} card instances and manages their initial drag sequence
 * - limits the number of cards created to some (optional) maximum
 * - hides the card's icon and ceases creation when the maximum number of instances is reached
 * - monitors cards to determine when they have been disposed of
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CardNode = require( 'FUNCTION_BUILDER/common/view/CardNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableCreatorNode = require( 'FUNCTION_BUILDER/common/view/MovableCreatorNode' );

  /**
   * @param {function} createCard - function called to create a {Card}
   * @param {Object} [options]
   * @constructor
   */
  function CardCreatorNode( createCard, options ) {

    // The icon that represents the card
    var iconNode = new CardNode( createCard(), {
      cursor: 'pointer'
    } );

    MovableCreatorNode.call( this, iconNode, createCard, options );
  }

  functionBuilder.register( 'CardCreatorNode', CardCreatorNode );

  return inherit( MovableCreatorNode, CardCreatorNode );
} );