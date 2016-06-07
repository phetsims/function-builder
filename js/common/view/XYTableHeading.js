// Copyright 2016, University of Colorado Boulder

//TODO add ability to set cornerRadius for specific corners
/**
 * Column heading for the XY table.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {string} xSymbol - label for the x (input) column
   * @param {string} ySymbol - label for the y (output) column
   * @param {Object} [options]
   * @constructor
   */
  function XYTableHeading( xSymbol, ySymbol, options ) {

    options = _.extend( {
      size: new Dimension2( 100, 25 ),
      font: FBConstants.TABLE_XY_HEADING_FONT,
      xMargin: 10,
      yMargin: 4,
      fill: 'rgb( 144, 226, 252 )'
    }, options );

    var backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height, {
      stroke: 'black',
      lineWidth: 0.5,
      fill: options.fill
    } );

    // constrain column labels to fit in cells
    var xyMaxWidth = ( backgroundNode.width / 2 ) - ( 2 * options.xMargin );
    var xyMaxHeight = backgroundNode.height - ( 2 * options.yMargin );

    var LABEL_OPTIONS = {
      font: options.font,
      maxWidth: xyMaxWidth,
      maxHeight: xyMaxHeight
    };

    var xLabelNode = new Text( xSymbol, _.extend( {}, LABEL_OPTIONS, {
      centerX: 0.25 * backgroundNode.width,
      centerY: backgroundNode.centerY
    } ) );

    var yLabelNode = new Text( ySymbol, _.extend( {}, LABEL_OPTIONS, {
      centerX: 0.75 * backgroundNode.width,
      centerY: backgroundNode.centerY
    } ) );

    // vertical line that separates columns
    var verticalLine = new Line( 0, 0, 0, options.size.height, {
      stroke: 'black',
      lineWidth: 0.5,
      center: backgroundNode.center
    } );

    assert && assert( !options.children );
    options.children = [ backgroundNode, verticalLine, xLabelNode, yLabelNode ];

    Node.call( this, options );
  }

  functionBuilder.register( 'XYTableHeading', XYTableHeading );

  return inherit( Node, XYTableHeading );
} );
