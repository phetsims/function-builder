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
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Range = require( 'DOT/Range' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );

  // constants
  var POINT_RADIUS = 4;
  var POINT_FILL = 'black';
  var X_AXIS_RANGE = new Range( -5, 15 );
  var Y_AXIS_RANGE = new Range( -5, 15 );
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
      size: FBConstants.GRAPH_DRAWER_SIZE
    }, options );

    var backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height, {
      fill: 'white'
    } );

    // grid
    var gridShape = new Shape();

    // horizontal lines
    var Y_GRID_SPACING = backgroundNode.height / Y_AXIS_RANGE.getLength();
    for ( var row = 1; row < Y_AXIS_RANGE.getLength(); row++ ) {
      gridShape.moveTo( 0, row * Y_GRID_SPACING );
      gridShape.lineTo( backgroundNode.width, row * Y_GRID_SPACING );
    }

    // vertical lines
    var X_GRID_SPACING = backgroundNode.width / X_AXIS_RANGE.getLength();
    for ( var column = 1; column < X_AXIS_RANGE.getLength(); column++ ) {
      gridShape.moveTo( column * X_GRID_SPACING, 0 );
      gridShape.lineTo( column * X_GRID_SPACING, backgroundNode.height );
    }

    var gridNode = new Path( gridShape, {
      stroke: 'rgb( 200, 200, 200 )',
      lineWidth: 0.5
    } );

    // x axis
    var xAxisNode = new ArrowNode( 0, 0, backgroundNode.width, 0, AXIS_OPTIONS );
    xAxisNode.centerY = 0.75 * backgroundNode.height; //TODO compute

    // y axis
    var yAxisNode = new ArrowNode( 0, 0, 0, backgroundNode.height, AXIS_OPTIONS );
    yAxisNode.centerX = 0.25 * backgroundNode.width; //TODO compute

    //TODO temporary, a couple of points
    var pointsParent = new Node();
    pointsParent.addChild( new Circle( POINT_RADIUS, {
      fill: POINT_FILL,
      x: 5 * X_GRID_SPACING,
      y: 10 * Y_GRID_SPACING
    } ) );
    pointsParent.addChild( new Circle( POINT_RADIUS, {
      fill: POINT_FILL,
      x: 6 * X_GRID_SPACING,
      y: 10 * Y_GRID_SPACING
    } ) );
    pointsParent.addChild( new Circle( POINT_RADIUS, {
      fill: POINT_FILL,
      x: 8 * X_GRID_SPACING,
      y: 10 * Y_GRID_SPACING
    } ) );
    pointsParent.addChild( new Circle( POINT_RADIUS, {
      fill: POINT_FILL,
      x: 12 * X_GRID_SPACING,
      y: 10 * Y_GRID_SPACING
    } ) );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, gridNode, xAxisNode, yAxisNode, pointsParent ];

    Node.call( this, options );
  }

  functionBuilder.register( 'XYGraphNode', XYGraphNode );

  return inherit( Node, XYGraphNode );
} );
