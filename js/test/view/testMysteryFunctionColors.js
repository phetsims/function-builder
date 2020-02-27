// Copyright 2016-2019, University of Colorado Boulder

/**
 * Displays the colors used for functions in the Mystery screen.
 * Each row is a mutually-exclusive set of colors, from which 1 color will be chosen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import Shape from '../../../../kite/js/Shape.js';
import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import Color from '../../../../scenery/js/util/Color.js';
import FBColors from '../../common/FBColors.js';
import FBFont from '../../common/FBFont.js';
import functionBuilder from '../../functionBuilder.js';

/**
 * @param {Bounds2} layoutBounds
 * @returns {Node}
 */
function testMysteryFunctionColors( layoutBounds ) {

  // These names are hard coded to correspond to the pools in FBColors.MYSTERY_COLOR_SETS
  const colorSetNames = [ 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'magenta' ];
  assert && assert( colorSetNames.length === FBColors.MYSTERY_COLOR_SETS.length );

  const vBoxChildren = [];

  for ( let i = 0; i < FBColors.MYSTERY_COLOR_SETS.length; i++ ) {

    var hBoxChildren = [];

    // label to left of row
    hBoxChildren.push( new Text( colorSetNames[ i ], {
      font: new FBFont( 20 )
    } ) );

    // row of functions
    const colorSet = FBColors.MYSTERY_COLOR_SETS[ i ];
    colorSet.forEach( function( color ) {
      hBoxChildren.push( new TestFunctionNode( { fill: color } ) );
    } );

    vBoxChildren.push( new HBox( {
      children: hBoxChildren,
      spacing: 10
    } ) );
  }

  return new VBox( {
    children: vBoxChildren,
    align: 'right',
    spacing: 10,
    centerX: layoutBounds.centerX,
    centerY: layoutBounds.centerY + 30
  } );
}

functionBuilder.register( 'testMysteryFunctionColors', testMysteryFunctionColors );

/**
 * Use this simplified representation so that this test is not dependent on other sim code.
 *
 * @param {Object} [options]
 * @constructor
 */
function TestFunctionNode( options ) {

  options = merge( {
    size: new Dimension2( 140, 60 ),
    fill: 'white',
    stroke: 'black'
  }, options );

  const WIDTH = options.size.width;
  const HEIGHT = options.size.height;
  const X_INSET = 0.18 * WIDTH;

  // Described from top-left, moving clockwise.
  const functionShape = new Shape()
    .moveTo( 0, 0 )
    .lineTo( WIDTH - X_INSET, 0 )
    .lineTo( WIDTH, HEIGHT / 2 )
    .lineTo( WIDTH - X_INSET, HEIGHT )
    .lineTo( 0, HEIGHT )
    .lineTo( X_INSET, HEIGHT / 2 )
    .close();
  const functionNode = new Path( functionShape, {
    fill: options.fill,
    stroke: options.stroke
  } );

  const color = Color.toColor( options.fill );
  const rgbString = color.red + ', ' + color.green + ', ' + color.blue;
  const rgbTextNode = new Text( rgbString, {
    font: new FBFont( 14 ),
    centerX: functionNode.centerX + ( 0.25 * X_INSET ),
    centerY: functionNode.centerY
  } );

  options.children = [ functionNode, rgbTextNode ];

  Node.call( this, options );
}

inherit( Node, TestFunctionNode );

export default testMysteryFunctionColors;