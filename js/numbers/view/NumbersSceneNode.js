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
      functionsPerPage: 3,
      hasTableDrawer: true,
      hasEquationDrawer: true,
      xSymbol: inputString, // symbol used in place of x
      ySymbol: outputString, // symbol used in place of y
      xyFont: FBConstants.EQUATION_CARD_INPUT_OUTPUT_FONT, // {Font} for x & y symbols
      xyAsCardsInEquations: true, // {boolean} make x & y symbols look like a card in equations
      tableHeadingFont: FBConstants.TABLE_INPUT_OUTPUT_HEADING_FONT
    }, options );

    MathSceneNode.call( this, scene, layoutBounds, options );
  }

  functionBuilder.register( 'NumbersSceneNode', NumbersSceneNode );

  return inherit( MathSceneNode, NumbersSceneNode );
} );
