// Copyright 2015-2019, University of Colorado Boulder

/**
 * Main entry point for the 'Function Builder' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const EquationsScreen = require( 'FUNCTION_BUILDER/equations/EquationsScreen' );
  const FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  const MysteryScreen = require( 'FUNCTION_BUILDER/mystery/MysteryScreen' );
  const NumbersScreen = require( 'FUNCTION_BUILDER/numbers/NumbersScreen' );
  const PatternsScreen = require( 'FUNCTION_BUILDER/patterns/PatternsScreen' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const Tandem = require( 'TANDEM/Tandem' );
  const TestScreen = require( 'FUNCTION_BUILDER/test/TestScreen' );

  // strings
  const functionBuilderTitleString = require( 'string!FUNCTION_BUILDER/function-builder.title' );

  // constants
  const tandem = Tandem.rootTandem;

  const options = {
    credits: {
      leadDesign: 'Amanda McGarry',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Amy Hanson, Karina K. R. Hensberry, Ariel Paul, Kathy Perkins, Sam Reid, Beth Stade, David Webb',
      qualityAssurance: 'Steele Dalton, Amanda Davis, Andrea Lin, Ben Roberts'
    }
  };

  SimLauncher.launch( function() {

    const screens = [
      new PatternsScreen( tandem.createTandem( 'patternsScreen' ) ),
      new NumbersScreen( tandem.createTandem( 'numbersScreen' ) ),
      new EquationsScreen( tandem.createTandem( 'equationsScreen' ) ),
      new MysteryScreen( tandem.createTandem( 'mysteryScreen' ) )
    ];

    if ( FBQueryParameters.testScreen ) {
      screens.push( new TestScreen() );
    }

    const sim = new Sim( functionBuilderTitleString, screens, options );
    sim.start();
  } );
} );