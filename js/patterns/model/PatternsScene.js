// Copyright 2015-2016, University of Colorado Boulder

/**
 * A scene in the 'Patterns' screen. A scene is a particular configuration of functions, inputs, and builders.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var ImageCard = require( 'FUNCTION_BUILDER/patterns/model/ImageCard' );
  var ImageFunction = require( 'FUNCTION_BUILDER/patterns/model/ImageFunction' );
  var inherit = require( 'PHET_CORE/inherit' );

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
  var Shrink75 = require( 'FUNCTION_BUILDER/patterns/model/functions/Shrink75' );
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

  /**
   * @param {Builder[]} builders - builders for this scene
   * @param {function(number): Node} createIcon - function used to create the icon that represents the scene
   * @param {Object} [options]
   * @constructor
   */
  function PatternsScene( builders, createIcon, options ) {

    options = _.extend( {
      maxFunctionInstances: 1 // {number} max number of instances of each function type
    }, options );

    assert && assert( options.maxFunctionInstances > 0 );

    // @public (read-only)
    this.createIcon = createIcon;

    /**
     * Constructors for {ImageFunction} types, in the order that they appear in the function carousel.
     * @type {constructor[]}
     * @public (read-only)
     */
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

    /**
     * Images for the input cards, in the order that they appear in the input carousel.
     * @type {HTMLImageElement[]}
     * @public (read-only)
     */
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

    // @public (read-only) {Builder[]}
    this.builders = builders;

    // @public (read-only) {boolean} spy glass feature is enabled if any builder has > 1 slot
    this.spyGlassEnabled = _.any( builders, function( builder ) { return builder.slots.length > 1; } );

    // @private {ImageCard[]} All cards that exist. They may or may not be in the output carousel.
    this.cards = [];

    // @private {ImageFunction[]} All function instances that exist. They may or may not be in a builder.
    this.functionInstances = [];

    // @public (read-only) {number}
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

      // dispose of all cards, operate on a copy of the array
      this.cards.slice( 0 ).forEach( function( card ) {
        card.dispose();
      } );
      this.cards.length = 0;

      // dispose of all function instances, operate on a copy of the array
      this.functionInstances.slice( 0 ).forEach( function( functionInstance ) {
        functionInstance.dispose();
      } );
      this.functionInstances.length = 0;
    },

    /**
     * Adds a function instance to the scene.
     * @param {ImageFunction} functionInstance
     * @public
     */
    addFunctionInstance: function( functionInstance ) {
      assert && assert( functionInstance instanceof ImageFunction, 'unexpected type: ' + functionInstance.constructor.name );
      assert && assert( this.functionInstances.indexOf( functionInstance ) === -1, 'attempted to add functionInstance twice' );
      this.functionInstances.push( functionInstance );
    },

    /**
     * Removes a function instance from the scene.
     * @param {ImageFunction} functionInstance
     * @public
     */
    removeFunctionInstance: function( functionInstance ) {
      assert && assert( functionInstance instanceof ImageFunction, 'unexpected type: ' + functionInstance.constructor.name );
      var index = this.functionInstances.indexOf( functionInstance );
      assert && assert( index !== -1, 'attempted to remove unknown functionInstance' );
      this.functionInstances.splice( index, 1 );
    },

    /**
     * Adds a card to the scene.
     * @param {ImageCard} card
     * @public
     */
    addCard: function( card ) {
      assert && assert( card instanceof ImageCard, 'unexpected type: ' + card.constructor.name );
      assert && assert( this.cards.indexOf( card ) === -1, 'attempted to add card twice' );
      this.cards.push( card );
    },

    /**
     * Removes a card from the scene.
     * @param {ImageCard} card
     * @public
     */
    removeCard: function( card ) {
      assert && assert( card instanceof ImageCard, 'unexpected type: ' + card.constructor.name );
      var index = this.cards.indexOf( card );
      assert && assert( index !== -1, 'attempted to remove unknown card' );
      this.cards.splice( index, 1 );
    },

    /**
     * Animates the scene.
     *
     * @param {number} dt - time since the previous step, in seconds
     * @public
     */
    step: function( dt ) {

      this.functionInstances.forEach( function( functionInstance ) {
        functionInstance.step( dt );
      } );

      this.cards.forEach( function( card ) {
        card.step( dt );
      } );
    }
  } );
} );
