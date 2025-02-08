// Copyright 2023-2025, University of Colorado Boulder

/**
 * EquationNodeOptions is the set of options for various equation Node types. Not all of these options may be applicable.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Font from '../../../../../scenery/js/util/Font.js';
import TColor from '../../../../../scenery/js/util/TColor.js';

export type EquationNodeOptions = {

  xSymbol?: string; // symbol for x, the input
  ySymbol?: string; // symbol for y, the output
  xyAsCards?: boolean; // put x & y symbols on a rectangle background, like a card?
  xyMaxWidth?: number; // maxWidth of x & y symbols, for i18n, determined empirically
  showLeftHandSide?: boolean; // whether to show left-hand side of the equation

  // colors
  xColor?: TColor; // color for xSymbol
  yColor?: TColor; // color for ySymbol
  color?: TColor; // color for other parts of the equation

  // fonts
  xyFont: Font; // font for x & y symbols
  symbolFont?: Font; // font for math symbols (equals, plus, minus)
  wholeNumberFont?: Font; // font for whole numbers
  fractionFont?: Font; // font for fractions
  signFont?: Font; // font for negative sign
  parenthesesFont?: Font; // font for parentheses

  // x spacing
  equalsXSpacing?: number; // x space on both sides of equals sign
  signXSpacing?: number; // x space between a negative sign and the number that follows it
  operatorXSpacing?: number; // x space on both sides of an operator
  integerSlopeXSpacing?: number; // x space between integer slope and x
  multiplierXSpacing?: number; // x space following multiplier
  fractionSlopeXSpacing?: number; // x space between fractional slope and x
  parenthesesXSpacing?: number; // x space inside of parentheses
  
  // y spacing
  fractionYSpacing?: number; // y space above and below fraction line
  fractionScale?: number; // how much to scale fractions

  // y offsets. Positive is down, everything is relative to the equals sign.
  // Note that these options are not currently implemented by HelpfulEquationNode.
  xyYOffset?: number; // vertical offset of x & y symbols
  slopeYOffset?: number; // vertical offset of slope
  interceptYOffset?: number; // vertical offset of intercept
  operatorYOffset?: number; // vertical offset of operators (plus, minus)
};