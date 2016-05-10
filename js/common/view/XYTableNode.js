// Copyright 2016, University of Colorado Boulder

/**
 * XY table
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CarouselButton = require( 'SUN/buttons/CarouselButton' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {Object} options
   * @constructor
   */
  function XYTableNode( options ) {

    options = _.extend( {

      size: FBConstants.TABLE_DRAWER_SIZE,
      numberOfRows: 3,
      cellColor: 'white',
      cornerRadius: 0,

      // column headings
      xSymbol: FBSymbols.X,
      ySymbol: FBSymbols.Y,
      headingFont: new FBFont( 18 ),
      headingYMargin: 2,
      headingBackground: 'rgb( 144, 226, 252 )'

    }, options );

    // table background
    var backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height, {
      fill: options.cellColor,
      cornerRadius: options.cornerRadius
    } );

    // up/down buttons
    var upButton = new CarouselButton( {
      arrowDirection: 'up',
      minWidth: options.size.width,
      cornerRadius: options.cornerRadius
    } );
    var downButton = new CarouselButton( {
      arrowDirection: 'down',
      minWidth: options.size.width,
      cornerRadius: options.cornerRadius,
      bottom: backgroundNode.bottom
    } );

    // column headings
    var xNode = new Text( options.xSymbol, { font: options.headingFont } );
    var yNode = new Text( options.ySymbol, { font: options.headingFont } );
    var headingHeight = Math.max( xNode.height, yNode.height ) + ( 2 * options.headingYMargin );
    var headingBackgroundNode = new Rectangle( 0, 0, options.size.width, headingHeight, {
      fill: options.headingBackground,
      top: upButton.bottom
    } );
    xNode.centerX = 0.25 * headingBackgroundNode.width;
    xNode.centerY = headingBackgroundNode.centerY;
    yNode.centerX = 0.75 * headingBackgroundNode.width;
    yNode.centerY = headingBackgroundNode.centerY;

    // grid, to delineate rows and columns
    var heightForCells = backgroundNode.height - headingBackgroundNode.height - upButton.height - downButton.height;
    var rowHeight = heightForCells / options.numberOfRows;
    var columnX = backgroundNode.width / 2;
    var gridShape = new Shape()
      .moveTo( columnX, upButton.bottom )
      .lineTo( columnX, downButton.top );
    for ( var row = 0; row < options.numberOfRows; row++ ) {
      var rowY = upButton.height + headingBackgroundNode.height + ( row * rowHeight );
      gridShape.moveTo( 0, rowY );
      gridShape.lineTo( backgroundNode.width, rowY );
    }
    var gridNode = new Path( gridShape, {
      stroke: 'black',
      lineWidth: 0.5
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, headingBackgroundNode, gridNode, xNode, yNode, upButton, downButton ];

    Node.call( this, options );
  }

  functionBuilder.register( 'XYTableNode', XYTableNode );

  return inherit( Node, XYTableNode );
} );
