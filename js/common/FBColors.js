// Copyright 2015-2016, University of Colorado Boulder

/**
 * Colors used in this simulations.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );

  var FBColors = {

    SCREEN_BACKGROUND: 'rgb( 255, 247, 234 )',

    // common colors
    LIGHT_GREEN: 'rgb( 147, 231, 129 )',
    LIGHT_PURPLE: 'rgb( 205, 175, 230 )',

    // a builder color scheme, see FBUtils.isaBuilderColorScheme
    BUILDER_MAROON: {
      top: 'rgb( 200, 182, 188 )',
      middle: 'rgb( 130, 62, 85 )',
      bottom: 'black',
      ends: 'rgb( 200, 186, 190 )'
    },

    // a builder color scheme, see FBUtils.isaBuilderColorScheme
    BUILDER_BLUE: {
      top: 'rgb( 168, 198, 216 )',
      middle: 'rgb( 6, 114, 180 )',
      bottom: 'black',
      ends: 'rgb( 189, 206, 216 )'
    },

    // Warhol function background colors
    WARHOL: {
      leftTop: 'rgb( 255, 81, 231 )',  // magenta
      rightTop: 'rgb( 250, 255, 105 )',  // yellow
      leftBottom: 'rgb( 88, 113, 255 )', // blue
      rightBottom: 'rgb( 6, 255, 175 )' // green
    }
  };

  functionBuilder.register( 'FBColors', FBColors );

  return FBColors;
} );