// Copyright 2015-2017, University of Colorado Boulder

/**
 * Main entry point for the 'Function Builder' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EquationsScreen = require( 'FUNCTION_BUILDER/equations/EquationsScreen' );
  var FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  var MysteryScreen = require( 'FUNCTION_BUILDER/mystery/MysteryScreen' );
  var NumbersScreen = require( 'FUNCTION_BUILDER/numbers/NumbersScreen' );
  var PatternsScreen = require( 'FUNCTION_BUILDER/patterns/PatternsScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Tandem = require( 'TANDEM/Tandem' );
  var TestScreen = require( 'FUNCTION_BUILDER/test/TestScreen' );

  // strings
  var functionBuilderTitleString = require( 'string!FUNCTION_BUILDER/function-builder.title' );

  // constants
  var tandem = Tandem.createRootTandem();

  var options = {
    credits: {
      leadDesign: 'Amanda McGarry',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Amy Hanson, Karina K. R. Hensberry, Ariel Paul, Kathy Perkins, Sam Reid, Beth Stade, David Webb',
      qualityAssurance: 'Steele Dalton, Amanda Davis, Andrea Lin, Ben Roberts'
    }
  };

  SimLauncher.launch( function() {

    var screens = [
      new PatternsScreen( tandem.createTandem( 'patternsScreen' ) ),
      new NumbersScreen( tandem.createTandem( 'numbersScreen' ) ),
      new EquationsScreen( tandem.createTandem( 'equationsScreen' ) ),
      new MysteryScreen( tandem.createTandem( 'mysteryScreen' ) )
    ];

    if ( FBQueryParameters.testScreen ) {
      screens.push( new TestScreen() );
    }

    var sim = new Sim( functionBuilderTitleString, screens, options );
    sim.start();
  } );
} );