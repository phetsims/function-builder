// Copyright 2016-2019, University of Colorado Boulder

/**
 * Node that displays an equation card.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const CardNode = require( 'FUNCTION_BUILDER/common/view/cards/CardNode' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const EquationCard = require( 'FUNCTION_BUILDER/common/model/cards/EquationCard' );
  const FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const SlopeInterceptEquation = require( 'FUNCTION_BUILDER/common/model/equations/SlopeInterceptEquation' );
  const SlopeInterceptEquationNode = require( 'FUNCTION_BUILDER/common/view/equations/SlopeInterceptEquationNode' );
  const Text = require( 'SCENERY/nodes/Text' );

  // constants
  const DEFAULT_MAX_CONTENT_SIZE = new Dimension2(
    0.75 * FBConstants.CARD_OPTIONS.size.width,
    0.95 * FBConstants.CARD_OPTIONS.size.height );

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

    options = _.extend( {
      maxContentSize: DEFAULT_MAX_CONTENT_SIZE // {Dimension2} constrain content to fit on card
    }, options );

    // @private
    this.equationNode = null; // {Node} content that is displayed on the card, set by updateContent
    this.maxEquationSize = options.maxContentSize;

    CardNode.call( this, card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty, options );
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

      // remove previous equation
      if ( this.equationNode ) {
        this.removeChild( this.equationNode );
      }

      /*
       * Apply functions in the builder. Pass in an empty array, because the functions in the builder
       * return MathFunction[], and the input is required to be of the same type as the output.
       */
      const mathFunctions = builder.applyFunctions( [], numberOfFunctionsToApply );

      // set new equation
      const slopeInterceptEquation = new SlopeInterceptEquation( mathFunctions );
      this.equationNode = new SlopeInterceptEquationNode( slopeInterceptEquation.slope, slopeInterceptEquation.intercept, {
          showLeftHandSide: false, // hide 'y =' part of equation
          xSymbol: this.card.xSymbol,
          maxWidth: this.maxEquationSize.width,
          maxHeight: this.maxEquationSize.height
        } );
      this.addChild( this.equationNode );

      // center on the card
      this.equationNode.center = this.backgroundNode.center;
    }
  }, {

    /**
     * Creates a 'ghost' card that appears in an empty carousel.
     *
     * @param {string} symbol - symbol that appears on the card
     * @param {Object} [options]
     * @returns {Node}
     * @public
     * @static
     * @override
     */
    createGhostNode: function( symbol, options ) {

      assert && assert( typeof symbol === 'string' );

      options = _.extend( {
        maxContentSize: DEFAULT_MAX_CONTENT_SIZE // {Dimension2} constrain content to fit on card
      }, options );

      const contentNode = new Text( symbol, {
        font: FBConstants.EQUATION_OPTIONS.xyFont,
        maxWidth: options.maxContentSize.width,
        maxHeight: options.maxContentSize.height
      } );
      return CardNode.createGhostNode( contentNode, options );
    }
  } );
} );
