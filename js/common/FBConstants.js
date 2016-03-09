// Copyright 2015-2016, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Vector2 = require( 'DOT/Vector2' );

  var FBConstants = {

    // default options for each ScreenView subtype
    SCREEN_VIEW_OPTIONS: { layoutBounds: new Bounds2( 0, 0, 1024, 618 ) },

    // radius of the spyglass
    SPYGLASS_RADIUS: 27,

    // dimensions of a card Node
    CARD_SIZE: new Dimension2( 60, 60 ),

    // dimensions of a function Node
    FUNCTION_SIZE: new Dimension2( 120, 68 ),

    // x-inset of arrow-like ends of a function's shape
    FUNCTION_X_INSET_FACTOR: 0.15,

    // how much a function should 'pop out' of its container when clicked
    FUNCTION_POP_OUT_OFFSET: new Vector2( 0, -10 ),

    // how much a card should 'pop out' of its container when clicked
    CARD_POP_OUT_OFFSET: new Vector2( 0, -10 ),

    // distance/second that functions move when released by the user
    FUNCTION_ANIMATION_SPEED: 400,

    // distance/second that cards move when released by the user
    CARD_ANIMATION_SPEED: 400,

    // distance/second that cards move when output carousel is 'erased'
    ERASE_CARDS_ANIMATION_SPEED: 1200,

    // distance/second that cards and functions move when 'Reset All' is pressed
    RESET_ALL_ANIMATION_SPEED: 1200
  };

  functionBuilder.register( 'FBConstants', FBConstants );

  return FBConstants;
} );
