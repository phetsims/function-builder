// Copyright 2015-2017, University of Colorado Boulder

/**
 * ScreenView for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const EquationsSceneNode = require( 'FUNCTION_BUILDER/equations/view/EquationsSceneNode' );
  const FBScreenView = require( 'FUNCTION_BUILDER/common/view/FBScreenView' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {EquationsModel} model
   * @param {Object} [options]
   * @constructor
   */
  function EquationsScreenView( model, options ) {
    FBScreenView.call( this, model, EquationsSceneNode, options );
  }

  functionBuilder.register( 'EquationsScreenView', EquationsScreenView );

  return inherit( FBScreenView, EquationsScreenView );
} );