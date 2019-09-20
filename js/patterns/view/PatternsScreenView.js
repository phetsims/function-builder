// Copyright 2015-2019, University of Colorado Boulder

/**
 * ScreenView for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBScreenView = require( 'FUNCTION_BUILDER/common/view/FBScreenView' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const PatternsSceneNode = require( 'FUNCTION_BUILDER/patterns/view/PatternsSceneNode' );

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