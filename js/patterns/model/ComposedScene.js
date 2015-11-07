// Copyright 2015, University of Colorado Boulder

/**
 * The 'composed' scene in the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Builder = require( 'FUNCTION_BUILDER/common/model/Builder' );
  var CanvasUtils = require( 'FUNCTION_BUILDER/common/model/CanvasUtils' );
  var Card = require( 'FUNCTION_BUILDER/common/model/Card' );
  var Erase = require( 'FUNCTION_BUILDER/common/model/Erase' );
  var Grayscale = require( 'FUNCTION_BUILDER/common/model/Grayscale' );
  var Identity = require( 'FUNCTION_BUILDER/common/model/Identity' );
  var inherit = require( 'PHET_CORE/inherit' );
  var InvertRGB = require( 'FUNCTION_BUILDER/common/model/InvertRGB' );
  var Mirror = require( 'FUNCTION_BUILDER/common/model/Mirror' );
  var MysteryA = require( 'FUNCTION_BUILDER/common/model/MysteryA' );
  var MysteryB = require( 'FUNCTION_BUILDER/common/model/MysteryB' );
  var MysteryC = require( 'FUNCTION_BUILDER/common/model/MysteryC' );
  var Rotate90 = require( 'FUNCTION_BUILDER/common/model/Rotate90' );
  var Rotate180 = require( 'FUNCTION_BUILDER/common/model/Rotate180' );
  var Shrink75 = require( 'FUNCTION_BUILDER/common/model/Shrink75' );
  var Warhol = require( 'FUNCTION_BUILDER/common/model/Warhol' );

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

  function ComposedScene() {

    // @public (read-only)
    this.functions = [
      new Mirror(),
      new Rotate90(),
      new Grayscale(),
      new Rotate180(),
      new Identity(),
      new InvertRGB(),
      new Erase(),
      new Shrink75(),
      new Warhol(),
      new MysteryA(),
      new MysteryB(),
      new MysteryC()
    ];

    // @public (read-only)
    this.inputCards = [

      // No i18n of names is necessary, they are used internally for debugging
      new Card( 'feet', CanvasUtils.createCanvasWithImage( feetImage ) ),
      new Card( 'snowflake', CanvasUtils.createCanvasWithImage( snowflakeImage ) ),
      new Card( 'butterfly', CanvasUtils.createCanvasWithImage( butterflyImage ) ),
      new Card( 'stick-figure', CanvasUtils.createCanvasWithImage( stickFigureImage ) ),
      new Card( 'planet', CanvasUtils.createCanvasWithImage( planetImage ) ),
      new Card( 'sun', CanvasUtils.createCanvasWithImage( sunImage ) ),
      new Card( 'beaker', CanvasUtils.createCanvasWithImage( beakerImage ) ),
      new Card( 'cherries', CanvasUtils.createCanvasWithImage( cherriesImage ) ),
      new Card( 'rectangle', CanvasUtils.createCanvasWithImage( rectangleImage ) ),
      new Card( 'circle', CanvasUtils.createCanvasWithImage( circleImage ) ),
      new Card( 'triangle', CanvasUtils.createCanvasWithImage( triangleImage ) ),
      new Card( 'star', CanvasUtils.createCanvasWithImage( starImage ) )
    ];

    // @public
    this.builder = new Builder( {
      numberOfFunctions: 3
    } );
  }

  return inherit( Object, ComposedScene, {

    // @public
    reset: function() {
      this.builder.reset();
    }
  } );
} );
