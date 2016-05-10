// Copyright 2015-2016, University of Colorado Boulder

/**
 * Model for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Builder = require( 'FUNCTION_BUILDER/common/model/Builder' );
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBIconFactory = require( 'FUNCTION_BUILDER/common/view/FBIconFactory' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionCreator = require( 'FUNCTION_BUILDER/common/model/FunctionCreator' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
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

  // constants for the 'single' scene
  var SINGLE_BUILDER_SLOTS = 1;
  var SINGLE_BUILDER_WIDTH = ( SINGLE_BUILDER_SLOTS * FBConstants.FUNCTION_SIZE.width ) + 200;
  var SINGLE_BUILDER_X = ( FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS.width / 2 ) - ( SINGLE_BUILDER_WIDTH / 2 );

  // constants for the 'composed' scene
  var COMPOSED_BUILDER_SLOTS = 3;
  var COMPOSED_BUILDER_WIDTH = ( COMPOSED_BUILDER_SLOTS * FBConstants.FUNCTION_SIZE.width ) + 50;
  var COMPOSED_BUILDER_X = ( FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS.width / 2 ) - ( COMPOSED_BUILDER_WIDTH / 2 );

  /**
   * @constructor
   */
  function PatternsModel() {

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

    // builder for 'single' scene
    var singleBuilder = new Builder( {
      numberOfSlots: SINGLE_BUILDER_SLOTS,
      width: SINGLE_BUILDER_WIDTH,
      location: new Vector2( SINGLE_BUILDER_X, FBConstants.BUILDER_Y ),
      colorScheme: FBColors.BUILDER_MAROON
    } );

    // builder for 'composed' scene
    var composedBuilder = new Builder( {
      numberOfSlots: COMPOSED_BUILDER_SLOTS,
      width: COMPOSED_BUILDER_WIDTH,
      location: new Vector2( COMPOSED_BUILDER_X, FBConstants.BUILDER_Y ),
      colorScheme: FBColors.BUILDER_BLUE
    } );

    // @public (read-only)
    this.scenes = [

      // single: builder with 1 slot, for exploring application of 1 function
      new Scene( cardContent, functionCreators, singleBuilder, {
        iconNode: FBIconFactory.createSingleSceneIcon(),
        numberOfEachCard: 2,
        numberOfEachFunction: 1
      } ),

      // composed: builder with 3 slots, for exploring function composition
      new Scene( cardContent, functionCreators, composedBuilder, {
        iconNode: FBIconFactory.createComposedSceneIcon(),
        numberOfEachCard: 2,
        numberOfEachFunction: 2
      } )
    ];

    // @public {Property.<Scene>} the selected scene
    this.selectedSceneProperty = new Property( this.scenes[ 0 ] );
  }

  functionBuilder.register( 'PatternsModel', PatternsModel );

  return inherit( Object, PatternsModel, {

    /**
     * Animates the model.
     *
     * @param {number} dt - time since the previous step, in seconds
     * @public
     */
    step: function( dt ) {
      for ( var sceneIndex = 0; sceneIndex < this.scenes.length; sceneIndex++ ) {
        this.scenes[ sceneIndex ].step( dt );
      }
    }
  } );
} );