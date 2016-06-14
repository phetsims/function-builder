// Copyright 2016, University of Colorado Boulder

/**
 * Scene for the 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EquationCardContainer = require( 'FUNCTION_BUILDER/common/view/EquationCardContainer' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathFunctionContainer = require( 'FUNCTION_BUILDER/common/view/MathFunctionContainer' );
  var NumberCardContainer = require( 'FUNCTION_BUILDER/common/view/NumberCardContainer' );
  var RefreshButton = require( 'SCENERY_PHET/buttons/RefreshButton' );
  var SceneNode = require( 'FUNCTION_BUILDER/common/view/SceneNode' );
  var XYGraphDrawer = require( 'FUNCTION_BUILDER/common/view/XYGraphDrawer' );
  var XYTableDrawer = require( 'FUNCTION_BUILDER/common/view/XYTableDrawer' );

  /**
   * @param {Scene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   * @constructor
   */
  function MysterySceneNode( scene, layoutBounds, options ) {

    // things that differ between the Equations and Numbers screens
    options = _.extend( {}, options, {

      cardCarouselDefaultPageNumber: 1,

      // 'Hide Functions' check box should initially be checked, so that answers are not revealed
      hideFunctions: true,

      /*
       * Mystery screen has a hidden function carousel, which is where we get functions for composing challenges.
       * This approach was necessary because the Mystery screen was added late in the development process, and
       * the existence of the function carousel was (by that point) required by too many things.
       */
      functionCarouselVisible: false

    }, options );

    var thisNode = this;

    SceneNode.call( this, scene, layoutBounds, options );

    // 'See Inside' and 'Hide Functions' check boxes are enabled only when all cards are in the output carousel
    var totalNumberOfCards = this.outputCarousel.items.length * scene.numberOfEachCard;
    this.outputCarousel.numberOfCardsProperty.link( function( numberOfCards ) {
      var enabled = ( numberOfCards === totalNumberOfCards );
      thisNode.hideFunctionsCheckBox.enabled = enabled;
      thisNode.seeInsideCheckBox.enabled = enabled;
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

    // Button for generating a new challenge
    var generateButton = new RefreshButton( {
      listener: function() {

        // erase output carousel
        thisNode.erase();

        // clear functions from the function builder
        thisNode.builderNode.reset();

        //TODO randomly select a challenge
        //TODO get functions from carousel, configure them (operand, color)
        //TODO put functions into builder
      },
      iconWidth: 34,
      xMargin: 16,
      yMargin: 8,
      centerX: this.builderNode.centerX,
      top: this.builderNode.bottom + 10
    } );
    this.addChild( generateButton );
  }

  functionBuilder.register( 'MysterySceneNode', MysterySceneNode );

  return inherit( SceneNode, MysterySceneNode, {

    // @public @override
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
