// Copyright 2016-2023, University of Colorado Boulder

/**
 * Equation in slope-intercept form, y = mx + b
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Node, NodeOptions, NodeTranslationOptions, Text } from '../../../../../scenery/js/imports.js';
import functionBuilder from '../../../functionBuilder.js';
import FBConstants from '../../FBConstants.js';
import FBSymbols from '../../FBSymbols.js';
import RationalNumber from '../../model/RationalNumber.js';
import CardNode from '../cards/CardNode.js';
import RationalNumberNode from '../RationalNumberNode.js';
import { EquationNodeOptions } from './EquationNodeOptions.js';
import PickOptional from '../../../../../phet-core/js/types/PickOptional.js';
import { optionize3 } from '../../../../../phet-core/js/optionize.js';

type SelfOptions = EquationNodeOptions;

type SlopeInterceptEquationNodeOptions = SelfOptions & NodeTranslationOptions &
  PickOptional<NodeOptions, 'visible' | 'maxWidth' | 'maxHeight'>;

export default class SlopeInterceptEquationNode extends Node {

  public constructor( slope: RationalNumber, intercept: RationalNumber, providedOptions?: SlopeInterceptEquationNodeOptions ) {

    const options = optionize3<SlopeInterceptEquationNodeOptions, SelfOptions, NodeOptions>()(
      {}, FBConstants.EQUATION_OPTIONS, providedOptions );

    options.children = [];

    // y
    let yNode: Node = new Text( options.ySymbol, {
      fill: options.yColor,
      font: options.xyFont,
      maxWidth: options.xyMaxWidth
    } );
    if ( options.xyAsCards ) {
      yNode = CardNode.createEquationXYNode( yNode );
    }
    yNode.y = options.xyYOffset;

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

    if ( slope.valueOf() === 0 && intercept.valueOf() === 0 ) {

      // y = 0
      const zeroNode = new Text( '0', {
        fill: options.yColor,
        font: options.wholeNumberFont,
        left: equalToNode.right + options.equalsXSpacing,
        centerY: yNode.centerY
      } );
      options.children.push( zeroNode );
    }
    else {

      // y = mx + b

      // horizontal layout positions, adjusted as the equation is built
      let xLeft = 0;
      let operatorLeft = 0;
      let interceptLeft = 0;

      // slope
      if ( slope.valueOf() !== 0 ) {

        if ( slope.valueOf() === 1 ) {

          // omit slope if value is 1, so we have 'x' instead of '1x'
          xLeft = equalToNode.right + options.equalsXSpacing;
        }
        else if ( slope.valueOf() === -1 ) {

          // omit 1 if value is -1, so we have '-x' instead of '-1x'
          const signNode = new Text( FBSymbols.MINUS, {
            fill: options.color,
            font: options.signFont,
            left: equalToNode.right + options.equalsXSpacing,
            centerY: equalToNode.centerY
          } );
          options.children.push( signNode );

          xLeft = signNode.right + options.signXSpacing;
        }
        else {

          // whole number or fractional slope
          const slopeNode = new RationalNumberNode( slope, {
            color: options.color,
            mixedNumber: false, // display as an improper fraction
            fractionYSpacing: options.fractionYSpacing,
            signXSpacing: options.signXSpacing,
            signFont: options.signFont,
            wholeNumberFont: options.wholeNumberFont,
            fractionFont: options.fractionFont,
            left: equalToNode.right + options.equalsXSpacing,
            centerY: equalToNode.centerY + options.slopeYOffset
          } );
          options.children.push( slopeNode );

          if ( slope.isInteger() ) {
            xLeft = slopeNode.right + options.integerSlopeXSpacing;
          }
          else {
            xLeft = slopeNode.right + options.fractionSlopeXSpacing;
          }
        }
      }

      // x
      if ( slope.valueOf() !== 0 ) {

        let xNode: Node = new Text( options.xSymbol, {
          fill: options.xColor,
          font: options.xyFont,
          maxWidth: options.xyMaxWidth
        } );
        if ( options.xyAsCards ) {
          xNode = CardNode.createEquationXYNode( xNode );
        }
        xNode.left = xLeft;
        xNode.centerY = equalToNode.centerY + options.xyYOffset;

        options.children.push( xNode );
        operatorLeft = xNode.right + options.operatorXSpacing;
      }

      // operator (+, -)
      if ( ( intercept.valueOf() !== 0 ) && ( slope.valueOf() !== 0 ) ) {
        const operator = ( intercept.valueOf() > 0 ) ? FBSymbols.PLUS : FBSymbols.MINUS;
        const operatorNode = new Text( operator, {
          fill: options.color,
          font: options.symbolFont,
          left: operatorLeft,
          centerY: equalToNode.centerY + options.operatorYOffset
        } );
        options.children.push( operatorNode );
        interceptLeft = operatorNode.right + options.operatorXSpacing;
      }
      else {

        // no operator, intercept follows equals sign
        interceptLeft = equalToNode.right + options.equalsXSpacing;
      }

      // intercept
      if ( intercept.valueOf() !== 0 ) {
        const interceptNode = new RationalNumberNode( ( slope.valueOf() === 0 ) ? intercept : intercept.abs(), {
          color: options.color,
          mixedNumber: false, // display as an improper fraction
          fractionYSpacing: options.fractionYSpacing,
          signXSpacing: options.signXSpacing,
          signFont: options.signFont,
          wholeNumberFont: options.wholeNumberFont,
          fractionFont: options.fractionFont,
          left: interceptLeft,
          centerY: equalToNode.centerY + options.interceptYOffset
        } );
        options.children.push( interceptNode );
      }
    }

    super( options );
  }
}

functionBuilder.register( 'SlopeInterceptEquationNode', SlopeInterceptEquationNode );