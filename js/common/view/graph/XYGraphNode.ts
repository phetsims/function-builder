// Copyright 2016-2023, University of Colorado Boulder

/**
 * XY graph for the 'Equations' screen.
 *
 * The graph has a fixed scale for the x-axis & y-axis; zoom in/out is not supported.
 * By default, (and after many design discussions) the axes have different scales.
 * This was deemed preferable to the usability and implementation issues introduced by adding zoom support.
 *
 * Since changing the graph is relatively inexpensive, this node updates even when it's not visible.
 * Updating only while visible doesn't have significant performance gains, and is not worth the additional
 * code complexity.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Range from '../../../../../dot/js/Range.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import { Shape } from '../../../../../kite/js/imports.js';
import ModelViewTransform2 from '../../../../../phetcommon/js/view/ModelViewTransform2.js';
import ArrowNode from '../../../../../scenery-phet/js/ArrowNode.js';
import MathSymbolFont from '../../../../../scenery-phet/js/MathSymbolFont.js';
import PhetFont from '../../../../../scenery-phet/js/PhetFont.js';
import { Circle, Color, Line, Node, NodeOptions, Path, Rectangle, Text, TPaint } from '../../../../../scenery/js/imports.js';
import functionBuilder from '../../../functionBuilder.js';
import FBConstants from '../../FBConstants.js';
import FBSymbols from '../../FBSymbols.js';
import RationalNumber from '../../model/RationalNumber.js';
import Builder from '../../model/builder/Builder.js';
import Dimension2 from '../../../../../dot/js/Dimension2.js';
import optionize from '../../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../../phet-core/js/types/PickOptional.js';

// constants
const AXIS_OPTIONS = {
  doubleHead: true,
  headWidth: 8,
  headHeight: 8,
  tailWidth: 1,
  fill: 'black',
  stroke: null
};

type SelfOptions = {

  size?: Dimension2; // dimensions of the graph, in view coordinates
  cornerRadius?: number;
  background?: Color | string; // background color of the graph
  xRange?: Range; // range of the x-axis, in model coordinates
  yRange?: Range; // range of the y-axis, in model coordinates

  // grid
  xGridSpacing?: number; // spacing of vertical grid lines, in model coordinates
  yGridSpacing?: number; // spacing of horizontal grid lines, in model coordinates
  gridStroke?: Color | string; // color of the grid
  gridLineWidth?: number; // lineWidth of the grid

  // axis labels
  axisLabelFont?: MathSymbolFont;
  axisLabelColor?: Color | string;

  // ticks
  xTickSpacing?: number; // spacing of x-axis tick marks, in model coordinates
  yTickSpacing?: number; // spacing of y-axis tick marks, in model coordinates
  tickLength?: number; // length of tick lines, in view coordinates
  tickFont?: PhetFont; // font for tick labels
  tickLabelSpace?: number; // space between tick label and line, in view coordinates
  tickStroke?: Color | string;
  tickLineWidth?: number;

  // points
  pointFill?: Color | string; // point color
  pointRadius?: number; // point radius, in view coordinates

  // plotted line
  lineStroke?: Color | string; // color of the plotted line
  lineWidth?: number; // lineWidth of the plotted line
};

export type XYGraphNodeOptions = SelfOptions & PickOptional<Node, 'visible'>;

export default class XYGraphNode extends Node {

  private readonly builder: Builder;
  private readonly xRange: Range;
  private readonly yRange: Range;
  private readonly pointFill: Color | string;
  private readonly pointRadius: number;
  private xCoordinates: RationalNumber[]; // x coordinates (inputs) that are plotted
  private readonly modelViewTransform: ModelViewTransform2;
  private readonly pointsParent: Node;
  private readonly lineNode: Line;

  public constructor( builder: Builder, providedOptions?: XYGraphNodeOptions ) {

    const options = optionize<XYGraphNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      size: FBConstants.GRAPH_DRAWER_SIZE,
      cornerRadius: 0,
      background: 'white',
      xRange: FBConstants.GRAPH_X_RANGE,
      yRange: FBConstants.GRAPH_Y_RANGE,
      xGridSpacing: 1,
      yGridSpacing: 10,
      gridStroke: 'rgb( 200, 200, 200 )',
      gridLineWidth: 0.5,
      axisLabelFont: new MathSymbolFont( 16 ),
      axisLabelColor: 'rgb( 100, 100, 100 )',
      xTickSpacing: 5,
      yTickSpacing: 50,
      tickLength: 5,
      tickFont: new PhetFont( 12 ),
      tickLabelSpace: 2,
      tickStroke: 'black',
      tickLineWidth: 1,
      pointFill: 'magenta',
      pointRadius: 3,
      lineStroke: 'magenta',
      lineWidth: 1
    }, providedOptions );

    // model-view transform
    const xOffset = ( 1 - options.xRange.max / options.xRange.getLength() ) * options.size.width;
    const yOffset = ( 1 - options.yRange.max / options.yRange.getLength() ) * options.size.height;
    const xScale = options.size.width / options.xRange.getLength();
    const yScale = -options.size.height / options.yRange.getLength(); // inverted
    const modelViewTransform = ModelViewTransform2.createOffsetXYScaleMapping( new Vector2( xOffset, yOffset ), xScale, yScale );

    // Perform transforms of common points once
    const viewOrigin = modelViewTransform.modelToViewXY( 0, 0 );
    const viewMinX = modelViewTransform.modelToViewX( options.xRange.min );
    const viewMaxX = modelViewTransform.modelToViewX( options.xRange.max );
    const viewMinY = modelViewTransform.modelToViewY( options.yRange.min );
    const viewMaxY = modelViewTransform.modelToViewY( options.yRange.max );

    const backgroundNode = new Rectangle( viewMinX, viewMaxY,
      modelViewTransform.modelToViewDeltaX( options.xRange.getLength() ),
      -modelViewTransform.modelToViewDeltaY( options.yRange.getLength() ), {
        cornerRadius: options.cornerRadius,
        fill: options.background
      } );

    // grid, drawn using one Shape
    const gridShape = new Shape();

    // vertical lines
    const xMinGridLine = options.xRange.min - ( options.xRange.min % options.xGridSpacing );
    for ( let modelGridX = xMinGridLine; modelGridX <= options.xRange.max; ) {
      const viewGridX = modelViewTransform.modelToViewX( modelGridX );
      gridShape.moveTo( viewGridX, viewMinY );
      gridShape.lineTo( viewGridX, viewMaxY );
      modelGridX += options.xGridSpacing;
    }

    // horizontal lines
    const yMinGridLine = options.yRange.min - ( options.yRange.min % options.yGridSpacing );
    for ( let modelGridY = yMinGridLine; modelGridY <= options.yRange.max; ) {
      const viewGridY = modelViewTransform.modelToViewY( modelGridY );
      gridShape.moveTo( viewMinX, viewGridY );
      gridShape.lineTo( viewMaxX, viewGridY );
      modelGridY += options.yGridSpacing;
    }

    const gridNode = new Path( gridShape, {
      stroke: options.gridStroke,
      lineWidth: options.gridLineWidth
    } );

    // x axis
    const xAxisNode = new ArrowNode( viewMinX, viewOrigin.y, viewMaxX, viewOrigin.y, AXIS_OPTIONS );

    const xAxisLabelNode = new Text( FBSymbols.X, {
      maxWidth: 0.3 * options.size.width,
      font: options.axisLabelFont,
      fill: options.axisLabelColor,
      right: xAxisNode.right - 4,
      bottom: xAxisNode.top - 2
    } );

    // y axis
    const yAxisNode = new ArrowNode( viewOrigin.x, viewMinY, viewOrigin.x, viewMaxY, AXIS_OPTIONS );

    const yAxisLabelNode = new Text( FBSymbols.Y, {
      maxWidth: 0.3 * options.size.width,
      font: options.axisLabelFont,
      fill: options.axisLabelColor,
      left: yAxisNode.right + 2,
      top: yAxisNode.top + 1
    } );

    // tick lines & labels
    const tickLinesShape = new Shape(); // tick lines are drawn using one Shape
    const tickLabelsParent = new Node();

    // x tick marks
    let xMinTick = options.xRange.min - ( options.xRange.min % options.xTickSpacing );
    if ( xMinTick === options.xRange.min ) {
      xMinTick = xMinTick + options.xTickSpacing;
    }
    for ( let modelTickX = xMinTick; modelTickX < options.xRange.max; ) {

      if ( modelTickX !== 0 ) {

        const viewTickX = modelViewTransform.modelToViewX( modelTickX );

        // line
        tickLinesShape.moveTo( viewTickX, viewOrigin.y );
        tickLinesShape.lineTo( viewTickX, viewOrigin.y + options.tickLength );

        // label
        const xTickLabelNode = new Text( modelTickX, {
          font: options.tickFont,
          centerX: viewTickX,
          top: viewOrigin.y + options.tickLength + options.tickLabelSpace
        } );
        tickLabelsParent.addChild( xTickLabelNode );
      }

      modelTickX += options.xTickSpacing;
    }

    // y tick marks
    let yMinTick = options.yRange.min - ( options.yRange.min % options.yTickSpacing );
    if ( yMinTick === options.yRange.min ) {
      yMinTick = yMinTick + options.yTickSpacing;
    }
    for ( let modelTickY = yMinTick; modelTickY < options.yRange.max; ) {

      if ( modelTickY !== 0 ) {

        const viewTickY = modelViewTransform.modelToViewY( modelTickY );

        // line
        tickLinesShape.moveTo( viewOrigin.x, viewTickY );
        tickLinesShape.lineTo( viewOrigin.x - options.tickLength, viewTickY );

        // label
        const yTickLabelNode = new Text( modelTickY, {
          font: options.tickFont,
          right: viewOrigin.x - options.tickLength - options.tickLabelSpace,
          centerY: viewTickY
        } );
        tickLabelsParent.addChild( yTickLabelNode );
      }

      modelTickY += options.yTickSpacing;
    }

    const tickLinesNode = new Path( tickLinesShape, {
      stroke: options.tickStroke,
      lineWidth: options.tickLineWidth
    } );

    // parent for all points
    const pointsParent = new Node();

    // line that corresponds to the function in the builder
    const lineNode = new Line( 0, 0, 1, 0, {
      stroke: options.lineStroke,
      lineWidth: options.lineWidth,
      visible: false
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, gridNode, tickLinesNode, tickLabelsParent,
      xAxisNode, xAxisLabelNode, yAxisNode, yAxisLabelNode, lineNode, pointsParent ];

    super( options );

    this.builder = builder;
    this.xRange = options.xRange;
    this.yRange = options.yRange;
    this.pointFill = options.pointFill;
    this.pointRadius = options.pointRadius;
    this.xCoordinates = []; // {RationalNumber[]} x coordinates (inputs) that are plotted
    this.modelViewTransform = modelViewTransform;
    this.pointsParent = pointsParent;
    this.lineNode = lineNode;

    // Update the graph when the builder functions change.
    // removeListener unnecessary, instances exist for lifetime of the sim
    builder.functionChangedEmitter.addListener( this.update.bind( this ) );
    this.update();
  }

  // Updates plotted elements.
  private update(): void {
    this.updatePoints();
    if ( this.lineNode.visible ) {
      this.updateLine();
    }
  }

  // Updates points.
  private updatePoints(): void {
    const xCoordinates = this.xCoordinates.slice( 0 ); // copy
    this.xCoordinates = [];
    this.pointsParent.removeAllChildren();
    for ( let i = 0; i < xCoordinates.length; i++ ) {
      this.addPointAt( xCoordinates[ i ] );
    }
  }

  // Updates the line.
  private updateLine(): void {
    const yLeft = this.builder.applyAllFunctions( RationalNumber.withInteger( this.xRange.min ) );
    const yRight = this.builder.applyAllFunctions( RationalNumber.withInteger( this.xRange.max ) );
    this.lineNode.setLine(
      this.modelViewTransform.modelToViewX( this.xRange.min ),
      this.modelViewTransform.modelToViewY( yLeft ),
      this.modelViewTransform.modelToViewX( this.xRange.max ),
      this.modelViewTransform.modelToViewY( yRight ) );
  }

  /**
   * Adds a point to the graph.
   */
  public addPointAt( x: RationalNumber ): void {

    assert && assert( !this.xCoordinates.includes( x ), `x is already plotted: ${x}` );

    // add x to list
    this.xCoordinates.push( x );

    // {RationalNumber} compute y based on what is in the builder
    const y = this.builder.applyAllFunctions( x ).valueOf();

    // verify that the point is in range
    const point = new Vector2( x.valueOf(), y.valueOf() );
    assert && assert( this.xRange.contains( point.x ) && this.yRange.contains( point.y ),
      `graphed point out of range: ${point.toString()}` );

    // create the PointNode
    this.pointsParent.addChild( new PointNode( point, this.modelViewTransform, this.pointRadius, this.pointFill ) );
  }

  /**
   * Removes a point from the graph.
   */
  public removePointAt( x: RationalNumber ): void {

    assert && assert( this.xCoordinates.includes( x ), `x is not plotted: ${x}` );

    // remove x from list
    this.xCoordinates.splice( this.xCoordinates.indexOf( x ), 1 );

    // remove associated PointNode
    let removed = false;
    for ( let i = 0; i < this.pointsParent.getChildrenCount() && !removed; i++ ) {

      const pointNode = this.pointsParent.getChildAt( i ) as PointNode;
      assert && assert( pointNode instanceof PointNode ); // eslint-disable-line no-simple-type-checking-assertions

      if ( pointNode.point.x.valueOf() === x.valueOf() ) {
        this.pointsParent.removeChild( pointNode );
        removed = true;
      }
    }
    assert && assert( removed, `x not found: ${x.valueOf()}` );
  }

  /**
   * Shows the line that corresponds to the function in the builder.
   */
  public setLineVisible( visible: boolean ): void {

    // update the line when it becomes visible
    if ( visible && ( this.lineNode.visible !== visible ) ) {
      this.updateLine();
    }

    this.lineNode.visible = visible;
  }
}

class PointNode extends Circle {

  public readonly point: Vector2;

  public constructor( point: Vector2, modelViewTransform: ModelViewTransform2, radius: number, fill: TPaint ) {

    super( {
      radius: radius,
      fill: fill,
      stroke: 'black',
      lineWidth: 0.25
    } );

    this.point = point;
    this.center = modelViewTransform.modelToViewPosition( point );
  }
}

functionBuilder.register( 'XYGraphNode', XYGraphNode );