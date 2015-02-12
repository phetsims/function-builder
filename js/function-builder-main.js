// Copyright 2002-2015, University of Colorado Boulder

/**
 * Main entry point for the 'Function Builder' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EquationsScreen = require( 'FUNCTION_BUILDER/equations/EquationsScreen' );
  var NumbersScreen = require( 'FUNCTION_BUILDER/numbers/NumbersScreen' );
  var PatternsScreen = require( 'FUNCTION_BUILDER/patterns/PatternsScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var simTitle = require( 'string!FUNCTION_BUILDER/function-builder.name' );

  var screens = [ new PatternsScreen(), new NumbersScreen(), new EquationsScreen() ];

  var options = {
    credits: {
      leadDesign: 'Amanda McGarry',
      softwareDevelopment: 'Chris Malley',
      team: 'Karina K. R. Hensberry, Ariel Paul, Kathy Perkins,\nSam Reid, Beth Stade, David Webb'
    }
  };

  SimLauncher.launch( function() {
    var sim = new Sim( simTitle, screens, options );
    sim.start();
  } );
} );