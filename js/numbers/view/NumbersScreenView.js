// Copyright 2016, University of Colorado Boulder

/**
 * ScreenView for the 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathScreenView = require( 'FUNCTION_BUILDER/common/view/MathScreenView' );

  // strings
  var inputString = require( 'string!FUNCTION_BUILDER/input' );
  var outputString = require( 'string!FUNCTION_BUILDER/output' );

  /**
   * @param {NumbersModel} model
   * @constructor
   */
  function NumbersScreenView( model ) {

    var sceneOptions = {
      cardCarouselDefaultPageNumber: 1,
      operandMutable: false, // function operands are not editable
      hasGraph: false, // no graph in this scene
      xSymbol: inputString,
      ySymbol: outputString
    };

    MathScreenView.call( this, model, sceneOptions );
  }

  functionBuilder.register( 'NumbersScreenView', NumbersScreenView );

  return inherit( MathScreenView, NumbersScreenView );
} );