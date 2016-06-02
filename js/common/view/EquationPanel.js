// Copyright 2016, University of Colorado Boulder

//TODO performance: update only what's visible in EquationPanel
/**
 * Panel that contains:
 * - equation that corresponds to the function in the builder
 * - control for switching the equation's format
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CheckBox = require( 'SUN/CheckBox' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetEquation = require( 'FUNCTION_BUILDER/common/model/PhetEquation' );
  var PhetEquationNode = require( 'FUNCTION_BUILDER/common/view/PhetEquationNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SlopeInterceptEquation = require( 'FUNCTION_BUILDER/common/model/SlopeInterceptEquation' );
  var SlopeInterceptEquationNode = require( 'FUNCTION_BUILDER/common/view/SlopeInterceptEquationNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var slopeInterceptString = require( 'string!FUNCTION_BUILDER/slopeIntercept' );

  /**
   * @param {Builder} builder
   * @param {Property.<boolean>} slopeInterceptProperty
   * @param {Object} [options]
   * @constructor
   */
  function EquationPanel( builder, slopeInterceptProperty, options ) {

    options = _.extend( {
      size: FBConstants.EQUATION_DRAWER_SIZE,
      cornerRadius: 0,
      xSymbol: FBSymbols.X, // {string} symbol for x, the input
      ySymbol: FBSymbols.Y, // {string} symbol for y, the output
      xyFont: FBConstants.EQUATION_CARD_XY_FONT, // {Font} for x & y symbols
      xyAsCards: false // {boolean} put x & y symbols on a rectangle background, like a card?
    }, options );

    // @private
    this.builder = builder;
    this.slopeInterceptProperty = slopeInterceptProperty;
    this.xSymbol = options.xSymbol;
    this.ySymbol = options.ySymbol;
    this.xyFont = options.xyFont;
    this.xyAsCards = options.xyAsCards;

    var thisNode = this;

    // @private background
    this.backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height, {
      cornerRadius: options.cornerRadius,
      fill: 'white'
    } );

    // 'slope-intercept' check box, at bottom center
    var slopeInterceptLabel = new Text( slopeInterceptString, {
      font: new FBFont( 16 ),
      maxWidth: 0.9 * this.backgroundNode.width
    } );
    var slopeInterceptCheckBox = new CheckBox( slopeInterceptLabel, slopeInterceptProperty, {
      centerX: this.backgroundNode.centerX,
      bottom: this.backgroundNode.bottom - 10
    } );
    slopeInterceptCheckBox.touchArea = slopeInterceptCheckBox.localBounds.dilatedXY( 10, 10 );

    // @private initialized by updateEquations
    this.slopeInterceptEquationNode = null;
    this.phetEquationNode = null; //TODO what to name this?

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ this.backgroundNode, slopeInterceptCheckBox ];

    Node.call( this, options );

    // @private constrain equation to available space in panel
    this.equationMaxWidth = 0.85 * this.backgroundNode.width;
    this.equationMaxHeight = 0.9 * ( slopeInterceptCheckBox.top - this.backgroundNode.top );

    // @private center of space available for equations
    this.equationCenter = new Vector2(
      this.backgroundNode.centerX,
      this.backgroundNode.top + ( slopeInterceptCheckBox.top - this.backgroundNode.top ) / 2
    );

    slopeInterceptProperty.lazyLink( function( slopeIntercept ) {
      thisNode.slopeInterceptEquationNode.visible = slopeIntercept;
      thisNode.phetEquationNode.visible = !slopeIntercept;
    } );

    builder.functionChangedEmitter.addListener( function() {
      thisNode.updateEquations();
    } );

    this.updateEquations();
  }

  functionBuilder.register( 'EquationPanel', EquationPanel );

  return inherit( Node, EquationPanel, {

    updateEquations: function() {

      // {MathFunction[]} apply all functions in the builder
      var mathFunctions = this.builder.applyAllFunctions( [] ); //TODO [] arg is kind of obtuse

      // PhET-specific form
      if ( this.phetEquationNode ) {
        this.removeChild( this.phetEquationNode );
      }
      var phetEquation = new PhetEquation( mathFunctions, {
        xSymbol: this.xSymbol
      } );
      this.phetEquationNode = new PhetEquationNode( phetEquation, {
        xSymbol: this.xSymbol,
        ySymbol: this.ySymbol,
        xyFont: this.xyFont,
        xyAsCards: this.xyAsCards,
        maxWidth: this.equationMaxWidth,
        maxHeight: this.equationMaxHeight,
        center: this.equationCenter,
        visible: !this.slopeInterceptProperty.get()
      } );
      this.addChild( this.phetEquationNode );

      // slope-intercept form
      if ( this.slopeInterceptEquationNode ) {
        this.removeChild( this.slopeInterceptEquationNode );
      }
      var slopeInterceptEquation = new SlopeInterceptEquation( mathFunctions, {
        xSymbol: this.xSymbol
      } );
      this.slopeInterceptEquationNode = new SlopeInterceptEquationNode(
        slopeInterceptEquation.slope, slopeInterceptEquation.intercept, {
          showLeftHandSide: true, // show 'y =' part of equation
          xSymbol: this.xSymbol,
          ySymbol: this.ySymbol,
          xyFont: this.xyFont,
          xyAsCards: this.xyAsCards,
          maxWidth: this.equationMaxWidth,
          center: this.equationCenter,
          visible: this.slopeInterceptProperty.get()
        } );
      this.addChild( this.slopeInterceptEquationNode );
    }
  } );
} );
