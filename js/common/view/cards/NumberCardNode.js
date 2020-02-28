// Copyright 2016-2020, University of Colorado Boulder

/**
 * Node that displays a number card.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../../dot/js/Dimension2.js';
import inherit from '../../../../../phet-core/js/inherit.js';
import merge from '../../../../../phet-core/js/merge.js';
import Text from '../../../../../scenery/js/nodes/Text.js';
import functionBuilder from '../../../functionBuilder.js';
import FBConstants from '../../FBConstants.js';
import FBSymbols from '../../FBSymbols.js';
import NumberCard from '../../model/cards/NumberCard.js';
import RationalNumber from '../../model/RationalNumber.js';
import RationalNumberNode from '../RationalNumberNode.js';
import CardNode from './CardNode.js';

// constants
const DEFAULT_MAX_CONTENT_SIZE = new Dimension2(
  0.75 * FBConstants.CARD_OPTIONS.size.width,
  0.95 * FBConstants.CARD_OPTIONS.size.height );

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

  assert && assert( card instanceof NumberCard );

  options = merge( {
    maxContentSize: DEFAULT_MAX_CONTENT_SIZE // {Dimension2} constrain content to fit on card
  }, options );

  // @private
  this.rationalNumberNode = null; // {Node} content that is displayed on the card, set by updateContent
  this.maxContentSize = options.maxContentSize;

  CardNode.call( this, card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty, options );
}

functionBuilder.register( 'NumberCardNode', NumberCardNode );

export default inherit( CardNode, NumberCardNode, {

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
    const value = builder.applyFunctions( this.card.rationalNumber, numberOfFunctionsToApply );

    if ( !this.rationalNumberNode ) {

      // create the node
      this.rationalNumberNode = new RationalNumberNode( value, {
        mixedNumber: false, // display as improper fraction
        negativeSymbol: FBSymbols.MINUS,
        signFont: FBConstants.EQUATION_OPTIONS.signFont,
        wholeNumberFont: FBConstants.EQUATION_OPTIONS.wholeNumberFont,
        fractionFont: FBConstants.EQUATION_OPTIONS.fractionFont,
        maxWidth: this.maxContentSize.width,
        maxHeight: this.maxContentSize.height
      } );
      this.addChild( this.rationalNumberNode );
    }
    else {

      // update the node
      this.rationalNumberNode.setValue( value );
    }

    // center on the card
    this.rationalNumberNode.center = this.backgroundNode.center;
  }
}, {

  /**
   * Creates a 'ghost' card that appears in an empty carousel.
   *
   * @param {RationalNumber} rationalNumber
   * @param {Object} [options]
   * @returns {Node}
   * @public
   * @static
   * @override
   */
  createGhostNode: function( rationalNumber, options ) {

    assert && assert( rationalNumber instanceof RationalNumber );

    options = merge( {
      maxContentSize: DEFAULT_MAX_CONTENT_SIZE // {Dimension2} constrain content to fit on card
    }, options );

    const contentNode = new Text( rationalNumber.valueOf(), {
      font: FBConstants.EQUATION_OPTIONS.wholeNumberFont,
      maxWidth: options.maxContentSize.width,
      maxHeight: options.maxContentSize.height
    } );
    return CardNode.createGhostNode( contentNode, options );
  }
} );