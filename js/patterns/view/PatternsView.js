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
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PatternsSceneControl = require( 'FUNCTION_BUILDER/patterns/view/PatternsSceneControl' );
  var PatternsViewProperties = require( 'FUNCTION_BUILDER/patterns/view/PatternsViewProperties' );
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
      right: this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10
    } );
    this.addChild( resetAllButton );

    // Scenes are created on demand, stored here as they are created, field names match values of viewProperties.sceneNameProperty
    var sceneNodes = {
      single: null,
      dual: null,
      composed: null
    };

    // Make the selected scene visible, create it if necessary
    viewProperties.sceneNameProperty.link( function( sceneName, oldSceneName ) {

      sceneControl.pickable = false; // so we don't select a scene while animation is in progress

      // Create scenes on demand
      var sceneNode = sceneNodes[ sceneName ];
      if ( !sceneNode ) {

        var sceneOptions = {
          visible: false,
          center: thisView.layoutBounds.center
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

        // fade out the old scene
        var oldSceneNode = sceneNodes[ oldSceneName ];
        var tweenOldParameters = { opacity: 1 };
        var tweenOldOpacity = new TWEEN.Tween( tweenOldParameters )
          .to( { opacity: 0 }, 500 )
          .onUpdate( function() {
            oldSceneNode.opacity = tweenOldParameters.opacity;
            oldSceneNode.visible = ( oldSceneNode.opacity > 0 );
          } );

        // fade in the new scene
        var tweenNewParameters = { opacity: 0 };
        var tweenNewOpacity = new TWEEN.Tween( tweenNewParameters )
          .onStart( function() {
            sceneNode.opacity = 0;
            sceneNode.visible = true;
          } )
          .to( { opacity: 1 }, 500 )
          .onUpdate( function() {
            sceneNode.opacity = tweenNewParameters.opacity;
          } )
          .onComplete( function() {
            sceneControl.pickable = true;
          } );

        // start by fading out the old scene
        tweenOldOpacity.onComplete( function() {
          tweenNewOpacity.start();
        } );
        tweenOldOpacity.start();
      }
      else {
        // No animation for the initial selection
        sceneNode.visible = true;
        sceneControl.pickable = true;
      }
    } );
  }

  return inherit( ScreenView, PatternsView, {

    step: function( dt ) {
      //TODO
    }
  } );
} );