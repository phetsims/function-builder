// Copyright 2015, University of Colorado Boulder

/**
 * A scene in the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CanvasUtils = require( 'FUNCTION_BUILDER/common/model/CanvasUtils' );
  var Card = require( 'FUNCTION_BUILDER/common/model/Card' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );

  // modules (functions)
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
  var Shrink75 = require( 'FUNCTION_BUILDER/patterns/model/functions/Shrink75' );
  var Warhol = require( 'FUNCTION_BUILDER/patterns/model/functions/Warhol' );

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
   * @param {Builder[]} builders - builders for this scene
   * @param {function} createIcon - function used to create the icon that represents the scene
   * @param {Object} [options]
   * @constructor
   */
  function PatternsScene( builders, createIcon, options ) {

    options = _.extend( {
      maxFunctionInstances: 1 // {number} max number of instances of each function type
    }, options );

    assert && assert( options.maxFunctionInstances > 0 );

    // @public (read-only) {function} used to create the icon that represents the scene
    this.createIcon = createIcon;

    // @public (read-only) {function[]} constructors for the types of functions that will appear in the carousel
    this.functionConstructors = [
      Mirror,
      Rotate90,
      Grayscale,
      Rotate180,
      Identity,
      InvertRGB,
      Erase,
      Shrink75,
      Warhol,
      MysteryA,
      MysteryB,
      MysteryC
    ];

    // @public (read-only) {HTMLImageElement[]} images that appear on the cards
    this.cardImages = [
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

    //TODO get rid of this
    // @public (read-only) {Card[]}
    this.inputCards = [];
    for ( var i = 0; i < this.cardImages.length; i++ ) {
      this.inputCards.push( new Card( CanvasUtils.createCanvasWithImage( this.cardImages[ i ] ) ) );
    }

    // @public (read-only)
    this.builders = builders;

    // @public (read-only) spy glass feature is enabled if any builder has > 1 slot
    this.spyGlassEnabled = _.any( builders, function( builder ) { return builder.slots.length > 1; } );

    // @private All function instances that exist. They may or may not be in a builder.
    this.functionInstances = [];

    // @public (read-only)
    this.maxFunctionInstances = options.maxFunctionInstances;
  }

  functionBuilder.register( 'PatternsScene', PatternsScene );

  return inherit( Object, PatternsScene, {

    // @public
    reset: function() {

      // reset all builders
      this.builders.forEach( function( builder ) {
        builder.reset();
      } );

      // dispose of all function instances, operate on a copy of the array
      this.functionInstances.slice( 0 ).forEach( function( functionInstance ) {
        functionInstance.dispose();
      } );
      this.functionInstances.length = 0;
    },

    /**
     * Adds a function instance to the model.
     * @param {AbstractFunction} functionInstance
     */
    addFunctionInstance: function( functionInstance ) {
      assert && assert( this.functionInstances.indexOf( functionInstance ) === -1, 'attempted to add functionInstance twice' );
      this.functionInstances.push( functionInstance );
    },

    /**
     * Removes a function instance from the model.
     * @param {AbstractFunction} functionInstance
     */
    removeFunctionInstance: function( functionInstance ) {
      var index = this.functionInstances.indexOf( functionInstance );
      assert && assert( index !== -1, 'attempted to remove unknown functionInstance' );
      this.functionInstances.splice( index, 1 );
    }
  } );
} );
