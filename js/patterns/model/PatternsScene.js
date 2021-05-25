// Copyright 2015-2021, University of Colorado Boulder

/**
 * Scene for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
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
import FBConstants from '../../common/FBConstants.js';
import Builder from '../../common/model/builder/Builder.js';
import FunctionCreator from '../../common/model/functions/FunctionCreator.js';
import Scene from '../../common/model/Scene.js';
import FBIconFactory from '../../common/view/FBIconFactory.js';
import functionBuilder from '../../functionBuilder.js';
import Erase from './functions/Erase.js';
import Grayscale from './functions/Grayscale.js';
import Identity from './functions/Identity.js';
import InvertRGB from './functions/InvertRGB.js';
import Mirror from './functions/Mirror.js';
import MysteryA from './functions/MysteryA.js';
import MysteryB from './functions/MysteryB.js';
import MysteryC from './functions/MysteryC.js';
import Rotate180 from './functions/Rotate180.js';
import Rotate90 from './functions/Rotate90.js';
import Shrink from './functions/Shrink.js';
import Warhol from './functions/Warhol.js';

class PatternsScene extends Scene {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      numberOfSlots: 1, // number of slots in the builder
      numberOfEachCard: 1, // number of instances of each card type
      numberOfEachFunction: 1 // number of instances of each function type
    }, options );

    assert && assert( !options.iconNode );
    options.iconNode = FBIconFactory.createSceneIcon( options.numberOfSlots );

    // {HTMLImageElement[]} images for the input cards, in the order that they appear in the carousel
    const cardContent = [
      feetImage,
      snowflakeImage,
      butterflyImage,
      stickFigureImage,
      planetImage,
      sunImage,
      beakerImage,
      cherriesImage,
      rectangleImage,
      circleImage,
      triangleImage,
      starImage
    ];

    // All card images must have even dimensions, so that functions exhibit symmetry where expected, and to prevent anti-aliasing artifacts.
    // See https://github.com/phetsims/function-builder/issues/109 and https://github.com/phetsims/function-builder-basics/issues/18
    assert && cardContent.forEach( image => {
      assert( ( image.width % 2 === 0 && image.height % 2 === 0 ), `dimensions must be even! width=${image.width}, height=${image.height}` );
    } );

    // {FunctionCreator[]} function creators, in the order that functions appear in the carousel
    const functionCreators = [
      new FunctionCreator( Mirror ),
      new FunctionCreator( Rotate90 ),
      new FunctionCreator( Grayscale ),
      new FunctionCreator( Rotate180 ),
      new FunctionCreator( Identity ),
      new FunctionCreator( InvertRGB ),
      new FunctionCreator( Erase ),
      new FunctionCreator( Shrink ),
      new FunctionCreator( Warhol ),
      new FunctionCreator( MysteryA ),
      new FunctionCreator( MysteryB ),
      new FunctionCreator( MysteryC )
    ];

    // builder
    const builderWidth = Scene.computeBuilderWidth( options.numberOfSlots );
    const builderX = ( FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS.width / 2 ) - ( builderWidth / 2 );
    const builder = new Builder( {
      numberOfSlots: options.numberOfSlots,
      width: builderWidth,
      position: new Vector2( builderX, FBConstants.BUILDER_Y )
    } );

    super( cardContent, functionCreators, builder, options );
  }
}

functionBuilder.register( 'PatternsScene', PatternsScene );

export default PatternsScene;