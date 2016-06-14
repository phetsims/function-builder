// Copyright 2016, University of Colorado Boulder

/**
 * Abstract base type for all ScreenViews in this sim.
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
  var OpacityTo = require( 'TWIXT/OpacityTo' );
  var SceneControl = require( 'FUNCTION_BUILDER/common/view/SceneControl' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {*} model - model, type determined by subtype
   * @param {Object} [options]
   * @constructor
   */
  function FBScreenView( model, options ) {

    options = _.extend( {
      layoutBounds: FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS,
      sceneControlYOffset: 20 // offset of scene control from top of screen
    }, options );

    // @private
    this.model = model;
    this.sceneControlYOffset = options.sceneControlYOffset;
    this.initialized = false;

    ScreenView.call( this, options );

    if ( FBConstants.INIT_SCREEN_VIEWS_ON_START ) {
      this.initialize();
    }
  }

  functionBuilder.register( 'FBScreenView', FBScreenView );

  return inherit( ScreenView, FBScreenView, {

    /**
     * Creates the node for a scene.
     *
     * @param {Scene} scene
     * @param {Bounds2} layoutBounds
     * @param {Object} options - options to SceneNode constructor
     * @returns {SceneNode}
     * @protected
     * @abstract
     */
    createSceneNode: function( scene, layoutBounds, options ) {
      throw new Error( 'must be implemented by subtype' );
    },

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

    /**
     * Deferred initialization, to improve startup time. Called from step.
     *
     * @private
     */
    initialize: function() {

      assert && assert( !this.initialized );
      this.initialized = true;
      functionBuilder.log && functionBuilder.log( this.constructor.name + '.initialize' );

      var thisNode = this;
      var model = this.model;
      var layoutBounds = this.layoutBounds;

      // If there's more than one scene, add a control for switching between scenes
      if ( model.scenes.length > 1 ) {
        var sceneControl = new SceneControl( model.selectedSceneProperty, model.scenes, {
          centerX: this.layoutBounds.centerX,
          top: this.layoutBounds.top + this.sceneControlYOffset
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
        }
      } );
      this.addChild( resetAllButton );

      // Parent for scenes
      var scenesParent = new Node();
      this.addChild( scenesParent );

      // Scene Nodes
      var sceneNodes = []; // {PatternsSceneNode[]}, with same order as scenes
      model.scenes.forEach( function( scene ) {
        if ( FBConstants.INIT_SCENES_ON_START ) {

          // create scene node on start
          var sceneNode = thisNode.createSceneNode( scene, layoutBounds, { visible: false } );
          sceneNodes.push( sceneNode );
          scenesParent.addChild( sceneNode );
        }
        else {

          // scene node will be created on demand
          sceneNodes.push( null );
        }
      } );

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

          // create on demand
          sceneNode = thisNode.createSceneNode( scene, layoutBounds, { visible: false } );
          sceneNodes[ sceneIndex ] = sceneNode;
          scenesParent.addChild( sceneNode );
          sceneNode.populateCarousels(); // after adding to scene graph!
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