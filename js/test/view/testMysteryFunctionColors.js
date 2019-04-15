// Copyright 2016-2017, University of Colorado Boulder

/**
 * Displays the colors used for functions in the Mystery screen.
 * Each row is a mutually-exclusive set of colors, from which 1 color will be chosen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  /**
   * @param {Bounds2} layoutBounds
   * @returns {Node}
   */
  function testMysteryFunctionColors( layoutBounds ) {

    // These names are hard coded to correspond to the pools in FBColors.MYSTERY_COLOR_SETS
    var colorSetNames = [ 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'magenta' ];
    assert && assert( colorSetNames.length === FBColors.MYSTERY_COLOR_SETS.length );

    var vBoxChildren = [];

    for ( var i = 0; i < FBColors.MYSTERY_COLOR_SETS.length; i++ ) {

      var hBoxChildren = [];

      // label to left of row
      hBoxChildren.push( new Text( colorSetNames[ i ], {
        font: new FBFont( 20 )
      } ) );

      // row of functions
      var colorSet = FBColors.MYSTERY_COLOR_SETS[ i ];
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

    options = _.extend( {
      size: new Dimension2( 140, 60 ),
      fill: 'white',
      stroke: 'black'
    }, options );

    var WIDTH = options.size.width;
    var HEIGHT = options.size.height;
    var X_INSET = 0.18 * WIDTH;

    // Described from top-left, moving clockwise.
    var functionShape = new Shape()
      .moveTo( 0, 0 )
      .lineTo( WIDTH - X_INSET, 0 )
      .lineTo( WIDTH, HEIGHT / 2 )
      .lineTo( WIDTH - X_INSET, HEIGHT )
      .lineTo( 0, HEIGHT )
      .lineTo( X_INSET, HEIGHT / 2 )
      .close();
    var functionNode = new Path( functionShape, {
      fill: options.fill,
      stroke: options.stroke
    } );

    var color = Color.toColor( options.fill );
    var rgbString = color.red + ', ' + color.green + ', ' + color.blue;
    var rgbTextNode = new Text( rgbString, {
      font: new FBFont( 14 ),
      centerX: functionNode.centerX + ( 0.25 * X_INSET ),
      centerY: functionNode.centerY
    } );

    options.children = [ functionNode, rgbTextNode ];

    Node.call( this, options );
  }

  inherit( Node, TestFunctionNode );

  return testMysteryFunctionColors;
} );
