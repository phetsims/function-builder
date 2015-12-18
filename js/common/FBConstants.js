// Copyright 2015, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );

  var FBConstants = {

    SCREEN_VIEW_OPTIONS: { layoutBounds: new Bounds2( 0, 0, 1024, 618 ) },

    // width of a function piece, height is computed so that aspect ratio remains the same at all sizes
    FUNCTION_WIDTH: 120
  };

  functionBuilder.register( 'FBConstants', FBConstants );

  return FBConstants;
} );
