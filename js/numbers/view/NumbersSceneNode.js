// Copyright 2016, University of Colorado Boulder

/**
 * Scene for the 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathFunctionNode = require( 'FUNCTION_BUILDER/common/view/functions/MathFunctionNode' );
  var MathSceneNode = require( 'FUNCTION_BUILDER/common/view/MathSceneNode' );

  // strings
  var inputString = require( 'string!FUNCTION_BUILDER/input' );
  var outputString = require( 'string!FUNCTION_BUILDER/output' );

  /**
   * @param {Scene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   * @constructor
   */
  function NumbersSceneNode( scene, layoutBounds, options ) {

    options = _.extend( {
      cardCarouselDefaultPageNumber: 1,  // show cards 0-3 in input carousel
      functionsPerPage: 3, // number of functions visible in the carousel
      hasTableDrawer: true, // include an XY table drawer
      hasEquationDrawer: true, // include an equation drawer
      xSymbol: inputString, // use 'Input' in place of x
      ySymbol: outputString, // use 'Output' in place of y
      xyFont: FBConstants.EQUATION_CARD_INPUT_OUTPUT_FONT, // {Font} for x & y symbols in equations
      xyAsCardsInEquations: true, // {boolean} make x & y symbols look like a card in equations
      tableHeadingFont: FBConstants.TABLE_INPUT_OUTPUT_HEADING_FONT // {Font} for XY table heading
    }, options );

    MathSceneNode.call( this, scene, layoutBounds, MathFunctionNode, options );
  }

  functionBuilder.register( 'NumbersSceneNode', NumbersSceneNode );

  return inherit( MathSceneNode, NumbersSceneNode );
} );
