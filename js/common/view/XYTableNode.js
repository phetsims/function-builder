// Copyright 2016, University of Colorado Boulder

/**
 * XY table
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var SlopeInterceptEquationNode = require( 'FUNCTION_BUILDER/common/view/SlopeInterceptEquationNode' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {Object} options
   * @constructor
   */
  function XYTableNode( options ) {

    options = _.extend( {
      size: FBConstants.TABLE_DRAWER_SIZE,
      xString: FBSymbols.X,
      yString: FBSymbols.Y,
      headingFont: new FBFont( 22 )
    }, options );

    var backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height, { fill: 'white' } );

    // column headings
    var xNode = new Text( options.xString, {
      font: options.headingFont,
      centerX: 0.25 * backgroundNode.width,
      top: backgroundNode.top + 6
    } );
    var yNode = new Text( options.yString, {
      font: options.headingFont,
      centerX: 0.75 * backgroundNode.width,
      top: backgroundNode.top + 6
    } );

    //TODO temporary grid
    var NUMBER_OF_ROWS = Math.floor( backgroundNode.height / ( xNode.height + 12 ) );
    var ROW_HEIGHT = backgroundNode.height / NUMBER_OF_ROWS;
    var gridShape = new Shape()
      .moveTo( backgroundNode.width / 2, 0 )
      .lineTo( backgroundNode.width / 2, backgroundNode.height );
    for ( var row = 1; row < NUMBER_OF_ROWS; row++ ) {
      gridShape.moveTo( 0, row * ROW_HEIGHT );
      gridShape.lineTo( backgroundNode.width, row * ROW_HEIGHT );
    }
    var gridNode = new Path( gridShape, {
      stroke: 'black',
      lineWidth: 0.5
    } );

    // TODO temporary, put x in table
    var xValueNode = new Text( FBSymbols.X, {
      font: options.headingFont,
      maxWidth: 0.4 * backgroundNode.width,
      maxHeight: 0.85 * ROW_HEIGHT,
      centerX: 0.25 * backgroundNode.width,
      centerY: backgroundNode.bottom - ROW_HEIGHT / 2
    } );
    var yValueNode = new SlopeInterceptEquationNode( 2, 9, FBSymbols.PLUS, 10, {
      showLeftHandSide: false,
      maxWidth: 0.4 * backgroundNode.width,
      maxHeight: 0.85 * ROW_HEIGHT,
      centerX: 0.75 * backgroundNode.width,
      centerY: backgroundNode.bottom - ROW_HEIGHT / 2
    } );

    // heading background
    var headingBackgroundNode = new Rectangle( 0, 0, backgroundNode.width, ROW_HEIGHT, {
      fill: 'rgb( 144, 226, 252 )' // bright blue
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, headingBackgroundNode, gridNode, xNode, yNode, xValueNode, yValueNode ];

    Node.call( this, options );
  }

  functionBuilder.register( 'XYTableNode', XYTableNode );

  return inherit( Node, XYTableNode );
} );
