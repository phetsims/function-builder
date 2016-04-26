// Copyright 2016, University of Colorado Boulder

//TODO omit run if it's 1
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
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {number} rise
   * @param {number} run
   * @param {string} operator
   * @param {number} intercept
   * @param {Object} options
   * @constructor
   */
  function SlopeInterceptEquationNode( rise, run, operator, intercept, options ) {

    options = _.extend( {
      font: new FBFont( 24 ), // font for non-slope components
      fractionFont: new FBFont( 18 ), // font for rise and run
      equalsXSpacing: 8, // x space on both sides of equals
      signXSpacing: 2, // x spacing between sign and slope
      operatorXSpacing: 8, // x space on both sides of operator
      slopeXSpacing: 4, // x space between slope and x
      slopeYSpacing: 2  // y space above and below fraction line
    } );

    var negativeSlope = ( ( rise / run ) < 0 );

    // components of the equation
    var TEXT_OPTIONS = { font: options.font };
    var yNode = new Text( FBSymbols.Y, TEXT_OPTIONS );
    var equalsNode = new Text( FBSymbols.EQUALS, TEXT_OPTIONS );
    var negativeNode = new Text( FBSymbols.MINUS, { font: options.fractionFont } );
    var riseNode = new Text( Math.abs( rise ), { font: options.fractionFont } );
    var runNode = new Text( Math.abs( run ), { font: options.fractionFont } );
    var fractionLineNode = new Line( 0, 0, Math.max( riseNode.width, runNode.width ), 0, {
      stroke: 'black'
    } );
    var xNode = new Text( FBSymbols.X, TEXT_OPTIONS );
    var operatorNode = new Text( operator, TEXT_OPTIONS );
    var interceptNode = new Text( intercept, TEXT_OPTIONS );

    // brute force layout
    equalsNode.left = yNode.right + options.equalsXSpacing;
    if ( negativeSlope ) {
      negativeNode.left = equalsNode.right + options.equalsXSpacing;
      fractionLineNode.left = negativeNode.right + options.signXSpacing;
      fractionLineNode.centerY = negativeNode.centerY;
    }
    else {
      fractionLineNode.left = equalsNode.right + options.equalsXSpacing;
      fractionLineNode.centerY = equalsNode.centerY;
    }
    riseNode.centerX = fractionLineNode.centerX;
    riseNode.bottom = fractionLineNode.top - options.slopeYSpacing;
    runNode.centerX = fractionLineNode.centerX;
    runNode.top = fractionLineNode.bottom + options.slopeYSpacing;
    xNode.left = fractionLineNode.right + options.slopeXSpacing;
    xNode.y = yNode.y;
    operatorNode.left = xNode.right + options.operatorXSpacing;
    operatorNode.centerY = equalsNode.centerY;
    interceptNode.left = operatorNode.right + options.operatorXSpacing;
    interceptNode.y = yNode.y;

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ yNode, equalsNode ];
    if ( negativeSlope ) {
      options.children.push( negativeNode );
    }
    options.children.push( riseNode, fractionLineNode, runNode, xNode, operatorNode, interceptNode );

    Node.call( this, options );
  }

  functionBuilder.register( 'SlopeInterceptEquationNode', SlopeInterceptEquationNode );

  return inherit( Node, SlopeInterceptEquationNode );
} );
