// Copyright 2016, University of Colorado Boulder

/**
 * Node that displays a {NumberCard}.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CardNode = require( 'FUNCTION_BUILDER/common/view/CardNode' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberCard = require( 'FUNCTION_BUILDER/numbers/model/NumberCard' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {NumberCard} card
   * @param {NumberCardContainer} inputContainer - container in the input carousel
   * @param {NumberCardContainer} outputContainer - container in the output carousel
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer - parent for this node when it's being dragged or animating
   * @param {Property.<boolean>} seeInsideProperty - for the 'See Inside' feature
   * @param {Object} [options]
   * @constructor
   */
  function NumberCardNode( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty, options ) {

    assert && assert( card instanceof NumberCard, 'unexpected type: ' + card.constructor.name );

    this.valueNode = null; // @private {Text} set by updateContent

    CardNode.call( this, card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty, options );
  }

  functionBuilder.register( 'NumberCardNode', NumberCardNode );

  return inherit( CardNode, NumberCardNode, {

    /**
     * Updates the number (value) displayed on the card.
     * See supertype CardNode.updateContent for params.
     * @protected
     * @override
     */
    updateContent: function( builder, numberOfFunctionsToApply ) {

      // run the number through the builder
      var value = builder.applyFunctions( this.card.value, numberOfFunctionsToApply );

      // remove the old value
      this.valueNode && this.removeChild( this.valueNode );

      // add the new value
      this.valueNode = new Text( value, {
        font: FBConstants.NUMBER_CARD_FONT,
        center: this.backgroundNode.center
      } );
      this.addChild( this.valueNode );
    }
  } );
} );
