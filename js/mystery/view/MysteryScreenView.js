// Copyright 2016-2019, University of Colorado Boulder

/**
 * ScreenView for the 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBScreenView = require( 'FUNCTION_BUILDER/common/view/FBScreenView' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MysterySceneNode = require( 'FUNCTION_BUILDER/mystery/view/MysterySceneNode' );

  /**
   * @param {MysteryModel} model
   * @param {Object} [options]
   * @constructor
   */
  function MysteryScreenView( model, options ) {

    options = _.extend( {
      sceneControlYOffset: 535 // offset of scene control's top from top of screen
    }, options );

    FBScreenView.call( this, model, MysterySceneNode, options );
  }

  functionBuilder.register( 'MysteryScreenView', MysteryScreenView );

  return inherit( FBScreenView, MysteryScreenView );
} );