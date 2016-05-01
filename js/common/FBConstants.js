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
  var Vector2 = require( 'DOT/Vector2' );

  // constants
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

    // font for number cards
    NUMBER_CARD_SIGN_FONT: new FBFont( 22 ),
    NUMBER_CARD_WHOLE_NUMBER_FONT: new FBFont( 30 ),
    NUMBER_CARD_FRACTION_FONT: new FBFont( 20 ),

    // carousel label fonts
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

    // scale of the images on functions
    FUNCTION_IMAGE_SCALE: 0.3,

    // font for image functions
    IMAGE_FUNCTION_FONT: new FBFont( 25, { weight: 'bold' } ),

    // font for number functions
    NUMBER_FUNCTION_FONT: new FBFont( 30 ),

    // font for pickers
    FUNCTION_PICKER_FONT: new FBFont( 30 ),
    FUNCTION_OPERATOR_FONT: new FBFont( 26 ),

    //--------------------------------------------------------------------------------------------------------
    // Other

    // font for check boxes
    CHECK_BOX_FONT: new FBFont( 18 ),

    // font for equations
    EQUATION_FONT: new FBFont( 20 ),

    // font for graph
    GRAPH_FONT: new FBFont( 20 ),

    // size of drawers
    TABLE_DRAWER_SIZE: new Dimension2( 175, 200 ),
    GRAPH_DRAWER_SIZE: new Dimension2( 200, 200 ),
    EQUATION_DRAWER_SIZE: new Dimension2( 220, 100 )
  };

  functionBuilder.register( 'FBConstants', FBConstants );

  return FBConstants;
} );
