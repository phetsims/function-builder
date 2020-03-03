// Copyright 2015-2020, University of Colorado Boulder

/**
 * Test the image functions that are used in the 'Patterns' screen.
 * Shows what all images look like for all functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */


// image function modules
import Shape from '../../../../kite/js/Shape.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import Carousel from '../../../../sun/js/Carousel.js';
import beakerImage from '../../../images/cards/beaker_png.js';
import butterflyImage from '../../../images/cards/butterfly_png.js';
import cherriesImage from '../../../images/cards/cherries_png.js';
import circleImage from '../../../images/cards/circle_png.js';
import feetImage from '../../../images/cards/feet_png.js';
import planetImage from '../../../images/cards/planet_png.js';
import rectangleImage from '../../../images/cards/rectangle_png.js';
import snowflakeImage from '../../../images/cards/snowflake_png.js';
import starImage from '../../../images/cards/star_png.js';
import stickFigureImage from '../../../images/cards/stickFigure_png.js';
import sunImage from '../../../images/cards/sun_png.js';
import triangleImage from '../../../images/cards/triangle_png.js';
import ImageFunction from '../../common/model/functions/ImageFunction.js';
import functionBuilder from '../../functionBuilder.js';
import FBCanvasUtils from '../../patterns/model/FBCanvasUtils.js';
import Erase from '../../patterns/model/functions/Erase.js';
import Grayscale from '../../patterns/model/functions/Grayscale.js';
import Identity from '../../patterns/model/functions/Identity.js';
import InvertRGB from '../../patterns/model/functions/InvertRGB.js';
import Mirror from '../../patterns/model/functions/Mirror.js';
import MysteryA from '../../patterns/model/functions/MysteryA.js';
import MysteryB from '../../patterns/model/functions/MysteryB.js';
import MysteryC from '../../patterns/model/functions/MysteryC.js';
import Rotate180 from '../../patterns/model/functions/Rotate180.js';
import Rotate90 from '../../patterns/model/functions/Rotate90.js';
import Shrink from '../../patterns/model/functions/Shrink.js';
import Warhol from '../../patterns/model/functions/Warhol.js';

// other function-builder modules

// common modules

// images (input cards)

/**
 * @param {Bounds2} layoutBounds
 * @returns {Node}
 */
function testImageFunctions( layoutBounds ) {

  // a canvas for each input image
  const canvases = [
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
  const functions = [
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
  const functionNodes = [];
  functions.forEach( functionInstance => {
    functionNodes.push( new TestFunctionNode( functionInstance, {
      scale: 0.45 // determined empirically, to make functions line up with images in carousel
    } ) );
  } );
  const functionsBox = new HBox( {
    children: functionNodes,
    spacing: 21
  } );

  // carousel items
  const items = [];

  // A row for each card
  canvases.forEach( canvas => {

    const hBoxChildren = [];

    functions.forEach( functionInstance => {
      const outputCanvas = functionInstance.applyFunction( canvas );
      hBoxChildren.push( new TestCardNode( outputCanvas ) );
    } );

    items.push( new HBox( {
      children: hBoxChildren,
      spacing: 15
    } ) );
  } );

  // vertical carousel to show the output images
  const carousel = new Carousel( items, {
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

/**
 * Use this simplified representation of a card, so that this test is not dependent on other sim code.
 */
class TestCardNode extends Node {

  /**
   * @param {HTMLCanvasElement} canvas - canvas that contains the card's image
   * @param {Object} [options]
   */
  constructor( canvas, options ) {

    options = options || {};

    const backgroundNode = new Rectangle( 0, 0, 60, 60, {
      cornerRadius: 5,
      fill: 'white',
      stroke: 'black',
      lineWidth: 1
    } );

    const imageNode = new Image( canvas.toDataURL(), {
      initialWidth: canvas.width,
      initialHeight: canvas.height,
      scale: 0.3,  // determined empirically
      center: backgroundNode.center
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, imageNode ];

    super( options );
  }
}

/**
 * Use this simplified representation of a function, so that this test is not dependent on other sim code.
 */
class TestFunctionNode extends Node {
  /**
   * @param {ImageFunction} functionInstance
   * @param {Object} [options]
   */
  constructor( functionInstance, options ) {

    assert && assert( functionInstance instanceof ImageFunction );

    options = options || {};

    const WIDTH = 120;
    const HEIGHT = 0.6 * WIDTH;
    const X_INSET = 0.15 * WIDTH;

    // Described from top-left, moving clockwise.
    const backgroundShape = new Shape()
      .moveTo( 0, 0 )
      .lineTo( WIDTH - X_INSET, 0 )
      .lineTo( WIDTH, HEIGHT / 2 )
      .lineTo( WIDTH - X_INSET, HEIGHT )
      .lineTo( 0, HEIGHT )
      .lineTo( X_INSET, HEIGHT / 2 )
      .close();

    const backgroundNode = new Path( backgroundShape, functionInstance.viewOptions );

    const iconNode = new Node( {
      children: [ functionInstance.iconNode ],
      center: backgroundNode.center
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, iconNode ];

    super( options );
  }
}

functionBuilder.register( 'testImageFunctions', testImageFunctions );

export default testImageFunctions;