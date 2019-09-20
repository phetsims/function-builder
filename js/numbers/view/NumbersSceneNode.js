// Copyright 2016-2019, University of Colorado Boulder

/**
 * View of a scene in the 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MathFunctionNode = require( 'FUNCTION_BUILDER/common/view/functions/MathFunctionNode' );
  const MathSceneNode = require( 'FUNCTION_BUILDER/common/view/MathSceneNode' );

  // strings
  const inputString = require( 'string!FUNCTION_BUILDER/input' );
  const outputString = require( 'string!FUNCTION_BUILDER/output' );

  /**
   * @param {NumbersScene} scene - model for this scene
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

      // options for XYTableNode
      tableOptions: {
        xSymbol: inputString, // use 'Input' in place of x
        ySymbol: outputString, // use 'Output' in place of y
        headingFont: new FBFont( 18 ) // different font for 'Input' and 'Output'
      },

      // options for EquationPanel
      equationOptions: {
        xSymbol: inputString, // use 'Input' in place of x
        ySymbol: outputString, // use 'Output' in place of y
        xyFont: new FBFont( 24 ), // different font for 'Input' and 'Output'
        xyAsCards: true // card outlines around 'Input' and 'Output'
      }

    }, options );

    MathSceneNode.call( this, scene, layoutBounds, MathFunctionNode, options );
  }

  functionBuilder.register( 'NumbersSceneNode', NumbersSceneNode );

  return inherit( MathSceneNode, NumbersSceneNode );
} );
