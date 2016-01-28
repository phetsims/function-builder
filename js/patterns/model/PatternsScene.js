// Copyright 2015-2016, University of Colorado Boulder

/**
 * A scene in the 'Patterns' screen. A scene is a particular configuration of functions, inputs, with 1 builder.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Builder = require( 'FUNCTION_BUILDER/common/model/Builder' );
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
   * @param {function(number): Node} createIcon - function used to create the icon that represents the scene
   * @param {Object} [options]
   * @constructor
   */
  function PatternsScene( createIcon, options ) {

    options = _.extend( {
      numberOfEachCard: 2, // {number} number of instances of each card type
      numberOfEachFunction: 2, // {number} number of instances of each function type
      builder: new Builder()
    }, options );

    assert && assert( options.numberOfEachFunction > 0 );

    // @public (read-only)
    this.createIcon = createIcon;
    this.numberOfEachFunction = options.numberOfEachFunction;
    this.numberOfEachCard = options.numberOfEachCard;

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

    // @public (read-only) {Builder}
    this.builder = options.builder;

    // @public (read-only) {boolean} spy glass feature is enabled if the builder has > 1 slot
    this.spyGlassEnabled = ( this.builder.slots.length > 1 );

    // @private {ImageCard[]} all cards that exist
    this.cards = [];

    // @private {ImageFunction[]} all function instances that exist
    this.functionInstances = [];
  }

  functionBuilder.register( 'PatternsScene', PatternsScene );

  return inherit( Object, PatternsScene, {

    // dispose not needed, instances of this type exist for the lifetime of the sim

    // @public
    reset: function() {

      // reset the builder
      this.builder.reset();

      //TODO this is broken with the new 'container' pattern, do not dispose, return to container (how to do that?)
      //// dispose of all cards, operate on a copy of the array
      //this.cards.slice( 0 ).forEach( function( card ) {
      //  card.dispose();
      //} );
      //this.cards.length = 0;

      //TODO this is broken with the new 'container' pattern, do not dispose, return to container (how to do that?)
      // dispose of all function instances, operate on a copy of the array
      //this.functionInstances.slice( 0 ).forEach( function( functionInstance ) {
      //  functionInstance.dispose();
      //} );
      //this.functionInstances.length = 0;
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
