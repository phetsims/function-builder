// Copyright 2016, University of Colorado Boulder

/**
 * Equation in slope-intercept form, y = mx + b
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
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );
  var RationalNumberNode = require( 'FUNCTION_BUILDER/common/view/RationalNumberNode' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {RationalNumber} slope
   * @param {RationalNumber} intercept
   * @param {Object} [options]
   * @constructor
   */
  function SlopeInterceptEquationNode( slope, intercept, options ) {

    assert && assert( slope instanceof RationalNumber );
    assert && assert( intercept instanceof RationalNumber );

    options = _.extend( {

      showLeftHandSide: true, // {boolean} whether to show left-hand side of the equation (y =)
      xSymbol: FBSymbols.X, // {string} symbol for x (input)
      ySymbol: FBSymbols.Y, // {string} symbol for y (output)
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

      // x spacing
      equalsXSpacing: 8, // {number} x space on both sides of equals sign
      signXSpacing: 3, // {number} x spacing between a negative sign and the number that follows it
      operatorXSpacing: 8, // {number} x space on both sides of an operator
      integerSlopeXSpacing: 3, // {number} x space between integer slope and x
      fractionSlopeXSpacing: 6, // {number} x space between fractional slope and x

      // y spacing
      fractionYSpacing: 2,  // {number} y space above and below fraction line

      // y offsets, positive is down, everything is relative to the equals sign
      xyYOffset: 0, // {number} vertical offset of x & y symbols
      slopeYOffset: 0, // {number} vertical offset of slope
      interceptYOffset: 0, // {number} vertical offset of intercept
      operatorYOffset: 0 // {number} vertical offset of operators (plus, minus)

    }, options );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [];

    // y
    var yNode = new Text( options.ySymbol, {
      fill: options.yColor,
      font: options.xyFont,
      maxWidth: options.xyMaxWidth
    } );
    if ( options.xyAsCards ) {
      yNode = CardNode.createEquationXYNode( yNode );
    }
    yNode.y = options.xyYOffset;

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

    if ( slope.valueOf() === 0 && intercept.valueOf() === 0 ) {

      // y = 0
      var zeroNode = new Text( '0', {
        fill: options.yColor,
        font: options.wholeNumberFont,
        left: equalsNode.right + options.equalsXSpacing,
        centerY: yNode.centerY
      } );
      options.children.push( zeroNode );
    }
    else {

      // y = mx + b

      // horizontal layout positions, adjusted as the equation is built
      var xLeft = 0;
      var operatorLeft = 0;
      var interceptLeft = 0;

      // slope
      if ( slope.valueOf() !== 0 ) {

        if ( slope.valueOf() === 1 ) {

          // omit slope if value is 1, so we have 'x' instead of '1x'
          xLeft = equalsNode.right + options.equalsXSpacing;
        }
        else if ( slope.valueOf() === -1 ) {

          // omit 1 if value is -1, so we have '-x' instead of '-1x'
          var signNode = new Text( FBSymbols.MINUS, {
            fill: options.color,
            font: options.signFont,
            left: equalsNode.right + options.equalsXSpacing,
            centerY: equalsNode.centerY
          } );
          options.children.push( signNode );

          xLeft = signNode.right + options.signXSpacing;
        }
        else {

          // whole number or fractional slope
          var slopeNode = new RationalNumberNode( slope, {
            fill: options.color,
            mixedNumber: false, // display as an improper fraction
            fractionYSpacing: options.fractionYSpacing,
            signXSpacing: options.signXSpacing,
            signFont: options.signFont,
            wholeNumberFont: options.wholeNumberFont,
            fractionFont: options.fractionFont,
            left: equalsNode.right + options.equalsXSpacing,
            centerY: equalsNode.centerY + options.slopeYOffset
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

        var xNode = new Text( options.xSymbol, {
          fill: options.xColor,
          font: options.xyFont,
          maxWidth: options.xyMaxWidth
        } );
        if ( options.xyAsCards ) {
          xNode = CardNode.createEquationXYNode( xNode );
        }
        xNode.left = xLeft;
        xNode.centerY = equalsNode.centerY + options.xyYOffset;

        options.children.push( xNode );
        operatorLeft = xNode.right + options.operatorXSpacing;
      }

      // operator (+, -)
      if ( ( intercept.valueOf() !== 0 ) && ( slope.valueOf() !== 0 ) ) {
        var operator = ( intercept.valueOf() > 0 ) ? FBSymbols.PLUS : FBSymbols.MINUS;
        var operatorNode = new Text( operator, {
          fill: options.color,
          font: options.symbolFont,
          left: operatorLeft,
          centerY: equalsNode.centerY + options.operatorYOffset
        } );
        options.children.push( operatorNode );
        interceptLeft = operatorNode.right + options.operatorXSpacing;
      }
      else {

        // no operator, intercept follows equals sign
        interceptLeft = equalsNode.right + options.equalsXSpacing;
      }

      // intercept
      if ( intercept.valueOf() !== 0 ) {
        var interceptNode = new RationalNumberNode( ( slope.valueOf() === 0 ) ? intercept : intercept.abs(), {
          fill: options.color,
          mixedNumber: false, // display as an improper fraction
          fractionYSpacing: options.fractionYSpacing,
          signXSpacing: options.signXSpacing,
          signFont: options.signFont,
          wholeNumberFont: options.wholeNumberFont,
          fractionFont: options.fractionFont,
          left: interceptLeft,
          centerY: equalsNode.centerY + options.interceptYOffset
        } );
        options.children.push( interceptNode );
      }
    }

    Node.call( this, options );
  }

  functionBuilder.register( 'SlopeInterceptEquationNode', SlopeInterceptEquationNode );

  return inherit( Node, SlopeInterceptEquationNode );
} );