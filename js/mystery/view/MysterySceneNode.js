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

      cardCarouselDefaultPageNumber: 1,
      hasTableDrawer: true,
      hasGraphDrawer: true,
      hideFunctionsCheckBoxVisible: false,

      /*
       * Mystery screen has a hidden function carousel, which is where we get functions for composing challenges.
       * This approach was necessary because the Mystery screen was added late in the development process, and
       * the existence of the function carousel was (by that point) required by too many things.
       */
      functionCarouselVisible: false

    }, options );

    var thisNode = this;

    MathSceneNode.call( this, scene, layoutBounds, options );

    // 'See Inside' check box is enabled after 1 card has been put in output carousel
    this.outputCarousel.numberOfCardsProperty.link( function( numberOfCards ) {
      thisNode.seeInsideCheckBox.enabled = thisNode.seeInsideCheckBox.enabled || ( numberOfCards === 1 );
      //TODO make show/hide button visible on functions in builder when (numberOfCards === 2)
    } );

    // button for generating a new challenge
    var generateButton = new RefreshButton( {
      listener: function() { scene.nextChallenge(); },
      iconWidth: 34,
      xMargin: 16,
      yMargin: 8,
      centerX: this.builderNode.centerX,
      top: this.builderNode.bottom + 10
    } );
    this.addChild( generateButton );

    // shows the answer below the generate button, for debugging, i18n not required
    var answerNode = new Text( 'answer', {
      font: new FBFont( 18 ),
      centerX: generateButton.centerX,
      top: generateButton.bottom + 25
    } );
    if ( FBQueryParameters.SHOW_ANSWER ) {
      this.addChild( answerNode );
    }

    // Update when the challenge changes.
    // unlink unnecessary, instances exist for lifetime of the sim
    scene.challengeProperty.link( function( challenge ) {

      // disable the 'See Inside' check box
      thisNode.seeInsideCheckBox.enabled = false;

      // erase output carousel
      thisNode.erase();

      // clear functions from the function builder
      thisNode.builderNode.reset();

      //TODO parse the challenge
      //TODO get functions from carousel, configure them (operand, color)
      //TODO put functions into builder

      // show the answer for debugging
      answerNode.text = challenge;
      answerNode.centerX = generateButton.centerX;
    } );
  }

  functionBuilder.register( 'MysterySceneNode', MysterySceneNode );

  return inherit( MathSceneNode, MysterySceneNode );
} );
