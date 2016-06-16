// Copyright 2016, University of Colorado Boulder

/**
 * Panel that contains:
 * - equation that corresponds to the function in the builder
 * - control for switching the equation's format
 *
 * Performance is optimized so that the panel synchronizes with the model only while updatesEnabled is true.
 * When updatesEnabled is changed from false to true, anything that is 'dirty' is updated.
 * See updatesEnabled and dirty flags.
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
  var HelpfulEquation = require( 'FUNCTION_BUILDER/common/model/equations/HelpfulEquation' );
  var HelpfulEquationNode = require( 'FUNCTION_BUILDER/common/view/equations/HelpfulEquationNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SlopeInterceptEquation = require( 'FUNCTION_BUILDER/common/model/equations/SlopeInterceptEquation' );
  var SlopeInterceptEquationNode = require( 'FUNCTION_BUILDER/common/view/equations/SlopeInterceptEquationNode' );
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
      xyAsCards: false, // {boolean} put x & y symbols on a rectangle background, like a card?
      updateEnabled: true // {boolean} does this node update when the model changes?
    }, options );

    // @private
    this.builder = builder;
    this.slopeInterceptProperty = slopeInterceptProperty;
    this.xSymbol = options.xSymbol;
    this.ySymbol = options.ySymbol;
    this.xyFont = options.xyFont;
    this.xyAsCards = options.xyAsCards;
    this._updateEnabled = options.updateEnabled;
    this.dirty = true; // {boolean} does this node need to be updated?

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
    this.helpfulEquationNode = null;

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
      thisNode.helpfulEquationNode.visible = !slopeIntercept;
    } );

    builder.functionChangedEmitter.addListener( function() {
      thisNode.dirty = true;
      if ( thisNode.updateEnabled ) {
        thisNode.updateEquations();
      }
    } );

    if ( this.updateEnabled ) {
      this.updateEquations();
    }
  }

  functionBuilder.register( 'EquationPanel', EquationPanel );

  return inherit( Node, EquationPanel, {

    /**
     * Updates both equations. Calling this is relatively expensive, since it completely rebuilds the equations
     * and changes the scene graph.
     *
     * @private
     */
    updateEquations: function() {

      assert && assert( this.updateEnabled && this.dirty );

      /*
       * Apply all functions in the builder. Pass in an empty array, because the functions in the builder
       * return MathFunction[], and the input is required to be of the same type as the output.
       */
      var mathFunctions = this.builder.applyAllFunctions( [] );

      // PhET-specific form
      if ( this.helpfulEquationNode ) {
        this.removeChild( this.helpfulEquationNode );
      }
      var helpfulEquation = new HelpfulEquation( mathFunctions, {
        xSymbol: this.xSymbol
      } );
      this.helpfulEquationNode = new HelpfulEquationNode( helpfulEquation, {
        xSymbol: this.xSymbol,
        ySymbol: this.ySymbol,
        xyFont: this.xyFont,
        xyAsCards: this.xyAsCards,
        maxWidth: this.equationMaxWidth,
        maxHeight: this.equationMaxHeight,
        center: this.equationCenter,
        visible: !this.slopeInterceptProperty.get()
      } );
      this.addChild( this.helpfulEquationNode );

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
          maxHeight: this.equationMaxHeight,
          center: this.equationCenter,
          visible: this.slopeInterceptProperty.get()
        } );
      this.addChild( this.slopeInterceptEquationNode );

      this.dirty = false;
    },

    /**
     * Determines whether updating of this node is enabled.
     *
     * @param {boolean} updateEnabled
     * @public
     *
     */
    setUpdateEnabled: function( updateEnabled ) {
      functionBuilder.log && functionBuilder.log( this.constructor.name + '.setUpdateEnabled ' + updateEnabled );
      var wasUpdateEnabled = this._updateEnabled;
      this._updateEnabled = updateEnabled;
      if ( this.dirty && !wasUpdateEnabled && updateEnabled ) {
        this.updateEquations();
      }
    },
    set updateEnabled( value ) { this.setUpdateEnabled( value ); },

    /**
     * Is updating of this node enabled?
     *
     * @returns {boolean}
     * @public
     */
    getUpdateEnabled: function() {
      return this._updateEnabled;
    },
    get updateEnabled() { return this.getUpdateEnabled(); }
  } );
} );