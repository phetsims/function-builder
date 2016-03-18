// Copyright 2015-2016, University of Colorado Boulder

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
  var TestScreen = require( 'FUNCTION_BUILDER/test/TestScreen' );

  // strings
  var functionBuilderTitleString = require( 'string!FUNCTION_BUILDER/function-builder.title' );

  var options = {
    credits: {
      leadDesign: 'Amanda McGarry',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Karina K. R. Hensberry, Ariel Paul, Kathy Perkins,\nSam Reid, Beth Stade, David Webb'
    }
  };

  SimLauncher.launch( function() {
    var screens = [
      new PatternsScreen(), 
      new NumbersScreen(),
      new EquationsScreen(),
      new TestScreen() //TODO add only for ?dev
    ];
    var sim = new Sim( functionBuilderTitleString, screens, options );
    sim.start();
  } );
} );