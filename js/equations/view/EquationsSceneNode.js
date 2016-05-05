// Copyright 2016, University of Colorado Boulder

//TODO much in common with NumbersSceneNode
/**
 * Displays a scene in the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Drawer = require( 'FUNCTION_BUILDER/common/view/Drawer' );
  var EquationCardContainer = require( 'FUNCTION_BUILDER/equations/view/EquationCardContainer' );
  var EquationFunctionContainer = require( 'FUNCTION_BUILDER/equations/view/EquationFunctionContainer' );
  var EquationPanel = require( 'FUNCTION_BUILDER/common/view/EquationPanel' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberCardContainer = require( 'FUNCTION_BUILDER/numbers/view/NumberCardContainer' ); //TODO from numbers package
  var SceneNode = require( 'FUNCTION_BUILDER/common/view/SceneNode' );
  var XYGraphNode = require( 'FUNCTION_BUILDER/equations/view/XYGraphNode' );
  var XYTableNode = require( 'FUNCTION_BUILDER/common/view/XYTableNode' );

  // constants
  var DRAWER_Y_OVERLAP = 1; // how much drawers overlap the builder

  /**
   * @param {EquationsScene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   * @constructor
   */
  function EquationsSceneNode( scene, layoutBounds, options ) {

    options = _.extend( {}, options, {
      cardCarouselDefaultPageNumber: 1,
      functionsPerPage: 2
    } );

    SceneNode.call( this, scene, layoutBounds, options );

    // add additional view-specific properties
    this.viewProperties.addProperty( 'simplifyEquation', false );

    // Graph
    var graphNode = new XYGraphNode( scene.builder );

    // @private Graph drawer
    this.graphDrawer = new Drawer( graphNode, {
      open: false,
      handleLocation: 'top',
      left: scene.builder.centerX - 5,
      bottom: scene.builder.location.y - ( scene.builder.waistHeight / 2 ) + DRAWER_Y_OVERLAP
    } );
    this.drawersLayer.addChild( this.graphDrawer );

    // Table
    var tableNode = new XYTableNode();

    // @private Table drawer
    this.tableDrawer = new Drawer( tableNode, {
      open: false, //TODO should be true by default
      handleLocation: 'top',
      right: this.graphDrawer.left - 15,
      bottom: scene.builder.location.y - ( scene.builder.waistHeight / 2 ) + DRAWER_Y_OVERLAP
    } );
    this.drawersLayer.addChild( this.tableDrawer );

    // Equation and related controls
    var equationPanel = new EquationPanel( this.viewProperties.simplifyEquationProperty, {
      size: FBConstants.EQUATION_DRAWER_SIZE
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

  functionBuilder.register( 'EquationsSceneNode', EquationsSceneNode );

  return inherit( SceneNode, EquationsSceneNode, {

    // @public @override
    reset: function() {
      SceneNode.prototype.reset.call( this );

      // drawers
      this.tableDrawer.reset( { animationEnabled: false } );
      this.graphDrawer.reset( { animationEnabled: false } );
      this.equationDrawer.reset( { animationEnabled: false } );
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
      scene.cardNumbers.forEach( function( value ) {
        containers.push( new NumberCardContainer( value, containerOptions ) );
      } );

      // symbols, eg 'x'
      scene.cardSymbols.forEach( function( value ) {
        containers.push( new EquationCardContainer( value, containerOptions ) );
      } );

      return containers;
    },

    /**
     * Creates the function containers that go in the function carousel.
     *
     * @param {Scene} scene
     * @param {Object} [containerOptions] - see EquationFunctionContainer options
     * @returns {FunctionContainer[]}
     * @protected
     * @override
     */
    createFunctionContainers: function( scene, containerOptions ) {
      var functionContainers = [];
      scene.functionData.forEach( function( functionData ) {
        functionContainers.push( new EquationFunctionContainer( functionData, containerOptions ) );
      } );
      return functionContainers;
    }
  } );
} );
