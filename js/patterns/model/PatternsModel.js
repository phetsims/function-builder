// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Builder = require( 'FUNCTION_BUILDER/common/model/Builder' );
  var Card = require( 'FUNCTION_BUILDER/common/model/Card' );
  var Disappear = require( 'FUNCTION_BUILDER/common/model/Disappear' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
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

  /**
   * @constructor
   */
  function PatternsModel() {

    // @public (read-only)
    this.functions = [
      new Mirror(),
      new Rotate90(),
      new Grayscale(),
      new Rotate180(),
      new Identity(),
      new InvertRGB(),
      new Disappear(),
      new Shrink75(),
      new Warhol(),
      new MysteryA(),
      new MysteryB(),
      new MysteryC()
    ];

    // @public (read-only)
    this.inputCards = [

      // No i18n of names necessary, they are used internally for debugging
      new Card( 'feet', feetImage ),
            new Card( 'snowflake', snowflakeImage ),
            new Card( 'butterfly', butterflyImage ),
            new Card( 'stick-figure', stickFigureImage ),
            new Card( 'planet', planetImage ),
            new Card( 'sun', sunImage ),
            new Card( 'beaker', beakerImage ),
            new Card( 'cherries', cherriesImage ),
            new Card( 'rectangle', rectangleImage ),
            new Card( 'circle', circleImage ),
            new Card( 'triangle', triangleImage ),
            new Card( 'star', starImage )
    ];

    // @public
    this.builder = new Builder( {
      numberOfFunctions: 1
    } );

    var functionPropertyObserver = function( functionInstance, oldFunctionInstance ) {
      //TODO update all output cards
      console.log( 'function = ' + functionInstance.name ); //XXX
    };
    this.builder.functionProperties.forEach( function( functionProperty ) {
      functionProperty.link( functionPropertyObserver );
    } );
  }
  functionBuilder.register( 'PatternsModel', PatternsModel );

  return inherit( Object, PatternsModel, {

    reset: function() {
     this.builder.reset();
    },

    step: function( dt ) {
      //TODO
    }
  } );
} );