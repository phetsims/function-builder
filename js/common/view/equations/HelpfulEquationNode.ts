// Copyright 2016-2023, University of Colorado Boulder

/**
 * Displays an equation in "helpful" format. See HelpfulEquation for backstory on name and specification.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../../phet-core/js/merge.js';
import { optionize4 } from '../../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../../phet-core/js/types/PickOptional.js';
import { Line, Node, NodeOptions, NodeTranslationOptions, Text } from '../../../../../scenery/js/imports.js';
import functionBuilder from '../../../functionBuilder.js';
import FBConstants from '../../FBConstants.js';
import FBSymbols from '../../FBSymbols.js';
import HelpfulEquation from '../../model/equations/HelpfulEquation.js';
import RationalNumber from '../../model/RationalNumber.js';
import CardNode from '../cards/CardNode.js';
import RationalNumberNode from '../RationalNumberNode.js';
import { EquationNodeOptions } from './EquationNodeOptions.js';

type SelfOptions = EquationNodeOptions;

type HelpfulEquationNodeOptions = SelfOptions & NodeTranslationOptions &
  PickOptional<NodeOptions, 'visible' | 'maxWidth' | 'maxHeight'>;

export default class HelpfulEquationNode extends Node {

  public constructor( equation: HelpfulEquation, providedOptions?: HelpfulEquationNodeOptions ) {

    phet.log && phet.log( `HelpfulEquation=${equation.toString()}` );

    const options = optionize4<HelpfulEquationNodeOptions, SelfOptions, NodeOptions>()(
      // @ts-expect-error TS2559: Type 'Required ' has no properties in common with type 'Partial '.
      {}, FBConstants.EQUATION_OPTIONS, {
        fractionScale: 0.67
      }, providedOptions );

    options.children = [];

    const mathFunctions = equation.mathFunctions; // {MathFunction[]}
    let i = 0; // {number} for loop index
    let xNode = null; // {Node}

    // y
    let yNode: Node = new Text( options.ySymbol, {
      fill: options.yColor,
      font: options.xyFont,
      maxWidth: options.xyMaxWidth
    } );
    if ( options.xyAsCards ) {
      yNode = CardNode.createEquationXYNode( yNode );
    }

    // =
    const equalToNode = new Text( FBSymbols.EQUAL_TO, {
      fill: options.color,
      font: options.symbolFont,
      left: yNode.right + options.equalsXSpacing,
      centerY: yNode.centerY
    } );

    // Create the left-hand side nodes to simplify layout, but add them only if requested
    if ( options.showLeftHandSide ) {
      options.children.push( yNode, equalToNode );
    }

    const RATIONAL_NUMBER_OPTIONS = {
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
        left: equalToNode.right + options.equalsXSpacing
      } );
      if ( options.xyAsCards ) {
        xNode = CardNode.createEquationXYNode( xNode );
      }
      xNode.left = equalToNode.right + options.equalsXSpacing;
      xNode.centerY = equalToNode.centerY;
      options.children.push( xNode );
    }
    else {

      // local vars to improve readability
      let currentFunction = null; // {MathFunction}
      let currentOperator = null; // {string}
      let currentOperand = null; // {number}
      let previousOperator = null; // {string}

      let operatorNode = null; // {Node}
      let operandNode = null; // {Node}
      let nextLeft = 0; // {number} left position of next Node added to equation
      let nextCenterY = 0; // {number} centerY position of next Node added to equation

      // parent node for right-hand side (rhs) of the equation
      let rhsNode = new Node();

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
      nextCenterY = equalToNode.centerY;

      for ( i = 0; i < mathFunctions.length; i++ ) {

        currentFunction = mathFunctions[ i ];
        currentOperator = currentFunction.operator;
        currentOperand = currentFunction.operandProperty.value.valueOf();

        if ( currentOperator === FBSymbols.PLUS ) {

          // PLUS ----------------------------------------------------------------------------

          assert && assert(
            !previousOperator || ( previousOperator !== FBSymbols.PLUS && previousOperator !== FBSymbols.MINUS ),
            `adjacent plus and minus should have been collapsed: ${equation.toString()}` );

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
            `adjacent plus and minus should have been collapsed: ${equation.toString()}` );

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

          assert && assert( !previousOperator || previousOperator !== FBSymbols.TIMES,
            `adjacent times should have been collapsed: ${equation.toString()}` );

          // parentheses around term, eg: 2(x + 2)
          if ( i !== 0 ) {

            const leftParenthesisNode = new Text( '(', {
              font: options.parenthesesFont,
              right: rhsNode.left - options.parenthesesXSpacing,
              centerY: nextCenterY
            } );

            const rightParenthesisNode = new Text( ')', {
              font: options.parenthesesFont,
              left: rhsNode.right + options.parenthesesXSpacing,
              centerY: leftParenthesisNode.centerY
            } );

            // scale to fit around term, handling x & y dimensions independently so that parenthesis don't get too heavy
            const parenthesesScaleX = 1;
            const parenthesesScaleY = rhsNode.height / leftParenthesisNode.height;
            leftParenthesisNode.setScaleMagnitude( parenthesesScaleX, parenthesesScaleY );
            rightParenthesisNode.setScaleMagnitude( parenthesesScaleX, parenthesesScaleY );

            rhsNode.addChild( leftParenthesisNode );
            rhsNode.addChild( rightParenthesisNode );

            nextLeft = rightParenthesisNode.right + options.operatorXSpacing;
            nextCenterY = rightParenthesisNode.centerY;
          }

          // multiplier in front of term, eg: 2x or 2(x + 2), use RationalNumberNode so that sign is rendered consistently
          operandNode = new RationalNumberNode( RationalNumber.withInteger( currentOperand ),
            merge( {}, RATIONAL_NUMBER_OPTIONS, {
              right: rhsNode.left - options.multiplierXSpacing,
              centerY: nextCenterY
            } ) );
          rhsNode.addChild( operandNode );
        }
        else if ( currentOperator === FBSymbols.DIVIDE ) {

          // DIVIDE ----------------------------------------------------------------------------

          assert && assert( currentOperand !== 0,
            `divide by zero is not supported: ${equation.toString()}` );
          assert && assert( !previousOperator || previousOperator !== FBSymbols.DIVIDE,
            `adjacent divide should have been collapsed: ${equation.toString()}` );

          // what we've built so far becomes the numerator
          const numeratorNode = rhsNode;

          // denominator, use RationalNumberNode so that sign is rendered consistently
          const denominatorNode = new RationalNumberNode( RationalNumber.withInteger( currentOperand ),
            merge( {}, RATIONAL_NUMBER_OPTIONS, {
              font: options.wholeNumberFont
            } ) );

          // line dividing numerator and denominator
          const fractionLineLength = Math.max( numeratorNode.width, denominatorNode.width );
          const fractionLineNode = new Line( 0, 0, fractionLineLength, 0, {
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
          const fractionNode = new Node( {
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

          throw new Error( `invalid operator=${currentOperator}, equation=${equation.toString()}` );
        }

        previousOperator = currentOperator;
      }

      options.children.push( rhsNode );
      rhsNode.left = equalToNode.right + options.equalsXSpacing;
      rhsNode.centerY = equalToNode.centerY;
    }

    super( options );
  }
}

functionBuilder.register( 'HelpfulEquationNode', HelpfulEquationNode );