// Copyright 2016, University of Colorado Boulder

/**
 * Displays an equation in "helpful" format. See HelpfulEquation for backstory on name and specification.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CardNode = require( 'FUNCTION_BUILDER/common/view/cards/CardNode' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var HelpfulEquation = require( 'FUNCTION_BUILDER/common/model/equations/HelpfulEquation' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );
  var RationalNumberNode = require( 'FUNCTION_BUILDER/common/view/RationalNumberNode' );
  var Text = require( 'SCENERY/nodes/Text' );

  // constants
  var ZERO = RationalNumber.withInteger( 0 );

  /**
   * @param {HelpfulEquation} equation
   * @param {Object} [options] - see FBConstants.EQUATION_OPTIONS
   * @constructor
   */
  function HelpfulEquationNode( equation, options ) {

    assert && assert( equation instanceof HelpfulEquation );

    options = _.extend( {}, FBConstants.EQUATION_OPTIONS, {
      fractionScale: 0.67 // {number} how much to scale fractions
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
        currentOperator = currentFunction.operator;
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

  functionBuilder.register( 'HelpfulEquationNode', HelpfulEquationNode );

  return inherit( Node, HelpfulEquationNode );
} );
