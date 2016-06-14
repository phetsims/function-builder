// Copyright 2016, University of Colorado Boulder

/**
 * Displays a rational number.
 * The number can be displayed as either a mixed number or improper fraction (see options.mixedNumber).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {RationalNumber} rationalNumber
   * @param {Object} [options]
   * @constructor
   */
  function RationalNumberNode( rationalNumber, options ) {

    assert && assert( rationalNumber instanceof RationalNumber );

    options = _.extend( {

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

    // @private options used by setValue
    this.options = options;

    Node.call( this );
    this.setValue( rationalNumber );
    this.mutate( options );
  }

  functionBuilder.register( 'RationalNumberNode', RationalNumberNode );

  return inherit( Node, RationalNumberNode, {

    /**
     * Sets the value displayed by this node.
     * This is relatively expensive, because it rebuilds then node.
     *
     * @param {RationalNumber} rationalNumber
     * @public
     */
    setValue: function( rationalNumber ) {

      assert && assert( rationalNumber instanceof RationalNumber );

      this.removeAllChildren();

      var left = 0;
      var centerY = 0;

      // sign
      var isNegative = ( rationalNumber.valueOf() < 0 );
      if ( ( rationalNumber.valueOf() !== 0 ) && ( isNegative || this.options.showPositiveSign ) ) {
        var sign = isNegative ? this.options.negativeSymbol : this.options.positiveSymbol;
        var signNode = new Text( sign, {
          fill: this.options.color,
          font: this.options.signFont
        } );
        this.addChild( signNode );

        // position of next node
        left = signNode.right + this.options.signXSpacing;
        centerY = signNode.centerY;
      }

      // {RationalNumber} display absolute value, since we have a separate node for sign
      var rationalNumberAbs = rationalNumber.abs();

      // whole number
      var fraction = rationalNumberAbs; // {RationalNumber}
      if ( rationalNumberAbs.isInteger() || this.options.mixedNumber ) {

        fraction = rationalNumberAbs.remainder();

        var wholeNumberNode = new Text( rationalNumberAbs.quotient(), {
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
        var FRACTION_OPTIONS = {
          fill: this.options.color,
          font: this.options.fractionFont
        };
        var numeratorNode = new Text( fraction.numerator, FRACTION_OPTIONS ); // @private
        this.addChild( numeratorNode );
        var denominatorNode = new Text( fraction.denominator, FRACTION_OPTIONS ); // @private
        this.addChild( denominatorNode );

        // horizontal line separating numerator and denominator
        var lineNode = new Line( 0, 0, Math.max( numeratorNode.width, denominatorNode.width ), 0, {
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
  } );
} );
