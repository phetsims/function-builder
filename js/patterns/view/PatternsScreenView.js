// Copyright 2015-2016, University of Colorado Boulder

/**
 * ScreenView for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBScreenView = require( 'FUNCTION_BUILDER/common/view/FBScreenView' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PatternsSceneNode = require( 'FUNCTION_BUILDER/patterns/view/PatternsSceneNode' );

  /**
   * @param {PatternsModel} model
   * @param {Object} [options]
   * @constructor
   */
  function PatternsScreenView( model, options ) {
    FBScreenView.call( this, model, PatternsSceneNode, options );
  }

  functionBuilder.register( 'PatternsScreenView', PatternsScreenView );

  return inherit( FBScreenView, PatternsScreenView );
} );