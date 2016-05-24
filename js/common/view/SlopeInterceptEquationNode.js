// Copyright 2016, University of Colorado Boulder

/**
 * Equation in slope-intercept form (e.g. y = 2x + 3)
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {SlopeInterceptEquation} slopeInterceptEquation
   * @param {Object} options
   * @constructor
   */
  function SlopeInterceptEquationNode( slopeInterceptEquation, options ) {

    options = _.extend( {

      showLeftHandSide: true, // {boolean} whether to show left-hand side of the equation
      xSymbol: slopeInterceptEquation.xSymbol, // {string} symbol for input
      ySymbol: FBSymbols.Y, // {string} symbol for output

      // fonts
      xyFont: FBConstants.NUMBERS_CARD_XY_FONT, // {Font} font for x & y symbols
      symbolFont: FBConstants.NUMBERS_CARD_SYMBOL_FONT, // {Font} font for math symbols (equals, plus, minus)
      integerFont: FBConstants.NUMBERS_CARD_WHOLE_NUMBER_FONT, // {Font} font for integer values
      fractionFont: FBConstants.NUMBERS_CARD_FRACTION_FONT, // {Font} font for fraction numerator and denominator
      signFont: FBConstants.NUMBERS_CARD_SIGN_FONT, // {Font} font for negative sign

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
      fractionYOffset: 0, // {number} vertical offset of fractions
      integerYOffset: 0, // {number} vertical offset of integers
      operatorYOffset: 0, // {number} vertical offset of operators (plus, minus)
      signYOffset: 0 // {number} vertical offset of negative signs

    }, options );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [];

    // to improve readability
    var slope = slopeInterceptEquation.slope; // {RationalNumber}
    assert && assert( slope instanceof RationalNumber );
    var intercept = slopeInterceptEquation.intercept; // {RationalNumber}
    assert && assert( intercept instanceof RationalNumber );

    // y
    var yNode = new Text( options.ySymbol, {
      font: options.xyFont,
      y: options.xyYOffset
    } );

    // =
    var equalsNode = new Text( FBSymbols.EQUALS, {
      font: options.symbolFont,
      left: yNode.right + options.equalsXSpacing
    } );

    // Create the left-hand side nodes to simplify layout, but add them only if requested
    if ( options.showLeftHandSide ) {
      options.children.push( yNode, equalsNode );
    }

    // horizontal layout positions, adjusted as the equation is built
    var signLeft = equalsNode.right + options.equalsXSpacing;
    var slopeLeft = signLeft;
    var inputLeft = 0;
    var operatorLeft = 0;
    var interceptLeft = 0;

    // slope
    if ( slope.valueOf() !== 0 ) {

      if ( slope.valueOf() === 1 ) {

        // omit slope if value is 1, so we have 'x' instead of '1x'
        inputLeft = equalsNode.right + options.equalsXSpacing;
      }
      else {

        // slope is negative, handle sign as a separate node
        if ( slope.valueOf() < 0 ) {
          var slopeSignNode = new Text( FBSymbols.MINUS, {
            font: options.signFont,
            left: signLeft,
            centerY: equalsNode.centerY + options.signYOffset
          } );
          options.children.push( slopeSignNode );
          slopeLeft = slopeSignNode.right + options.signXSpacing;
        }

        if ( slope.isInteger() ) {

          // slope is an integer
          var slopeAndSignNode = new Text( Math.abs( slope.valueOf() ), {
            font: options.integerFont,
            left: slopeLeft,
            centerY: equalsNode.centerY + options.integerYOffset
          } );
          options.children.push( slopeAndSignNode );
          inputLeft = slopeAndSignNode.right + options.integerSlopeXSpacing;
        }
        else {

          // slope is a fraction
          var riseNode = new Text( Math.abs( slope.numerator ), { font: options.fractionFont } );
          var runNode = new Text( Math.abs( slope.denominator ), { font: options.fractionFont } );
          var slopeLineNode = new Line( 0, 0, Math.max( riseNode.width, runNode.width ), 0, {
            stroke: 'black',
            left: slopeLeft,
            centerY: equalsNode.centerY + options.fractionYOffset
          } );
          options.children.push( riseNode, runNode, slopeLineNode );

          riseNode.centerX = slopeLineNode.centerX;
          riseNode.bottom = slopeLineNode.top - options.fractionYSpacing;
          runNode.centerX = slopeLineNode.centerX;
          runNode.top = slopeLineNode.bottom + options.fractionYSpacing;

          inputLeft = slopeLineNode.right + options.fractionSlopeXSpacing;
        }
      }

      // x
      var xNode = new Text( options.xSymbol, {
        font: options.xyFont,
        left: inputLeft,
        centerY: equalsNode.centerY + options.xyYOffset
      } );
      options.children.push( xNode );
      operatorLeft = xNode.right + options.operatorXSpacing;
      signLeft = operatorLeft;
    }

    // intercept
    if ( intercept.valueOf() !== 0 ) {

      if ( slope.valueOf() !== 0 ) {

        // operator
        var operator = ( intercept.valueOf() > 0 ) ? FBSymbols.PLUS : FBSymbols.MINUS;
        var operatorNode = new Text( operator, {
          font: options.symbolFont,
          left: operatorLeft,
          centerY: equalsNode.centerY + options.operatorYOffset
        } );
        options.children.push( operatorNode );
        interceptLeft = operatorNode.right + options.operatorXSpacing;
      }
      else if ( intercept.valueOf() < 0 ) {

        // intercept negative sign
        var interceptSignNode = new Text( FBSymbols.MINUS, {
          font: options.signFont,
          left: signLeft,
          centerY: equalsNode.centerY + options.signYOffset
        } );
        options.children.push( interceptSignNode );
        interceptLeft = interceptSignNode.right + options.signXSpacing;
      }
      else {

        // intercept is positive, so we don't render its sign
        interceptLeft = equalsNode.right + options.equalsXSpacing;
      }

      // intercept
      if ( intercept.isInteger() ) {

        // intercept is an integer
        var interceptNode = new Text( Math.abs( intercept.valueOf() ), {
          font: options.integerFont,
          left: interceptLeft,
          centerY: equalsNode.centerY + options.integerYOffset
        } );
        options.children.push( interceptNode );
      }
      else {

        // intercept is a fraction
        var numeratorNode = new Text( Math.abs( intercept.numerator ), { font: options.fractionFont } );
        var denominatorNode = new Text( Math.abs( intercept.denominator ), { font: options.fractionFont } );
        var interceptLineNode = new Line( 0, 0, Math.max( numeratorNode.width, denominatorNode.width ), 0, {
          stroke: 'black',
          left: interceptLeft,
          centerY: equalsNode.centerY + options.fractionYOffset
        } );
        options.children.push( numeratorNode, denominatorNode, interceptLineNode );

        numeratorNode.centerX = interceptLineNode.centerX;
        numeratorNode.bottom = interceptLineNode.top - options.fractionYSpacing;
        denominatorNode.centerX = interceptLineNode.centerX;
        denominatorNode.top = interceptLineNode.bottom + options.fractionYSpacing;
      }
    }

    // y = 0
    if ( slope.valueOf() === 0 && intercept.valueOf() === 0 ) {
      var zeroNode = new Text( '0', {
        font: options.integerFont,
        left: equalsNode.right + options.equalsXSpacing,
        y: options.integerOffset
      } );
      options.children.push( zeroNode );
    }

    Node.call( this, options );
  }

  functionBuilder.register( 'SlopeInterceptEquationNode', SlopeInterceptEquationNode );

  return inherit( Node, SlopeInterceptEquationNode );
} );
