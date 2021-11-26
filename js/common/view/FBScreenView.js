// Copyright 2016-2021, University of Colorado Boulder

/**
 * Base type for all ScreenViews in this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import merge from '../../../../phet-core/js/merge.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import { Node } from '../../../../scenery/js/imports.js';
import Animation from '../../../../twixt/js/Animation.js';
import Easing from '../../../../twixt/js/Easing.js';
import functionBuilder from '../../functionBuilder.js';
import FBConstants from '../FBConstants.js';
import FBQueryParameters from '../FBQueryParameters.js';
import SceneRadioButtonGroup from './SceneRadioButtonGroup.js';

class FBScreenView extends ScreenView {

  /**
   * @param {FBModel} model
   * @param {constructor} SceneNodeConstructor - constructor for SceneNode subtype
   * @param {Object} [options]
   */
  constructor( model, SceneNodeConstructor, options ) {

    options = merge( {
      layoutBounds: FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS,
      sceneRadioButtonGroupYOffset: 20 // offset of SceneRadioButtonGroup from top of screen
    }, options );

    super( options );

    // If there's more than one scene, add a control for switching between scenes
    if ( model.scenes.length > 1 ) {
      const sceneRadioButtonGroup = new SceneRadioButtonGroup( model.selectedSceneProperty, model.scenes, {
        centerX: this.layoutBounds.centerX,
        top: this.layoutBounds.top + options.sceneRadioButtonGroupYOffset
      } );
      this.addChild( sceneRadioButtonGroup );
    }

    // Reset All button at bottom-right
    const resetAllButton = new ResetAllButton( {
      right: this.layoutBounds.maxX + FBConstants.RESET_ALL_BUTTON_OFFSET.x,
      bottom: this.layoutBounds.maxY + FBConstants.RESET_ALL_BUTTON_OFFSET.y,
      listener: () => {

        // cancel drags that may be in progress
        this.interruptSubtreeInput();

        // reset view before model, or we'll see animation that's not desired
        sceneNodes.forEach( sceneNode => {
          sceneNode && sceneNode.reset();
        } );
        model.reset();

        // move 1 of each card to the output carousel, for testing
        if ( FBQueryParameters.populateOutput ) {
          sceneNodes.forEach( sceneNode => {
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
    const sceneNodes = []; // {PatternsSceneNode[]}, with same order as scenes
    model.scenes.forEach( scene => {
      const sceneNode = new SceneNodeConstructor( scene, this.layoutBounds, { visible: false } );
      sceneNodes.push( sceneNode );
      scenesParent.addChild( sceneNode );
    } );

    /**
     * After the scene graph is fully constructed, populate parts of the model that
     * depend on the position of things in the view.
     */
    sceneNodes.forEach( sceneNode => {
      sceneNode && sceneNode.completeInitialization();
    } );

    // {Animation} Fade between scenes
    let newFadeIn = null;
    let oldFadeOut = null;

    // unlink unnecessary, instances exist for lifetime of the sim
    model.selectedSceneProperty.link( ( scene, oldScene ) => {

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

        oldFadeOut.endedEmitter.addListener( function endedListener() {

          oldFadeOut.endedEmitter.removeListener( endedListener );

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
}

functionBuilder.register( 'FBScreenView', FBScreenView );

export default FBScreenView;