// Copyright 2015-2019, University of Colorado Boulder

/**
 * ScreenView for the 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBScreenView = require( 'FUNCTION_BUILDER/common/view/FBScreenView' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const NumbersSceneNode = require( 'FUNCTION_BUILDER/numbers/view/NumbersSceneNode' );

  /**
   * @param {NumbersModel} model
   * @param {Object} [options]
   * @constructor
   */
  function NumbersScreenView( model, options ) {
    FBScreenView.call( this, model, NumbersSceneNode, options );
  }

  functionBuilder.register( 'NumbersScreenView', NumbersScreenView );

  return inherit( FBScreenView, NumbersScreenView );
} );