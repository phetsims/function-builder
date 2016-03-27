// Copyright 2016, University of Colorado Boulder

//TODO method of adding components, doing layout, handling i18n feels kludgy
/**
 * Displays a scene in the 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CheckBox = require( 'SUN/CheckBox' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Drawer = require( 'FUNCTION_BUILDER/common/view/Drawer' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberCardContainer = require( 'FUNCTION_BUILDER/numbers/view/NumberCardContainer' );
  var NumberFunctionContainer = require( 'FUNCTION_BUILDER/numbers/view/NumberFunctionContainer' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SceneNode = require( 'FUNCTION_BUILDER/common/view/SceneNode' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var simplifyEquationString = require( 'string!FUNCTION_BUILDER/simplifyEquation' );

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

    // @private view-specific properties
    this.simplifyEquationProperty = new Property( false );

    // 'Simplify Equation' check box
    var simplifyEquationCheckBox = new CheckBox( new Text( simplifyEquationString, { font: FBConstants.CHECK_BOX_FONT } ),
      this.simplifyEquationProperty, {
        maxWidth: this.seeInsideCheckBox.maxWidth,
        left: this.seeInsideCheckBox.left,
        top: this.seeInsideCheckBox.bottom + 15
      } );
    this.addChild( simplifyEquationCheckBox );
    simplifyEquationCheckBox.moveToBack();

    // Table drawer
    var tableNode = new Rectangle( 0, 0, 200, 200, {
      fill: 'white',
      stroke: 'black'
    } );
    // @private
    this.tableDrawer = new Drawer( tableNode, {
      open: true,
      handleLocation: 'top',
      centerX: scene.builder.centerX,
      bottom: scene.builder.location.y - 42 //TODO magic number
    } );
    this.addChild( this.tableDrawer );
    this.tableDrawer.moveToBack();

    // Equation drawer
    var equationNode = new Text( '', {
      font: FBConstants.EQUATION_FONT
    } );
    // @private
    var EQUATION_DRAWER_SIZE = new Dimension2( 240, 75 ); //TODO move to FBConstants
    this.equationDrawer = new Drawer( equationNode, {
      open: false,
      handleLocation: 'bottom',
      size: EQUATION_DRAWER_SIZE,
      xMargin: 30,
      yMargin: 10,
      centerX: scene.builder.centerX,
      top: scene.builder.location.y + 42 //TODO magic number
    } );
    this.addChild( this.equationDrawer );
    this.equationDrawer.moveToBack();

    //TODO temporary
    this.simplifyEquationProperty.link( function( simplifyEquation ) {
      equationNode.text = simplifyEquation ? 'simplified equation' : 'unsimplified equation';
      equationNode.centerX = EQUATION_DRAWER_SIZE.width / 2;
      equationNode.centerY = EQUATION_DRAWER_SIZE.height / 2;
    } );
  }

  functionBuilder.register( 'NumbersSceneNode', NumbersSceneNode );

  return inherit( SceneNode, NumbersSceneNode, {

    // @override
    reset: function() {
      SceneNode.prototype.reset.call( this );
      this.simplifyEquationProperty.reset();
      this.equationDrawer.reset();
      this.tableDrawer.reset();
    },

    /**
     * Creates the card containers that go in the card carousels.
     * @param {{NumbersScene}} scene
     * @param {Object} [containerOptions]
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
     * @param {NumbersScene} scene
     * @param {Object} [containerOptions]
     * @returns {NumberFunctionContainer[]}
     * @protected
     * @override
     */
    createFunctionContainers: function( scene, containerOptions ) {
      var functionContainers = [];
      scene.functionConstructors.forEach( function( FunctionConstructor ) {
        functionContainers.push( new NumberFunctionContainer( FunctionConstructor, containerOptions ) );
      } );
      return functionContainers;
    }
  } );
} );
