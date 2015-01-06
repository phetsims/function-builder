// Copyright 2002-2015, University of Colorado Boulder

/**
 * Main entry point for the 'Function Builder' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AlgebraicScreen = require( 'FUNCTION_BUILDER/algebraic/AlgebraicScreen' );
  var FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  var IntroScreen = require( 'FUNCTION_BUILDER/intro/IntroScreen' );
  var NumericScreen = require( 'FUNCTION_BUILDER/numeric/NumericScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var simTitle = require( 'string!FUNCTION_BUILDER/function-builder.name' );

  var screens = [ new IntroScreen(), new NumericScreen(), new AlgebraicScreen() ];

  var options = {
    credits: {
      leadDesign: 'Amanda McGarry',
      softwareDevelopment: 'Chris Malley',
      team: 'Karina K. R. Hensberry, Ariel Paul, Kathy Perkins,\nSam Reid, Beth Stade, David Webb'
    }
  };

  // Appending '?dev' to the URL will enable developer-only features.
  if ( FBQueryParameters.DEV ) {
    options = _.extend( {
      // add dev-specific options here
      showHomeScreen: false,
      screenIndex: 3
    }, options );
  }

  SimLauncher.launch( function() {
    var sim = new Sim( simTitle, screens, options );
    sim.start();
  } );
} );