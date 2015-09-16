// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Function = require( 'FUNCTION_BUILDER/common/model/Function' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Input = require( 'FUNCTION_BUILDER/common/model/Input' );
  var PropertySet = require( 'AXON/PropertySet' );

  // function images
  var functionDisappearImage = require( 'mipmap!FUNCTION_BUILDER/function-disappear.png' );
  var functionGrayScaleImage = require( 'mipmap!FUNCTION_BUILDER/function-grayscale.png' );
  var functionIdentityImage = require( 'mipmap!FUNCTION_BUILDER/function-identity.png' );
  var functionInvertRGBImage = require( 'mipmap!FUNCTION_BUILDER/function-invert-rgb.png' );
  var functionMysteryAImage = require( 'mipmap!FUNCTION_BUILDER/function-mystery-A.png' );
  var functionMysteryBImage = require( 'mipmap!FUNCTION_BUILDER/function-mystery-B.png' );
  var functionMysteryCImage = require( 'mipmap!FUNCTION_BUILDER/function-mystery-C.png' );
  var functionReflectYImage = require( 'mipmap!FUNCTION_BUILDER/function-reflect-y.png' );
  var functionRotate90Image = require( 'mipmap!FUNCTION_BUILDER/function-rotate-90.png' );
  var functionRotate180Image = require( 'mipmap!FUNCTION_BUILDER/function-rotate-180.png' );
  var functionShrink75Image = require( 'mipmap!FUNCTION_BUILDER/function-shrink-75.png' );
  var functionWarholImage = require( 'mipmap!FUNCTION_BUILDER/function-warhol.png' );

  // input images
  var beakerImage = require( 'mipmap!FUNCTION_BUILDER/input-beaker.png' );
  var butterflyImage = require( 'mipmap!FUNCTION_BUILDER/input-butterfly.png' );
  var cherriesImage = require( 'mipmap!FUNCTION_BUILDER/input-cherries.png' );
  var circleImage = require( 'mipmap!FUNCTION_BUILDER/input-circle.png' );
  var feetImage = require( 'mipmap!FUNCTION_BUILDER/input-feet.png' );
  var planetImage = require( 'mipmap!FUNCTION_BUILDER/input-planet.png' );
  var rectangleImage = require( 'mipmap!FUNCTION_BUILDER/input-rectangle.png' );
  var snowflakeImage = require( 'mipmap!FUNCTION_BUILDER/input-snowflake.png' );
  var starImage = require( 'mipmap!FUNCTION_BUILDER/input-star.png' );
  var stickFigureImage = require( 'mipmap!FUNCTION_BUILDER/input-stick-figure.png' );
  var sunImage = require( 'mipmap!FUNCTION_BUILDER/input-sun.png' );
  var triangleImage = require( 'mipmap!FUNCTION_BUILDER/input-triangle.png' );

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
      new Function( 'reflect-y', functionReflectYImage ),
      new Function( 'rotate-90', functionRotate90Image ),
      new Function( 'grayscale', functionGrayScaleImage ),
      new Function( 'rotate-180', functionRotate180Image ),
      new Function( 'identity', functionIdentityImage ),
      new Function( 'invert-rgb', functionInvertRGBImage ),
      new Function( 'disappear', functionDisappearImage ),
      new Function( 'shrink-75', functionShrink75Image ),
      new Function( 'warhol', functionWarholImage ),
      new Function( 'mystery-A', functionMysteryAImage ),
      new Function( 'mystery-B', functionMysteryBImage ),
      new Function( 'mystery-C', functionMysteryCImage )
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