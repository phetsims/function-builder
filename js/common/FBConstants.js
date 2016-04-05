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

  var FBConstants = {

    // layoutBounds for all ScreenView subtypes
    SCREEN_VIEW_LAYOUT_BOUNDS: new Bounds2( 0, 0, 1024, 618 ),

    // options for cards and things that looks like cards ('see inside' windows, 'mole under carpet')
    CARD_OPTIONS: {
      size: new Dimension2( 60, 60 ), // dimensions of a card Node
      cornerRadius: 5, // corner radius of a card Node
      fill: 'white',
      stroke: 'black',
      lineWidth: 1,
      lineDash: null
    },

    // dimensions of a function Node
    FUNCTION_SIZE: new Dimension2( 150, 68 ),

    // x-inset of arrow-like ends of a function's shape
    FUNCTION_X_INSET_FACTOR: 0.15,

    // how much a function should 'pop out' of its container when clicked
    FUNCTION_POP_OUT_OFFSET: new Vector2( 0, -10 ),

    // how much a card should 'pop out' of its container when clicked
    CARD_POP_OUT_OFFSET: new Vector2( 0, -10 ),

    // distance/second that functions move when animating
    FUNCTION_ANIMATION_SPEED: FBQueryParameters.SLOW ? 100 : 400,

    // distance/second that cards move when animating
    CARD_ANIMATION_SPEED: FBQueryParameters.SLOW ? 100 : 400,

    // scale for the images on the image cards
    IMAGE_CARD_SCALE: 0.3,

    // font for number cards
    NUMBER_CARD_FONT: new FBFont( 30, { weight: 'bold' } ),

    // font for number functions
    NUMBER_FUNCTION_FONT: new FBFont( 20, { weight: 'bold' } ),

    // font for check boxes
    CHECK_BOX_FONT: new FBFont( 18 ),

    // font for equations
    EQUATION_FONT: new FBFont( 20 )
  };

  functionBuilder.register( 'FBConstants', FBConstants );

  return FBConstants;
} );
