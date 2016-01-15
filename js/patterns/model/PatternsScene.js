// Copyright 2015-2016, University of Colorado Boulder

/**
 * A scene in the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CanvasUtils = require( 'FUNCTION_BUILDER/common/model/CanvasUtils' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var ImageCard = require( 'FUNCTION_BUILDER/patterns/model/ImageCard' );
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

    // @public (read-only) {functions[]}
    // functions to create function instances, of the form:
    // @param {Object} [functionOptions] options to the AbstractFunction constructor
    // @returns {ImageCard}
    this.functionCreationFunctions = [
      function( functionOptions ) { return new Mirror( functionOptions ); },
      function( functionOptions ) { return new Rotate90( functionOptions ); },
      function( functionOptions ) { return new Grayscale( functionOptions ); },
      function( functionOptions ) { return new Rotate180( functionOptions ); },
      function( functionOptions ) { return new Identity( functionOptions ); },
      function( functionOptions ) { return new InvertRGB( functionOptions ); },
      function( functionOptions ) { return new Erase( functionOptions ); },
      function( functionOptions ) { return new Shrink75( functionOptions ); },
      function( functionOptions ) { return new Warhol( functionOptions ); },
      function( functionOptions ) { return new MysteryA( functionOptions ); },
      function( functionOptions ) { return new MysteryB( functionOptions ); },
      function( functionOptions ) { return new MysteryC( functionOptions ); }
    ];

    // @public (read-only) {function[]}
    // functions to create cards, of the form:
    // @param {Object} [cardOptions] options to the ImageCard constructor
    // @returns {ImageCard}
    this.cardCreationFunctions = [
      function( cardOptions ) { return new ImageCard( CanvasUtils.createCanvasWithImage( feetImage ), cardOptions ); },
      function( cardOptions ) { return new ImageCard( CanvasUtils.createCanvasWithImage( snowflakeImage ), cardOptions ); },
      function( cardOptions ) { return new ImageCard( CanvasUtils.createCanvasWithImage( butterflyImage ), cardOptions ); },
      function( cardOptions ) { return new ImageCard( CanvasUtils.createCanvasWithImage( stickFigureImage ), cardOptions ); },
      function( cardOptions ) { return new ImageCard( CanvasUtils.createCanvasWithImage( planetImage ), cardOptions ); },
      function( cardOptions ) { return new ImageCard( CanvasUtils.createCanvasWithImage( sunImage ), cardOptions ); },
      function( cardOptions ) { return new ImageCard( CanvasUtils.createCanvasWithImage( beakerImage ), cardOptions ); },
      function( cardOptions ) { return new ImageCard( CanvasUtils.createCanvasWithImage( cherriesImage ), cardOptions ); },
      function( cardOptions ) { return new ImageCard( CanvasUtils.createCanvasWithImage( rectangleImage ), cardOptions ); },
      function( cardOptions ) { return new ImageCard( CanvasUtils.createCanvasWithImage( circleImage ), cardOptions ); },
      function( cardOptions ) { return new ImageCard( CanvasUtils.createCanvasWithImage( triangleImage ), cardOptions ); },
      function( cardOptions ) { return new ImageCard( CanvasUtils.createCanvasWithImage( starImage ), cardOptions ); }
    ];

    // @public (read-only) {Builder[]}
    this.builders = builders;

    // @public (read-only) {boolean} spy glass feature is enabled if any builder has > 1 slot
    this.spyGlassEnabled = _.any( builders, function( builder ) { return builder.slots.length > 1; } );

    // @private {Card[]} All cards that exist. They may or may not be in the output carousel
    this.cards = [];

    // @private {AbstractFunction[]} All function instances that exist. They may or may not be in a builder.
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
    },

    /**
     * Adds a card to the model.
     * @param {AbstractCard} card
     */
    addCard: function( card ) {
      assert && assert( this.cards.indexOf( card ) === -1, 'attempted to add card twice' );
      this.cards.push( card );
    },

    /**
     * Removes a card from the model.
     * @param {AbstractCard} card
     */
    removeCard: function( card ) {
      var index = this.cards.indexOf( card );
      assert && assert( index !== -1, 'attempted to remove unknown card' );
      this.cards.splice( index, 1 );
    },

    //TODO make this a no-op if scene is not active?
    // @public
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
