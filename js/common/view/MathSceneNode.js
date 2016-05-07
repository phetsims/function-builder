// Copyright 2016, University of Colorado Boulder

/**
 * Displays a math scene.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Drawer = require( 'FUNCTION_BUILDER/common/view/Drawer' );
  var EquationCardContainer = require( 'FUNCTION_BUILDER/common/view/EquationCardContainer' );
  var EquationPanel = require( 'FUNCTION_BUILDER/common/view/EquationPanel' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathFunctionContainer = require( 'FUNCTION_BUILDER/common/view/MathFunctionContainer' );
  var NumberCardContainer = require( 'FUNCTION_BUILDER/common/view/NumberCardContainer' );
  var SceneNode = require( 'FUNCTION_BUILDER/common/view/SceneNode' );
  var XYGraphNode = require( 'FUNCTION_BUILDER/common/view/XYGraphNode' );
  var XYTableNode = require( 'FUNCTION_BUILDER/common/view/XYTableNode' );

  // constants
  var DRAWER_Y_OVERLAP = 1; // how much drawers overlap the builder

  /**
   * @param {MathScene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   * @constructor
   */
  function MathSceneNode( scene, layoutBounds, options ) {

    options = _.extend( {}, options, {
      cardCarouselDefaultPageNumber: 1,
      operandMutable: true,
      hasGraph: true,
      xSymbol: FBSymbols.X,
      ySymbol: FBSymbols.Y
    }, options );

    this.operandMutable = options.operandMutable; // @private

    SceneNode.call( this, scene, layoutBounds, options );

    // add additional view-specific properties
    this.viewProperties.addProperty( 'simplifyEquation', false );

    // Table
    var tableNode = new XYTableNode( {
      xSymbol: options.xSymbol,
      ySymbol: options.ySymbol
    } );

    // @private
    this.tableDrawer = new Drawer( tableNode, {
      open: false, //TODO table drawer should be open by default
      handleLocation: 'top',
      bottom: scene.builder.location.y - ( scene.builder.waistHeight / 2 ) + DRAWER_Y_OVERLAP
    } );
    this.drawersLayer.addChild( this.tableDrawer );

    if ( !options.hasGraph ) {

      // table draw at center top of builder
      this.tableDrawer.centerX = scene.builder.centerX;
    }
    else {

      // table drawer at left top of builder
      this.tableDrawer.right = scene.builder.centerX - 10;

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

      //TODO preferable to do this through options when outputContainers are instantiated
      // wire up output containers to graph
      this.outputContainers.forEach( function( outputContainer ) {
        if ( outputContainer instanceof NumberCardContainer ) {

          // When a number is added to the output carousel, add its corresponding point to the graph.
          outputContainer.addFirstCallback = function( value ) { graphNode.addPointAt( value ); };

          // When a number is removed from the output carousel, remove its corresponding point from the graph.
          outputContainer.removeLastCallback = function( value ) { graphNode.removePointAt( value ); };
        }
        else if ( outputContainer instanceof EquationCardContainer ) {

          // When an equation is added to the output carousel, add its corresponding line to the graph.
          outputContainer.addFirstCallback = function( value ) { graphNode.setLineVisible( true ); };

          // When an equation is removed from the output carousel, remove its corresponding line from the graph.
          outputContainer.removeLastCallback = function( value ) { graphNode.setLineVisible( false ); };
        }
        else {
          throw new Error( 'unexpected container type' );
        }
      } );
    }

    // Equation and related controls
    var equationPanel = new EquationPanel( this.viewProperties.simplifyEquationProperty, {
      size: FBConstants.EQUATION_DRAWER_SIZE,
      xSymbol: options.xSymbol,
      ySymbol: options.ySymbol
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

  functionBuilder.register( 'MathSceneNode', MathSceneNode );

  return inherit( SceneNode, MathSceneNode, {

    // @public @override
    reset: function() {
      SceneNode.prototype.reset.call( this );

      // drawers
      this.equationDrawer.reset( { animationEnabled: false } );
      this.tableDrawer.reset( { animationEnabled: false } );
      this.graphDrawer && this.graphDrawer.reset( { animationEnabled: false } );
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
     * @param {Object} [containerOptions] - see MathFunctionContainer options
     * @returns {FunctionContainer[]}
     * @protected
     * @override
     */
    createFunctionContainers: function( scene, containerOptions ) {

      // whether to show pickers on functions
      containerOptions = containerOptions || {};
      containerOptions.operandMutable = this.operandMutable;

      var functionContainers = [];
      scene.functionData.forEach( function( functionData ) {
        functionContainers.push( new MathFunctionContainer( functionData, containerOptions ) );
      } );
      return functionContainers;
    }
  } );
} );
