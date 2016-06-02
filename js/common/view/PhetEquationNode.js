// Copyright 2016, University of Colorado Boulder

//TODO better name for PhetEquationNode
/**
 * PhET-specific format of the equation that corresponds to functions in the builder.
 * Note that the logic used to create this node is similar to PhetEquation.toString.
 * See format specification in function-builder/doc/equation-formats.md
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
  var RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );
  var RationalNumberNode = require( 'FUNCTION_BUILDER/common/view/RationalNumberNode' );
  var Text = require( 'SCENERY/nodes/Text' );

  // constants
  var ZERO = RationalNumber.withInteger( 0 );

  /**
   * @param {PhetEquation} equation
   * @param {Object} [options]
   * @constructor
   */
  function PhetEquationNode( equation, options ) {

    options = _.extend( {

      showLeftHandSide: true, // {boolean} whether to show left-hand side of the equation
      xSymbol: FBSymbols.X, // {string} symbol for input
      ySymbol: FBSymbols.Y, // {string} symbol for output
      xyAsCards: false, // {boolean} put x & y symbols on a rectangle background, like a card?
      xyMaxWidth: 100, // {number} maxWidth of x & y symbols, for i18n, determined empirically

      // colors
      xColor: 'black', // {Color|string} for x symbol
      yColor: 'black', // {Color|string} for y symbol
      color: 'black', // {Color|string} for everything else

      // fonts
      xyFont: FBConstants.EQUATION_CARD_XY_FONT, // {Font} font for x & y symbols
      symbolFont: FBConstants.EQUATION_CARD_SYMBOL_FONT, // {Font} font for math symbols (equals, plus, minus)
      wholeNumberFont: FBConstants.EQUATION_CARD_WHOLE_NUMBER_FONT, // {Font} font for whole number
      fractionFont: FBConstants.EQUATION_CARD_FRACTION_FONT, // {Font} font for fractions
      signFont: FBConstants.EQUATION_CARD_SIGN_FONT, // {Font} font for negative sign
      parenthesesFont: FBConstants.EQUATION_CARD_PARENTHESES_FONT, // {Font} font for parentheses

      // fractions
      fractionScale: 0.67, // {number} how much to scale fractions

      // x spacing
      equalsXSpacing: 8, // {number} x space on both sides of equals sign
      signXSpacing: 3, // {number} x spacing between a negative sign and the number that follows it
      operatorXSpacing: 8, // {number} x space on both sides of an operator
      multiplierXSpacing: 3, // {number} x space following multiplier
      parenthesesXSpacing: 3, // {number} x space inside of parentheses

      // y spacing
      fractionYSpacing: 6 // {number} y space above and below fraction line

    }, options );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [];

    var mathFunctions = equation.mathFunctions; // {MathFunction[]}
    var i = 0; // {number} for loop index
    var xNode = null; // {Node}

    // y
    var yNode = new Text( options.ySymbol, {
      fill: options.yColor,
      font: options.xyFont,
      maxWidth: options.xyMaxWidth
    } );
    if ( options.xyAsCards ) {
      yNode = CardNode.createEquationXYNode( yNode );
    }

    // =
    var equalsNode = new Text( FBSymbols.EQUALS, {
      fill: options.color,
      font: options.symbolFont,
      left: yNode.right + options.equalsXSpacing,
      centerY: yNode.centerY
    } );

    // Create the left-hand side nodes to simplify layout, but add them only if requested
    if ( options.showLeftHandSide ) {
      options.children.push( yNode, equalsNode );
    }

    var RATIONAL_NUMBER_OPTIONS = {
      fill: options.color,
      mixedNumber: false, // display as an improper fraction
      fractionYSpacing: options.fractionYSpacing,
      signXSpacing: options.signXSpacing,
      signFont: options.signFont,
      wholeNumberFont: options.wholeNumberFont,
      fractionFont: options.fractionFont
    };

    if ( mathFunctions.length === 0 ) {

      // y = x
      xNode = new Text( options.xSymbol, {
        fill: options.xColor,
        font: options.xyFont,
        maxWidth: options.xyMaxWidth,
        left: equalsNode.right + options.equalsXSpacing
      } );
      if ( options.xyAsCards ) {
        xNode = CardNode.createEquationXYNode( xNode );
      }
      xNode.left = equalsNode.right + options.equalsXSpacing;
      xNode.centerY = equalsNode.centerY;
      options.children.push( xNode );
    }
    else if ( equation.evaluatesToConstant() ) {

      // constant
      var value = ZERO;
      for ( i = 0; i < mathFunctions.length; i++ ) {
        value = mathFunctions[ i ].apply( value );
      }

      var constantNode = new RationalNumberNode( value,
        _.extend( {}, RATIONAL_NUMBER_OPTIONS, {
          left: equalsNode.right + options.equalsXSpacing,
          centerY: equalsNode.centerY
        } ) );
      options.children.push( constantNode );
    }
    else {

      // local vars to improve readability
      var currentFunction = null; // {MathFunction}
      var currentOperator = null; // {string}
      var currentOperand = null; // {number}
      var previousOperator = null; // {string}

      var operatorNode = null; // {Node}
      var operandNode = null; // {Node}
      var nextLeft = 0; // {number} left position of next Node added to equation
      var nextCenterY = 0; // {number} centerY position of next Node added to equation

      // parent node for right-hand side (rhs) of the equation
      var rhsNode = new Node();

      // x
      xNode = new Text( options.xSymbol, {
        fill: options.xColor,
        font: options.xyFont,
        maxWidth: options.xyMaxWidth
      } );
      if ( options.xyAsCards ) {
        xNode = CardNode.createEquationXYNode( xNode );
      }
      rhsNode.addChild( xNode );
      nextLeft = xNode.right + options.operatorXSpacing;
      nextCenterY = equalsNode.centerY;

      for ( i = 0; i < mathFunctions.length; i++ ) {

        currentFunction = mathFunctions[ i ];
        currentOperator = currentFunction.operatorString;
        currentOperand = currentFunction.operandProperty.get().valueOf();

        if ( currentOperator === FBSymbols.PLUS ) {

          // PLUS ----------------------------------------------------------------------------

          assert && assert(
            !previousOperator || ( previousOperator !== FBSymbols.PLUS && previousOperator !== FBSymbols.MINUS ),
            'adjacent plus and minus should have been collapsed' );

          // eg: x + 3
          operatorNode = new Text( currentOperand >= 0 ? FBSymbols.PLUS : FBSymbols.MINUS, {
            font: options.symbolFont,
            left: nextLeft,
            centerY: nextCenterY
          } );
          rhsNode.addChild( operatorNode );

          operandNode = new Text( Math.abs( currentOperand ), {
            font: options.wholeNumberFont,
            left: operatorNode.right + options.operatorXSpacing,
            centerY: operatorNode.centerY
          } );
          rhsNode.addChild( operandNode );

          nextLeft = operandNode.right + options.operatorXSpacing;
          nextCenterY = operandNode.centerY;
        }
        else if ( currentOperator === FBSymbols.MINUS ) {

          // MINUS ----------------------------------------------------------------------------

          assert && assert(
            !previousOperator || ( previousOperator !== FBSymbols.PLUS && previousOperator !== FBSymbols.MINUS ),
            'adjacent plus and minus should have been collapsed' );

          // eg: x - 3
          operatorNode = new Text( currentOperand >= 0 ? FBSymbols.MINUS : FBSymbols.PLUS, {
            font: options.symbolFont,
            left: nextLeft,
            centerY: nextCenterY
          } );
          rhsNode.addChild( operatorNode );

          operandNode = new Text( Math.abs( currentOperand ), {
            font: options.wholeNumberFont,
            left: operatorNode.right + options.operatorXSpacing,
            centerY: operatorNode.centerY
          } );
          rhsNode.addChild( operandNode );

          nextLeft = operandNode.right + options.operatorXSpacing;
          nextCenterY = operandNode.centerY;
        }
        else if ( currentOperator === FBSymbols.TIMES ) {

          // TIMES ----------------------------------------------------------------------------

          assert && assert( currentOperand !== 0, 'times zero should have been factored out' );
          assert && assert( !previousOperator || previousOperator !== FBSymbols.TIMES,
            'adjacent times should have been collapsed' );

          // parentheses around term, eg: 2(x + 2)
          if ( i !== 0 ) {

            var leftParenthesisNode = new Text( '(', {
              font: options.parenthesesFont,
              right: rhsNode.left - options.parenthesesXSpacing,
              centerY: nextCenterY
            } );

            var rightParenthesisNode = new Text( ')', {
              font: options.parenthesesFont,
              left: rhsNode.right + options.parenthesesXSpacing,
              centerY: leftParenthesisNode.centerY
            } );

            // scale to fit around term, handling x & y dimensions independently so that parenthesis don't get too heavy
            var parenthesesScaleX = 1;
            var parenthesesScaleY = rhsNode.height / leftParenthesisNode.height;
            leftParenthesisNode.setScaleMagnitude( parenthesesScaleX, parenthesesScaleY );
            rightParenthesisNode.setScaleMagnitude( parenthesesScaleX, parenthesesScaleY );

            rhsNode.addChild( leftParenthesisNode );
            rhsNode.addChild( rightParenthesisNode );

            nextLeft = rightParenthesisNode.right + options.operatorXSpacing;
            nextCenterY = rightParenthesisNode.centerY;
          }

          // multiplier in front of term, eg: 2x or 2(x + 2), use RationalNumberNode so that sign is rendered consistently
          operandNode = new RationalNumberNode( RationalNumber.withInteger( currentOperand ),
            _.extend( {}, RATIONAL_NUMBER_OPTIONS, {
              right: rhsNode.left - options.multiplierXSpacing,
              centerY: nextCenterY
            } ) );
          rhsNode.addChild( operandNode );
        }
        else if ( currentOperator === FBSymbols.DIVIDE ) {

          // DIVIDE ----------------------------------------------------------------------------

          assert && assert( currentOperand !== 0, 'divide by zero is not supported' );
          assert && assert( !previousOperator || previousOperator !== FBSymbols.DIVIDE,
            'adjacent divide should have been collapsed' );

          // what we've built so far becomes the numerator
          var numeratorNode = rhsNode;

          // denominator, use RationalNumberNode so that sign is rendered consistently
          var denominatorNode = new RationalNumberNode( RationalNumber.withInteger( currentOperand ),
            _.extend( {}, RATIONAL_NUMBER_OPTIONS, {
              font: options.wholeNumberFont
            } ) );

          // line dividing numerator and denominator
          var fractionLineLength = Math.max( numeratorNode.width, denominatorNode.width );
          var fractionLineNode = new Line( 0, 0, fractionLineLength, 0, {
            stroke: options.color,
            centerX: rhsNode.centerX,
            top: numeratorNode.bottom + options.fractionYSpacing
          } );

          // fraction layout
          numeratorNode.centerX = fractionLineNode.centerX;
          numeratorNode.bottom = fractionLineNode.top - options.fractionYSpacing;
          denominatorNode.centerX = fractionLineNode.centerX;
          denominatorNode.top = fractionLineNode.bottom + options.fractionYSpacing;

          // fraction
          var fractionNode = new Node( {
            children: [ numeratorNode, fractionLineNode, denominatorNode ],
            scale: options.fractionScale
          } );

          // new right-hand side
          rhsNode = new Node( {
            children: [ fractionNode ]
          } );
          nextLeft = rhsNode.right + options.operatorXSpacing;
          nextCenterY = rhsNode.centerY;
        }
        else {

          // oops! ----------------------------------------------------------------------------

          throw new Error( 'invalid operator: ' + currentOperator );
        }

        previousOperator = currentOperator;
      }

      options.children.push( rhsNode );
      rhsNode.left = equalsNode.right + options.equalsXSpacing;
      rhsNode.centerY = equalsNode.centerY;
    }

    Node.call( this, options );
  }

  functionBuilder.register( 'PhetEquationNode', PhetEquationNode );

  return inherit( Node, PhetEquationNode );
} );
