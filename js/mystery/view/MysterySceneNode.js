// Copyright 2016, University of Colorado Boulder

/**
 * Scene for the 'Mystery' screen. Adds a button for generating challenges.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathSceneNode = require( 'FUNCTION_BUILDER/common/view/MathSceneNode' );
  var MysteryFunctionNode = require( 'FUNCTION_BUILDER/common/view/functions/MysteryFunctionNode' );
  var MysteryModel = require( 'FUNCTION_BUILDER/mystery/model/MysteryModel' );
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

    // 'See Inside' check box is enabled after 1 card has been put in output carousel
    this.outputCarousel.numberOfCardsProperty.link( function( numberOfCards ) {
      thisNode.seeInsideCheckBox.enabled = thisNode.seeInsideCheckBox.enabled || ( numberOfCards === 1 );
      //TODO make show/hide button visible on functions in builder when (numberOfCards === 2)
    } );

    // @private button for generating a new challenge
    this.generateButton = new RefreshButton( {
      listener: function() { scene.nextChallenge(); },
      iconWidth: 34,
      xMargin: 16,
      yMargin: 8,
      centerX: this.builderNode.centerX,
      top: this.builderNode.bottom + 10
    } );
    this.addChild( this.generateButton );

    // @private shows the answer below the generate button, for debugging, i18n not required
    this.answerNode = new Text( 'answer', {
      font: new FBFont( 18 ),
      centerX: this.generateButton.centerX,
      top: this.generateButton.bottom + 25
    } );
    if ( FBQueryParameters.SHOW_ANSWER ) {
      this.addChild( this.answerNode );
    }

    // Update when the challenge changes.
    // This can't be executed until the function carousel is populated.
    // unlink unnecessary, instances exist for lifetime of the sim
    scene.challengeProperty.lazyLink( function( challenge ) {
      thisNode.nextChallenge();
    } );
  }

  functionBuilder.register( 'MysterySceneNode', MysterySceneNode );

  return inherit( MathSceneNode, MysterySceneNode, {

    /**
     * Completes initialization by displaying the first challenge.
     *
     * @public
     */
    completeInitialization: function() {
      MathSceneNode.prototype.completeInitialization.call( this );
      this.nextChallenge();
    },

    /**
     * Displays the next challenge.
     *
     * @private
     */
    nextChallenge: function() {

      var thisNode = this;

      // disable the 'See Inside' check box
      thisNode.seeInsideCheckBox.enabled = false;

      // erase output carousel
      thisNode.erase();

      // clear functions from the function builder
      thisNode.builderNode.reset();

      // convert the challenge from a string to an array of {operator: string, operand: number}
      var challenge = thisNode.scene.challengeProperty.get();
      var challengeObjects = MysteryModel.parseChallenge( challenge );

      // transfer functions from carousel to builder, configured to match the challenge
      var slotNumber = 0;
      challengeObjects.forEach( function( challengeObject ) {

        var functionNode = null;
        for ( var i = 0; i < thisNode.functionContainers.length && !functionNode; i++ ) {

          var functionContainer = thisNode.functionContainers[ i ];
          functionNode = functionContainer.getContents()[ 0 ];

          if ( functionNode.operatorEquals( challengeObject.operator ) ) {

            // configure function to match the challenge
            functionNode.operand = challengeObject.operand;
            functionNode.backgroundFill = thisNode.scene.nextColor();
            functionNode.setIdentityVisible( false );

            // move function to the builder
            functionNode.moveToBuilder( slotNumber );
          }
          else {
            functionNode = null;
          }
        }
        assert && assert( functionNode, 'no function for operator ' + challengeObject.operator );

        slotNumber++;
      } );

      // show the answer for debugging
      thisNode.answerNode.text = challenge;
      thisNode.answerNode.centerX = thisNode.generateButton.centerX;
    }
  } );
} );
