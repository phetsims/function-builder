// Copyright 2016, University of Colorado Boulder

/**
 * Node that displays a number card.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CardNode = require( 'FUNCTION_BUILDER/common/view/CardNode' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberCard = require( 'FUNCTION_BUILDER/common/model/NumberCard' );
  var RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );
  var RationalNumberNode = require( 'FUNCTION_BUILDER/common/view/RationalNumberNode' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {NumberCard} card
   * @param {CardContainer} inputContainer - container in the input carousel
   * @param {CardContainer} outputContainer - container in the output carousel
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer - parent for this node when it's being dragged or animating
   * @param {Property.<boolean>} seeInsideProperty - for the 'See Inside' feature
   * @param {Object} [options]
   * @constructor
   */
  function NumberCardNode( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty, options ) {

    assert && assert( card instanceof NumberCard, 'unexpected type: ' + card.constructor.name );

    options = options || {};

    // @private
    this.rationalNumberNode = new RationalNumberNode( card.rationalNumber, {
      mixedNumber: false, // display as improper fraction
      negativeSymbol: FBSymbols.MINUS,
      signFont: FBConstants.EQUATION_CARD_SIGN_FONT,
      wholeNumberFont: FBConstants.EQUATION_CARD_WHOLE_NUMBER_FONT,
      fractionFont: FBConstants.EQUATION_CARD_FRACTION_FONT,
      maxWidth: 0.75 * ( options.size ? options.size.width : FBConstants.CARD_OPTIONS.size.width ) // constrain to card
    } );

    CardNode.call( this, card, this.rationalNumberNode, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty, options );
  }

  functionBuilder.register( 'NumberCardNode', NumberCardNode );

  return inherit( CardNode, NumberCardNode, {

    /**
     * Updates the number (value) displayed on the card.
     *
     * @param {Builder} builder
     * @param {number} numberOfFunctionsToApply
     * @protected
     * @override
     */
    updateContent: function( builder, numberOfFunctionsToApply ) {

      // {RationalNumber} run the input value through the builder
      var value = builder.applyFunctions( this.card.rationalNumber, numberOfFunctionsToApply );
      assert && assert( value instanceof RationalNumber );

      // update the node
      this.rationalNumberNode.setValue( value );

      // center on the card
      this.rationalNumberNode.center = this.backgroundNode.center;
    }
  }, {

    /**
     * Creates a 'ghost' card that appears in an empty carousel.
     *
     * @param {RationalNumber} rationalNumber
     * @param {Object} [options]
     * @return {Node}
     * @public
     * @static
     * @override
     */
    createGhostNode: function( rationalNumber, options ) {
      assert && assert( rationalNumber instanceof RationalNumber );
      var contentNode = new Text( rationalNumber.valueOf(), {
        font: FBConstants.EQUATION_CARD_WHOLE_NUMBER_FONT
      } );
      return CardNode.createGhostNode( contentNode, options );
    }
  } );
} );
