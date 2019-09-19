// Copyright 2015-2019, University of Colorado Boulder

/**
 * Test the image functions that are used in the 'Patterns' screen.
 * Shows what all images look like for all functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // image function modules
  const Erase = require( 'FUNCTION_BUILDER/patterns/model/functions/Erase' );
  const Grayscale = require( 'FUNCTION_BUILDER/patterns/model/functions/Grayscale' );
  const Identity = require( 'FUNCTION_BUILDER/patterns/model/functions/Identity' );
  const InvertRGB = require( 'FUNCTION_BUILDER/patterns/model/functions/InvertRGB' );
  const Mirror = require( 'FUNCTION_BUILDER/patterns/model/functions/Mirror' );
  const MysteryA = require( 'FUNCTION_BUILDER/patterns/model/functions/MysteryA' );
  const MysteryB = require( 'FUNCTION_BUILDER/patterns/model/functions/MysteryB' );
  const MysteryC = require( 'FUNCTION_BUILDER/patterns/model/functions/MysteryC' );
  const Rotate180 = require( 'FUNCTION_BUILDER/patterns/model/functions/Rotate180' );
  const Rotate90 = require( 'FUNCTION_BUILDER/patterns/model/functions/Rotate90' );
  const Shrink = require( 'FUNCTION_BUILDER/patterns/model/functions/Shrink' );
  const Warhol = require( 'FUNCTION_BUILDER/patterns/model/functions/Warhol' );

  // other function-builder modules
  const FBCanvasUtils = require( 'FUNCTION_BUILDER/patterns/model/FBCanvasUtils' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const ImageFunction = require( 'FUNCTION_BUILDER/common/model/functions/ImageFunction' );

  // common modules
  const Carousel = require( 'SUN/Carousel' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const Image = require( 'SCENERY/nodes/Image' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Shape = require( 'KITE/Shape' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // images (input cards)
  const beakerImage = require( 'image!FUNCTION_BUILDER/cards/beaker.png' );
  const butterflyImage = require( 'image!FUNCTION_BUILDER/cards/butterfly.png' );
  const cherriesImage = require( 'image!FUNCTION_BUILDER/cards/cherries.png' );
  const circleImage = require( 'image!FUNCTION_BUILDER/cards/circle.png' );
  const feetImage = require( 'image!FUNCTION_BUILDER/cards/feet.png' );
  const planetImage = require( 'image!FUNCTION_BUILDER/cards/planet.png' );
  const rectangleImage = require( 'image!FUNCTION_BUILDER/cards/rectangle.png' );
  const snowflakeImage = require( 'image!FUNCTION_BUILDER/cards/snowflake.png' );
  const starImage = require( 'image!FUNCTION_BUILDER/cards/star.png' );
  const stickFigureImage = require( 'image!FUNCTION_BUILDER/cards/stickFigure.png' );
  const sunImage = require( 'image!FUNCTION_BUILDER/cards/sun.png' );
  const triangleImage = require( 'image!FUNCTION_BUILDER/cards/triangle.png' );

  /**
   * @param {Bounds2} layoutBounds
   * @returns {Node}
   */
  function testImageFunctions( layoutBounds ) {

    // a canvas for each input image
    var canvases = [
      FBCanvasUtils.createCanvasWithImage( feetImage ),
      FBCanvasUtils.createCanvasWithImage( snowflakeImage ),
      FBCanvasUtils.createCanvasWithImage( butterflyImage ),
      FBCanvasUtils.createCanvasWithImage( stickFigureImage ),
      FBCanvasUtils.createCanvasWithImage( planetImage ),
      FBCanvasUtils.createCanvasWithImage( sunImage ),
      FBCanvasUtils.createCanvasWithImage( beakerImage ),
      FBCanvasUtils.createCanvasWithImage( cherriesImage ),
      FBCanvasUtils.createCanvasWithImage( rectangleImage ),
      FBCanvasUtils.createCanvasWithImage( circleImage ),
      FBCanvasUtils.createCanvasWithImage( triangleImage ),
      FBCanvasUtils.createCanvasWithImage( starImage )
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
      new Shrink(),
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

    return new VBox( {
      children: [ functionsBox, carousel ],
      spacing: 15,
      center: layoutBounds.center
    } );
  }

  functionBuilder.register( 'testImageFunctions', testImageFunctions );

  /**
   * Use this simplified representation so that this test is not dependent on other sim code.
   *
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

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, imageNode ];

    Node.call( this, options );
  }

  inherit( Node, TestCardNode );

  /**
   * Use this simplified representation so that this test is not dependent on other sim code.
   *
   * @param {ImageFunction} functionInstance
   * @param {Object} [options]
   * @constructor
   */
  function TestFunctionNode( functionInstance, options ) {

    assert && assert( functionInstance instanceof ImageFunction );

    options = options || {};

    var WIDTH = 120;
    var HEIGHT = 0.6 * WIDTH;
    var X_INSET = 0.15 * WIDTH;

    // Described from top-left, moving clockwise.
    var backgroundShape = new Shape()
      .moveTo( 0, 0 )
      .lineTo( WIDTH - X_INSET, 0 )
      .lineTo( WIDTH, HEIGHT / 2 )
      .lineTo( WIDTH - X_INSET, HEIGHT )
      .lineTo( 0, HEIGHT )
      .lineTo( X_INSET, HEIGHT / 2 )
      .close();

    var backgroundNode = new Path( backgroundShape, functionInstance.viewOptions );

    var iconNode = new Node( {
      children: [ functionInstance.iconNode ],
      center: backgroundNode.center
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, iconNode ];

    Node.call( this, options );
  }

  inherit( Node, TestFunctionNode );

  return testImageFunctions;
} );