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
  var EquationFunctionContainer = require( 'FUNCTION_BUILDER/equations/view/EquationFunctionContainer' );
  var EquationPanel = require( 'FUNCTION_BUILDER/common/view/EquationPanel' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FunctionIconsSwitch = require( 'FUNCTION_BUILDER/equations/view/FunctionIconsSwitch' );
  var GraphNode = require( 'FUNCTION_BUILDER/equations/view/GraphNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberCardContainer = require( 'FUNCTION_BUILDER/numbers/view/NumberCardContainer' ); //TODO from numbers package
  var PropertySet = require( 'AXON/PropertySet' );
  var SceneNode = require( 'FUNCTION_BUILDER/common/view/SceneNode' );
  var Text = require( 'SCENERY/nodes/Text' );

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
      cardCarouselDefaultPageNumber: 1
    } );

    SceneNode.call( this, scene, layoutBounds, options );

    // @private view-specific properties
    this.viewProperties = new PropertySet( {
      simplifyEquation: false,
      functionIconsVisible: true
    } );

    // Graph
    var graphNode = new GraphNode();

    // @private Graph drawer
    this.graphDrawer = new Drawer( graphNode, {
      open: false,
      handleLocation: 'top',
      size: FBConstants.GRAPH_DRAWER_SIZE,
      right: scene.builder.right - 50,
      bottom: scene.builder.location.y - ( scene.builder.waistHeight / 2 ) + DRAWER_Y_OVERLAP
    } );
    this.drawersLayer.addChild( this.graphDrawer );

    // Table
    var tableNode = new Text( 'XY table', { font: FBConstants.EQUATION_FONT } ); //TODO temporary

    // @private Table drawer
    this.tableDrawer = new Drawer( tableNode, {
      open: false, //TODO should be true by default
      handleLocation: 'top',
      size: FBConstants.TABLE_DRAWER_SIZE,
      right: this.graphDrawer.left - 10,
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

    // show/hide function icons
    var functionIconsSwitch = new FunctionIconsSwitch( this.viewProperties.functionIconsVisibleProperty, {
      scale: 0.65,
      left: 30, //TODO temporary
      top: 530  //TODO temporary
    } );
    this.controlsLayer.addChild( functionIconsSwitch );
  }

  functionBuilder.register( 'EquationsSceneNode', EquationsSceneNode );

  return inherit( SceneNode, EquationsSceneNode, {

    // @override
    reset: function() {
      SceneNode.prototype.reset.call( this );

      // view-specific properties
      this.viewProperties.reset();

      // drawers
      this.tableDrawer.reset( { animationEnabled: false } );
      this.graphDrawer.reset( { animationEnabled: false } );
      this.equationDrawer.reset( { animationEnabled: false } );
    },

    /**
     * Creates the card containers that go in the card carousels.
     * See SceneNode.createCardContainers for params.
     * @returns {NumberCardContainer[]}
     * @protected
     * @override
     */
    createCardContainers: function( scene, containerOptions ) {
      var containers = [];
      scene.cardNumbers.forEach( function( value ) {
        containers.push( new NumberCardContainer( value, containerOptions ) );
      } );
      return containers;
    },

    /**
     * Creates the function containers that go in the function carousels.
     * See SceneNode.createFunctionContainers for params.
     * @returns {EquationFunctionContainer[]}
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
