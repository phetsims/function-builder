// Copyright 2016-2020, University of Colorado Boulder

/**
 * Scene for the 'Mystery' screen. Adds a button for generating challenges.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import merge from '../../../../phet-core/js/merge.js';
import EyeToggleButton from '../../../../scenery-phet/js/buttons/EyeToggleButton.js';
import RefreshButton from '../../../../scenery-phet/js/buttons/RefreshButton.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import FBColors from '../../common/FBColors.js';
import FBFont from '../../common/FBFont.js';
import FBQueryParameters from '../../common/FBQueryParameters.js';
import MysteryFunctionNode from '../../common/view/functions/MysteryFunctionNode.js';
import MathSceneNode from '../../common/view/MathSceneNode.js';
import functionBuilder from '../../functionBuilder.js';
import MysteryChallenges from '../model/MysteryChallenges.js';

class MysterySceneNode extends MathSceneNode {

  /**
   * @param {MysteryScene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   */
  constructor( scene, layoutBounds, options ) {

    options = merge( {

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
      hideFunctionsCheckboxVisible: false // hide this feature

    }, options );

    super( scene, layoutBounds, MysteryFunctionNode, options );

    // Toggle buttons below each builder slot, for revealing identity of functions
    this.revealProperties = [];  // {Property.<boolean>[]}
    this.revealButtons = []; // {EyeToggleButton[]}
    for ( let i = 0; i < scene.builder.numberOfSlots; i++ ) {

      /**
       * Create a closure for slotNumber using an IIFE
       * @param {MysterySceneNode} mysterySceneNode
       * @param {number} slotNumber
       */
      ( function( mysterySceneNode, slotNumber ) {

        // {Property.<boolean>} Property associated with the slot
        const revealProperty = new BooleanProperty( false );
        mysterySceneNode.revealProperties.push( revealProperty );

        // wire up Property to control the function that's in the slot
        // unlink unnecessary, instances exist for lifetime of the sim
        revealProperty.link( reveal => {
          const functionNode = mysterySceneNode.builderNode.getFunctionNode( slotNumber );
          if ( functionNode ) {
            functionNode.identityVisibleProperty.set( reveal );
          }
        } );

        // button below the slot
        const slotPosition = scene.builder.slots[ slotNumber ].position;
        const revealButton = new EyeToggleButton( revealProperty, {
          baseColor: FBColors.HIDDEN_FUNCTION,
          scale: 0.75,
          centerX: slotPosition.x,
          top: slotPosition.y + 65
        } );
        mysterySceneNode.revealButtons.push( revealButton );
        mysterySceneNode.controlsLayer.addChild( revealButton );

        // touchArea
        revealButton.touchArea = revealButton.localBounds.dilatedXY( 25, 15 );

      } )( this, i );
    }

    // button for generating a new challenge
    const generateButton = new RefreshButton( {
      listener: () => scene.nextChallenge(),
      xMargin: 18,
      yMargin: 10,
      centerX: this.builderNode.centerX,
      top: this.builderNode.bottom + 65
    } );
    this.addChild( generateButton );

    // @private shows the answer below the generate button, for debugging, i18n not required
    this.answerNode = new Text( 'answer', {
      font: new FBFont( 18 ),
      centerX: generateButton.centerX,
      top: generateButton.bottom + 10
    } );
    if ( phet.chipper.queryParameters.showAnswers ) {
      this.addChild( this.answerNode );
    }

    // @private {Object} maps from operator to function container, created on demand by updateChallenge
    this.operatorToContainerMap = null;

    // Update when the challenge changes.
    // This can't be executed until the function carousel is populated.
    // unlink unnecessary, instances exist for lifetime of the sim
    scene.challengeProperty.lazyLink( challenge => {
      this.updateChallenge();
    } );

    // Enable features based on number of cards that have been moved to the output carousel.
    // unlink unnecessary, instances exist for lifetime of the sim.
    this.outputCarousel.numberOfCardsProperty.link( numberOfCards => {

      // enabled function reveal buttons
      this.revealButtons.forEach( revealButton => {
        revealButton.enabled = revealButton.enabled || ( numberOfCards === 3 );
      } );

      // enable 'See Inside' checkbox
      this.seeInsideCheckbox.enabled = this.seeInsideCheckbox.enabled || ( numberOfCards === 1 );
    } );

    // @private
    this.scene = scene;
  }

  /**
   * @public
   * @override
   */
  reset() {
    super.reset();
    this.resetChallengeControls();
  }

  /**
   * Resets controls that need to be reset each time the challenge changes.
   *
   * @private
   */
  resetChallengeControls() {

    // reset Properties for revealing function identity
    this.revealProperties.forEach( revealProperty => revealProperty.reset() );

    // disable buttons for revealing function identity
    this.revealButtons.forEach( revealButton => {
      revealButton.enabled = false;
    } );

    // reset 'See Inside' property
    this.seeInsideProperty.reset();

    // disable 'See Inside' checkbox
    this.seeInsideCheckbox.enabled = false;
  }

  /**
   * Completes initialization by displaying the first challenge.
   *
   * @public
   * @override
   */
  completeInitialization() {
    super.completeInitialization();
    this.updateChallenge();
  }

  /**
   * Synchronizes the displayed challenge with the model.
   *
   * @private
   */
  updateChallenge() {

    this.resetCarousels();
    this.builderNode.reset();
    this.resetFunctions();
    this.resetCards();

    // create the map on demand, since it can't be done until the sim has been fully initialized
    if ( !this.operatorToContainerMap ) {
      this.operatorToContainerMap = {};
      this.functionContainers.forEach( functionContainer => {

        const contents = functionContainer.getContents();
        assert && assert( contents.length > 0, 'empty functionContainer' );

        const operator = contents[ 0 ].functionInstance.operator;
        this.operatorToContainerMap[ operator ] = functionContainer;
      } );
    }

    // convert the challenge from a string to an array of {operator: string, operand: number}
    const challenge = this.scene.challengeProperty.get();
    const challengeObjects = MysteryChallenges.parseChallenge( challenge );

    // transfer functions from carousel to builder, configured to match the challenge
    let slotNumber = 0;
    const colors = this.scene.getColors(); // {<Color|string>[]}
    challengeObjects.forEach( challengeObject => {

      // get the container that has functions for this operator
      const functionContainer = this.operatorToContainerMap[ challengeObject.operator ];
      assert && assert( functionContainer, 'no functionContainer for operator ' + challengeObject.operator );

      // get the first item in the container
      const functionNode = functionContainer.getContents()[ 0 ];
      assert && assert( functionNode, 'no function for operator ' + challengeObject.operator );
      const functionInstance = functionNode.functionInstance;

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
    this.answerNode.text = '#' + ( this.scene.challengePool.indexOf( challenge ) + 1 ) + ': ' + challenge;
    this.answerNode.centerX = this.builderNode.centerX;

    if ( FBQueryParameters.populateOutput ) {
      this.populateOutputCarousel();
    }
  }
}

functionBuilder.register( 'MysterySceneNode', MysterySceneNode );

export default MysterySceneNode;