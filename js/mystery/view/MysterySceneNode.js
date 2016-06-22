// Copyright 2016, University of Colorado Boulder

/**
 * Scene for the 'Mystery' screen. Adds a button for generating challenges.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EyeToggleButton = require( 'FUNCTION_BUILDER/common/view/EyeToggleButton' );
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathSceneNode = require( 'FUNCTION_BUILDER/common/view/MathSceneNode' );
  var MysteryChallenges = require( 'FUNCTION_BUILDER/mystery/model/MysteryChallenges' );
  var MysteryFunctionNode = require( 'FUNCTION_BUILDER/common/view/functions/MysteryFunctionNode' );
  var Property = require( 'AXON/Property' );
  var RefreshButton = require( 'SCENERY_PHET/buttons/RefreshButton' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {Scene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   * @constructor
   */
  function MysterySceneNode( scene, layoutBounds, options ) {

    options = _.extend( {

      /*
       * Mystery scenes have a hidden function carousel, which is where we get functions for composing challenges.
       * This approach was necessary because the Mystery screen was added late in the development process, and
       * the existence of the function carousel was (by that point) required by too many things.
       */
      functionCarouselVisible: false,

      cardCarouselDefaultPageNumber: 1, // show cards 0-3 in input carousel
      functionsPerPage: 2, // functions per page in the functions carousel (which is invisible)
      hasTableDrawer: true, // include an XY table drawer
      hasGraphDrawer: true, // include an XY graph drawer
      hideFunctionsCheckBoxVisible: false // hide this feature
    }, options );

    var thisNode = this;

    MathSceneNode.call( this, scene, layoutBounds, MysteryFunctionNode, options );

    // Toggle buttons below each builder slot, for revealing identity of functions
    this.revealProperties = [];  // {Property.<boolean>[]}
    this.revealButtons = []; // {EyeToggleButton[]}
    for ( var i = 0; i < scene.builder.slots.length; i++ ) {

      // create a closure for slotNumber using an IIFE
      (function() {

        var slotNumber = i;

        // Property associated with the slot
        var revealProperty = new Property( false );
        thisNode.revealProperties.push( revealProperty );

        // wire up Property to control the function that's in the slot
        // unlink unnecessary, instances exist for lifetime of the sim
        revealProperty.link( function( reveal ) {
          var functionNode = thisNode.builderNode.getFunctionNode( slotNumber );
          if ( functionNode ) {
            functionNode.identityVisibleProperty.set( reveal );
          }
        } );

        // button below the slot
        var slotLocation = scene.builder.slots[ slotNumber ].location;
        var revealButton = new EyeToggleButton( revealProperty, {
          baseColor: FBColors.HIDDEN_FUNCTION,
          scale: 0.75,
          centerX: slotLocation.x,
          top: slotLocation.y + 65
        } );
        thisNode.revealButtons.push( revealButton );
        thisNode.controlsLayer.addChild( revealButton );

        // touchArea
        revealButton.touchArea = revealButton.localBounds.dilatedXY( 25, 15 );

      })();
    }

    // @private button for generating a new challenge
    this.generateButton = new RefreshButton( {
      listener: function() { scene.nextChallenge(); },
      iconWidth: 34,
      xMargin: 16,
      yMargin: 8,
      centerX: this.builderNode.centerX,
      top: this.builderNode.bottom + 65
    } );
    this.addChild( this.generateButton );

    // @private shows the answer below the generate button, for debugging, i18n not required
    this.answerNode = new Text( 'answer', {
      font: new FBFont( 18 ),
      centerX: this.generateButton.centerX,
      top: this.generateButton.bottom + 10
    } );
    if ( FBQueryParameters.SHOW_ANSWER ) {
      this.addChild( this.answerNode );
    }

    // @private {Object} maps from operator to function container, created on demand by updateChallenge
    this.operatorToContainerMap = null;

    // Update when the challenge changes.
    // This can't be executed until the function carousel is populated.
    // unlink unnecessary, instances exist for lifetime of the sim
    scene.challengeProperty.lazyLink( function( challenge ) {
      thisNode.updateChallenge();
    } );

    // Enable features based on number of cards that have been moved to the output carousel
    this.outputCarousel.numberOfCardsProperty.link( function( numberOfCards ) {

      // enabled function reveal buttons
      thisNode.revealButtons.forEach( function( revealButton ) {
        revealButton.enabled = revealButton.enabled || ( numberOfCards === 3 );
      } );

      // enable 'See Inside' check box
      thisNode.seeInsideCheckBox.enabled = thisNode.seeInsideCheckBox.enabled || ( numberOfCards === 1 );
    } );

    // @private
    this.scene = scene;
  }

  functionBuilder.register( 'MysterySceneNode', MysterySceneNode );

  return inherit( MathSceneNode, MysterySceneNode, {

    /**
     * @public
     * @override
     */
    reset: function() {
      MathSceneNode.prototype.reset.call( this );
      this.resetChallengeControls();
    },

    /**
     * Resets controls that need to be reset each time the challenge changes.
     *
     * @private
     */
    resetChallengeControls: function() {

      // reset Properties for revealing function identity
      this.revealProperties.forEach( function( revealProperty ) {
        revealProperty.reset();
      } );

      // disable buttons for revealing function identity
      this.revealButtons.forEach( function( revealButton ) {
        revealButton.enabled = false;
      } );

      // reset 'See Inside' property
      this.viewProperties.seeInsideProperty.reset();

      // disable 'See Inside' check box
      this.seeInsideCheckBox.enabled = false;
    },

    /**
     * Completes initialization by displaying the first challenge.
     *
     * @public
     * @override
     */
    completeInitialization: function() {
      MathSceneNode.prototype.completeInitialization.call( this );
      this.updateChallenge();
    },

    /**
     * Synchronizes the displayed challenge with the model.
     *
     * @private
     */
    updateChallenge: function() {

      var thisNode = this;

      this.resetCarousels();
      this.builderNode.reset();
      this.resetFunctions();
      this.resetCards();

      // create the map on demand, since it can't be done until the sim has been fully initialized
      if ( !this.operatorToContainerMap ) {
        this.operatorToContainerMap = {};
        this.functionContainers.forEach( function( functionContainer ) {

          var contents = functionContainer.getContents();
          assert && assert( contents.length > 0, 'empty functionContainer' );

          var operator = contents[ 0 ].functionInstance.operator;
          thisNode.operatorToContainerMap[ operator ] = functionContainer;
        } );
      }

      // convert the challenge from a string to an array of {operator: string, operand: number}
      var challenge = thisNode.scene.challengeProperty.get();
      var challengeObjects = MysteryChallenges.parseChallenge( challenge );

      // transfer functions from carousel to builder, configured to match the challenge
      var slotNumber = 0;
      var colors = thisNode.scene.nextColors(); // {<Color|string>[]}
      challengeObjects.forEach( function( challengeObject ) {

        // get the container that has functions for this operator
        var functionContainer = thisNode.operatorToContainerMap[ challengeObject.operator ];
        assert && assert( functionContainer, 'no functionContainer for operator ' + challengeObject.operator );
        
        // get the first item in the container
        var functionNode = functionContainer.getContents()[ 0 ];
        assert && assert( functionNode, 'no function for operator ' + challengeObject.operator );
        var functionInstance = functionNode.functionInstance;

        // configure the function to match the challenge
        functionInstance.operandProperty.set( challengeObject.operand );
        functionInstance.fillProperty.set( colors[ slotNumber ] );

        // move the function to the builder
        functionNode.moveToBuilder( slotNumber );

        // hide the function's identity
        functionNode.identityVisibleProperty.set( false );
        
        slotNumber++;
      } );

      // Resets controls that need to be reset each time the challenge changes.
      this.resetChallengeControls();

      // show the answer for debugging
      thisNode.answerNode.text = challenge;
      thisNode.answerNode.centerX = thisNode.generateButton.centerX;
    }
  } );
} );
