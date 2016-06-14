// Copyright 2016, University of Colorado Boulder

/**
 * ScreenView for the 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MysterySceneNode = require( 'FUNCTION_BUILDER/mystery/view/MysterySceneNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var OpacityTo = require( 'TWIXT/OpacityTo' );
  var RefreshButton = require( 'SCENERY_PHET/buttons/RefreshButton' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var SceneControl = require( 'FUNCTION_BUILDER/common/view/SceneControl' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {NumbersModel} model
   * @constructor
   */
  function MysteryScreenView( model ) {

    // @private
    this.model = model;
    this.initialized = false;

    ScreenView.call( this, { layoutBounds: FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS } );

    if ( FBConstants.INIT_SCREEN_VIEWS_ON_START ) {
      this.initialize();
    }
  }

  functionBuilder.register( 'MysteryScreenView', MysteryScreenView );

  return inherit( ScreenView, MysteryScreenView, {

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

    //TOD almost identical to PatternsScreenView.initialize
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
      model.scenes.forEach( function( scene ) {
        if ( FBConstants.INIT_SCENES_ON_START ) {

          // create scene node on start
          var sceneNode = new MysterySceneNode( scene, layoutBounds, { visible: false } );
          sceneNodes.push( sceneNode );
          scenesParent.addChild( sceneNode );
          sceneNode.functionCarousel.visible = false; //TODO temporary
          sceneNode.functionPageControl.visible = false; //TODO temporary
          sceneNode.hideFunctionsCheckBox.visible = false; //TODO temporary
          sceneNode.seeInsideCheckBox.enabled = false; //TODO temporary
        }
        else {

          // scene node will be created on demand
          sceneNodes.push( null );
        }
      } );

      // Control for switching between scenes
      var sceneControl = new SceneControl( model.selectedSceneProperty, model.scenes, {
        centerX: this.layoutBounds.centerX,
        bottom: this.layoutBounds.bottom - 30
      } );

      // Button for generating a new challenge
      var generateButton = new RefreshButton( {
        listener: function() {

          // erase output carousel for selected scene
          var sceneIndex = model.scenes.indexOf( model.selectedSceneProperty.get() );
          var sceneNode = sceneNodes[ sceneIndex ];
          sceneNode.erase();

          console.log( 'clear functions from builder' ); //TODO
          console.log( 'randomly select challenge' ); //TODO
          console.log( 'put functions into builder' ); //TODO
        },
        iconWidth: 34,
        xMargin: 16,
        yMargin: 8,
        centerX: sceneControl.centerX,
        top: this.layoutBounds.centerY + 50
      } );

      // Resets this screen
      var resetAll = function() {

        // reset view before model, or we'll see animation that's not desired
        sceneNodes.forEach( function( sceneNode ) {
          sceneNode && sceneNode.reset();
        } );
        model.reset();
      };

      // Reset All button at bottom-right
      var resetAllButton = new ResetAllButton( {
        right: this.layoutBounds.maxX + FBConstants.RESET_ALL_BUTTON_OFFSET.x,
        bottom: this.layoutBounds.maxY + FBConstants.RESET_ALL_BUTTON_OFFSET.y,
        listener: resetAll
      } );

      // rendering order
      this.addChild( scenesParent );
      this.addChild( sceneControl );
      this.addChild( generateButton );
      this.addChild( resetAllButton );

      /**
       * After the scene graph is fully constructed, populate parts of the model that
       * depend on the location of things in the view.
       */
      sceneNodes.forEach( function( sceneNode ) {
        sceneNode && sceneNode.populateCarousels();
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

        // Get the Node that corresponds to the scene, or create it on demand
        var sceneIndex = model.scenes.indexOf( scene );
        var sceneNode = sceneNodes[ sceneIndex ];
        if ( !sceneNode ) {
          sceneNode = new MysterySceneNode( scene, layoutBounds, { visible: false } );
          sceneNodes[ sceneIndex ] = sceneNode;
          scenesParent.addChild( sceneNode );
          sceneNode.populateCarousels(); // after adding to scene graph!
          sceneNode.functionCarousel.visible = false; //TODO temporary
          sceneNode.functionPageControl.visible = false; //TODO temporary
          sceneNode.hideFunctionsCheckBox.visible = false; //TODO temporary
          sceneNode.seeInsideCheckBox.enabled = false; //TODO temporary
        }

        // Fade scenes in/out as selection changes
        if ( oldScene ) {

          // fades in the new scene
          newFadeIn = new OpacityTo( sceneNode, {
            startOpacity: 0,
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