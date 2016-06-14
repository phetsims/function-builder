// Copyright 2016, University of Colorado Boulder

/**
 * ScreenView for the 'Numbers' screen, a variation of the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EquationsSceneNode = require( 'FUNCTION_BUILDER/equations/view/EquationsSceneNode' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBScreenView = require( 'FUNCTION_BUILDER/common/view/FBScreenView' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  // strings
  var inputString = require( 'string!FUNCTION_BUILDER/input' );
  var outputString = require( 'string!FUNCTION_BUILDER/output' );

  // constants
  var SCENE_NODE_OPTIONS = {
    cardCarouselDefaultPageNumber: 1,
    functionsPerPage: 3,
    hasGraph: false, // no graph in this scene
    xSymbol: inputString, // symbol used in place of x
    ySymbol: outputString, // symbol used in place of y
    xyFont: FBConstants.EQUATION_CARD_INPUT_OUTPUT_FONT, // {Font} for x & y symbols
    xyAsCardsInEquations: true, // {boolean} make x & y symbols look like a card in equations
    tableHeadingFont: FBConstants.TABLE_INPUT_OUTPUT_HEADING_FONT
  };

  /**
   * @param {NumbersModel} model
   * @param {Object} [options]
   * @constructor
   */
  function NumbersScreenView( model, options ) {
    FBScreenView.call( this, model, options );
  }

  functionBuilder.register( 'NumbersScreenView', NumbersScreenView );

  return inherit( FBScreenView, NumbersScreenView, {

    /**
     * Creates the node for a scene.
     *
     * @param {Scene} scene
     * @param {Bounds2} layoutBounds
     * @param {Object} options - options to SceneNode constructor
     * @returns {SceneNode}
     * @protected
     */
    createSceneNode: function( scene, layoutBounds, options ) {
      return new EquationsSceneNode( scene, layoutBounds, _.extend( {}, SCENE_NODE_OPTIONS, options ) );
    }
  } );
} );