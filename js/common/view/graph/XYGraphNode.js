// Copyright 2016, University of Colorado Boulder

/**
 * XY graph for the 'Equations' screen.
 *
 * The graph has a fixed scale for the x & y axis; zoom in/out is not supported.
 * By default (and after many design discussions) the axes have different scales.
 * This was deemed preferable to the usability and implementation issues introduced by adding zoom support.
 *
 * Since changing the graph is relatively inexpensive, this node updates even when it's not visible.
 * Updating only while visible doesn't have significant performance gains, and is not worth the additional
 * code complexity.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathSymbolFont = require( 'SCENERY_PHET/MathSymbolFont' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var AXIS_OPTIONS = {
    doubleHead: true,
    headWidth: 8,
    headHeight: 8,
    tailWidth: 1,
    fill: 'black',
    stroke: null
  };

  /**
   * @param {Builder} builder
   * @param {Object} [options]
   * @constructor
   */
  function XYGraphNode( builder, options ) {

    options = _.extend( {

      size: FBConstants.GRAPH_DRAWER_SIZE, // {Dimension2} dimensions of the graph, in view coordinates
      cornerRadius: 0,
      background: 'white', // {Color|string} background color of the graph
      xRange: FBConstants.DEFAULT_GRAPH_X_RANGE, // {Range} of the x axis, in model coordinates
      yRange: FBConstants.DEFAULT_GRAPH_Y_RANGE, // {Range} of the y axis, in model coordinates

      // grid
      xGridSpacing: 1, // {number} spacing of vertical grid lines, in model coordinates
      yGridSpacing: 10, // {number} spacing of horizontal grid lines, in model coordinates
      gridStroke: 'rgb( 200, 200, 200 )', // {Color|string} color of the grid
      gridLineWidth: 0.5, // {number} lineWidth of the grid

      // axis labels
      axisLabelFont: new MathSymbolFont( 16 ),
      axisLabelColor: 'rgb( 100, 100, 100 )',

      // ticks
      xTickSpacing: 5, // {number} spacing of x-axis tick marks, in model coordinates
      yTickSpacing: 50, // {number} spacing of y-axis tick marks, in model coordinates
      tickLength: 5, // {number} length of tick lines, in view coordinates
      tickFont: new FBFont( 12 ), // {Font} font for tick labels
      tickLabelSpace: 2, // {number} space between tick label and line, in view coordinates
      tickStroke: 'black', // {Color|string}
      tickLineWidth: 1, // {number}

      // points
      pointFill: 'magenta', // {Color|string} point color
      pointRadius: 3, // {number} point radius, in view coordinates

      // plotted line
      lineStroke: 'magenta', // {Color|string} color of the plotted line
      lineWidth: 1 // {number} lineWidth of the plotted line

    }, options );

    // model-view transform
    var xOffset = ( 1 - options.xRange.max / options.xRange.getLength() ) * options.size.width;
    var yOffset = ( 1 - options.yRange.max / options.yRange.getLength() ) * options.size.height;
    var xScale = options.size.width / options.xRange.getLength();
    var yScale = -options.size.height / options.yRange.getLength(); // inverted
    var modelViewTransform = ModelViewTransform2.createOffsetXYScaleMapping( new Vector2( xOffset, yOffset ), xScale, yScale );

    // Perform transforms of common points once
    var viewOrigin = modelViewTransform.modelToViewXY( 0, 0 );
    var viewMinX = modelViewTransform.modelToViewX( options.xRange.min );
    var viewMaxX = modelViewTransform.modelToViewX( options.xRange.max );
    var viewMinY = modelViewTransform.modelToViewY( options.yRange.min );
    var viewMaxY = modelViewTransform.modelToViewY( options.yRange.max );

    var backgroundNode = new Rectangle( viewMinX, viewMaxY,
      modelViewTransform.modelToViewDeltaX( options.xRange.getLength() ),
      -modelViewTransform.modelToViewDeltaY( options.yRange.getLength() ), {
        cornerRadius: options.cornerRadius,
        fill: options.background
      } );

    // grid, drawn using one Shape
    var gridShape = new Shape();

    // vertical lines
    var xMinGridLine = options.xRange.min - ( options.xRange.min % options.xGridSpacing );
    for ( var modelGridX = xMinGridLine; modelGridX <= options.xRange.max; ) {
      var viewGridX = modelViewTransform.modelToViewX( modelGridX );
      gridShape.moveTo( viewGridX, viewMinY );
      gridShape.lineTo( viewGridX, viewMaxY );
      modelGridX += options.xGridSpacing;
    }

    // horizontal lines
    var yMinGridLine = options.yRange.min - ( options.yRange.min % options.yGridSpacing );
    for ( var modelGridY = yMinGridLine; modelGridY <= options.yRange.max; ) {
      var viewGridY = modelViewTransform.modelToViewY( modelGridY );
      gridShape.moveTo( viewMinX, viewGridY );
      gridShape.lineTo( viewMaxX, viewGridY );
      modelGridY += options.yGridSpacing;
    }

    var gridNode = new Path( gridShape, {
      stroke: options.gridStroke,
      lineWidth: options.gridLineWidth
    } );

    // x axis
    var xAxisNode = new ArrowNode( viewMinX, viewOrigin.y, viewMaxX, viewOrigin.y, AXIS_OPTIONS );

    var xAxisLabelNode = new Text( FBSymbols.X, {
      maxWidth: 0.3 * options.size.width,
      font: options.axisLabelFont,
      fill: options.axisLabelColor,
      right: xAxisNode.right - 4,
      bottom: xAxisNode.top - 2
    } );

    // y axis
    var yAxisNode = new ArrowNode( viewOrigin.x, viewMinY, viewOrigin.x, viewMaxY, AXIS_OPTIONS );

    var yAxisLabelNode = new Text( FBSymbols.Y, {
      maxWidth: 0.3 * options.size.width,
      font: options.axisLabelFont,
      fill: options.axisLabelColor,
      left: yAxisNode.right + 2,
      top: yAxisNode.top + 1
    } );

    // tick lines & labels
    var tickLinesShape = new Shape(); // tick lines are drawn using one Shape
    var tickLabelsParent = new Node();

    // x tick marks
    var xMinTick = options.xRange.min - ( options.xRange.min % options.xTickSpacing );
    if ( xMinTick === options.xRange.min ) {
      xMinTick = xMinTick + options.xTickSpacing;
    }
    for ( var modelTickX = xMinTick; modelTickX < options.xRange.max; ) {

      if ( modelTickX !== 0 ) {

        var viewTickX = modelViewTransform.modelToViewX( modelTickX );

        // line
        tickLinesShape.moveTo( viewTickX, viewOrigin.y );
        tickLinesShape.lineTo( viewTickX, viewOrigin.y + options.tickLength );

        // label
        var xTickLabelNode = new Text( modelTickX, {
          font: options.tickFont,
          centerX: viewTickX,
          top: viewOrigin.y + options.tickLength + options.tickLabelSpace
        } );
        tickLabelsParent.addChild( xTickLabelNode );
      }

      modelTickX += options.xTickSpacing;
    }

    // y tick marks
    var yMinTick = options.yRange.min - ( options.yRange.min % options.yTickSpacing );
    if ( yMinTick === options.yRange.min ) {
      yMinTick = yMinTick + options.yTickSpacing;
    }
    for ( var modelTickY = yMinTick; modelTickY < options.yRange.max; ) {

      if ( modelTickY !== 0 ) {

        var viewTickY = modelViewTransform.modelToViewY( modelTickY );

        // line
        tickLinesShape.moveTo( viewOrigin.x, viewTickY );
        tickLinesShape.lineTo( viewOrigin.x - options.tickLength, viewTickY );

        // label
        var yTickLabelNode = new Text( modelTickY, {
          font: options.tickFont,
          right: viewOrigin.x - options.tickLength - options.tickLabelSpace,
          centerY: viewTickY
        } );
        tickLabelsParent.addChild( yTickLabelNode );
      }

      modelTickY += options.yTickSpacing;
    }

    var tickLinesNode = new Path( tickLinesShape, {
      stroke: options.tickStroke,
      lineWidth: options.tickLineWidth
    } );

    // @private parent for all points
    var pointsParent = new Node();

    // @private line that corresponds to the function in the builder
    var lineNode = new Line( 0, 0, 1, 0, {
      stroke: options.lineStroke,
      lineWidth: options.lineWidth,
      visible: false
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, gridNode, tickLinesNode, tickLabelsParent,
      xAxisNode, xAxisLabelNode, yAxisNode, yAxisLabelNode, lineNode, pointsParent ];

    Node.call( this, options );

    // @private property definitions
    this.builder = builder;
    this.xRange = options.xRange;
    this.yRange = options.yRange;
    this.pointFill = options.pointFill;
    this.pointRadius = options.pointRadius;
    this.xCoordinates = []; // {RationalNumber[]} x coordinates (inputs) that are plotted
    this.modelViewTransform = modelViewTransform;
    this.pointsParent = pointsParent;
    this.lineNode = lineNode;

    builder.functionChangedEmitter.addListener( this.update.bind( this ) );
    this.update();
  }

  functionBuilder.register( 'XYGraphNode', XYGraphNode );

  inherit( Node, XYGraphNode, {

    // @private updates plotted elements
    update: function() {
      this.updatePoints();
      if ( this.lineNode.visible ) {
        this.updateLine();
      }
    },

    // @private updates points
    updatePoints: function() {
      var xCoordinates = this.xCoordinates.slice( 0 ); // copy
      this.xCoordinates = [];
      this.pointsParent.removeAllChildren();
      for ( var i = 0; i < xCoordinates.length; i++ ) {
        this.addPointAt( xCoordinates[ i ] );
      }
    },

    // @private updates the line
    updateLine: function() {
      var yLeft = this.builder.applyAllFunctions( RationalNumber.withInteger( this.xRange.min ) );
      var yRight = this.builder.applyAllFunctions( RationalNumber.withInteger( this.xRange.max ) );
      this.lineNode.setLine(
        this.modelViewTransform.modelToViewX( this.xRange.min ),
        this.modelViewTransform.modelToViewY( yLeft ),
        this.modelViewTransform.modelToViewX( this.xRange.max ),
        this.modelViewTransform.modelToViewY( yRight ) );
    },

    /**
     * Adds a point to the graph.
     *
     * @param {RationalNumber} x
     * @public
     */
    addPointAt: function( x ) {

      assert && assert( x instanceof RationalNumber );
      assert && assert( this.xCoordinates.indexOf( x ) === -1, 'x is already plotted: ' + x );

      // add x to list
      this.xCoordinates.push( x );

      // {RationalNumber} compute y based on what is in the builder
      var y = this.builder.applyAllFunctions( x ).valueOf();

      // verify that the point is in range
      var point = new Vector2( x.valueOf(), y.valueOf() );
      assert && assert( this.xRange.contains( point.x ) && this.yRange.contains( point.y ),
        'graphed point out of range: ' + point.toString() );

      // create the PointNode
      this.pointsParent.addChild( new PointNode( point, this.modelViewTransform, {
        radius: this.pointRadius,
        fill: this.pointFill
      } ) );
    },

    /**
     * Removes a point from the graph.
     *
     * @param {RationalNumber} x
     * @public
     */
    removePointAt: function( x ) {

      assert && assert( x instanceof RationalNumber );
      assert && assert( this.xCoordinates.indexOf( x ) !== -1, 'x is not plotted: ' + x );

      // remove x from list
      this.xCoordinates.splice( this.xCoordinates.indexOf( x ), 1 );

      // remove associated PointNode
      var removed = false;
      for ( var i = 0; i < this.pointsParent.getChildrenCount() && !removed; i++ ) {

        var pointNode = this.pointsParent.getChildAt( i );
        assert && assert( pointNode instanceof PointNode );

        if ( pointNode.point.x.valueOf() === x.valueOf() ) {
          this.pointsParent.removeChild( pointNode );
          removed = true;
        }
      }
      assert && assert( removed, 'x not found: ' + x.valueOf() );
    },

    /**
     * Shows the line that corresponds to the function in the builder.
     *
     * @param {boolean} visible
     * @public
     */
    setLineVisible: function( visible ) {

      // update the line when it becomes visible
      if ( visible && ( this.lineNode.visible !== visible ) ) {
        this.updateLine();
      }

      this.lineNode.visible = visible;
    }
  } );

  /**
   * @param {Vector2} point
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   * @constructor
   */
  function PointNode( point, modelViewTransform, options ) {

    options = _.extend( {
      radius: 1,
      fill: 'white',
      stroke: 'black',
      lineWidth: 0.25
    }, options );

    this.point = point;

    Circle.call( this, options.radius, options );
    this.center = modelViewTransform.modelToViewPosition( point );
  }

  functionBuilder.register( 'XYGraphNode.PointNode', PointNode );

  inherit( Circle, PointNode );

  return XYGraphNode;
} );
