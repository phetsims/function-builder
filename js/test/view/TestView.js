// Copyright 2015, University of Colorado Boulder

/**
 * View for the 'Test' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CanvasUtils = require( 'FUNCTION_BUILDER/common/model/CanvasUtils' );
  var Carousel = require( 'SUN/Carousel' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Shape = require( 'KITE/Shape' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // functions
  var Erase = require( 'FUNCTION_BUILDER/patterns/model/functions/Erase' );
  var Grayscale = require( 'FUNCTION_BUILDER/patterns/model/functions/Grayscale' );
  var Identity = require( 'FUNCTION_BUILDER/patterns/model/functions/Identity' );
  var InvertRGB = require( 'FUNCTION_BUILDER/patterns/model/functions/InvertRGB' );
  var Mirror = require( 'FUNCTION_BUILDER/patterns/model/functions/Mirror' );
  var MysteryA = require( 'FUNCTION_BUILDER/patterns/model/functions/MysteryA' );
  var MysteryB = require( 'FUNCTION_BUILDER/patterns/model/functions/MysteryB' );
  var MysteryC = require( 'FUNCTION_BUILDER/patterns/model/functions/MysteryC' );
  var Rotate90 = require( 'FUNCTION_BUILDER/patterns/model/functions/Rotate90' );
  var Rotate180 = require( 'FUNCTION_BUILDER/patterns/model/functions/Rotate180' );
  var Shrink75 = require( 'FUNCTION_BUILDER/patterns/model/functions/Shrink75' );
  var Warhol = require( 'FUNCTION_BUILDER/patterns/model/functions/Warhol' );

  // input card images
  var beakerImage = require( 'image!FUNCTION_BUILDER/inputs/beaker.png' );
  var butterflyImage = require( 'image!FUNCTION_BUILDER/inputs/butterfly.png' );
  var cherriesImage = require( 'image!FUNCTION_BUILDER/inputs/cherries.png' );
  var circleImage = require( 'image!FUNCTION_BUILDER/inputs/circle.png' );
  var feetImage = require( 'image!FUNCTION_BUILDER/inputs/feet.png' );
  var planetImage = require( 'image!FUNCTION_BUILDER/inputs/planet.png' );
  var rectangleImage = require( 'image!FUNCTION_BUILDER/inputs/rectangle.png' );
  var snowflakeImage = require( 'image!FUNCTION_BUILDER/inputs/snowflake.png' );
  var starImage = require( 'image!FUNCTION_BUILDER/inputs/star.png' );
  var stickFigureImage = require( 'image!FUNCTION_BUILDER/inputs/stickFigure.png' );
  var sunImage = require( 'image!FUNCTION_BUILDER/inputs/sun.png' );
  var triangleImage = require( 'image!FUNCTION_BUILDER/inputs/triangle.png' );

  /**
   * @constructor
   */
  function TestView() {

    ScreenView.call( this, FBConstants.SCREEN_VIEW_OPTIONS );

    // a canvas for each input image
    var canvases = [
      CanvasUtils.createCanvasWithImage( feetImage ),
      CanvasUtils.createCanvasWithImage( snowflakeImage ),
      CanvasUtils.createCanvasWithImage( butterflyImage ),
      CanvasUtils.createCanvasWithImage( stickFigureImage ),
      CanvasUtils.createCanvasWithImage( planetImage ),
      CanvasUtils.createCanvasWithImage( sunImage ),
      CanvasUtils.createCanvasWithImage( beakerImage ),
      CanvasUtils.createCanvasWithImage( cherriesImage ),
      CanvasUtils.createCanvasWithImage( rectangleImage ),
      CanvasUtils.createCanvasWithImage( circleImage ),
      CanvasUtils.createCanvasWithImage( triangleImage ),
      CanvasUtils.createCanvasWithImage( starImage )
    ];

    // functions to be applied to the images
    var functions = [
      new Identity(),
      new Mirror(),
      new Rotate90(),
      new Grayscale(),
      new Rotate180(),
      new InvertRGB(),
      new Erase(),
      new Shrink75(),
      new Warhol(),
      new MysteryA(),
      new MysteryB(),
      new MysteryC()
    ];

    // a row of function icons
    var functionNodes = [];
    functions.forEach( function( functionInstance ) {
      functionNodes.push( new TestFunctionNode( functionInstance, {
        scale: 0.45 // determined empirically, to make functions line up with images in carousel
      } ) );
    } );
    var functionsBox = new HBox( {
      children: functionNodes,
      spacing: 21
    } );

    // carousel items
    var items = [];

    // A row for each card
    canvases.forEach( function( canvas ) {

      var hBoxChildren = [];

      functions.forEach( function( functionInstance ) {
        var outputCanvas = functionInstance.apply( canvas );
        hBoxChildren.push( new TestCardNode( outputCanvas ) );
      } );

      items.push( new HBox( {
        children: hBoxChildren,
        spacing: 15
      } ) );
    } );

    // vertical carousel to show the output images
    var carousel = new Carousel( items, {
      orientation: 'vertical',
      separatorsVisible: true,
      itemsPerPage: 4
    } );

    this.addChild( new VBox( {
      children: [ functionsBox, carousel ],
      spacing: 15,
      center: this.layoutBounds.center
    } ) );
  }

  functionBuilder.register( 'TestView', TestView );

  inherit( ScreenView, TestView );

  /**
   * @param {HTMLCanvasElement} canvas - canvas that contains the card's image
   * @param {Object} [options]
   * @constructor
   */
  function TestCardNode( canvas, options ) {

    options = options || {};

    var backgroundNode = new Rectangle( 0, 0, 60, 60, {
      cornerRadius: 5,
      fill: 'white',
      stroke: 'black',
      lineWidth: 1
    } );

    var imageNode = new Image( canvas.toDataURL(), {
      initialWidth: canvas.width,
      initialHeight: canvas.height,
      scale: 0.3,  // determined empirically
      center: backgroundNode.center
    } );

    options.children = [ backgroundNode, imageNode ];
    Node.call( this, options );
  }

  functionBuilder.register( 'TestCardNode', TestCardNode );

  inherit( Node, TestCardNode );

  /**
   * @param {AbstractFunction} functionInstance
   * @param {Object} [options]
   * @constructor
   */
  function TestFunctionNode( functionInstance, options ) {

    var WIDTH = 120;
    var HEIGHT = 0.6 * WIDTH;
    var X_INSERT = 0.15 * WIDTH;

    var backgroundShape = new Shape()
      .moveTo( X_INSERT, HEIGHT / 2 )
      .lineTo( 0, 0 )
      .lineTo( WIDTH - X_INSERT, 0 )
      .lineTo( WIDTH, HEIGHT / 2 )
      .lineTo( WIDTH - X_INSERT, HEIGHT )
      .lineTo( 0, HEIGHT )
      .close();

    var backgroundNode = new Path( backgroundShape, {
      fill: functionInstance.fill,
      stroke: functionInstance.stroke,
      lineWidth: functionInstance.lineWidth,
      lineDash: functionInstance.lineDash
    } );

    var wrapperNode = new Node( {
      children: [ new Image( functionInstance.image ) ],
      scale: 0.3
    } );
    wrapperNode.center = backgroundNode.center;

    options.children = [ backgroundNode, wrapperNode ];
    Node.call( this, options );
  }

  functionBuilder.register( 'TestFunctionNode', TestFunctionNode );

  inherit( Node, TestFunctionNode );

  return TestView;
} );