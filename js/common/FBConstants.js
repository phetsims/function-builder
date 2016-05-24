// Copyright 2015-2016, University of Colorado Boulder

/**
 * Constants used throughout this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var MathSymbolFont = require( 'SCENERY_PHET/MathSymbolFont' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants that are used to compute other constants
  var CARD_SIZE = new Dimension2( 70, 70 );
  var FUNCTION_SIZE = new Dimension2( 165, CARD_SIZE.height + 8 );

  var FBConstants = {

    // layoutBounds for all ScreenView subtypes
    SCREEN_VIEW_LAYOUT_BOUNDS: new Bounds2( 0, 0, 1024, 618 ),

    //--------------------------------------------------------------------------------------------------------
    // Builder

    // all builders have the same y location
    BUILDER_Y: 285,

    //--------------------------------------------------------------------------------------------------------
    // Cards

    // options for cards and things that looks like cards ('see inside' windows, 'mole under carpet')
    CARD_OPTIONS: {
      size: CARD_SIZE, // dimensions of a card Node
      cornerRadius: 5, // corner radius of a card Node
      fill: 'white',
      stroke: 'black',
      lineWidth: 1,
      lineDash: null
    },

    // how much a card should 'pop out' of its container when clicked
    CARD_POP_OUT_OFFSET: new Vector2( 0, -10 ),

    // distance/second that cards move when animating
    CARD_ANIMATION_SPEED: FBQueryParameters.SLOW ? 100 : 400,

    // scale for the images on cards
    CARD_IMAGE_SCALE: 0.4,

    // fonts for cards in the Numbers screen
    NUMBERS_CARD_XY_FONT: new MathSymbolFont( 30 ),
    NUMBERS_CARD_SYMBOL_FONT: new FBFont( 30 ), // eg, +, -, =
    NUMBERS_CARD_SIGN_FONT: new FBFont( 22 ),
    NUMBERS_CARD_WHOLE_NUMBER_FONT: new FBFont( 30 ),
    NUMBERS_CARD_FRACTION_FONT: new FBFont( 20 ),

    // fonts for carousel labels
    NUMBERS_CARD_CAROUSEL_LABEL_FONT: new FBFont( 20 ),
    EQUATIONS_CARD_CAROUSEL_LABEL_FONT: new FBFont( 30 ),

    //--------------------------------------------------------------------------------------------------------
    // Functions

    // dimensions of a function Node
    FUNCTION_SIZE: FUNCTION_SIZE,

    // x-inset of arrow-like ends of a function's shape
    FUNCTION_X_INSET_FACTOR: 0.15,

    // how much a function should 'pop out' of its container when clicked
    FUNCTION_POP_OUT_OFFSET: new Vector2( 0, -10 ),

    // function must be at least this close to a slot to be put into the builder
    FUNCTION_DISTANCE_THRESHOLD: ( FUNCTION_SIZE.width / 2 ) - 1,

    // distance/second that functions move when animating
    FUNCTION_ANIMATION_SPEED: FBQueryParameters.SLOW ? 100 : 400,

    // scale of the icons on functions in Patterns screen
    PATTERNS_FUNCTION_ICON_SCALE: 0.3,

    // font for functions in Patterns screen
    PATTERNS_FUNCTION_FONT: new FBFont( 25, { weight: 'bold' } ),

    // font for functions in Numbers screen
    NUMBERS_FUNCTION_FONT: new FBFont( 30 ),

    // fonts for functions in Equations screen
    EQUATIONS_FUNCTION_PICKER_FONT: new FBFont( 30 ),
    EQUATIONS_FUNCTION_OPERATOR_FONT: new FBFont( 26 ),

    //--------------------------------------------------------------------------------------------------------
    // Other

    // size of drawers
    TABLE_DRAWER_SIZE: new Dimension2( 175, 200 ),
    GRAPH_DRAWER_SIZE: new Dimension2( 200, 200 ),
    EQUATION_DRAWER_SIZE: new Dimension2( 220, 100 )
  };

  functionBuilder.register( 'FBConstants', FBConstants );

  return FBConstants;
} );
