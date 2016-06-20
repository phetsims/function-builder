// Copyright 2016, University of Colorado Boulder

/**
 * Scene for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Builder = require( 'FUNCTION_BUILDER/common/model/builder/Builder' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBIconFactory = require( 'FUNCTION_BUILDER/common/view/FBIconFactory' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionCreator = require( 'FUNCTION_BUILDER/common/model/functions/FunctionCreator' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Scene = require( 'FUNCTION_BUILDER/common/model/Scene' );
  var Vector2 = require( 'DOT/Vector2' );

  // function modules
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
  var Shrink = require( 'FUNCTION_BUILDER/patterns/model/functions/Shrink' );
  var Warhol = require( 'FUNCTION_BUILDER/patterns/model/functions/Warhol' );

  // card images
  var beakerImage = require( 'image!FUNCTION_BUILDER/cards/beaker.png' );
  var butterflyImage = require( 'image!FUNCTION_BUILDER/cards/butterfly.png' );
  var cherriesImage = require( 'image!FUNCTION_BUILDER/cards/cherries.png' );
  var circleImage = require( 'image!FUNCTION_BUILDER/cards/circle.png' );
  var feetImage = require( 'image!FUNCTION_BUILDER/cards/feet.png' );
  var planetImage = require( 'image!FUNCTION_BUILDER/cards/planet.png' );
  var rectangleImage = require( 'image!FUNCTION_BUILDER/cards/rectangle.png' );
  var snowflakeImage = require( 'image!FUNCTION_BUILDER/cards/snowflake.png' );
  var starImage = require( 'image!FUNCTION_BUILDER/cards/star.png' );
  var stickFigureImage = require( 'image!FUNCTION_BUILDER/cards/stickFigure.png' );
  var sunImage = require( 'image!FUNCTION_BUILDER/cards/sun.png' );
  var triangleImage = require( 'image!FUNCTION_BUILDER/cards/triangle.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function PatternsScene( options ) {

    options = _.extend( {
      numberOfSlots: 1, // {number} number of slots in the builder
      builderWidth: 200, // {number} width of the builder
      numberOfEachCard: 1, // {number} number of instances of each card type
      numberOfEachFunction: 1 // {number} number of instances of each function type
    }, options );

    assert && assert( !options.iconNode );
    options.iconNode = FBIconFactory.createSceneIcon( options.numberOfSlots );

    // {HTMLImageElement[]} images for the input cards, in the order that they appear in the carousel
    var cardContent = [
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

    // {FunctionCreator[]} function creators, in the order that functions appear in the carousel
    var functionCreators = [
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
    var builderX = ( FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS.width / 2 ) - ( options.builderWidth / 2 );
    var builder = new Builder( {
      numberOfSlots: options.numberOfSlots,
      width: options.builderWidth,
      location: new Vector2( builderX, FBConstants.BUILDER_Y )
    } );

    Scene.call( this, cardContent, functionCreators, builder, options );
  }

  functionBuilder.register( 'PatternsScene', PatternsScene );

  return inherit( Scene, PatternsScene );
} );
