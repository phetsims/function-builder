// Copyright 2016-2024, University of Colorado Boulder

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

import Property from '../../../../../axon/js/Property.js';
import Dimension2 from '../../../../../dot/js/Dimension2.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import optionize from '../../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../../scenery-phet/js/PhetFont.js';
import { Font, Node, NodeOptions, Rectangle, Text } from '../../../../../scenery/js/imports.js';
import Checkbox from '../../../../../sun/js/Checkbox.js';
import functionBuilder from '../../../functionBuilder.js';
import FunctionBuilderStrings from '../../../FunctionBuilderStrings.js';
import FBConstants from '../../FBConstants.js';
import FBSymbols from '../../FBSymbols.js';
import Builder from '../../model/builder/Builder.js';
import HelpfulEquation from '../../model/equations/HelpfulEquation.js';
import SlopeInterceptEquation from '../../model/equations/SlopeInterceptEquation.js';
import HelpfulEquationNode from './HelpfulEquationNode.js';
import SlopeInterceptEquationNode from './SlopeInterceptEquationNode.js';

type SelfOptions = {
  size?: Dimension2;
  cornerRadius?: number;
  xSymbol?: string; // symbol for x, the input
  ySymbol?: string; // symbol for y, the output
  xyFont?: Font; // font for x & y symbols
  xyAsCards?: boolean; // put x & y symbols on a rectangle background, like a card?
  updateEnabled?: boolean; // does this node update when the model changes?
};

export type EquationPanelOptions = SelfOptions;

export default class EquationPanel extends Node {

  private readonly backgroundNode: Node;
  private readonly builder: Builder;
  private readonly slopeInterceptProperty: Property<boolean>;
  private readonly xSymbol: string;
  private readonly ySymbol: string;
  private readonly xyFont: Font;
  private readonly xyAsCards: boolean;
  private _updateEnabled: boolean;
  private dirty: boolean; // does this node need to be updated?

  // Used to constrain equation to available space in panel
  private readonly equationMaxWidth: number;
  private readonly equationMaxHeight: number;

  // center of space available for equations
  private readonly equationCenter: Vector2;

  // null until initialized by updateEquations
  private slopeInterceptEquationNode: Node | null;
  private helpfulEquationNode: Node | null;

  public constructor( builder: Builder, slopeInterceptProperty: Property<boolean>, providedOptions?: EquationPanelOptions ) {

    const options = optionize<EquationPanelOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      size: FBConstants.EQUATION_DRAWER_SIZE,
      cornerRadius: 0,
      xSymbol: FBSymbols.X,
      ySymbol: FBSymbols.Y,
      xyFont: FBConstants.EQUATION_OPTIONS.xyFont,
      xyAsCards: false,
      updateEnabled: true
    }, providedOptions );

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

    this.backgroundNode = backgroundNode;
    this.builder = builder;
    this.slopeInterceptProperty = slopeInterceptProperty;
    this.xSymbol = options.xSymbol;
    this.ySymbol = options.ySymbol;
    this.xyFont = options.xyFont;
    this.xyAsCards = options.xyAsCards;
    this._updateEnabled = options.updateEnabled;
    this.dirty = true; // {boolean} does this node need to be updated?

    this.slopeInterceptEquationNode = null;
    this.helpfulEquationNode = null;

    this.equationMaxWidth = 0.85 * this.backgroundNode.width;
    this.equationMaxHeight = 0.9 * ( simplifyCheckbox.top - this.backgroundNode.top );

    this.equationCenter = new Vector2(
      this.backgroundNode.centerX,
      this.backgroundNode.top + ( simplifyCheckbox.top - this.backgroundNode.top ) / 2
    );

    // Controls which equation is visible.
    // unlink unnecessary, instances exist for lifetime of the sim
    slopeInterceptProperty.lazyLink( slopeIntercept => {

      if ( this.slopeInterceptEquationNode ) {
        this.slopeInterceptEquationNode.visible = slopeIntercept;
      }

      if ( this.helpfulEquationNode ) {
        this.helpfulEquationNode.visible = !slopeIntercept;
      }
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
   */
  private updateEquations(): void {

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
    const helpfulEquation = new HelpfulEquation( mathFunctions, this.xSymbol );
    this.helpfulEquationNode = new HelpfulEquationNode( helpfulEquation, {
      xSymbol: this.xSymbol,
      ySymbol: this.ySymbol,
      xyFont: this.xyFont,
      xyAsCards: this.xyAsCards,
      maxWidth: this.equationMaxWidth,
      maxHeight: this.equationMaxHeight,
      center: this.equationCenter,
      visible: !this.slopeInterceptProperty.value
    } );
    this.addChild( this.helpfulEquationNode );

    // slope-intercept form
    if ( this.slopeInterceptEquationNode ) {
      this.removeChild( this.slopeInterceptEquationNode );
    }
    const slopeInterceptEquation = new SlopeInterceptEquation( mathFunctions, this.xSymbol );
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
        visible: this.slopeInterceptProperty.value
      } );
    this.addChild( this.slopeInterceptEquationNode );

    this.dirty = false;
  }

  /**
   * Determines whether updating of this node is enabled.
   */
  public setUpdateEnabled( updateEnabled: boolean ): void {
    phet.log && phet.log( `${this.constructor.name}.setUpdateEnabled ${updateEnabled}` );
    const wasUpdateEnabled = this._updateEnabled;
    this._updateEnabled = updateEnabled;
    if ( this.dirty && !wasUpdateEnabled && updateEnabled ) {
      this.updateEquations();
    }
  }

  /**
   * Is updating of this node enabled?
   */
  public getUpdateEnabled(): boolean {
    return this._updateEnabled;
  }

  public set updateEnabled( value: boolean ) { this.setUpdateEnabled( value ); }

  public get updateEnabled(): boolean { return this.getUpdateEnabled(); }
}

functionBuilder.register( 'EquationPanel', EquationPanel );