// Copyright 2016, University of Colorado Boulder

//TODO lots in common with EquationsSceneNode
/**
 * Scene for the 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EquationCardContainer = require( 'FUNCTION_BUILDER/common/view/containers/EquationCardContainer' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathFunctionContainer = require( 'FUNCTION_BUILDER/common/view/containers/MathFunctionContainer' );
  var NumberCardContainer = require( 'FUNCTION_BUILDER/common/view/containers/NumberCardContainer' );
  var RefreshButton = require( 'SCENERY_PHET/buttons/RefreshButton' );
  var SceneNode = require( 'FUNCTION_BUILDER/common/view/SceneNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var XYGraphDrawer = require( 'FUNCTION_BUILDER/common/view/graph/XYGraphDrawer' );
  var XYTableDrawer = require( 'FUNCTION_BUILDER/common/view/table/XYTableDrawer' );

  /**
   * @param {Scene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   * @constructor
   */
  function MysterySceneNode( scene, layoutBounds, options ) {

    options = _.extend( {}, options, {

      cardCarouselDefaultPageNumber: 1,
      hideFunctionsCheckBoxVisible: false,

      /*
       * Mystery screen has a hidden function carousel, which is where we get functions for composing challenges.
       * This approach was necessary because the Mystery screen was added late in the development process, and
       * the existence of the function carousel was (by that point) required by too many things.
       */
      functionCarouselVisible: false

    }, options );

    var thisNode = this;

    SceneNode.call( this, scene, layoutBounds, options );

    // 'See Inside' check box is enabled after 1 card has been put in output carousel
    this.outputCarousel.numberOfCardsProperty.link( function( numberOfCards ) {
      thisNode.seeInsideCheckBox.enabled = thisNode.seeInsideCheckBox.enabled || ( numberOfCards === 1 );
    } );

    // @private
    this.tableDrawer = new XYTableDrawer( scene.builder, this.inputContainers, this.outputContainers, {
      right: scene.builder.centerX - 20,
      bottom: scene.builder.location.y - ( scene.builder.waistHeight / 2 ) + FBConstants.DRAWER_Y_OVERLAP
    } );
    this.drawersLayer.addChild( this.tableDrawer );

    // @private Graph drawer
    this.graphDrawer = new XYGraphDrawer( scene.builder, this.outputContainers, {
      left: scene.builder.centerX - 5, // offset determined empirically
      bottom: scene.builder.location.y - ( scene.builder.waistHeight / 2 ) + FBConstants.DRAWER_Y_OVERLAP
    } );
    this.drawersLayer.addChild( this.graphDrawer );

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

  return inherit( SceneNode, MysterySceneNode, {

    /**
     * Resets the scene.
     *
     * @public
     * @override
     */
    reset: function() {

      // disable scrolling animation for the table
      this.tableDrawer.contentsNode.animationEnabled = false;
      SceneNode.prototype.reset.call( this );
      this.tableDrawer.contentsNode.animationEnabled = true;

      // reset drawers with animation disabled
      var drawerResetOptions = { animationEnabled: false };
      this.tableDrawer.reset( drawerResetOptions );
      this.graphDrawer && this.graphDrawer.reset( drawerResetOptions );
    },

    /**
     * When the eraser button is pressed, disable scrolling animation for the table.
     *
     * @protected
     * @override
     */
    erase: function() {
      this.tableDrawer.contentsNode.animationEnabled = false;
      SceneNode.prototype.erase.call( this );
      this.tableDrawer.contentsNode.animationEnabled = true;
    },

    /**
     * Creates the card containers that go in the card carousels.
     *
     * @param {Scene} scene
     * @param {Object} [containerOptions] - see NumberCardContainer and EquationCardContainer options
     * @returns {CardContainer[]}
     * @protected
     * @override
     */
    createCardContainers: function( scene, containerOptions ) {

      var containers = [];

      // numbers
      scene.cardContent.forEach( function( value ) {
        containers.push( new NumberCardContainer( value, containerOptions ) );
      } );

      // symbol (eg 'x') is put in the carousel last
      if ( scene.cardSymbol ) {
        containers.push( new EquationCardContainer( scene.cardSymbol, containerOptions ) );
      }

      return containers;
    },

    /**
     * Creates the function containers that go in the function carousel.
     *
     * @param {Scene} scene
     * @param {Object} [containerOptions] - see MathFunctionContainer options
     * @returns {FunctionContainer[]}
     * @protected
     * @override
     */
    createFunctionContainers: function( scene, containerOptions ) {
      var functionContainers = [];
      scene.functionCreators.forEach( function( functionCreator ) {
        functionContainers.push( new MathFunctionContainer( functionCreator, containerOptions ) );
      } );
      return functionContainers;
    }
  } );
} );
