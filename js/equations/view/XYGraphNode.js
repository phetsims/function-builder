// Copyright 2016, University of Colorado Boulder

/**
 * XY graph for the 'Equations' screen.
 *
 * The graph has a fixed scale for the x & y axis; zoom in/out is not supported.
 * By default (and after many design discussions) the axes have different scales.
 * This was deemed preferable to the usability and implementation issues introduced by adding zoom support.
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
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Range = require( 'DOT/Range' );
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

  //TODO temporary constants for dev testing
  var DEV_INPUT_RANGE = new Range( -4, 6 );

  /**
   * @param {Builder} builder
   * @param {Object} [options]
   * @constructor
   */
  function XYGraphNode( builder, options ) {

    options = _.extend( {

      size: FBConstants.GRAPH_DRAWER_SIZE, // {Dimension2} dimensions of the graph, in view coordinates
      background: 'white', // {Color|string} background color of the graph
      xRange: new Range( -7, 7 ), // {Range} of the x axis, in model coordinates
      yRange: new Range( -90, 90 ), // {Range} of the y axis, in model coordinates

      // grid
      xGridSpacing: 1, // {number} spacing of vertical grid lines, in model coordinates
      yGridSpacing: 10, // {number} spacing of horizontal grid lines, in model coordinates
      gridStroke: 'rgb( 200, 200, 200 )', // {Color|string} color of the grid
      gridLineWidth: 0.5, // {number} lineWidth of the grid

      // ticks
      xTickSpacing: 5, // {number} spacing of x-axis tick marks, in model coordinates
      yTickSpacing: 40, // {number} spacing of y-axis tick marks, in model coordinates
      tickLength: 5, // {number} length of tick lines, in view coordinates
      tickFont: new FBFont( 12 ), // {Font} font for tick labels
      tickLabelSpace: 2, // {number} space between tick label and line, in view coordinates

      // points
      pointFill: 'magenta', // {Color|string} point color
      pointRadius: 3, // {number} point radius, in view coordinates

      // plotted line
      lineStroke: 'magenta', // {Color|string} color of the plotted line
      lineWidth: 1 // {number} lineWidth of the plotted line

    }, options );

    // @private
    this.xRange = options.xRange;
    this.yRange = options.yRange;
    this.pointFill = options.pointFill;
    this.pointRadius = options.pointRadius;
    this.lineStroke = options.lineStroke;
    this.lineWidth = options.lineWidth;

    var thisNode = this;

    // model-view transform
    var xOffset = ( 1 - options.xRange.max / options.xRange.getLength() ) * options.size.width;
    var yOffset = ( 1 - options.yRange.max / options.yRange.getLength() ) * options.size.height;
    var xScale = options.size.width / options.xRange.getLength();
    var yScale = -options.size.height / options.yRange.getLength(); // inverted
    // @private
    this.modelViewTransform = ModelViewTransform2.createOffsetXYScaleMapping( new Vector2( xOffset, yOffset ), xScale, yScale );

    var backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height, {
      fill: options.background
    } );

    // grid
    var gridShape = new Shape();

    // vertical lines
    var xMinGridLine = options.xRange.min - ( options.xRange.min % options.xGridSpacing );
    for ( var modelGridX = xMinGridLine; modelGridX <= options.xRange.max; ) {
      var viewGridX = this.modelViewTransform.modelToViewX( modelGridX );
      gridShape.moveTo( viewGridX, 0 );
      gridShape.lineTo( viewGridX, backgroundNode.height );
      modelGridX += options.xGridSpacing;
    }

    // horizontal lines
    var yMinGridLine = options.yRange.min - ( options.yRange.min % options.yGridSpacing );
    for ( var modelGridY = yMinGridLine; modelGridY <= options.yRange.max; ) {
      var viewGridY = this.modelViewTransform.modelToViewY( modelGridY );
      gridShape.moveTo( 0, viewGridY );
      gridShape.lineTo( backgroundNode.width, viewGridY );
      modelGridY += options.yGridSpacing;
    }

    var gridNode = new Path( gridShape, {
      stroke: options.gridStroke,
      lineWidth: options.gridLineWidth
    } );

    var viewOrigin = this.modelViewTransform.modelToViewXY( 0, 0 );

    // x axis
    var xAxisNode = new ArrowNode( 0, 0, backgroundNode.width, 0, AXIS_OPTIONS );
    xAxisNode.centerY = viewOrigin.y;

    // y axis
    var yAxisNode = new ArrowNode( 0, 0, 0, backgroundNode.height, AXIS_OPTIONS );
    yAxisNode.centerX = viewOrigin.x;

    // tick lines & labels
    var tickLinesShape = new Shape();
    var tickLabelsParent = new Node();

    // hoist loop variables
    var viewTickPosition;
    var tickLabelNode;

    // x tick marks
    var xMinTick = options.xRange.min - ( options.xRange.min % options.xTickSpacing );
    if ( xMinTick === options.xRange.min ) {
      xMinTick = xMinTick + options.xTickSpacing;
    }
    for ( var modelTickX = xMinTick; modelTickX < options.xRange.max; ) {

      if ( modelTickX !== 0 ) {

        viewTickPosition = this.modelViewTransform.modelToViewXY( modelTickX, 0 );

        // line
        tickLinesShape.moveTo( viewTickPosition.x, viewTickPosition.y );
        tickLinesShape.lineTo( viewTickPosition.x, viewTickPosition.y + options.tickLength );

        // label
        tickLabelNode = new Text( modelTickX, {
          font: options.tickFont,
          centerX: viewTickPosition.x,
          top: viewTickPosition.y + options.tickLength + options.tickLabelSpace
        } );
        tickLabelsParent.addChild( tickLabelNode );
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

        viewTickPosition = this.modelViewTransform.modelToViewXY( 0, modelTickY );

        // line
        tickLinesShape.moveTo( viewTickPosition.x, viewTickPosition.y );
        tickLinesShape.lineTo( viewTickPosition.x - options.tickLength, viewTickPosition.y );

        // label
        tickLabelNode = new Text( modelTickY, {
          font: options.tickFont,
          right: viewTickPosition.x - options.tickLength - options.tickLabelSpace,
          centerY: viewTickPosition.y
        } );
        tickLabelsParent.addChild( tickLabelNode );
      }

      modelTickY += options.yTickSpacing;
    }

    var tickLinesNode = new Path( tickLinesShape, {
      stroke: 'black',
      lineWidth: 2
    } );

    // @private parent for all points
    this.pointsParent = new Node();

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, gridNode, tickLinesNode, tickLabelsParent, xAxisNode, yAxisNode, this.pointsParent ];

    Node.call( this, options );

    // @private
    this.builder = builder;
    this.builder.functionChangedEmitter.addListener( function() {
       thisNode.updatePoints();
    } );
    this.updatePoints();
  }

  functionBuilder.register( 'XYGraphNode', XYGraphNode );

  inherit( Node, XYGraphNode, {

    //TODO temporary, demonstrate what it looks like with all points and line plotted
    // @private
    updatePoints: function() {

      this.removeAllPoints();

      // points
      for ( var x = DEV_INPUT_RANGE.min; x <= DEV_INPUT_RANGE.max; x++ ) {
        var y = this.builder.applyFunctions( bigRat( x ), this.builder.slots.length ); // {BigRational}
        this.addPoint( new Vector2( x, y.valueOf() ) );
      }

      // line
      var yLeft = this.builder.applyFunctions( bigRat( this.xRange.min ), this.builder.slots.length );
      var yRight = this.builder.applyFunctions( bigRat( this.xRange.max ), this.builder.slots.length );
      this.pointsParent.addChild( new Line(
        this.modelViewTransform.modelToViewX( this.xRange.min ),
        this.modelViewTransform.modelToViewY( yLeft ),
        this.modelViewTransform.modelToViewX( this.xRange.max ),
        this.modelViewTransform.modelToViewY( yRight ), {
          stroke: this.lineStroke,
          lineWidth: this.lineWidth
        }
      ) );
    },

    /**
     * Adds a point to the graph.
     *
     * @param {Vector2} point
     * @public
     */
    addPoint: function( point ) {
      assert && assert( point instanceof Vector2 );
      //TODO verify that point is in range
      this.pointsParent.addChild( new PointNode( point, this.modelViewTransform, {
        radius: this.pointRadius,
        fill: this.pointFill
      } ) );
    },

    /**
     * Removes the first occurrence of a point from the graph.
     *
     * @param {Vector2} point
     * @public
     */
    removePoint: function( point ) {

      assert && assert( point instanceof Vector2 );

      var removed = false;
      for ( var i = 0; i < this.pointsParent.getChildrenCount() && !removed; i++ ) {

        var pointNode = this.pointsParent.getChildAt( i );
        assert && assert( pointNode instanceof PointNode );

        if ( pointNode.point.equals( point ) ) {
          this.pointsParent.removeChild( pointNode );
          removed = true;
        }
      }
      assert && assert( removed, 'point not found: ' + point );
    },

    /**
     * Removes all points from the graph.
     * @public
     */
    removeAllPoints: function() {
      this.pointsParent.removeAllChildren();
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
