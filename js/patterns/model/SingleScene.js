// Copyright 2002-2015, University of Colorado Boulder

/**
 * The 'single' scene in the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Builder = require( 'FUNCTION_BUILDER/common/model/Builder' );
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

  function SingleScene() {

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

      // No i18n of names necessary, they are used internally for debugging
      Card.withImage( 'feet', feetImage ),
      Card.withImage( 'snowflake', snowflakeImage ),
      Card.withImage( 'butterfly', butterflyImage ),
      Card.withImage( 'stick-figure', stickFigureImage ),
      Card.withImage( 'planet', planetImage ),
      Card.withImage( 'sun', sunImage ),
      Card.withImage( 'beaker', beakerImage ),
      Card.withImage( 'cherries', cherriesImage ),
      Card.withImage( 'rectangle', rectangleImage ),
      Card.withImage( 'circle', circleImage ),
      Card.withImage( 'triangle', triangleImage ),
      Card.withImage( 'star', starImage )
    ];

    // @public
    this.builder = new Builder( {
      numberOfFunctions: 3
    } );

    var functionPropertyObserver = function( functionInstance, oldFunctionInstance ) {
      //TODO update all output cards
      console.log( 'function = ' + functionInstance.name ); //XXX
    };
    this.builder.functionProperties.forEach( function( functionProperty ) {
      functionProperty.link( functionPropertyObserver );
    } );
  }

  return inherit( Object, SingleScene, {

    // @public
    reset: function() {
      this.builder.reset();
    }
  } );
} );
