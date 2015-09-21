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
  var Disappear = require( 'FUNCTION_BUILDER/common/model/Disappear' );
  var Grayscale = require( 'FUNCTION_BUILDER/common/model/Grayscale' );
  var Identity = require( 'FUNCTION_BUILDER/common/model/Identity' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Input = require( 'FUNCTION_BUILDER/common/model/Input' );
  var InvertRGB = require( 'FUNCTION_BUILDER/common/model/InvertRGB' );
  var Mirror = require( 'FUNCTION_BUILDER/common/model/Mirror' );
  var MysteryA = require( 'FUNCTION_BUILDER/common/model/MysteryA' );
  var MysteryB = require( 'FUNCTION_BUILDER/common/model/MysteryB' );
  var MysteryC = require( 'FUNCTION_BUILDER/common/model/MysteryC' );
  var Rotate90 = require( 'FUNCTION_BUILDER/common/model/Rotate90' );
  var Rotate180 = require( 'FUNCTION_BUILDER/common/model/Rotate180' );
  var Shrink75 = require( 'FUNCTION_BUILDER/common/model/Shrink75' );
  var Warhol = require( 'FUNCTION_BUILDER/common/model/Warhol' );

  // input images
  var beakerImage = require( 'mipmap!FUNCTION_BUILDER/inputs/beaker.png' );
  var butterflyImage = require( 'mipmap!FUNCTION_BUILDER/inputs/butterfly.png' );
  var cherriesImage = require( 'mipmap!FUNCTION_BUILDER/inputs/cherries.png' );
  var circleImage = require( 'mipmap!FUNCTION_BUILDER/inputs/circle.png' );
  var feetImage = require( 'mipmap!FUNCTION_BUILDER/inputs/feet.png' );
  var planetImage = require( 'mipmap!FUNCTION_BUILDER/inputs/planet.png' );
  var rectangleImage = require( 'mipmap!FUNCTION_BUILDER/inputs/rectangle.png' );
  var snowflakeImage = require( 'mipmap!FUNCTION_BUILDER/inputs/snowflake.png' );
  var starImage = require( 'mipmap!FUNCTION_BUILDER/inputs/star.png' );
  var stickFigureImage = require( 'mipmap!FUNCTION_BUILDER/inputs/stickFigure.png' );
  var sunImage = require( 'mipmap!FUNCTION_BUILDER/inputs/sun.png' );
  var triangleImage = require( 'mipmap!FUNCTION_BUILDER/inputs/triangle.png' );

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
    this.inputs = [

      // No i18n of names necessary, they are used internally for debugging
      new Input( 'feet', feetImage ),
      new Input( 'snowflake', snowflakeImage ),
      new Input( 'butterfly', butterflyImage ),
      new Input( 'stick-figure', stickFigureImage ),
      new Input( 'planet', planetImage ),
      new Input( 'sun', sunImage ),
      new Input( 'beaker', beakerImage ),
      new Input( 'cherries', cherriesImage ),
      new Input( 'rectangle', rectangleImage ),
      new Input( 'circle', circleImage ),
      new Input( 'triangle', triangleImage ),
      new Input( 'star', starImage )
    ];

    // @public
    this.builder = new Builder( {
      numberOfFunctions: 1
    } );
  }

  return inherit( Object, PatternsModel, {

    reset: function() {
     this.builder.reset();
    },

    step: function( dt ) {
      //TODO
    }
  } );
} );