// Copyright 2015-2019, University of Colorado Boulder

/**
 * Scene for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Builder = require( 'FUNCTION_BUILDER/common/model/builder/Builder' );
  const FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  const FBIconFactory = require( 'FUNCTION_BUILDER/common/view/FBIconFactory' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const FunctionCreator = require( 'FUNCTION_BUILDER/common/model/functions/FunctionCreator' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const Scene = require( 'FUNCTION_BUILDER/common/model/Scene' );
  const Vector2 = require( 'DOT/Vector2' );

  // function modules
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

  // card images
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
   * @param {Object} [options]
   * @constructor
   */
  function PatternsScene( options ) {

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
    assert && cardContent.forEach( function( image ) {
      assert( ( image.width % 2 === 0 && image.height % 2 === 0 ), 'dimensions must be even! width=' + image.width + ', height=' + image.height );
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

    Scene.call( this, cardContent, functionCreators, builder, options );
  }

  functionBuilder.register( 'PatternsScene', PatternsScene );

  return inherit( Scene, PatternsScene );
} );
