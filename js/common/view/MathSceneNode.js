// Copyright 2016-2020, University of Colorado Boulder

/**
 * Base type for scenes that involve math functions.
 * Adds optional drawers to the scene.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import functionBuilder from '../../functionBuilder.js';
import FBConstants from '../FBConstants.js';
import EquationCard from '../model/cards/EquationCard.js';
import NumberCard from '../model/cards/NumberCard.js';
import EquationCardNode from './cards/EquationCardNode.js';
import NumberCardNode from './cards/NumberCardNode.js';
import CardContainer from './containers/CardContainer.js';
import EquationDrawer from './equations/EquationDrawer.js';
import XYGraphDrawer from './graph/XYGraphDrawer.js';
import SceneNode from './SceneNode.js';
import XYTableDrawer from './table/XYTableDrawer.js';

/**
 * @param {Scene} scene - model for this scene
 * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
 * @param {constructor} functionNodeConstructor - constructor for FunctionNode subtype
 * @param {Object} [options]
 * @constructor
 */
function MathSceneNode( scene, layoutBounds, functionNodeConstructor, options ) {

  options = merge( {
    hasTableDrawer: false, // show XY table drawer
    hasGraphDrawer: false, // show XY graph drawer
    hasEquationDrawer: false, // show equation drawer
    tableOptions: null, // {*} options for XYTableNode
    graphOptions: null, // {*} options for XYGraphNode
    equationOptions: null // {*} options for EquationPanel
  }, options );

  SceneNode.call( this, scene, layoutBounds, functionNodeConstructor, options );

  // @public whether the equation is displayed in slope-intercept form
  this.slopeInterceptProperty = new BooleanProperty( false );

  // XY table drawer
  if ( options.hasTableDrawer ) {

    // @private
    this.tableDrawer = new XYTableDrawer( scene.builder, this.inputContainers, this.outputContainers, {
      tableOptions: options.tableOptions,
      bottom: scene.builder.position.y - ( scene.builder.waistHeight / 2 ) + FBConstants.DRAWER_Y_OVERLAP
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
      graphOptions: options.graphOptions,
      bottom: scene.builder.position.y - ( scene.builder.waistHeight / 2 ) + FBConstants.DRAWER_Y_OVERLAP
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
    this.equationDrawer = new EquationDrawer( scene.builder, this.slopeInterceptProperty, {
      equationOptions: options.equationOptions,
      centerX: scene.builder.centerX,
      top: scene.builder.position.y + ( scene.builder.waistHeight / 2 ) - FBConstants.DRAWER_Y_OVERLAP
    } );
    this.drawersLayer.addChild( this.equationDrawer );
  }
}

functionBuilder.register( 'MathSceneNode', MathSceneNode );

export default inherit( SceneNode, MathSceneNode, {

  // @public @override
  reset: function() {

    this.slopeInterceptProperty.reset();

    // disable scrolling animation for the table
    this.tableDrawer && ( this.tableDrawer.contentsNode.animationEnabled = false );
    SceneNode.prototype.reset.call( this );
    this.tableDrawer && ( this.tableDrawer.contentsNode.animationEnabled = true );

    // reset drawers with animation disabled
    const drawerResetOptions = { animationEnabled: false };
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
   * @param {Object} [containerOptions] - see CardContainer options
   * @returns {CardContainer[]}
   * @protected
   * @override
   */
  createCardContainers: function( scene, containerOptions ) {

    const containers = [];

    // numbers
    scene.cardContent.forEach( function( value ) {
      containers.push( new CardContainer( NumberCard, NumberCardNode, value, containerOptions ) );
    } );

    // symbol (eg 'x') is put in the carousel last
    if ( scene.cardSymbol ) {
      containers.push( new CardContainer( EquationCard, EquationCardNode, scene.cardSymbol, containerOptions ) );
    }

    return containers;
  }
} );