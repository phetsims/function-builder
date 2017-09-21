// Copyright 2015-2016, University of Colorado Boulder

/**
 * ScreenView for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EquationsSceneNode = require( 'FUNCTION_BUILDER/equations/view/EquationsSceneNode' );
  var FBScreenView = require( 'FUNCTION_BUILDER/common/view/FBScreenView' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

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