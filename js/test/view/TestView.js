// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the 'Test' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Card = require( 'FUNCTION_BUILDER/common/model/Card' );
  var CardNode = require( 'FUNCTION_BUILDER/common/view/CardNode' );
  var Carousel = require( 'SUN/Carousel' );
  var Disappear = require( 'FUNCTION_BUILDER/common/model/Disappear' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var Grayscale = require( 'FUNCTION_BUILDER/common/model/Grayscale' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var InvertRGB = require( 'FUNCTION_BUILDER/common/model/InvertRGB' );
  var Mirror = require( 'FUNCTION_BUILDER/common/model/Mirror' );
  var MysteryA = require( 'FUNCTION_BUILDER/common/model/MysteryA' );
  var MysteryB = require( 'FUNCTION_BUILDER/common/model/MysteryB' );
  var MysteryC = require( 'FUNCTION_BUILDER/common/model/MysteryC' );
  var Rotate90 = require( 'FUNCTION_BUILDER/common/model/Rotate90' );
  var Rotate180 = require( 'FUNCTION_BUILDER/common/model/Rotate180' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Shrink75 = require( 'FUNCTION_BUILDER/common/model/Shrink75' );
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

    var thisView = this;
    ScreenView.call( this, FBConstants.SCREEN_VIEW_OPTIONS );

    var cards = [
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

    var functions = [
      new Disappear(),
      new Grayscale(),
      new InvertRGB(),
      new MysteryA(),
      new MysteryB(),
      new MysteryC(),
      new Mirror(),
      new Rotate90(),
      new Rotate180(),
      new Shrink75(),
      new Warhol()
    ];

    var items = [];

    // A row for each card
    cards.forEach( function( card ) {

      var hBoxChildren = [ new CardNode( card ) ];

      functions.forEach( function( functionInstance ) {
        var outputCard = functionInstance.apply( card );
        hBoxChildren.push( new CardNode( outputCard ) );
      } );

      items.push( new HBox( {
        children: hBoxChildren,
        spacing: 15,
        center: thisView.layoutBounds.center
      } ) );
    } );

    var carousel = new Carousel( items, {
      orientation: 'vertical',
      pageControlVisible: true,
      pageControlLocation: 'right',
      separatorsVisible: true,
      itemsPerPage: 6,
      center: this.layoutBounds.center
    } );

    this.addChild( carousel );
  }

  return inherit( ScreenView, TestView );
} );