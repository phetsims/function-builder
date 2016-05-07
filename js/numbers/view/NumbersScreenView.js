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
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  // strings
  var inputString = require( 'string!FUNCTION_BUILDER/input' );
  var outputString = require( 'string!FUNCTION_BUILDER/output' );

  /**
   * @param {NumbersModel} model
   * @constructor
   */
  function NumbersScreenView( model ) {

    // modifications to Equations screen
    var sceneOptions = {
      cardCarouselDefaultPageNumber: 1,
      functionsPerPage: 3,
      operandMutable: false, // function operands are not editable
      hasGraph: false, // no graph in this scene
      xSymbol: inputString, // symbol used in place of x
      ySymbol: outputString // symbol used in place of y
    };

    EquationsScreenView.call( this, model, sceneOptions );
  }

  functionBuilder.register( 'NumbersScreenView', NumbersScreenView );

  return inherit( EquationsScreenView, NumbersScreenView );
} );