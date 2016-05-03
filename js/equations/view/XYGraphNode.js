// Copyright 2016, University of Colorado Boulder

/**
 * XY graph for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Range = require( 'DOT/Range' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var POINT_RADIUS = 3;
  var POINT_FILL = 'black';
  var AXIS_OPTIONS = {
    doubleHead: true,
    headWidth: 8,
    headHeight: 8,
    tailWidth: 1,
    fill: 'black',
    stroke: null
  };

  /**
   * @param {Object} [options]
   * @constructor
   */
  function XYGraphNode( options ) {

    options = _.extend( {
      size: FBConstants.GRAPH_DRAWER_SIZE,
      xRange: new Range( -100, 100 ),
      yRange: new Range( -100, 100 ),
      xGridSpacing: 10,
      yGridSpacing: 10,
      xTickSpacing: 50,
      yTickSpacing: 50
    }, options );

    // model-view transform
    var xOffset = ( 1 - options.xRange.max / options.xRange.getLength() ) * options.size.width;
    var yOffset = ( 1 - options.yRange.max / options.yRange.getLength() ) * options.size.height;
    var xScale = options.size.width / options.xRange.getLength();
    var yScale = -options.size.height / options.yRange.getLength(); // inverted
    var modelViewTransform = ModelViewTransform2.createOffsetXYScaleMapping( new Vector2( xOffset, yOffset ), xScale, yScale );

    var backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height, {
      fill: 'white'
    } );

    // grid
    var gridShape = new Shape();

    // vertical lines
    for ( var x = options.xRange.min + options.xGridSpacing; x < options.xRange.max; ) {
      var viewX = modelViewTransform.modelToViewX( x );
      gridShape.moveTo( viewX, 0 );
      gridShape.lineTo( viewX, backgroundNode.height );
      x += options.xGridSpacing;
    }

    // horizontal lines
    for ( var y = options.yRange.min + options.yGridSpacing; y < options.yRange.max; ) {
      var viewY = modelViewTransform.modelToViewY( y );
      gridShape.moveTo( 0, viewY );
      gridShape.lineTo( backgroundNode.width, viewY );
      y += options.yGridSpacing;
    }

    var gridNode = new Path( gridShape, {
      stroke: 'rgb( 200, 200, 200 )',
      lineWidth: 0.5
    } );

    var viewOrigin = modelViewTransform.modelToViewXY( 0, 0 );

    // x axis
    var xAxisNode = new ArrowNode( 0, 0, backgroundNode.width, 0, AXIS_OPTIONS );
    xAxisNode.centerY = viewOrigin.y;

    // y axis
    var yAxisNode = new ArrowNode( 0, 0, 0, backgroundNode.height, AXIS_OPTIONS );
    yAxisNode.centerX = viewOrigin.x;

    //TODO temporary, demonstrate a few points
    var pointsParent = new Node();
    var points = [
      new Vector2( 0, 0 ),
      new Vector2( 20, 20 ),
      new Vector2( 40, 40 ),
      new Vector2( 60, 60 ),
      new Vector2( 80, 80 )
    ];
    points.forEach( function( point ) {
      pointsParent.addChild( new Circle( POINT_RADIUS, {
        fill: POINT_FILL,
        center: modelViewTransform.modelToViewPosition( point )
      } ) );
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, gridNode, xAxisNode, yAxisNode, pointsParent ];

    Node.call( this, options );
  }

  functionBuilder.register( 'XYGraphNode', XYGraphNode );

  return inherit( Node, XYGraphNode );
} );
