// Copyright 2016, University of Colorado Boulder

/**
 * ScreenView for the 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBScreenView = require( 'FUNCTION_BUILDER/common/view/FBScreenView' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MysterySceneNode = require( 'FUNCTION_BUILDER/mystery/view/MysterySceneNode' );

  /**
   * @param {MysteryModel} model
   * @param {Object} [options]
   * @constructor
   */
  function MysteryScreenView( model, options ) {

    options = _.extend({
      sceneControlYOffset: 515 // offset of scene control from top of screen
    },options);

    FBScreenView.call( this, model, options );
  }

  functionBuilder.register( 'MysteryScreenView', MysteryScreenView );

  return inherit( FBScreenView, MysteryScreenView, {

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
      return new MysterySceneNode( scene, layoutBounds, options );
    }
  } );
} );