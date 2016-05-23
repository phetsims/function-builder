// Copyright 2016, University of Colorado Boulder

/**
 * Node that displays an equation card.
 * 
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CardNode = require( 'FUNCTION_BUILDER/common/view/CardNode' );
  var EquationCard = require( 'FUNCTION_BUILDER/common/model/EquationCard' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SlopeInterceptEquation = require( 'FUNCTION_BUILDER/common/model/SlopeInterceptEquation' );
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

    assert && assert( card instanceof EquationCard, 'unexpected type: ' + card.constructor.name );

    options = options || {};

    //TODO temporary, this needs to be an equation in slope-intercept form
    // @private
    this.textNode = new Text( card.equation, {
      font: FBConstants.EQUATIONS_CARD_SYMBOL_FONT,
      maxWidth: 0.75 * ( options.size ? options.size.width : FBConstants.CARD_OPTIONS.size.width ) // constrain to card
    } );

    CardNode.call( this, card, this.textNode, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty, options );
  }

  functionBuilder.register( 'EquationCardNode', EquationCardNode );

  return inherit( CardNode, EquationCardNode, {

    /**
     * Updates the number (value) displayed on the card.
     * See supertype CardNode.updateContent for params.
     *
     * @protected
     * @override
     */
    updateContent: function( builder, numberOfFunctionsToApply ) {

      // {MathFunction[]} get an array of the functions involved in the equation
      var mathFunctions = builder.applyFunctions( [], numberOfFunctionsToApply );

      //TODO convert MathFunction[] to slope-intercept form and display on card
      // update the node
      var slopeInterceptEquation = new SlopeInterceptEquation( this.card.equation, mathFunctions );
      this.textNode.text = slopeInterceptEquation.toString();

      // center on the card
      this.textNode.center = this.backgroundNode.center;
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
      assert && assert( typeof symbol === 'string' );
      var contentNode = new Text( symbol, { font: FBConstants.EQUATIONS_CARD_SYMBOL_FONT } );
      return CardNode.createGhostNode( contentNode, options );
    }
  } );
} );
