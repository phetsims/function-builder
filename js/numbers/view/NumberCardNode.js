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
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberCard = require( 'FUNCTION_BUILDER/numbers/model/NumberCard' );
  var Text = require( 'SCENERY/nodes/Text' );

  // constants
  var SIGN_X_SPACING = 2;
  var FRACTION_X_SPACING = 3;
  var FRACTION_Y_SPACING = 2;

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

    options = options || {};

    // @private
    this.signNode = new Text( '', { font: FBConstants.NUMBER_CARD_SIGN_FONT } );
    this.quotientNode = new Text( '', { font: FBConstants.NUMBER_CARD_QUOTIENT_FONT } );
    this.numeratorNode = new Text( '', { font: FBConstants.NUMBER_CARD_FRACTION_FONT } );
    this.denominatorNode = new Text( '', { font: FBConstants.NUMBER_CARD_FRACTION_FONT } );
    this.fractionLineNode = new Line( 0, 0, 1, 0, { stroke: 'black', lineWidth: 1 } );
    this.parentNode = new Node( {
      children: [ this.signNode, this.quotientNode, this.numeratorNode, this.fractionLineNode, this.denominatorNode ],
      maxWidth: 0.75 * ( options.size ? options.size.width : FBConstants.CARD_OPTIONS.size.width ) // constrain to card
    } );

    CardNode.call( this, card, this.parentNode, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty, options );
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

      // {BigRational} run the input value through the builder
      var value = builder.applyFunctions( this.card.value, numberOfFunctionsToApply );

      // set the sign
      var isNegative = value.isNegative();
      this.signNode.text = isNegative ? FBSymbols.MINUS : '';

      // display numbers for absolute value
      value = value.abs();

      // display the value
      if ( value.denominator.equals( 1 ) ) {

        // quotient only

        // visibility
        this.quotientNode.visible = true;
        this.numeratorNode.visible = this.denominatorNode.visible = this.fractionLineNode.visible = false;

        // values
        this.quotientNode.text = value.numerator;
        this.numeratorNode.text = this.denominatorNode.text = '';
        this.fractionLineNode.setLine( 0, 0, 1, 0 );

        // layout
        this.quotientNode.left = isNegative ? this.signNode.right + SIGN_X_SPACING : 0;
        this.quotientNode.centerY = this.signNode.centerY;
        this.numeratorNode.left = this.denominatorNode.left = this.fractionLineNode.left = this.quotientNode.left;
        this.numeratorNode.centerY = this.denominatorNode.centerY = this.fractionLineNode.centerY = this.quotientNode.centerY;
      }
      else if ( value.numerator.lt( value.denominator ) ) {

        // fraction only

        // visibility
        this.quotientNode.visible = false;
        this.numeratorNode.visible = this.denominatorNode.visible = this.fractionLineNode.visible = true;

        // values
        this.quotientNode.text = '';
        this.numeratorNode.text = value.numerator;
        this.denominatorNode.text = value.denominator;
        this.fractionLineNode.setLine( 0, 0, Math.max( this.numeratorNode.width, this.denominatorNode.width ), 0 );

        // layout
        this.fractionLineNode.left = isNegative ? this.signNode.right + SIGN_X_SPACING : 0;
        this.fractionLineNode.centerY = this.signNode.centerY;
        this.quotientNode.centerX = this.numeratorNode.centerX = this.denominatorNode.centerX = this.fractionLineNode.centerX;
        this.quotientNode.centerY = this.fractionLineNode.centerY;
        this.numeratorNode.bottom = this.fractionLineNode.top - FRACTION_Y_SPACING;
        this.denominatorNode.top = this.fractionLineNode.bottom + FRACTION_Y_SPACING;
      }
      else {

        // quotient and fractional remainder

        // visibility
        this.quotientNode.visible = this.numeratorNode.visible = this.denominatorNode.visible = this.fractionLineNode.visible = true;

        // values
        var quotient = value.floor();
        var fraction = value.minus( quotient );

        this.quotientNode.text = quotient;
        this.numeratorNode.text = fraction.numerator;
        this.denominatorNode.text = fraction.denominator;
        this.fractionLineNode.setLine( 0, 0, Math.max( this.numeratorNode.width, this.denominatorNode.width ), 0 );

        // layout
        this.quotientNode.left = isNegative ? this.signNode.right + SIGN_X_SPACING : 0;
        this.quotientNode.centerY = this.signNode.centerY;
        this.fractionLineNode.left = this.quotientNode.right + FRACTION_X_SPACING;
        this.fractionLineNode.centerY = this.quotientNode.centerY;
        this.numeratorNode.centerX = this.fractionLineNode.centerX;
        this.numeratorNode.bottom = this.fractionLineNode.top - FRACTION_Y_SPACING;
        this.denominatorNode.centerX = this.fractionLineNode.centerX;
        this.denominatorNode.top = this.fractionLineNode.bottom + FRACTION_Y_SPACING;
      }

      // center on the card
      this.parentNode.center = this.backgroundNode.center;
    }
  } );
} );
