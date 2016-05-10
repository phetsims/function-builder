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
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {*} model - model type is determined by client
   * @param {Object} [sceneNodeOptions] - see EquationsSceneNode options
   * @constructor
   */
  function EquationsScreenView( model, sceneNodeOptions ) {

    // model duck typing
    assert && assert( !!model.scene, 'model must have a scene' );
    assert && assert( !!model.reset, 'model must have a reset function' );

    ScreenView.call( this, { layoutBounds: FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS } );

    // Scene
    var sceneNode = new EquationsSceneNode( model.scene, this.layoutBounds, sceneNodeOptions );

    // Resets this screen
    var resetAll = function() {
      model.reset();
      sceneNode.reset();
    };

    // Reset All button at bottom-right
    var resetAllButton = new ResetAllButton( {
      right: this.layoutBounds.maxX - 20,
      bottom: this.layoutBounds.maxY - 20,
      listener: resetAll
    } );

    // rendering order
    this.addChild( resetAllButton );
    this.addChild( sceneNode );

    /**
     * After the scene graph is fully constructed, populate parts of the model that
     * depend on the location of things in the view.
     */
    sceneNode.populateCarousels();
  }

  functionBuilder.register( 'EquationsScreenView', EquationsScreenView );

  return inherit( ScreenView, EquationsScreenView );
} );