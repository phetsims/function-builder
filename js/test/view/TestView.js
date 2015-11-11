// Copyright 2015, University of Colorado Boulder

/**
 * View for the 'Test' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CanvasUtils = require( 'FUNCTION_BUILDER/common/model/CanvasUtils' );
  var Card = require( 'FUNCTION_BUILDER/common/model/Card' );
  var CardNode = require( 'FUNCTION_BUILDER/common/view/CardNode' );
  var Carousel = require( 'SUN/Carousel' );
  var Erase = require( 'FUNCTION_BUILDER/common/model/Erase' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var Grayscale = require( 'FUNCTION_BUILDER/common/model/Grayscale' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Identity = require( 'FUNCTION_BUILDER/common/model/Identity' );
  var InvertRGB = require( 'FUNCTION_BUILDER/common/model/InvertRGB' );
  var Mirror = require( 'FUNCTION_BUILDER/common/model/Mirror' );
  var MysteryA = require( 'FUNCTION_BUILDER/common/model/MysteryA' );
  var MysteryB = require( 'FUNCTION_BUILDER/common/model/MysteryB' );
  var MysteryC = require( 'FUNCTION_BUILDER/common/model/MysteryC' );
  var Rotate90 = require( 'FUNCTION_BUILDER/common/model/Rotate90' );
  var Rotate180 = require( 'FUNCTION_BUILDER/common/model/Rotate180' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Shrink75 = require( 'FUNCTION_BUILDER/common/model/Shrink75' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Warhol = require( 'FUNCTION_BUILDER/common/model/Warhol' );

  // images
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
  function TestView() {

    ScreenView.call( this, FBConstants.SCREEN_VIEW_OPTIONS );

    var cards = [

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

    var functions = [
      new Identity(),
      new Mirror(),
      new Rotate90(),
      new Grayscale(),
      new Rotate180(),
      new InvertRGB(),
      new Erase(),
      new Shrink75(),
      new Warhol(),
      new MysteryA(),
      new MysteryB(),
      new MysteryC()
    ];

    // a row of function icons
    var functionNodes = [];
    functions.forEach( function( functionInstance ) {
      functionNodes.push( new FunctionNode( functionInstance, { scale: 0.45 } ) );
    } );
    var functionsBox = new HBox( {
     children: functionNodes,
     spacing: 21
    } );

    // carousel items
    var items = [];

    // A row for each card
    cards.forEach( function( card ) {

      var hBoxChildren = [];

      functions.forEach( function( functionInstance ) {
        var outputName = card.name + '.' + functionInstance.name;
        var outputCanvas = functionInstance.apply( card.canvas );
        var outputCard = new Card( outputName, outputCanvas );
        hBoxChildren.push( new CardNode( outputCard ) );
      } );

      items.push( new HBox( {
        children: hBoxChildren,
        spacing: 15
      } ) );
    } );

    var carousel = new Carousel( items, {
      orientation: 'vertical',
      separatorsVisible: true,
      itemsPerPage: 4
    } );

    this.addChild( new VBox( {
      children: [ functionsBox, carousel ],
      spacing: 15,
      center: this.layoutBounds.center
    } ) );
  }

  functionBuilder.register( 'TestView', TestView );

  return inherit( ScreenView, TestView );
} );