// Copyright 2015-2024, University of Colorado Boulder

/**
 * Test the image functions that are used in the 'Patterns' screen.
 * Shows what all images look like for all functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import { Shape } from '../../../../kite/js/imports.js';
import { HBox, Image, Node, Path, Rectangle, VBox } from '../../../../scenery/js/imports.js';
import Carousel, { CarouselItem } from '../../../../sun/js/Carousel.js';
import beaker_png from '../../../images/cards/beaker_png.js';
import butterfly_png from '../../../images/cards/butterfly_png.js';
import cherries_png from '../../../images/cards/cherries_png.js';
import circle_png from '../../../images/cards/circle_png.js';
import feet_png from '../../../images/cards/feet_png.js';
import planet_png from '../../../images/cards/planet_png.js';
import rectangle_png from '../../../images/cards/rectangle_png.js';
import snowflake_png from '../../../images/cards/snowflake_png.js';
import star_png from '../../../images/cards/star_png.js';
import stickFigure_png from '../../../images/cards/stickFigure_png.js';
import sun_png from '../../../images/cards/sun_png.js';
import triangle_png from '../../../images/cards/triangle_png.js';
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

export default function testImageFunctions( layoutBounds: Bounds2 ): Node {

  // a canvas for each input image
  const canvases = [
    FBCanvasUtils.createCanvasWithImage( feet_png ),
    FBCanvasUtils.createCanvasWithImage( snowflake_png ),
    FBCanvasUtils.createCanvasWithImage( butterfly_png ),
    FBCanvasUtils.createCanvasWithImage( stickFigure_png ),
    FBCanvasUtils.createCanvasWithImage( planet_png ),
    FBCanvasUtils.createCanvasWithImage( sun_png ),
    FBCanvasUtils.createCanvasWithImage( beaker_png ),
    FBCanvasUtils.createCanvasWithImage( cherries_png ),
    FBCanvasUtils.createCanvasWithImage( rectangle_png ),
    FBCanvasUtils.createCanvasWithImage( circle_png ),
    FBCanvasUtils.createCanvasWithImage( triangle_png ),
    FBCanvasUtils.createCanvasWithImage( star_png )
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
  assert && assert( canvases.length === functions.length );

  // a row of function icons
  const functionsBox = new HBox( {
    children: functions.map( functionInstance => new TestFunctionNode( functionInstance ) ),
    spacing: 21
  } );

  // carousel items, a row for each card
  const items: CarouselItem[] = canvases.map( canvas => {
    return {
      createNode: () => new HBox( {
        spacing: 15,
        children: functions.map( functionInstance => {
          const outputCanvas = functionInstance.applyFunction( canvas );
          return new TestCardNode( outputCanvas );
        } )
      } )
    };
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
   * @param canvas - canvas that contains the card's image
   */
  public constructor( canvas: HTMLCanvasElement ) {

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

    super( {
      children: [ backgroundNode, imageNode ]
    } );
  }
}

/**
 * Use this simplified representation of a function, so that this test is not dependent on other sim code.
 */
class TestFunctionNode extends Node {

  public constructor( functionInstance: ImageFunction ) {

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

    super( {
      children: [ backgroundNode, iconNode ],
      scale: 0.45 // determined empirically, to make functions line up with images in carousel
    } );
  }
}

functionBuilder.register( 'testImageFunctions', testImageFunctions );