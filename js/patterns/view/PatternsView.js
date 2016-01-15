// Copyright 2015-2016, University of Colorado Boulder

/**
 * View for the 'Patterns' screen.
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
  var OpacityTo = require( 'FUNCTION_BUILDER/common/view/OpacityTo' );
  var PatternsSceneControl = require( 'FUNCTION_BUILDER/patterns/view/PatternsSceneControl' );
  var PatternsSceneNode = require( 'FUNCTION_BUILDER/patterns/view/PatternsSceneNode' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {PatternsModel} model
   * @constructor
   */
  function PatternsView( model ) {

    var thisView = this;
    ScreenView.call( this, FBConstants.SCREEN_VIEW_OPTIONS );

    // Control for switching between scenes
    var sceneControl = new PatternsSceneControl( model.selectedSceneProperty, model.scenes, {
      centerX: this.layoutBounds.centerX,
      top: this.layoutBounds.top + 20
    } );
    this.addChild( sceneControl );

    // Scene nodes will be created on demand
    var sceneNodes = [];
    model.scenes.forEach( function( scene ) {
      sceneNodes.push( null );
    } );

    // Parent for all scenes, to maintain rendering order, since scenes are created on demand.
    var scenesParent = new Node();
    this.addChild( scenesParent );

    // For stopping animations that are in progress.
    var newFadeIn;
    var oldFadeOut;

    // Make the selected scene visible, create it if necessary
    model.selectedSceneProperty.link( function( scene, oldScene ) {

      // Stop any animation that is in progress
      oldFadeOut && oldFadeOut.stop();
      newFadeIn && newFadeIn.stop();

      // Get the node that corresponds to the old scene
      var oldSceneNode = oldScene ? sceneNodes[ model.scenes.indexOf( oldScene ) ] : null;

      // Get the node that corresponds to the scene, create on demand
      var sceneIndex = model.scenes.indexOf( scene );
      var sceneNode = sceneNodes[ sceneIndex ];
      if ( !sceneNode ) {
        sceneNode = new PatternsSceneNode( scene, thisView.layoutBounds, { visible: false } );
        scenesParent.addChild( sceneNode );
        sceneNodes[ sceneIndex ] = sceneNode;
      }

      //TODO prevent interaction with the scenes while animation is taking place?
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

    // Resets this screen
    var resetAll = function() {

      model.reset();

      // Reset any scene nodes that have been instantiated
      sceneNodes.forEach( function( sceneNode ) {
         if ( sceneNode ) {
           sceneNode.reset();
         }
      } );
    };

    // Reset All button at bottom-right
    var resetAllButton = new ResetAllButton( {
      right: this.layoutBounds.maxX - 20,
      bottom: this.layoutBounds.maxY - 20,
      listener: resetAll
    } );
    this.addChild( resetAllButton );
  }

  functionBuilder.register( 'PatternsView', PatternsView );

  return inherit( ScreenView, PatternsView );
} );