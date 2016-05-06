// Copyright 2016, University of Colorado Boulder

/**
 * Displays a scene in the 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Drawer = require( 'FUNCTION_BUILDER/common/view/Drawer' );
  var EquationPanel = require( 'FUNCTION_BUILDER/common/view/EquationPanel' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumbersCardContainer = require( 'FUNCTION_BUILDER/numbers/view/NumbersCardContainer' );
  var NumbersFunctionContainer = require( 'FUNCTION_BUILDER/numbers/view/NumbersFunctionContainer' );
  var SceneNode = require( 'FUNCTION_BUILDER/common/view/SceneNode' );
  var XYTableNode = require( 'FUNCTION_BUILDER/common/view/XYTableNode' );

  // strings
  var inputString = require( 'string!FUNCTION_BUILDER/input' );
  var outputString = require( 'string!FUNCTION_BUILDER/output' );

  // constants
  var DRAWER_Y_OVERLAP = 1; // how much drawers overlap the builder

  /**
   * @param {NumbersScene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   * @constructor
   */
  function NumbersSceneNode( scene, layoutBounds, options ) {

    options = _.extend( {}, options, {
      cardCarouselDefaultPageNumber: 1
    } );

    SceneNode.call( this, scene, layoutBounds, options );

    // add additional view-specific properties
    this.viewProperties.addProperty( 'simplifyEquation', false );

    // Table
    var tableNode = new XYTableNode( {
      xString: inputString,
      yString: outputString
    } );

    // @protected Table drawer
    this.tableDrawer = new Drawer( tableNode, {
      open: false, //TODO table drawer should be open by default
      handleLocation: 'top',
      centerX: scene.builder.centerX,
      bottom: scene.builder.location.y - ( scene.builder.waistHeight / 2 ) + DRAWER_Y_OVERLAP
    } );
    this.drawersLayer.addChild( this.tableDrawer );

    // Equation and related controls
    var equationPanel = new EquationPanel( this.viewProperties.simplifyEquationProperty, {
      size: FBConstants.EQUATION_DRAWER_SIZE,
      xSymbol: inputString,
      ySymbol: outputString
    } );

    // @private Equation drawer
    this.equationDrawer = new Drawer( equationPanel, {
      open: false,
      handleLocation: 'bottom',
      xMargin: 30,
      yMargin: 10,
      centerX: scene.builder.centerX,
      top: scene.builder.location.y + ( scene.builder.waistHeight / 2 ) - DRAWER_Y_OVERLAP
    } );
    this.drawersLayer.addChild( this.equationDrawer );
  }

  functionBuilder.register( 'NumbersSceneNode', NumbersSceneNode );

  return inherit( SceneNode, NumbersSceneNode, {

    // @public @override
    reset: function() {
      SceneNode.prototype.reset.call( this );

      // drawers
      this.equationDrawer.reset( { animationEnabled: false } );
      this.tableDrawer.reset( { animationEnabled: false } );
    },

    /**
     * Creates the card containers that go in the card carousels.
     *
     * @param {Scene} scene
     * @param {Object} [containerOptions] - see NumbersCardContainer option
     * @returns {CardContainer[]}
     * @protected
     * @override
     */
    createCardContainers: function( scene, containerOptions ) {
      var containers = [];
      scene.cardNumbers.forEach( function( value ) {
        containers.push( new NumbersCardContainer( value, containerOptions ) );
      } );
      return containers;
    },

    /**
     * Creates the function containers that go in the function carousel.
     *
     * @param {Scene} scene
     * @param {Object} [containerOptions] - see NumbersFunctionContainer options
     * @returns {FunctionContainer[]}
     * @protected
     * @override
     */
    createFunctionContainers: function( scene, containerOptions ) {
      var functionContainers = [];
      scene.functionData.forEach( function( functionData ) {
        functionContainers.push( new NumbersFunctionContainer( functionData, containerOptions ) );
      } );
      return functionContainers;
    }
  } );
} );
