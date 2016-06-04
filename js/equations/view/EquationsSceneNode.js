// Copyright 2016, University of Colorado Boulder

/**
 * Scene for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Drawer = require( 'FUNCTION_BUILDER/common/view/Drawer' );
  var EquationCardContainer = require( 'FUNCTION_BUILDER/common/view/EquationCardContainer' );
  var EquationCardNode = require( 'FUNCTION_BUILDER/common/view/EquationCardNode' );
  var EquationPanel = require( 'FUNCTION_BUILDER/common/view/EquationPanel' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathFunctionContainer = require( 'FUNCTION_BUILDER/common/view/MathFunctionContainer' );
  var NumberCardContainer = require( 'FUNCTION_BUILDER/common/view/NumberCardContainer' );
  var NumberCardNode = require( 'FUNCTION_BUILDER/common/view/NumberCardNode' );
  var SceneNode = require( 'FUNCTION_BUILDER/common/view/SceneNode' );
  var XYGraphNode = require( 'FUNCTION_BUILDER/common/view/XYGraphNode' );
  var XYTableDrawer = require( 'FUNCTION_BUILDER/common/view/XYTableDrawer' );

  /**
   * @param {Scene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   * @constructor
   */
  function EquationsSceneNode( scene, layoutBounds, options ) {

    // things that differ between the Equations and Numbers screens
    options = _.extend( {}, options, {

      // options for supertype
      cardCarouselDefaultPageNumber: 1,
      functionsPerPage: 2,

      // options for this subtype
      hasGraph: true, // show XY graph
      xSymbol: FBSymbols.X,
      ySymbol: FBSymbols.Y,
      xyFont: FBConstants.EQUATION_CARD_XY_FONT, // {Font} for x & y symbols
      xyAsCardsInEquations: false, // {boolean} put x & y symbols on a rectangle background in equations, like a card?
      tableHeadingFont: FBConstants.TABLE_XY_HEADING_FONT

    }, options );

    SceneNode.call( this, scene, layoutBounds, options );

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

    if ( !options.hasGraph ) {

      // table draw at center top of builder
      this.tableDrawer.centerX = scene.builder.centerX;
    }
    else {

      // table drawer at left top of builder
      this.tableDrawer.right = scene.builder.centerX - 20; // offset determined empirically

      // Graph
      var graphNode = new XYGraphNode( scene.builder, {
        visible: FBConstants.GRAPH_DRAWER_OPEN,
        cornerRadius: FBConstants.DRAWER_CORNER_RADIUS
      } );

      // @private Graph drawer
      this.graphDrawer = new Drawer( graphNode, {
        open: FBConstants.GRAPH_DRAWER_OPEN,
        openedCallback: function() { graphNode.visible = true; },
        closedCallback: function() { graphNode.visible = false; },
        handleLocation: 'top',
        handleTouchAreaXDilation: FBConstants.DRAWER_TOUCH_AREA_X_DILATION,
        handleTouchAreaYDilation: FBConstants.DRAWER_TOUCH_AREA_Y_DILATION,
        cornerRadius: FBConstants.DRAWER_CORNER_RADIUS,
        left: scene.builder.centerX - 5, // offset determined empirically
        bottom: scene.builder.location.y - ( scene.builder.waistHeight / 2 ) + FBConstants.DRAWER_Y_OVERLAP
      } );
      this.drawersLayer.addChild( this.graphDrawer );

      //TODO duplicate code in here, should we pass Card to graph functions?
      // wire up output containers to graph
      this.outputContainers.forEach( function( outputContainer ) {
        if ( outputContainer instanceof NumberCardContainer ) {

          // When a number is added to an empty container in the output carousel,
          // add its corresponding point to the graph.
          outputContainer.addEmitter.addListener( function( node ) {
            assert && assert( node instanceof NumberCardNode );
            if ( outputContainer.numberOfItemsProperty.get() === 1 ) {
              graphNode.addPointAt( node.card.rationalNumber );
            }
          } );

          // When the last number is removed from a container in the output carousel,
          // remove its corresponding point from the graph.
          outputContainer.removeEmitter.addListener( function( node ) {
            assert && assert( node instanceof NumberCardNode );
            if ( outputContainer.isEmpty() ) {
              graphNode.removePointAt( node.card.rationalNumber );
            }
          } );
        }
        else if ( outputContainer instanceof EquationCardContainer ) {

          // When the equation is added to a container in the output carousel,
          // show the line on the graph.
          outputContainer.addEmitter.addListener( function( node ) {
            assert && assert( node instanceof EquationCardNode );
            graphNode.setLineVisible( true );
          } );

          // When the last equation is removed from a container in the output carousel,
          // hide the line on the graph.
          outputContainer.removeEmitter.addListener( function( node ) {
            assert && assert( node instanceof EquationCardNode );
            if ( outputContainer.isEmpty() ) {
              graphNode.setLineVisible( false );
            }
          } );
        }
        else {
          throw new Error( 'unexpected container type' );
        }
      } );
    }

    // Equation and related controls
    var equationPanel = new EquationPanel( scene.builder, this.viewProperties.slopeInterceptProperty, {
      visible: FBConstants.EQUATION_DRAWER_OPEN,
      size: FBConstants.EQUATION_DRAWER_SIZE,
      cornerRadius: FBConstants.DRAWER_CORNER_RADIUS,
      xSymbol: options.xSymbol,
      ySymbol: options.ySymbol,
      xyFont: options.xyFont,
      xyAsCards: options.xyAsCardsInEquations
    } );

    // @private Equation drawer
    this.equationDrawer = new Drawer( equationPanel, {
      open: FBConstants.EQUATION_DRAWER_OPEN,
      openedCallback: function() { equationPanel.visible = true; },
      closedCallback: function() { equationPanel.visible = false; },
      cornerRadius: FBConstants.DRAWER_CORNER_RADIUS,
      handleLocation: 'bottom',
      handleTouchAreaXDilation: FBConstants.DRAWER_TOUCH_AREA_X_DILATION,
      handleTouchAreaYDilation: FBConstants.DRAWER_TOUCH_AREA_Y_DILATION,
      centerX: scene.builder.centerX,
      top: scene.builder.location.y + ( scene.builder.waistHeight / 2 ) - FBConstants.DRAWER_Y_OVERLAP
    } );
    this.drawersLayer.addChild( this.equationDrawer );
  }

  functionBuilder.register( 'EquationsSceneNode', EquationsSceneNode );

  return inherit( SceneNode, EquationsSceneNode, {

    // @public @override
    reset: function() {
      SceneNode.prototype.reset.call( this );

      // drawers
      var drawerResetOptions = { animationEnabled: false };
      this.equationDrawer.reset( drawerResetOptions );
      this.tableDrawer.reset( drawerResetOptions );
      this.graphDrawer && this.graphDrawer.reset( drawerResetOptions );
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
