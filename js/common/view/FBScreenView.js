// Copyright 2016-2019, University of Colorado Boulder

/**
 * Base type for all ScreenViews in this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Animation = require( 'TWIXT/Animation' );
  const Easing = require( 'TWIXT/Easing' );
  const FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  const FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const SceneControl = require( 'FUNCTION_BUILDER/common/view/SceneControl' );
  const ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {FBModel} model
   * @param {constructor} sceneNodeConstructor - constructor for SceneNode subtype
   * @param {Object} [options]
   * @constructor
   */
  function FBScreenView( model, sceneNodeConstructor, options ) {

    const self = this;

    options = _.extend( {
      layoutBounds: FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS,
      sceneControlYOffset: 20 // offset of scene control's top from top of screen
    }, options );

    ScreenView.call( this, options );

    // If there's more than one scene, add a control for switching between scenes
    if ( model.scenes.length > 1 ) {
      const sceneControl = new SceneControl( model.selectedSceneProperty, model.scenes, {
        centerX: this.layoutBounds.centerX,
        top: this.layoutBounds.top + options.sceneControlYOffset
      } );
      this.addChild( sceneControl );
    }

    // Reset All button at bottom-right
    const resetAllButton = new ResetAllButton( {
      right: this.layoutBounds.maxX + FBConstants.RESET_ALL_BUTTON_OFFSET.x,
      bottom: this.layoutBounds.maxY + FBConstants.RESET_ALL_BUTTON_OFFSET.y,
      listener: function() {

        // cancel drags that may be in progress
        self.interruptSubtreeInput();

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
    const scenesParent = new Node();
    this.addChild( scenesParent );

    // Scene Nodes
    var sceneNodes = []; // {PatternsSceneNode[]}, with same order as scenes
    model.scenes.forEach( function( scene ) {
        const sceneNode = new sceneNodeConstructor( scene, self.layoutBounds, { visible: false } );
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
    let newFadeIn = null;
    let oldFadeOut = null;

    // unlink unnecessary, instances exist for lifetime of the sim
    model.selectedSceneProperty.link( function( scene, oldScene ) {

      // Stop any animation that is in progress
      oldFadeOut && oldFadeOut.stop();
      newFadeIn && newFadeIn.stop();

      // Get the Node that corresponds to the old scene
      const oldSceneNode = oldScene ? sceneNodes[ model.scenes.indexOf( oldScene ) ] : null;

      // Get the Node that corresponds to the scene.
      const sceneIndex = model.scenes.indexOf( scene );
      assert && assert( sceneIndex !== -1 );
      const sceneNode = sceneNodes[ sceneIndex ];

      // Fade scenes in/out as selection changes
      if ( oldScene ) {

        // fade out the old scene
        oldFadeOut = new Animation( {
          duration: 0.5, // seconds
          easing: Easing.QUADRATIC_IN_OUT,
          object: oldSceneNode,
          attribute: 'opacity',
          from: oldSceneNode.opacity,
          to: 0
        } );

        oldFadeOut.finishEmitter.addListener( function finishListener() {

          oldFadeOut.finishEmitter.removeListener( finishListener );

          // fade in the new scene
          newFadeIn = new Animation( {
            duration: 0.5, // seconds
            easing: Easing.QUADRATIC_IN_OUT,
            object: sceneNode,
            attribute: 'opacity',
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