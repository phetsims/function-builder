// Copyright 2016, University of Colorado Boulder

/**
 * Base type for ScreenViews that involve math functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathSceneNode = require( 'FUNCTION_BUILDER/common/view/MathSceneNode' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {*} model
   * @param {Object} [sceneOptions]
   * @constructor
   */
  function MathScreenView( model, sceneOptions ) {

    var thisView = this;
    ScreenView.call( this, { layoutBounds: FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS } );

    // Scene
    var sceneNode = new MathSceneNode( model.scene, thisView.layoutBounds, sceneOptions );

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

  functionBuilder.register( 'MathScreenView', MathScreenView );

  return inherit( ScreenView, MathScreenView );
} );