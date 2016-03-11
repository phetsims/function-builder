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
    ScreenView.call( this, { layoutBounds: FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS } );

    // Parent for scenes
    var scenesParent = new Node();

    // Scene Nodes
    var sceneNodes = []; // {PatternsSceneNode[]}, with same order as scenes
    model.scenes.forEach( function( scene ) {// create the scene Node
      var sceneNode = new PatternsSceneNode( scene, thisView.layoutBounds );
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

      // model
      model.reset();

      // view
      sceneNodes.forEach( function( sceneNode ) {
        sceneNode.reset();
      } );
    };

    // Reset All button at bottom-right
    var resetAllButton = new ResetAllButton( {
      right: this.layoutBounds.maxX - 20,
      bottom: this.layoutBounds.maxY - 20,
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
    model.selectedSceneProperty.link( function( scene, oldScene ) {

      // Stop any animation that is in progress
      oldFadeOut && oldFadeOut.stop();
      newFadeIn && newFadeIn.stop();

      // Get the Node that corresponds to the old scene
      var oldSceneNode = oldScene ? sceneNodes[ model.scenes.indexOf( oldScene ) ] : null;

      // Get the Node that corresponds to the scene, create it on demand
      var sceneIndex = model.scenes.indexOf( scene );
      var sceneNode = sceneNodes[ sceneIndex ];

      //TODO prevent interaction with sceneNode and oldSceneNode while animation is taking place?
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

  functionBuilder.register( 'PatternsView', PatternsView );

  return inherit( ScreenView, PatternsView );
} );