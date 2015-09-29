// Copyright 2002-2015, University of Colorado Boulder

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
    LIGHT_GREEN: 'rgb( 147, 231, 129 )',
    LIGHT_PURPLE: 'rgb( 205, 175, 230 )'
  };
  functionBuilder.register( 'FBColors', FBColors );

  return FBColors;
} );