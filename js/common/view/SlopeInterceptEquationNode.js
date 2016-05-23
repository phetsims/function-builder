// Copyright 2016, University of Colorado Boulder

/**
 * Equation in slope-intercept form.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var MathSymbolFont = require( 'SCENERY_PHET/MathSymbolFont' );
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
      xyFont: new MathSymbolFont( 24 ), // {Font} font for x & y symbols
      operatorFont: new FBFont( 24 ), // {Font} font for operator, equals, negative sign
      integerFont: new FBFont( 24 ), // {Font} font for integer components
      fractionFont: new FBFont( 18 ), // {Font} font for fraction numerator and denominator
      
      // spacing
      equalsXSpacing: 8, // {number} x space on both sides of equals
      signXSpacing: 4, // {number} x spacing between sign and slope
      operatorXSpacing: 8, // {number} x space on both sides of operator
      slopeXSpacing: 6, // {number} x space between slope and x
      fractionYSpacing: 2  // {number} y space above and below fraction line
      
    }, options);

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [];

    // to improve readability
    var slope = slopeInterceptEquation.slope; // {RationalNumber}
    assert && assert( slope instanceof RationalNumber );
    var intercept = slopeInterceptEquation.intercept; // {RationalNumber}
    assert && assert( intercept instanceof RationalNumber );

    // y
    var yNode = new Text( options.ySymbol, {
      font: options.xyFont
    } );

    // =
    var equalsNode = new Text( FBSymbols.EQUALS, {
      font: options.operatorFont,
      left: yNode.right + options.equalsXSpacing
    } );

    if ( options.showLeftHandSide ) {
      options.children.push( yNode, equalsNode );
    }

    // layout positions, adjusted as the equation is built
    var slopeLeft = equalsNode.right + options.equalsXSpacing;
    var inputLeft = slopeLeft;
    var interceptLeft = equalsNode.right + options.equalsXSpacing;

    // slope
    if ( slope.valueOf() !== 0 ) {

      if ( slope.valueOf() !== 1 ) { // omit slope if value is 1, so we have 'x' instead of '1x'
        
        if ( slope.isInteger() ) {

          // slope is an integer, handle its value and sign here
          var slopeAndSignNode = new Text( slope.valueOf(), {
            font: options.integerFont,
            left: slopeLeft
          } );
          options.children.push( slopeAndSignNode );
          inputLeft = slopeAndSignNode.right + options.slopeXSpacing;
        }
        else {

          // slope is a fraction, handle its sign, rise and run as separate components
          if ( slope.valueOf() < 0 ) {
            var slopeSignNode = new Text( FBSymbols.MINUS, {
              font: options.operatorFont,
              left: slopeLeft
            } );
            options.children.push( slopeSignNode );
            slopeLeft = slopeSignNode.right + options.signXSpacing;
          }

          var riseNode = new Text( Math.abs( slope.numerator ), { font: options.fractionFont } );
          var runNode = new Text( Math.abs( slope.denominator ), { font: options.fractionFont } );
          var slopeLineNode = new Line( 0, 0, Math.max( riseNode.width, runNode.width ), 0, {
            stroke: 'black',
            left: slopeLeft
          } );
          options.children.push( riseNode, runNode, slopeLineNode );

          riseNode.centerX = slopeLineNode.centerX;
          riseNode.bottom = slopeLineNode.top - options.fractionYSpacing;
          runNode.centerX = slopeLineNode.centerX;
          runNode.top = slopeLineNode.bottom + options.fractionYSpacing;
          
          inputLeft = slopeLineNode.right + options.slopeXSpacing;
        }
      }

      // x
      var xNode = new Text( options.xSymbol, {
        font: options.xyFont,
        left: inputLeft
      } );
      options.children.push( xNode );
      interceptLeft = xNode.right + options.operatorXSpacing;
    }
    
    // intercept
    var interceptIsFraction = false;
    if ( intercept.valueOf() !== 0 ) {

      if ( slope.valueOf() === 0 ) {

        // no slope, intercept only
        if ( intercept.isInteger() ) {
          
          // intercept is an integer, handle sign with value 
          var interceptAndSignNode = new Text( intercept.valueOf(), {
            font: options.integerFont,
            left: interceptLeft
          } );
          options.children.push( interceptAndSignNode );
        }
        else if ( intercept.valueOf() < 0 ) {
          
          // intercept is a fraction, handle its sign separately
          var interceptSignNode = new Text( FBSymbols.MINUS, { font: options.operatorFont } );
          options.children.push( interceptSignNode );
          interceptIsFraction = true;
          interceptLeft = interceptSignNode.right + options.signXSpacing;
        }
      }
      else {
        
        // operator
        var operator = ( intercept.valueOf() > 0 ) ? FBSymbols.PLUS : FBSymbols.MINUS;
        var operatorNode = new Text( operator, { 
          font: options.operatorFont,
          left: interceptLeft
        } );
        options.children.push( operatorNode );
        interceptLeft = operatorNode.right + options.operatorXSpacing;

        if ( intercept.isInteger() ) {

          // intercept is an integer
          var interceptNode = new Text( Math.abs( intercept.valueOf() ), {
            font: options.integerFont,
            left: interceptLeft
          } );
          options.children.push( interceptNode );
        }
        else {

          // intercept is a fraction
          interceptIsFraction = true;
        }
      }

      // fractional intercept
      if ( interceptIsFraction ) {
        var numeratorNode = new Text( Math.abs( intercept.numerator ), { font: options.fractionFont } );
        var denominatorNode = new Text( Math.abs( intercept.denominator ), { font: options.fractionFont } );
        var interceptLineNode = new Line( 0, 0, Math.max( numeratorNode.width, denominatorNode.width ), 0, {
          stroke: 'black',
          left: interceptLeft
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
        left: slopeLeft
      } );
      options.children.push( zeroNode );
    }

    Node.call( this, options );
  }

  functionBuilder.register( 'SlopeInterceptEquationNode', SlopeInterceptEquationNode );

  return inherit( Node, SlopeInterceptEquationNode );
} );
