// Copyright 2016, University of Colorado Boulder

/**
 * Displays a scene in the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Drawer = require( 'FUNCTION_BUILDER/common/view/Drawer' );
  var EquationsCardContainer = require( 'FUNCTION_BUILDER/equations/view/EquationsCardContainer' );
  var EquationsFunctionContainer = require( 'FUNCTION_BUILDER/equations/view/EquationsFunctionContainer' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumbersCardContainer = require( 'FUNCTION_BUILDER/numbers/view/NumbersCardContainer' );
  var NumbersSceneNode = require( 'FUNCTION_BUILDER/numbers/view/NumbersSceneNode' );
  var XYGraphNode = require( 'FUNCTION_BUILDER/common/view/XYGraphNode' );

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

    NumbersSceneNode.call( this, scene, layoutBounds, options );

    // add additional view-specific properties
    this.viewProperties.addProperty( 'simplifyEquation', false );

    // relocate the table, to make room for the graph
    this.tableDrawer.right = scene.builder.centerX - 10;
    this.tableDrawer.bottom = scene.builder.location.y - ( scene.builder.waistHeight / 2 ) + DRAWER_Y_OVERLAP;

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
      if ( outputContainer instanceof NumbersCardContainer ) {

        // When a number is added to the output carousel, add its corresponding point to the graph.
        outputContainer.addFirstCallback = function( value ) { graphNode.addPointAt( value ); };

        // When a number is removed from the output carousel, remove its corresponding point from the graph.
        outputContainer.removeLastCallback = function( value ) { graphNode.removePointAt( value ); };
      }
      else if ( outputContainer instanceof EquationsCardContainer ) {

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

  functionBuilder.register( 'EquationsSceneNode', EquationsSceneNode );

  return inherit( NumbersSceneNode, EquationsSceneNode, {

    // @public @override
    reset: function() {
      NumbersSceneNode.prototype.reset.call( this );
      this.graphDrawer.reset( { animationEnabled: false } );
    },

    /**
     * Creates the card containers that go in the card carousels.
     *
     * @param {Scene} scene
     * @param {Object} [containerOptions] - see NumbersCardContainer and EquationsCardContainer options
     * @returns {CardContainer[]}
     * @protected
     * @override
     */
    createCardContainers: function( scene, containerOptions ) {

      // numbers
      var containers = NumbersSceneNode.prototype.createCardContainers.call( this, scene, containerOptions );

      // symbols, eg 'x'
      scene.cardSymbols.forEach( function( value ) {
        containers.push( new EquationsCardContainer( value, containerOptions ) );
      } );

      return containers;
    },

    /**
     * Creates the function containers that go in the function carousel.
     *
     * @param {Scene} scene
     * @param {Object} [containerOptions] - see EquationsFunctionContainer options
     * @returns {FunctionContainer[]}
     * @protected
     * @override
     */
    createFunctionContainers: function( scene, containerOptions ) {
      var functionContainers = [];
      scene.functionData.forEach( function( functionData ) {
        functionContainers.push( new EquationsFunctionContainer( functionData, containerOptions ) );
      } );
      return functionContainers;
    }
  } );
} );
