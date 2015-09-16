// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBFunction = require( 'FUNCTION_BUILDER/common/model/FBFunction' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Input = require( 'FUNCTION_BUILDER/common/model/Input' );
  var PropertySet = require( 'AXON/PropertySet' );

  // function images
  var disappearImage = require( 'mipmap!FUNCTION_BUILDER/functions/disappear.png' );
  var grayScaleImage = require( 'mipmap!FUNCTION_BUILDER/functions/grayscale.png' );
  var identityImage = require( 'mipmap!FUNCTION_BUILDER/functions/identity.png' );
  var invertRGBImage = require( 'mipmap!FUNCTION_BUILDER/functions/invertRGB.png' );
  var mirrorImage = require( 'mipmap!FUNCTION_BUILDER/functions/mirror.png' );
  var mysteryAImage = require( 'mipmap!FUNCTION_BUILDER/functions/mysteryA.png' );
  var mysteryBImage = require( 'mipmap!FUNCTION_BUILDER/functions/mysteryB.png' );
  var mysteryCImage = require( 'mipmap!FUNCTION_BUILDER/functions/mysteryC.png' );
  var rotate90Image = require( 'mipmap!FUNCTION_BUILDER/functions/rotate90.png' );
  var rotate180Image = require( 'mipmap!FUNCTION_BUILDER/functions/rotate180.png' );
  var shrink75Image = require( 'mipmap!FUNCTION_BUILDER/functions/shrink75.png' );
  var warholImage = require( 'mipmap!FUNCTION_BUILDER/functions/warhol.png' );

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

    PropertySet.call( this, {
      //TODO
    } );

    // @public (read-only)
    this.functions = [

      // No i18n of names necessary, they are used internally for debugging
      new FBFunction( 'mirror', mirrorImage, 'rgb( 128, 197, 237 )' ),
      new FBFunction( 'rotate90', rotate90Image, 'rgb( 147, 231, 128 )' ),
      new FBFunction( 'grayscale', grayScaleImage, 'rgb( 232, 232, 232 )' ),
      new FBFunction( 'rotate180', rotate180Image, 'rgb( 147, 231, 128 )' ),
      new FBFunction( 'identity', identityImage, 'rgb( 255, 161, 43 )' ),
      new FBFunction( 'invertRGB', invertRGBImage, 'black' ),
      new FBFunction( 'disappear', disappearImage, 'rgb( 246, 164, 255 )' ),
      new FBFunction( 'shrink75', shrink75Image, 'rgb( 250, 186, 75 )' ),
      new FBFunction( 'warhol', warholImage, 'rgb( 0, 222, 224 )' ),
      new FBFunction( 'mysteryA', mysteryAImage, 'rgb( 127, 225, 173 )' ),
      new FBFunction( 'mysteryB', mysteryBImage, 'rgb( 249, 144, 99 )' ),
      new FBFunction( 'mysteryC', mysteryCImage, 'rgb( 222, 186, 247 )' )
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
  }

  return inherit( PropertySet, PatternsModel, {

    step: function( dt ) {
      //TODO
    }
  } );
} );