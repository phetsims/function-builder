// Copyright 2016, University of Colorado Boulder

//TODO better name for PhetEquationNode
/**
 * PhET-specific format of the equation that corresponds to functions in the builder.
 * Note that the logic used to create this node is similar to PhetEquation.toString.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
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

      // fractions
      fractionScale: 0.67, // {number} how much to scale fractions

      // x spacing
      equalsXSpacing: 8, // {number} x space on both sides of equals sign
      signXSpacing: 3, // {number} x spacing between a negative sign and the number that follows it
      operatorXSpacing: 8, // {number} x space on both sides of an operator
      integerSlopeXSpacing: 3, // {number} x space between integer slope and x
      fractionSlopeXSpacing: 6, // {number} x space between fractional slope and x

      // y spacing
      fractionYSpacing: 2, // {number} y space above and below fraction line

      // y offsets, positive is down, everything is relative to the equals sign
      xyYOffset: 0, // {number} vertical offset of x & y symbols
      slopeYOffset: 0, // {number} vertical offset of slope
      interceptYOffset: 0, // {number} vertical offset of intercept
      operatorYOffset: 0 // {number} vertical offset of operators (plus, minus)

    }, options );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [];

    // hoist vars that will be reused
    var i = 0;

    // y
    var yNode = new Text( options.ySymbol, {
      fill: options.yColor,
      font: options.xyFont,
      y: options.xyYOffset
    } );

    // =
    var equalsNode = new Text( FBSymbols.EQUALS, {
      fill: options.color,
      font: options.symbolFont,
      left: yNode.right + options.equalsXSpacing
    } );

    // Create the left-hand side nodes to simplify layout, but add them only if requested
    if ( options.showLeftHandSide ) {
      options.children.push( yNode, equalsNode );
    }

    var mathFunctions = equation.mathFunctions; // {MathFunction[]}

    if ( mathFunctions.length === 0 ) {

      // y = x
      var xNode = new Text( options.xSymbol, {
        font: options.xyFont,
        left: equalsNode.right + options.equalsXSpacing
      } );
      options.children.push( xNode );
    }
    else if ( equation.evaluatesToConstant() ) {

      // constant
      var value = ZERO;
      for ( i = 0; i < mathFunctions.length; i++ ) {
        value = mathFunctions[ i ].apply( value );
      }

      var constantNode = new RationalNumberNode( value, {
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
      options.children.push( constantNode );
    }
    else {

      // parent node for right-hand side (rhs) of the equation
      var rhsNode = new Node();
      options.children.push( rhsNode );

      //TODO temporary
      var tempNode = new Text( equation.toString(), {
        font: options.wholeNumberFont
      } );
      rhsNode.addChild( tempNode );

      // layout
      rhsNode.left = equalsNode.right + options.equalsXSpacing;
      rhsNode.centerY = equalsNode.centerY;
    }

    Node.call( this, options );
  }

  functionBuilder.register( 'PhetEquationNode', PhetEquationNode );

  return inherit( Node, PhetEquationNode );
} );
