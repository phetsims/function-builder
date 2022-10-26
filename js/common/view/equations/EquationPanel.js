// Copyright 2016-2022, University of Colorado Boulder

/**
 * Panel that contains:
 * - equations that correspond to functions in the builder, in two forms
 * - control for switching between equation forms
 *
 * Performance is optimized so that the panel synchronizes with the model only while updatesEnabled is true.
 * When updatesEnabled is changed from false to true, anything that is 'dirty' is updated.
 * See updatesEnabled and dirty flags.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import merge from '../../../../../phet-core/js/merge.js';
import PhetFont from '../../../../../scenery-phet/js/PhetFont.js';
import { Node, Rectangle, Text } from '../../../../../scenery/js/imports.js';
import Checkbox from '../../../../../sun/js/Checkbox.js';
import functionBuilder from '../../../functionBuilder.js';
import FunctionBuilderStrings from '../../../FunctionBuilderStrings.js';
import FBConstants from '../../FBConstants.js';
import FBQueryParameters from '../../FBQueryParameters.js';
import FBSymbols from '../../FBSymbols.js';
import HelpfulEquation from '../../model/equations/HelpfulEquation.js';
import SlopeInterceptEquation from '../../model/equations/SlopeInterceptEquation.js';
import HelpfulEquationNode from './HelpfulEquationNode.js';
import SlopeInterceptEquationNode from './SlopeInterceptEquationNode.js';

class EquationPanel extends Node {

  /**
   * @param {Builder} builder
   * @param {Property.<boolean>} slopeInterceptProperty - display the equation in slope-intercept form?
   * @param {Object} [options]
   */
  constructor( builder, slopeInterceptProperty, options ) {

    options = merge( {
      size: FBConstants.EQUATION_DRAWER_SIZE,
      cornerRadius: 0,
      xSymbol: FBSymbols.X, // {string} symbol for x, the input
      ySymbol: FBSymbols.Y, // {string} symbol for y, the output
      xyFont: FBConstants.EQUATION_OPTIONS.xyFont, // {Font} for x & y symbols
      xyAsCards: false, // {boolean} put x & y symbols on a rectangle background, like a card?
      updateEnabled: true // {boolean} does this node update when the model changes?
    }, options );

    // background
    const backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height, {
      cornerRadius: options.cornerRadius,
      fill: 'white'
    } );

    // 'simplify' checkbox, at bottom center
    const simplifyLabel = new Text( FunctionBuilderStrings.simplifyStringProperty, {
      font: new PhetFont( 16 ),
      maxWidth: 0.75 * backgroundNode.width
    } );
    const simplifyCheckbox = new Checkbox( slopeInterceptProperty, simplifyLabel, {
      centerX: backgroundNode.centerX,
      bottom: backgroundNode.bottom - 10
    } );
    simplifyCheckbox.touchArea = simplifyCheckbox.localBounds.dilatedXY( 10, 10 );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, simplifyCheckbox ];

    super( options );

    // @private
    this.backgroundNode = backgroundNode;
    this.builder = builder;
    this.slopeInterceptProperty = slopeInterceptProperty;
    this.xSymbol = options.xSymbol;
    this.ySymbol = options.ySymbol;
    this.xyFont = options.xyFont;
    this.xyAsCards = options.xyAsCards;
    this._updateEnabled = options.updateEnabled;
    this.dirty = true; // {boolean} does this node need to be updated?

    // @private initialized by updateEquations
    this.slopeInterceptEquationNode = null;
    this.helpfulEquationNode = null;

    // @private constrain equation to available space in panel
    this.equationMaxWidth = 0.85 * this.backgroundNode.width;
    this.equationMaxHeight = 0.9 * ( simplifyCheckbox.top - this.backgroundNode.top );

    // @private center of space available for equations
    this.equationCenter = new Vector2(
      this.backgroundNode.centerX,
      this.backgroundNode.top + ( simplifyCheckbox.top - this.backgroundNode.top ) / 2
    );

    // Controls which equation is visible.
    // unlink unnecessary, instances exist for lifetime of the sim
    slopeInterceptProperty.lazyLink( slopeIntercept => {
      this.slopeInterceptEquationNode.visible = slopeIntercept;
      this.helpfulEquationNode.visible = !slopeIntercept;
    } );

    // Updates equations when functions in the builder change.
    // removeListener unnecessary, instances exist for lifetime of the sim
    builder.functionChangedEmitter.addListener( () => {
      this.dirty = true;
      if ( this.updateEnabled ) {
        this.updateEquations();
      }
    } );

    if ( this.updateEnabled ) {
      this.updateEquations();
    }
  }

  /**
   * Updates both equations. Calling this is relatively expensive, since it completely rebuilds the equations
   * and changes the scene graph.
   * @private
   */
  updateEquations() {

    assert && assert( this.updateEnabled && this.dirty );

    /*
     * Apply all functions in the builder. Pass in an empty array, because the functions in the builder
     * return MathFunction[], and the input is required to be of the same type as the output.
     */
    const mathFunctions = this.builder.applyAllFunctions( [] );

    // PhET-specific form
    if ( this.helpfulEquationNode ) {
      this.removeChild( this.helpfulEquationNode );
    }
    const helpfulEquation = new HelpfulEquation( mathFunctions, {
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
    const slopeInterceptEquation = new SlopeInterceptEquation( mathFunctions, {
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
  }

  /**
   * Determines whether updating of this node is enabled.
   * @param {boolean} updateEnabled
   * @public
   */
  setUpdateEnabled( updateEnabled ) {
    FBQueryParameters.log && console.log( `${this.constructor.name}.setUpdateEnabled ${updateEnabled}` );
    const wasUpdateEnabled = this._updateEnabled;
    this._updateEnabled = updateEnabled;
    if ( this.dirty && !wasUpdateEnabled && updateEnabled ) {
      this.updateEquations();
    }
  }

  set updateEnabled( value ) { this.setUpdateEnabled( value ); }

  /**
   * Is updating of this node enabled?
   * @returns {boolean}
   * @public
   */
  getUpdateEnabled() {
    return this._updateEnabled;
  }

  get updateEnabled() { return this.getUpdateEnabled(); }
}

functionBuilder.register( 'EquationPanel', EquationPanel );

export default EquationPanel;