// Copyright 2016, University of Colorado Boulder

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
    FBScreenView.call( this, model, options );
  }

  functionBuilder.register( 'EquationsScreenView', EquationsScreenView );

  return inherit( FBScreenView, EquationsScreenView, {

    /**
     * Creates the node for a scene.
     *
     * @param {Scene} scene
     * @param {Bounds2} layoutBounds
     * @param {Object} options - options to SceneNode constructor
     * @returns {SceneNode}
     * @protected
     */
    createSceneNode: function( scene, layoutBounds, options ) {
      return new EquationsSceneNode( scene, layoutBounds, options );
    }
  } );
} );