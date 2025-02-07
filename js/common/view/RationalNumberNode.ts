// Copyright 2016-2024, University of Colorado Boulder

/**
 * Displays a rational number.
 * The number can be displayed as either a mixed number or improper fraction (see options.mixedNumber).
 *
 * This node requires RationalNumber, which wraps only the portion of BigRational.js needed by this simulation.
 * Without a more general implementation of RationalNumber, it is not appropriate to move this node to a
 * common-code repository.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node, { NodeOptions, NodeTranslationOptions } from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import functionBuilder from '../../functionBuilder.js';
import RationalNumber from '../model/RationalNumber.js';

const DEFAULT_SIGN_FONT = new PhetFont( 22 );
const DEFAULT_WHOLE_NUMBER_FONT = new PhetFont( 30 );
const DEFAULT_FRACTION_FONT = new PhetFont( 20 );

type SelfOptions = {
  mixedNumber?: boolean; // true: display as mixed number, false: display as improper fraction
  color?: TColor; // {color used for all sub-parts of this node
  fractionLineWidth?: number; // lineWidth for the line that separates numerator and denominator

  // sign
  negativeSymbol?: string; // symbol used for negative sign
  positiveSymbol?: string; // symbol used for positive sign
  showPositiveSign?: boolean; // show sign on positive numbers?

  // fonts
  signFont?: PhetFont;
  wholeNumberFont?: PhetFont;
  fractionFont?: PhetFont;

  // spacing
  signXSpacing?: number; // space to right of sign
  fractionXSpacing?: number; // space between whole number and fraction
  fractionYSpacing?: number; // space above and below fraction line
};

type RationalNumberNodeOptions = SelfOptions & NodeTranslationOptions &
  PickOptional<NodeOptions, 'maxWidth' | 'maxHeight'>;

export default class RationalNumberNode extends Node {

  private readonly options: Required<SelfOptions>;

  public constructor( rationalNumber: RationalNumber, providedOptions?: RationalNumberNodeOptions ) {

    const options = optionize<RationalNumberNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      mixedNumber: false,
      color: 'black',
      fractionLineWidth: 1,
      negativeSymbol: '\u2212',
      positiveSymbol: '\u002b',
      showPositiveSign: false,
      signFont: DEFAULT_SIGN_FONT,
      wholeNumberFont: DEFAULT_WHOLE_NUMBER_FONT,
      fractionFont: DEFAULT_FRACTION_FONT,
      signXSpacing: 3,
      fractionXSpacing: 3,
      fractionYSpacing: 2
    }, providedOptions );

    super();

    this.options = options;

    this.setValue( rationalNumber );
    this.mutate( options );
  }

  /**
   * Sets the value displayed by this node.
   * This is relatively expensive, because it rebuilds then node.
   */
  public setValue( rationalNumber: RationalNumber ): void {

    this.removeAllChildren();

    let left = 0;
    let centerY = 0;

    // sign
    const isNegative = ( rationalNumber.valueOf() < 0 );
    if ( ( rationalNumber.valueOf() !== 0 ) && ( isNegative || this.options.showPositiveSign ) ) {
      const sign = isNegative ? this.options.negativeSymbol : this.options.positiveSymbol;
      const signNode = new Text( sign, {
        fill: this.options.color,
        font: this.options.signFont
      } );
      this.addChild( signNode );

      // position of next node
      left = signNode.right + this.options.signXSpacing;
      centerY = signNode.centerY;
    }

    // {RationalNumber} display absolute value, since we have a separate node for sign
    const rationalNumberAbs = rationalNumber.abs();

    // whole number
    let fraction = rationalNumberAbs; // {RationalNumber}
    if ( rationalNumberAbs.isInteger() || this.options.mixedNumber ) {

      fraction = rationalNumberAbs.fractionPart();

      const wholeNumberNode = new Text( rationalNumberAbs.wholeNumberPart(), {
        fill: this.options.color,
        font: this.options.wholeNumberFont,
        left: left,
        centerY: centerY
      } );
      this.addChild( wholeNumberNode );

      // position of next node
      left = wholeNumberNode.right + this.options.fractionXSpacing;
      centerY = wholeNumberNode.centerY;
    }

    // fraction, possibly improper
    if ( !rationalNumberAbs.isInteger() || this.options.mixedNumber ) {

      // numerator and denominator
      const FRACTION_OPTIONS = {
        fill: this.options.color,
        font: this.options.fractionFont
      };
      const numeratorNode = new Text( fraction.numerator, FRACTION_OPTIONS );
      this.addChild( numeratorNode );
      const denominatorNode = new Text( fraction.denominator, FRACTION_OPTIONS );
      this.addChild( denominatorNode );

      // horizontal line separating numerator and denominator
      const lineNode = new Line( 0, 0, Math.max( numeratorNode.width, denominatorNode.width ), 0, {
        stroke: this.options.color,
        lineWidth: this.options.fractionLineWidth,
        left: left,
        centerY: centerY
      } );
      this.addChild( lineNode );

      // layout
      numeratorNode.centerX = lineNode.centerX;
      numeratorNode.bottom = lineNode.top - this.options.fractionYSpacing;
      denominatorNode.centerX = lineNode.centerX;
      denominatorNode.top = lineNode.bottom + this.options.fractionYSpacing;
    }
  }
}

functionBuilder.register( 'RationalNumberNode', RationalNumberNode );