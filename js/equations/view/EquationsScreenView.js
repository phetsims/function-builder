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

    // @private
    this.model = model;
    this.sceneNodeOptions = sceneNodeOptions;
    this.initialized = false;

    ScreenView.call( this, { layoutBounds: FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS } );

    if ( !FBConstants.INITIALIZE_SCREEN_VIEWS_ON_DEMAND ) {
      this.initialize();
    }
  }

  functionBuilder.register( 'EquationsScreenView', EquationsScreenView );

  return inherit( ScreenView, EquationsScreenView, {

    /**
     * Called when the simulation clock ticks.
     *
     * @param {number} dt - clock time change, in seconds
     * @public
     */
    step: function( dt ) {
      if ( !this.initialized ) {
        this.initialize();
      }
    },

    /**
     * Deferred initialization, to improve startup time. Called from step.
     *
     * @private
     */
    initialize: function() {

      functionBuilder.log && functionBuilder.log( this.constructor.name + '.initialize' );

      assert && assert( !this.initialized );
      this.initialized = true;

      var model = this.model;

      // Scene
      var sceneNode = new EquationsSceneNode( model.scene, this.layoutBounds, this.sceneNodeOptions );

      // Resets this screen
      var resetAll = function() {

        // reset view before model, or odd things will happen
        sceneNode.reset();
        model.reset();
      };

      // Reset All button at bottom-right
      var resetAllButton = new ResetAllButton( {
        right: this.layoutBounds.maxX + FBConstants.RESET_ALL_BUTTON_OFFSET.x,
        bottom: this.layoutBounds.maxY + FBConstants.RESET_ALL_BUTTON_OFFSET.y,
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
  } );
} );