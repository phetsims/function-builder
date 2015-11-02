// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ComposedSceneNode = require( 'FUNCTION_BUILDER/patterns/view/ComposedSceneNode' );
  var DualSceneNode = require( 'FUNCTION_BUILDER/patterns/view/DualSceneNode' );
  var FadeIn = require( 'FUNCTION_BUILDER/common/view/FadeIn' );
  var FadeOut = require( 'FUNCTION_BUILDER/common/view/FadeOut' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PatternsSceneControl = require( 'FUNCTION_BUILDER/patterns/view/PatternsSceneControl' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SingleSceneNode = require( 'FUNCTION_BUILDER/patterns/view/SingleSceneNode' );

  /**
   * @param {PatternsModel} model
   * @constructor
   */
  function PatternsView( model ) {

    var thisView = this;
    ScreenView.call( this, FBConstants.SCREEN_VIEW_OPTIONS );

    // Control for switching between scenes
    var sceneControl = new PatternsSceneControl( model.selectedSceneProperty,
      model.singleScene, model.dualScene, model.composedScene, {
        centerX: this.layoutBounds.centerX,
        top: this.layoutBounds.top + 20
      } );
    this.addChild( sceneControl );

    // Parent for all scenes, to maintain rendering order, since scenes are created on demand.
    var scenesParent = new Node();
    this.addChild( scenesParent );

    // Scenes are created on demand
    var singleSceneNode = null;
    var dualSceneNode = null;
    var composedSceneNode = null;

    // For stopping animations that are in progress.
    var newFadeIn;
    var oldFadeOut;

    // Make the selected scene visible, create it if necessary
    model.selectedSceneProperty.link( function( scene, oldScene ) {

      // Stop any animation that is in progress
      oldFadeOut && oldFadeOut.stop();
      newFadeIn && newFadeIn.stop();

      // Get the node that corresponds to the old scene
      var oldSceneNode = null;
      if ( oldScene ) {
        if ( oldScene === model.singleScene ) {
          oldSceneNode = singleSceneNode;
        }
        else if ( oldScene === model.dualScene ) {
          oldSceneNode = dualSceneNode;
        }
        else if ( oldScene === model.composedScene ) {
          oldSceneNode = composedSceneNode;
        }
        assert && assert( oldScene );
      }

      // Get the node that corresponds to the scene
      var sceneNode = null;
      var sceneOptions = { visible: false };
      if ( scene === model.singleScene ) {
        if ( !singleSceneNode ) {
          // Create scene on demand
          singleSceneNode = new SingleSceneNode( model.singleScene, thisView.layoutBounds, sceneOptions );
          scenesParent.addChild( singleSceneNode );
        }
        sceneNode = singleSceneNode;
      }
      else if ( scene === model.dualScene ) {
        if ( !dualSceneNode ) {
          // Create scene on demand
          dualSceneNode = new DualSceneNode( model.dualScene, thisView.layoutBounds, sceneOptions );
          scenesParent.addChild( dualSceneNode );
        }
        sceneNode = dualSceneNode;
      }
      else if ( scene === model.composedScene ) {
        if ( !composedSceneNode ) {
          // Create scene on demand
          composedSceneNode = new ComposedSceneNode( model.composedScene, thisView.layoutBounds, sceneOptions );
          scenesParent.addChild( composedSceneNode );
        }
        sceneNode = composedSceneNode;
      }
      assert && assert( sceneNode );

      // Fade scenes in/out as selection changes
      if ( oldScene ) {

        // prevent interaction with the scenes while animation is taking place
        //TODO fix this
        //oldSceneNode.pickable = sceneNode.pickable = false;

        // fades in the new scene
        newFadeIn = new FadeIn( sceneNode, {
          onComplete: function() {
            //TODO fix this
            //sceneNode.pickable = true; // allow interaction with the scene when the animation has completed
          }
        } );

        // fades out the old scene
        oldFadeOut = new FadeOut( oldSceneNode, {
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

    // Resets this screen
    var resetAll = function() {

      // Reset model and view
      model.reset();

      // Reset any scenes that have been instantiated
      singleSceneNode && singleSceneNode.reset();
      dualSceneNode && dualSceneNode.reset();
      composedSceneNode && composedSceneNode.reset();
    };

    // Reset All button at bottom-right
    var resetAllButton = new ResetAllButton( {
      right: this.layoutBounds.maxX - 20,
      bottom: this.layoutBounds.maxY - 20,
      listener: resetAll
    } );
    this.addChild( resetAllButton );
  }

  return inherit( ScreenView, PatternsView, {

    // @public
    step: function( dt ) {
      //TODO
    }
  } );
} );