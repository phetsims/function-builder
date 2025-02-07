// Copyright 2016-2024, University of Colorado Boulder

/**
 * Displays the colors used for functions in the Mystery screen.
 * Each row is a mutually-exclusive set of colors, from which 1 color will be chosen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Shape from '../../../../kite/js/Shape.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Color from '../../../../scenery/js/util/Color.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import FBColors from '../../common/FBColors.js';
import functionBuilder from '../../functionBuilder.js';

export default function testMysteryFunctionColors( layoutBounds: Bounds2 ): Node {

  // These names are hard coded to correspond to the pools in FBColors.MYSTERY_COLOR_SETS
  const colorSetNames = [ 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'magenta' ];
  assert && assert( colorSetNames.length === FBColors.MYSTERY_COLOR_SETS.length );

  const vBoxChildren = [];

  for ( let i = 0; i < FBColors.MYSTERY_COLOR_SETS.length; i++ ) {

    const hBoxChildren = [];

    // label to left of row
    hBoxChildren.push( new Text( colorSetNames[ i ], {
      font: new PhetFont( 20 )
    } ) );

    // row of functions
    const colorSet = FBColors.MYSTERY_COLOR_SETS[ i ];
    colorSet.forEach( color => {
      hBoxChildren.push( new TestFunctionNode( color ) );
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

/**
 * Use this simplified representation so that this test is not dependent on other sim code.
 */
class TestFunctionNode extends Node {

  public constructor( fill: TColor ) {

    const WIDTH = 140;
    const HEIGHT = 60;
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
      fill: fill,
      stroke: 'black'
    } );

    const color = Color.toColor( fill );
    const rgbString = `${color.red}, ${color.green}, ${color.blue}`;
    const rgbTextNode = new Text( rgbString, {
      font: new PhetFont( 14 ),
      centerX: functionNode.centerX + ( 0.25 * X_INSET ),
      centerY: functionNode.centerY
    } );

    super( {
      children: [ functionNode, rgbTextNode ]
    } );
  }
}

functionBuilder.register( 'testMysteryFunctionColors', testMysteryFunctionColors );