// Copyright 2015-2016, University of Colorado Boulder

/**
 * ScreenView for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var OpacityTo = require( 'TWIXT/OpacityTo' );
  var PatternsSceneControl = require( 'FUNCTION_BUILDER/patterns/view/PatternsSceneControl' );
  var PatternsSceneNode = require( 'FUNCTION_BUILDER/patterns/view/PatternsSceneNode' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {PatternsModel} model
   * @constructor
   */
  function PatternsScreenView( model ) {

    // @private
    this.model = model;
    this.initialized = false;

    ScreenView.call( this, { layoutBounds: FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS } );

    if ( FBConstants.INIT_SCREEN_VIEWS_ON_START ) {
      this.initialize();
    }
  }

  functionBuilder.register( 'PatternsScreenView', PatternsScreenView );

  return inherit( ScreenView, PatternsScreenView, {

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
      var layoutBounds = this.layoutBounds;

      // Parent for scenes
      var scenesParent = new Node();

      // Scene Nodes
      var sceneNodes = []; // {PatternsSceneNode[]}, with same order as scenes
      model.scenes.forEach( function( scene ) {// create the scene Node
        var sceneNode = new PatternsSceneNode( scene, layoutBounds );
        sceneNodes.push( sceneNode );
        scenesParent.addChild( sceneNode );
      } );

      // Control for switching between scenes
      var sceneControl = new PatternsSceneControl( model.selectedSceneProperty, model.scenes, {
        centerX: this.layoutBounds.centerX,
        top: this.layoutBounds.top + 20
      } );

      // Resets this screen
      var resetAll = function() {

        // reset view before model, or odd things will happen
        for ( var sceneIndex = 0; sceneIndex < sceneNodes.length; sceneIndex++ ) {
          sceneNodes[ sceneIndex ].reset();
        }
        model.reset();
      };

      // Reset All button at bottom-right
      var resetAllButton = new ResetAllButton( {
        right: this.layoutBounds.maxX + FBConstants.RESET_ALL_BUTTON_OFFSET.x,
        bottom: this.layoutBounds.maxY + FBConstants.RESET_ALL_BUTTON_OFFSET.y,
        listener: resetAll
      } );

      // rendering order
      this.addChild( sceneControl );
      this.addChild( resetAllButton );
      this.addChild( scenesParent );

      /**
       * After the scene graph is fully constructed, populate parts of the model that
       * depend on the location of things in the view.
       */
      sceneNodes.forEach( function( sceneNode ) {
        sceneNode.populateCarousels();
        sceneNode.visible = false;
      } );

      // Fade between scenes
      var newFadeIn; // {OpacityTo}
      var oldFadeOut; // {OpacityTo}

      // unlink unnecessary, instances exist for lifetime of the sim
      model.selectedSceneProperty.link( function( scene, oldScene ) {

        // Stop any animation that is in progress
        oldFadeOut && oldFadeOut.stop();
        newFadeIn && newFadeIn.stop();

        // Get the Node that corresponds to the old scene
        var oldSceneNode = oldScene ? sceneNodes[ model.scenes.indexOf( oldScene ) ] : null;

        // Get the Node that corresponds to the scene, create it on demand
        var sceneIndex = model.scenes.indexOf( scene );
        var sceneNode = sceneNodes[ sceneIndex ];

        // Fade scenes in/out as selection changes
        if ( oldScene ) {

          // fades in the new scene
          newFadeIn = new OpacityTo( sceneNode, {
            endOpacity: 1
          } );

          // fades out the old scene
          oldFadeOut = new OpacityTo( oldSceneNode, {
            endOpacity: 0,
            onComplete: function() {
              oldSceneNode.visible = false;
              newFadeIn.start();
            },
            onStop: function() {
              oldSceneNode.visible = false;
            }
          } );

          oldFadeOut.start();
        }
        else {
          // No animation for the initial selection
          sceneNode.visible = true;
        }
      } );
    }
  } );
} );