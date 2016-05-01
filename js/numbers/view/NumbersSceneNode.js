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
  var NumberCardContainer = require( 'FUNCTION_BUILDER/numbers/view/NumberCardContainer' );
  var NumberFunctionContainer = require( 'FUNCTION_BUILDER/numbers/view/NumberFunctionContainer' );
  var SceneNode = require( 'FUNCTION_BUILDER/common/view/SceneNode' );
  var XYTableNode = require( 'FUNCTION_BUILDER/common/view/XYTableNode' );

  // strings
  var inString = require( 'string!FUNCTION_BUILDER/in' );
  var outString = require( 'string!FUNCTION_BUILDER/out' );

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
      cardCarouselDefaultPageNumber: 1,
      inputLabel: inString,
      outputLabel: outString
    } );

    SceneNode.call( this, scene, layoutBounds, options );

    // add additional view-specific properties
    this.viewProperties.addProperty( 'simplifyEquation', false );

    // Table
    var tableNode = new XYTableNode( {
      xString: inString,
      yString: outString
    } );

    // @private Table drawer
    this.tableDrawer = new Drawer( tableNode, {
      open: false, //TODO should be true by default
      handleLocation: 'top',
      centerX: scene.builder.centerX,
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

  functionBuilder.register( 'NumbersSceneNode', NumbersSceneNode );

  return inherit( SceneNode, NumbersSceneNode, {

    // @override
    reset: function() {
      SceneNode.prototype.reset.call( this );

      // drawers
      this.equationDrawer.reset( { animationEnabled: false } );
      this.tableDrawer.reset( { animationEnabled: false } );
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
     * @returns {NumberFunctionContainer[]}
     * @protected
     * @override
     */
    createFunctionContainers: function( scene, containerOptions ) {
      var functionContainers = [];
      scene.functionData.forEach( function( functionData ) {
        functionContainers.push( new NumberFunctionContainer( functionData, containerOptions ) );
      } );
      return functionContainers;
    }
  } );
} );
