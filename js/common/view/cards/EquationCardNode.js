// Copyright 2016, University of Colorado Boulder

/**
 * Node that displays an equation card.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CardNode = require( 'FUNCTION_BUILDER/common/view/cards/CardNode' );
  var EquationCard = require( 'FUNCTION_BUILDER/common/model/cards/EquationCard' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SlopeInterceptEquation = require( 'FUNCTION_BUILDER/common/model/equations/SlopeInterceptEquation' );
  var SlopeInterceptEquationNode = require( 'FUNCTION_BUILDER/common/view/equations/SlopeInterceptEquationNode' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {EquationCard} card
   * @param {CardContainer} inputContainer - container in the input carousel
   * @param {CardContainer} outputContainer - container in the output carousel
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer - parent for this node when it's being dragged or animating
   * @param {Property.<boolean>} seeInsideProperty - for the 'See Inside' feature
   * @param {Object} [options]
   * @constructor
   */
  function EquationCardNode( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty, options ) {

    assert && assert( card instanceof EquationCard );

    options = options || {};

    // @private constrain equation to card
    this.equationMaxWidth = 0.75 * ( options.size ? options.size.width : FBConstants.CARD_OPTIONS.size.width );

    // @private will be updated properly by updateContent
    this.equationNode = new Rectangle( 0, 0, 1, 1 );

    CardNode.call( this, card, this.equationNode, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty, options );
  }

  functionBuilder.register( 'EquationCardNode', EquationCardNode );

  return inherit( CardNode, EquationCardNode, {

    /**
     * Updates the number (value) displayed on the card.
     *
     * @param {Builder} builder
     * @param {number} numberOfFunctionsToApply
     * @protected
     * @override
     */
    updateContent: function( builder, numberOfFunctionsToApply ) {

      // remove old equation
      this.removeChild( this.equationNode );

      /*
       * Apply functions in the builder. Pass in an empty array, because the functions in the builder
       * return MathFunction[], and the input is required to be of the same type as the output.
       */
      var mathFunctions = builder.applyFunctions( [], numberOfFunctionsToApply );

      // update the equation
      var slopeInterceptEquation = new SlopeInterceptEquation( mathFunctions );
      this.equationNode = new SlopeInterceptEquationNode(
        slopeInterceptEquation.slope, slopeInterceptEquation.intercept, {
          showLeftHandSide: false, // hide 'y =' part of equation
          xSymbol: this.card.xSymbol,
          maxWidth: this.equationMaxWidth, // constrain to card
          center: this.backgroundNode.center // center on the card
        } );
      this.addChild( this.equationNode );
    }
  }, {

    /**
     * Creates a 'ghost' card that appears in an empty carousel.
     *
     * @param {string} symbol - symbol that appears on the card
     * @param {Object} [options]
     * @return {Node}
     * @public
     * @static
     * @override
     */
    createGhostNode: function( symbol, options ) {

      options = _.extend( {
        textMaxWidth: 0.75 * FBConstants.CARD_OPTIONS.size.width
      }, options );

      assert && assert( typeof symbol === 'string' );
      var contentNode = new Text( symbol, {
        font: FBConstants.EQUATION_CARD_XY_FONT,
        maxWidth: options.textMaxWidth
      } );
      return CardNode.createGhostNode( contentNode, options );
    }
  } );
} );
