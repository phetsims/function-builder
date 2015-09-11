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

    //TODO use a better pattern for creating scenes on demand, and switching between scenes
    var sceneNodes = {
      single: null,
      dual: null,
      composed: null
    };
    viewProperties.sceneNameProperty.link( function( sceneName, oldSceneName ) {

      // Create scenes on demand
      if ( !sceneNodes[ sceneName ] ) {

        var sceneOptions = {
          visible: false,
          center: thisView.layoutBounds.center
        };

        var scene;
        if ( sceneName === 'single' ) {
          scene = new SingleSceneNode( sceneOptions );
        }
        else if ( sceneName === 'dual' ) {
          scene = new DualSceneNode( sceneOptions );
        }
        else if ( sceneName === 'composed' ) {
          scene = new ComposedSceneNode( sceneOptions );
        }
        else {
          throw new Error( 'unsupported sceneName: ' + sceneName );
        }
        sceneNodes[ sceneName ] = scene;
        scenesParent.addChild( scene );

      }

      // Hide the previous scene
      if ( oldSceneName ) {
        sceneNodes[ oldSceneName ].visible = false;
      }

      // Show the selected scene
      sceneNodes[ sceneName ].visible = true;
    } );
  }

  return inherit( ScreenView, PatternsView, {

    step: function( dt ) {
      //TODO
    }
  } );
} );