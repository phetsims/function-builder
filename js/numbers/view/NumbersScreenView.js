// Copyright 2016, University of Colorado Boulder

/**
 * ScreenView for the 'Numbers' screen, a variation of the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EquationsScreenView = require( 'FUNCTION_BUILDER/equations/view/EquationsScreenView' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Workaround35 = require( 'FUNCTION_BUILDER/common/view/Workaround35' );

  // strings
  var inputString = require( 'string!FUNCTION_BUILDER/input' );
  var outputString = require( 'string!FUNCTION_BUILDER/output' );

  /**
   * @param {NumbersModel} model
   * @constructor
   */
  function NumbersScreenView( model ) {

    // modifications to Equations screen, see EquationsSceneNode options
    var sceneNodeOptions = {
      cardCarouselDefaultPageNumber: 1,
      functionsPerPage: 3,
      hasGraph: false, // no graph in this scene
      xSymbol: inputString, // symbol used in place of x
      ySymbol: outputString, // symbol used in place of y
      xyFont: FBConstants.EQUATION_CARD_INPUT_OUTPUT_FONT, // {Font} for x & y symbols
      xyAsCardsInEquations: true, // {boolean} make x & y symbols look like a card in equations
      tableHeadingFont: FBConstants.TABLE_INPUT_OUTPUT_HEADING_FONT
    };

    EquationsScreenView.call( this, model, sceneNodeOptions );

    this.addChild( new Workaround35( this.layoutBounds ) );
  }

  functionBuilder.register( 'NumbersScreenView', NumbersScreenView );

  return inherit( EquationsScreenView, NumbersScreenView );
} );