// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Carousel = require( 'FUNCTION_BUILDER/common/view/Carousel' );
  var ComposedSceneNode = require( 'FUNCTION_BUILDER/patterns/view/ComposedSceneNode' );
  var DualSceneNode = require( 'FUNCTION_BUILDER/patterns/view/DualSceneNode' );
  var FadeIn = require( 'FUNCTION_BUILDER/common/view/FadeIn' );
  var FadeOut = require( 'FUNCTION_BUILDER/common/view/FadeOut' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PatternsSceneControl = require( 'FUNCTION_BUILDER/patterns/view/PatternsSceneControl' );
  var PatternsViewProperties = require( 'FUNCTION_BUILDER/patterns/view/PatternsViewProperties' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
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

    var viewProperties = new PatternsViewProperties();

    var sceneControl = new PatternsSceneControl( viewProperties.sceneNameProperty, {
      centerX: this.layoutBounds.centerX,
      top: this.layoutBounds.top + 20
    } );
    this.addChild( sceneControl );

    // Parent for all scenes, to maintain rendering order, since scenes are created on demand.
    var scenesParent = new Node();
    this.addChild( scenesParent );

    // Reset All button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
        viewProperties.reset();
      },
      right: this.layoutBounds.maxX - 20,
      bottom: this.layoutBounds.maxY - 20
    } );
    this.addChild( resetAllButton );

    // Scenes are created on demand, stored here as they are created, field names match values of viewProperties.sceneNameProperty
    var sceneNodes = {
      single: null,
      dual: null,
      composed: null
    };

    // For stopping animations that are in progress.
    var newFadeIn, oldFadeOut;

    // Make the selected scene visible, create it if necessary
    viewProperties.sceneNameProperty.link( function( sceneName, oldSceneName ) {

      // Stop any animation that is in progress
      oldFadeOut && oldFadeOut.stop();
      newFadeIn && newFadeIn.stop();

      // Create scenes on demand
      var sceneNode = sceneNodes[ sceneName ];
      if ( !sceneNode ) {

        var sceneOptions = {
          visible: false,
          center: thisView.layoutBounds.center, //TODO temporary
          cursor: 'pointer' //TODO temporary
        };

        if ( sceneName === 'single' ) {
          sceneNode = new SingleSceneNode( sceneOptions );
        }
        else if ( sceneName === 'dual' ) {
          sceneNode = new DualSceneNode( sceneOptions );
        }
        else if ( sceneName === 'composed' ) {
          sceneNode = new ComposedSceneNode( sceneOptions );
        }
        else {
          throw new Error( 'unsupported sceneName: ' + sceneName );
        }
        sceneNodes[ sceneName ] = sceneNode;
        scenesParent.addChild( sceneNode );
      }

      // Fade scenes in/out as selection changes
      if ( oldSceneName ) {

        var oldSceneNode = sceneNodes[ oldSceneName ];

        // prevent interaction with the scenes while animation is taking place
        oldSceneNode.pickable = sceneNode.pickable = false;

        // fades in the new scene
        newFadeIn = new FadeIn( sceneNode, {
          onComplete: function() {
            sceneNode.pickable = true; // allow interaction with the scene when the animation has completed
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

    //XXX Carousel testing
    var colors = [ 'red', 'blue', 'green', 'yellow', 'pink', 'white', 'orange', 'magenta', 'purple', 'pink' ];
    var items = [];
    colors.forEach( function( color ) {
      items.push( new Rectangle( 0, 0, 60, 60, { fill: color, stroke: 'black' } ) );
    } );
    var carousel = new Carousel( items, {
      orientation: 'horizontal',
      left: this.layoutBounds.left + 20,
      bottom: this.layoutBounds.bottom - 20
    } );
    this.addChild( carousel );
  }

  return inherit( ScreenView, PatternsView, {

    step: function( dt ) {
      //TODO
    }
  } );
} );