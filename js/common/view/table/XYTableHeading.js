// Copyright 2016-2020, University of Colorado Boulder

/**
 * Column heading for the XY table.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../../dot/js/Dimension2.js';
import Shape from '../../../../../kite/js/Shape.js';
import inherit from '../../../../../phet-core/js/inherit.js';
import merge from '../../../../../phet-core/js/merge.js';
import Line from '../../../../../scenery/js/nodes/Line.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import Path from '../../../../../scenery/js/nodes/Path.js';
import Text from '../../../../../scenery/js/nodes/Text.js';
import functionBuilder from '../../../functionBuilder.js';
import FBConstants from '../../FBConstants.js';

/**
 * @param {string} xSymbol - label for the x (input) column
 * @param {string} ySymbol - label for the y (output) column
 * @param {Object} [options]
 * @constructor
 */
function XYTableHeading( xSymbol, ySymbol, options ) {

  options = merge( {
    size: new Dimension2( 100, 25 ),
    font: FBConstants.TABLE_XY_HEADING_FONT,
    xMargin: 10,
    yMargin: 4,
    fill: 'rgb( 144, 226, 252 )',
    cornerRadii: null // {Object} see Shape.roundedRectangleWithRadii
  }, options );

  const backgroundShape = Shape.roundedRectangleWithRadii( 0, 0, options.size.width, options.size.height, options.cornerRadii );
  const backgroundNode = new Path( backgroundShape, {
    stroke: 'black',
    lineWidth: 0.5,
    fill: options.fill
  } );

  // constrain column labels to fit in cells
  const xyMaxWidth = ( backgroundNode.width / 2 ) - ( 2 * options.xMargin );
  const xyMaxHeight = backgroundNode.height - ( 2 * options.yMargin );

  const LABEL_OPTIONS = {
    font: options.font,
    maxWidth: xyMaxWidth,
    maxHeight: xyMaxHeight
  };

  const xLabelNode = new Text( xSymbol, merge( {}, LABEL_OPTIONS, {
    centerX: 0.25 * backgroundNode.width,
    centerY: backgroundNode.centerY
  } ) );

  const yLabelNode = new Text( ySymbol, merge( {}, LABEL_OPTIONS, {
    centerX: 0.75 * backgroundNode.width,
    centerY: backgroundNode.centerY
  } ) );

  // vertical line that separates columns
  const verticalLine = new Line( 0, 0, 0, options.size.height, {
    stroke: 'black',
    lineWidth: 0.5,
    center: backgroundNode.center
  } );

  assert && assert( !options.children );
  options.children = [ backgroundNode, verticalLine, xLabelNode, yLabelNode ];

  Node.call( this, options );
}

functionBuilder.register( 'XYTableHeading', XYTableHeading );

inherit( Node, XYTableHeading );
export default XYTableHeading;