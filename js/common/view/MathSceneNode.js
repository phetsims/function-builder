// Copyright 2016, University of Colorado Boulder

/**
 * Base type for scenes that involve math functions.
 * Adds optional drawers to the scene.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EquationCardContainer = require( 'FUNCTION_BUILDER/common/view/containers/EquationCardContainer' );
  var EquationDrawer = require( 'FUNCTION_BUILDER/common/view/equations/EquationDrawer' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberCardContainer = require( 'FUNCTION_BUILDER/common/view/containers/NumberCardContainer' );
  var SceneNode = require( 'FUNCTION_BUILDER/common/view/SceneNode' );
  var XYGraphDrawer = require( 'FUNCTION_BUILDER/common/view/graph/XYGraphDrawer' );
  var XYTableDrawer = require( 'FUNCTION_BUILDER/common/view/table/XYTableDrawer' );

  /**
   * @param {Scene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {constructor} functionNodeConstructor - constructor for FunctionNode subtype
   * @param {Object} [options]
   * @constructor
   */
  function MathSceneNode( scene, layoutBounds, functionNodeConstructor, options ) {

    options = _.extend( {
      hasTableDrawer: false, // show XY table drawer
      hasGraphDrawer: false, // show XY graph drawer
      hasEquationDrawer: false, // show equation drawer
      xSymbol: FBSymbols.X,
      ySymbol: FBSymbols.Y,
      xRange: FBConstants.DEFAULT_GRAPH_X_RANGE,
      yRange: FBConstants.DEFAULT_GRAPH_Y_RANGE,
      xyFont: FBConstants.EQUATION_CARD_XY_FONT, // {Font} for x & y symbols in equations
      xyAsCardsInEquations: false, // {boolean} put x & y symbols on a rectangle background in equations, like a card?
      tableHeadingFont: FBConstants.TABLE_XY_HEADING_FONT
    }, options );

    SceneNode.call( this, scene, layoutBounds, functionNodeConstructor, options );

    // XY table drawer
    if ( options.hasTableDrawer ) {

      // add additional view-specific properties
      this.viewProperties.addProperty( 'slopeIntercept', false ); // @public whether slope-intercept form is displayed

      // @private
      this.tableDrawer = new XYTableDrawer( scene.builder, this.inputContainers, this.outputContainers, {
        xSymbol: options.xSymbol,
        ySymbol: options.ySymbol,
        headingFont: options.tableHeadingFont,
        bottom: scene.builder.location.y - ( scene.builder.waistHeight / 2 ) + FBConstants.DRAWER_Y_OVERLAP
      } );
      this.drawersLayer.addChild( this.tableDrawer );

      // layout
      if ( options.hasGraphDrawer ) {
        this.tableDrawer.right = scene.builder.centerX - 20; // offset determined empirically
      }
      else {
        this.tableDrawer.centerX = scene.builder.centerX;
      }
    }

    // XY graph drawer
    if ( options.hasGraphDrawer ) {

      // @private Graph drawer
      this.graphDrawer = new XYGraphDrawer( scene.builder, this.outputContainers, {
        xRange: options.xRange,
        yRange: options.yRange,
        bottom: scene.builder.location.y - ( scene.builder.waistHeight / 2 ) + FBConstants.DRAWER_Y_OVERLAP
      } );
      this.drawersLayer.addChild( this.graphDrawer );

      // layout
      if ( options.hasTableDrawer ) {
        this.graphDrawer.left = scene.builder.centerX - 5; // offset determined empirically
      }
      else {
        this.graphDrawer.centerX = scene.builder.centerX;
      }
    }

    // Equation drawer
    if ( options.hasEquationDrawer ) {

      // @private
      this.equationDrawer = new EquationDrawer( scene.builder, this.viewProperties.slopeInterceptProperty, {
        xSymbol: options.xSymbol,
        ySymbol: options.ySymbol,
        xyFont: options.xyFont,
        xyAsCards: options.xyAsCardsInEquations,
        centerX: scene.builder.centerX,
        top: scene.builder.location.y + ( scene.builder.waistHeight / 2 ) - FBConstants.DRAWER_Y_OVERLAP
      } );
      this.drawersLayer.addChild( this.equationDrawer );
    }
  }

  functionBuilder.register( 'MathSceneNode', MathSceneNode );

  return inherit( SceneNode, MathSceneNode, {

    // @public @override
    reset: function() {

      // disable scrolling animation for the table
      this.tableDrawer && ( this.tableDrawer.contentsNode.animationEnabled = false );
      SceneNode.prototype.reset.call( this );
      this.tableDrawer && ( this.tableDrawer.contentsNode.animationEnabled = true );

      // reset drawers with animation disabled
      var drawerResetOptions = { animationEnabled: false };
      this.equationDrawer && this.equationDrawer.reset( drawerResetOptions );
      this.tableDrawer && this.tableDrawer.reset( drawerResetOptions );
      this.graphDrawer && this.graphDrawer && this.graphDrawer.reset( drawerResetOptions );
    },

    /**
     * When the eraser button is pressed, disable scrolling animation for the table.
     *
     * @protected
     * @override
     */
    erase: function() {
      this.tableDrawer && ( this.tableDrawer.contentsNode.animationEnabled = false );
      SceneNode.prototype.erase.call( this );
      this.tableDrawer && ( this.tableDrawer.contentsNode.animationEnabled = true );
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
    }
  } );
} );
