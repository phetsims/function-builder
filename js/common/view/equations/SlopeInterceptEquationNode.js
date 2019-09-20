// Copyright 2016-2019, University of Colorado Boulder

/**
 * Equation in slope-intercept form, y = mx + b
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const CardNode = require( 'FUNCTION_BUILDER/common/view/cards/CardNode' );
  const FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  const FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );
  const RationalNumberNode = require( 'FUNCTION_BUILDER/common/view/RationalNumberNode' );
  const Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {RationalNumber} slope
   * @param {RationalNumber} intercept
   * @param {Object} [options] - see FBConstants.EQUATION_OPTIONS
   * @constructor
   */
  function SlopeInterceptEquationNode( slope, intercept, options ) {

    assert && assert( slope instanceof RationalNumber );
    assert && assert( intercept instanceof RationalNumber );

    options = _.extend( {}, FBConstants.EQUATION_OPTIONS, options );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [];

    // y
    let yNode = new Text( options.ySymbol, {
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
            fill: options.color,
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

        let xNode = new Text( options.xSymbol, {
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
          fill: options.color,
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

    Node.call( this, options );
  }

  functionBuilder.register( 'SlopeInterceptEquationNode', SlopeInterceptEquationNode );

  return inherit( Node, SlopeInterceptEquationNode );
} );
