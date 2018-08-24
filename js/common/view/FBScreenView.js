// Copyright 2018, University of Colorado Boulder

/**
 * Base type for all ScreenViews in this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Animation = require( 'TWIXT/Animation' );
  var Easing = require( 'TWIXT/Easing' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var SceneControl = require( 'FUNCTION_BUILDER/common/view/SceneControl' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {FBModel} model
   * @param {constructor} sceneNodeConstructor - constructor for SceneNode subtype
   * @param {Object} [options]
   * @constructor
   */
  function FBScreenView( model, sceneNodeConstructor, options ) {

    var self = this;

    options = _.extend( {
      layoutBounds: FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS,
      sceneControlYOffset: 20 // offset of scene control's top from top of screen
    }, options );

    ScreenView.call( this, options );

    // If there's more than one scene, add a control for switching between scenes
    if ( model.scenes.length > 1 ) {
      var sceneControl = new SceneControl( model.selectedSceneProperty, model.scenes, {
        centerX: this.layoutBounds.centerX,
        top: this.layoutBounds.top + options.sceneControlYOffset
      } );
      this.addChild( sceneControl );
    }

    // Reset All button at bottom-right
    var resetAllButton = new ResetAllButton( {
      right: this.layoutBounds.maxX + FBConstants.RESET_ALL_BUTTON_OFFSET.x,
      bottom: this.layoutBounds.maxY + FBConstants.RESET_ALL_BUTTON_OFFSET.y,
      listener: function() {

        // reset view before model, or we'll see animation that's not desired
        sceneNodes.forEach( function( sceneNode ) {
          sceneNode && sceneNode.reset();
        } );
        model.reset();

        // move 1 of each card to the output carousel, for testing
        if ( FBQueryParameters.populateOutput ) {
          sceneNodes.forEach( function( sceneNode ) {
            sceneNode && sceneNode.populateOutputCarousel();
          } );
        }
      }
    } );
    this.addChild( resetAllButton );

    // Parent for scenes
    var scenesParent = new Node();
    this.addChild( scenesParent );

    // Scene Nodes
    var sceneNodes = []; // {PatternsSceneNode[]}, with same order as scenes
    model.scenes.forEach( function( scene ) {
        var sceneNode = new sceneNodeConstructor( scene, self.layoutBounds, { visible: false } );
        sceneNodes.push( sceneNode );
        scenesParent.addChild( sceneNode );
    } );

    /**
     * After the scene graph is fully constructed, populate parts of the model that
     * depend on the location of things in the view.
     */
    sceneNodes.forEach( function( sceneNode ) {
      sceneNode && sceneNode.completeInitialization();
    } );

    // {Animation} Fade between scenes
    var newFadeIn = null;
    var oldFadeOut = null;

    // unlink unnecessary, instances exist for lifetime of the sim
    model.selectedSceneProperty.link( function( scene, oldScene ) {

      // Stop any animation that is in progress
      oldFadeOut && oldFadeOut.stop();
      newFadeIn && newFadeIn.stop();

      // Get the Node that corresponds to the old scene
      var oldSceneNode = oldScene ? sceneNodes[ model.scenes.indexOf( oldScene ) ] : null;

      // Get the Node that corresponds to the scene.
      var sceneIndex = model.scenes.indexOf( scene );
      assert && assert( sceneIndex !== -1 );
      var sceneNode = sceneNodes[ sceneIndex ];

      // Fade scenes in/out as selection changes
      if ( oldScene ) {

        // fade out the old scene
        oldFadeOut = new Animation( {
          stepper: 'timer', // animation is controlled by the global phet-core Timer
          duration: 0.5, // seconds
          easing: Easing.QUADRATIC_IN_OUT,
          setValue: function( value ) { oldSceneNode.opacity = value; },
          getValue: function() { return oldSceneNode.opacity; },
          from: oldSceneNode.opacity,
          to: 0
        } );

        oldFadeOut.finishEmitter.addListener( function finishListener() {

          oldFadeOut.finishEmitter.removeListener( finishListener );

          // fade in the new scene
          newFadeIn = new Animation( {
            stepper: 'timer', // animation is controlled by the global phet-core Timer
            duration: 0.5, // seconds
            easing: Easing.QUADRATIC_IN_OUT,
            setValue: function( value ) { sceneNode.opacity = value; },
            getValue: function() { return sceneNode.opacity; },
            from: sceneNode.opacity,
            to: 1
          } );

          oldSceneNode.visible = false;
          sceneNode.visible = true;
          newFadeIn.start();
        } );

        oldFadeOut.start();
      }
      else {

        // No animation for the initial selection
        sceneNode.visible = true;
      }
    } );
  }

  functionBuilder.register( 'FBScreenView', FBScreenView );

  return inherit( ScreenView, FBScreenView );
} );