// Copyright 2016-2022, University of Colorado Boulder

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

import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Line, Node, Text } from '../../../../scenery/js/imports.js';
import functionBuilder from '../../functionBuilder.js';
import RationalNumber from '../model/RationalNumber.js';

export default class RationalNumberNode extends Node {

  /**
   * @param {RationalNumber} rationalNumber
   * @param {Object} [options]
   */
  constructor( rationalNumber, options ) {

    assert && assert( rationalNumber instanceof RationalNumber );

    options = merge( {

      mixedNumber: false, // {boolean} true: display as mixed number, false: display as improper fraction
      color: 'black', // {Color|string} color used for all sub-parts of this node
      fractionLineWidth: 1, // {number} lineWidth for the line that separates numerator and denominator

      // sign
      negativeSymbol: '\u2212', // {string} symbol used for negative sign
      positiveSymbol: '\u002b', // {string} symbol used for positive sign
      showPositiveSign: false, // {boolean} show sign on positive numbers?

      // fonts
      signFont: new PhetFont( 22 ),
      wholeNumberFont: new PhetFont( 30 ),
      fractionFont: new PhetFont( 20 ),

      // spacing
      signXSpacing: 3, // {number} space to right of sign
      fractionXSpacing: 3, // {number} space between whole number and fraction
      fractionYSpacing: 2 // {number} space above and below fraction line

    }, options );

    assert && assert( !options.children, 'decoration is not supported' );

    super();

    // @private options used by setValue
    this.options = options;

    this.setValue( rationalNumber );
    this.mutate( options );
  }

  /**
   * Sets the value displayed by this node.
   * This is relatively expensive, because it rebuilds then node.
   *
   * @param {RationalNumber} rationalNumber
   * @public
   */
  setValue( rationalNumber ) {

    assert && assert( rationalNumber instanceof RationalNumber );

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
      const numeratorNode = new Text( fraction.numerator, FRACTION_OPTIONS ); // @private
      this.addChild( numeratorNode );
      const denominatorNode = new Text( fraction.denominator, FRACTION_OPTIONS ); // @private
      this.addChild( denominatorNode );

      // horizontal line separating numerator and denominator
      const lineNode = new Line( 0, 0, Math.max( numeratorNode.width, denominatorNode.width ), 0, {
        stroke: this.options.color,
        lineWidth: this.options.lineWidth,
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