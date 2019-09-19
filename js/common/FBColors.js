// Copyright 2015-2017, University of Colorado Boulder

/**
 * Colors used in this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );

  const FBColors = {

    // background colors for Screens
    PATTERNS_SCREEN_BACKGROUND: 'rgb( 255, 247, 234 )',
    NUMBERS_SCREEN_BACKGROUND: 'rgb( 239, 255, 249 )',
    EQUATIONS_SCREEN_BACKGROUND: 'rgb( 255, 255, 226 )',
    MYSTERY_SCREEN_BACKGROUND: 'rgb( 255, 240, 255 )',

    // color for a function whose icon is hidden
    HIDDEN_FUNCTION: 'rgb( 220, 220, 220 )',

    // a builder color scheme, see Builder options.colorScheme
    BUILDER_BLUE: {
      top: 'rgb( 168, 198, 216 )',
      middle: 'rgb( 6, 114, 180 )',
      bottom: 'black',
      ends: 'rgb( 189, 206, 216 )'
    },

    // colors for Mystery functions
    MYSTERY_COLOR_SETS: [

      // red
      [ 'rgb( 255, 0, 0 )', 'rgb( 255, 80, 80 )', 'rgb( 255, 120, 120 )', 'rgb( 255, 180, 180 )' ],

      // orange
      [ 'rgb( 249, 160, 6 )', 'rgb( 250, 186, 75 )', 'rgb( 255, 179, 102 )', 'rgb(255, 204, 153)' ],

      // yellow
      [ 'rgb( 255, 255, 0 )', 'rgb( 255, 228, 51 )', 'rgb( 255, 255, 128 )', 'rgb( 255, 246, 187 )' ],

      // green
      [ 'rgb( 64, 255, 0 )', 'rgb( 71, 209, 71 )', 'rgb( 147, 231, 128 )', 'rgb( 204, 255, 204 )' ],

      // blue
      [ 'rgb( 51, 173, 255 )', 'rgb( 128, 197, 237 )', 'rgb( 0, 222, 224 )', 'rgb( 204, 230, 255 )' ],

      // purple
      [ 'rgb( 204, 102, 255 )', 'rgb( 191, 128, 255 )', 'rgb( 221, 175, 255 )', 'rgb( 238, 204, 255 )' ],

      // magenta
      [ 'rgb( 255, 0, 255 )', 'rgb( 255, 77, 255 )', 'rgb( 255, 128, 255 )', 'rgb( 255, 180, 255 )' ]
    ],

    // these colors are always used for the default Mystery functions, displayed on startup and Reset All
    MYSTERY_DEFAULT_CHALLENGE_COLORS: [

      // 1-function
      [ 'rgb( 250, 186, 75 )' ],

      // 2-functions
      [ 'rgb( 255, 120, 120 )', 'rgb( 51, 173, 255 )' ],

      // 3-functions
      [ 'rgb( 255, 255, 0 )', 'rgb( 255, 0, 255 )', 'rgb( 147, 231, 128 )' ]
    ]
  };

  functionBuilder.register( 'FBColors', FBColors );

  return FBColors;
} );