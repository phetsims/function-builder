// Copyright 2016, University of Colorado Boulder

//TODO rename?
/**
 * Node that displays a number card.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var BigRationalNode = require( 'FUNCTION_BUILDER/common/view/BigRationalNode' );
  var CardNode = require( 'FUNCTION_BUILDER/common/view/CardNode' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberCard = require( 'FUNCTION_BUILDER/common/model/NumberCard' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

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
    this.bigRationalNode = new BigRationalNode( card.value, {
      mixedNumber: false, // display as improper fraction
      negativeSymbol: FBSymbols.MINUS,
      signFont: FBConstants.NUMBERS_CARD_SIGN_FONT,
      wholeNumberFont: FBConstants.NUMBERS_CARD_WHOLE_NUMBER_FONT,
      fractionFont: FBConstants.NUMBERS_CARD_FRACTION_FONT,
      maxWidth: 0.75 * ( options.size ? options.size.width : FBConstants.CARD_OPTIONS.size.width ) // constrain to card
    } );

    CardNode.call( this, card, this.bigRationalNode, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty, options );
  }

  functionBuilder.register( 'NumberCardNode', NumberCardNode );

  return inherit( CardNode, NumberCardNode, {

    /**
     * Updates the number (value) displayed on the card.
     * See supertype CardNode.updateContent for params.
     *
     * @protected
     * @override
     */
    updateContent: function( builder, numberOfFunctionsToApply ) {

      // {BigRational} run the input value through the builder
      var value = builder.applyFunctions( this.card.value, numberOfFunctionsToApply );

      // update the node
      this.bigRationalNode.setValue( value );

      // center on the card
      this.bigRationalNode.center = this.backgroundNode.center;
    }
  }, {

    /**
     * Creates a 'ghost' card that appears in an empty carousel.
     *
     * @param {number} value - number that appears on the card
     * @param {Object} [options]
     * @return {Node}
     * @public
     * @static
     * @override
     */
    createGhostNode: function( value, options ) {
      assert && assert( Util.isInteger( value ) );
      var contentNode = new Text( value, { font: FBConstants.NUMBERS_CARD_WHOLE_NUMBER_FONT } );
      return CardNode.createGhostNode( contentNode, options );
    }
  } );
} );
