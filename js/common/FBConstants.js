// Copyright 2015-2016, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Vector2 = require( 'DOT/Vector2' );

  var FBConstants = {

    SCREEN_VIEW_OPTIONS: { layoutBounds: new Bounds2( 0, 0, 1024, 618 ) },

    // width of a function's shape (height is computed so that aspect ratio remains the same at all sizes)
    FUNCTION_WIDTH: 120,

    // x-inset of arrow-like ends of a function's shape
    FUNCTION_X_INSET_FACTOR: 0.15,

    // offset used when functions and cards are 'popped out' of their container (carousel or builder)
    POP_OUT_OFFSET: new Vector2( 10, -10 ),

    // distance/second that functions move when animating
    FUNCTION_ANIMATION_SPEED: 400,

    // distance/second that cards move when animating
    CARD_ANIMATION_SPEED: 400
  };

  functionBuilder.register( 'FBConstants', FBConstants );

  return FBConstants;
} );
