// Copyright 2016, University of Colorado Boulder

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
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SlopeInterceptEquation = require( 'FUNCTION_BUILDER/common/model/SlopeInterceptEquation' );
  var SlopeInterceptEquationNode = require( 'FUNCTION_BUILDER/common/view/SlopeInterceptEquationNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var simplifyString = require( 'string!FUNCTION_BUILDER/simplify' );

  /**
   * @param {Builder} builder
   * @param {Property.<boolean>} simplifyEquationProperty
   * @param {Object} [options]
   * @constructor
   */
  function EquationPanel( builder, simplifyEquationProperty, options ) {

    options = _.extend( {
      size: FBConstants.EQUATION_DRAWER_SIZE,
      xSymbol: FBSymbols.X, // {string} symbol for x, the input
      ySymbol: FBSymbols.Y // {string} symbol for y, the output
    }, options );

    // @private
    this.builder = builder;
    this.simplifyEquationProperty = simplifyEquationProperty;
    this.xSymbol = options.xSymbol;
    this.ySymbol = options.ySymbol;

    var thisNode = this;

    // @private background
    this.backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height, {
      fill: 'white'
    } );

    // 'Simplify Equation' check box, at bottom center
    var simplifyEquationLabel = new Text( simplifyString, {
      font: FBConstants.CHECK_BOX_FONT,
      maxWidth: 0.9 * options.size.width
    } );
    var simplifyEquationCheckBox = new CheckBox( simplifyEquationLabel, simplifyEquationProperty, {
      centerX: this.backgroundNode.centerX,
      bottom: this.backgroundNode.bottom - 5
    } );
    simplifyEquationCheckBox.touchArea = simplifyEquationCheckBox.localBounds.dilatedXY( 10, 10 );

    // @private initialized by updateEquations
    this.simplifiedEquationNode = null;
    this.unsimplifiedEquationNode = null;

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ this.backgroundNode, simplifyEquationCheckBox ];

    Node.call( this, options );

    // @private constrain equation width to panel
    this.equationMaxWidth = 0.85 * this.backgroundNode.width;

    // @private center of space available for equations
    this.equationCenter = new Vector2(
      this.backgroundNode.centerX,
      this.backgroundNode.top + ( simplifyEquationCheckBox.top - this.backgroundNode.top ) / 2
    );

    simplifyEquationProperty.lazyLink( function( simplifyEquation ) {
      thisNode.simplifiedEquationNode.visible = simplifyEquation;
      thisNode.unsimplifiedEquationNode.visible = !simplifyEquation;
    } );

    builder.functionChangedEmitter.addListener( function() {
      thisNode.updateEquations();
    } );

    this.updateEquations();
  }

  functionBuilder.register( 'EquationPanel', EquationPanel );

  return inherit( Node, EquationPanel, {

    updateEquations: function() {

      // unsimplified (PhET-specific) form
      if ( this.unsimplifiedEquationNode ) {
        this.removeChild( this.unsimplifiedEquationNode );
      }
      //TODO temporary unsimplifiedEquationNode
      this.unsimplifiedEquationNode = new Text( 'unsimplified', {
        font: new FBFont( 20 ),
        maxWidth: this.equationMaxWidth,
        center: this.equationCenter,
        visible: !this.simplifyEquationProperty.get()
      } );
      this.addChild( this.unsimplifiedEquationNode );

      // simplified (slope-intercept) form
      if ( this.simplifiedEquationNode ) {
        this.removeChild( this.simplifiedEquationNode );
      }
      var mathFunctions = this.builder.applyFunctions( [], this.builder.slots.length );
      var slopeInterceptEquation = new SlopeInterceptEquation( this.xSymbol, mathFunctions );
      this.simplifiedEquationNode = new SlopeInterceptEquationNode( slopeInterceptEquation, {
        showLeftHandSide: true,
        xSymbol: this.xSymbol,
        ySymbol: this.ySymbol,
        maxWidth: this.equationMaxWidth,
        center: this.equationCenter,
        visible: this.simplifyEquationProperty.get()
      } );
      this.addChild( this.simplifiedEquationNode );
    }
  } );
} );
