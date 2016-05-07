// Copyright 2016, University of Colorado Boulder

/**
 * ScreenView for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathScreenView = require( 'FUNCTION_BUILDER/common/view/MathScreenView' );

  /**
   * @param {EquationsModel} model
   * @constructor
   */
  function EquationsScreenView( model ) {

    var sceneOptions = {
      cardCarouselDefaultPageNumber: 1,
      functionsPerPage: 2,
      operandMutable: true, // functions have pickers for editing operand
      hasGraph: true // this scene has a graph
    };

    MathScreenView.call( this, model, sceneOptions );
  }

  functionBuilder.register( 'EquationsScreenView', EquationsScreenView );

  return inherit( MathScreenView, EquationsScreenView );
} );