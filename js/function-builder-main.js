// Copyright 2015-2020, University of Colorado Boulder

/**
 * Main entry point for the 'Function Builder' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import FBQueryParameters from './common/FBQueryParameters.js';
import EquationsScreen from './equations/EquationsScreen.js';
import functionBuilderStrings from './functionBuilderStrings.js';
import MysteryScreen from './mystery/MysteryScreen.js';
import NumbersScreen from './numbers/NumbersScreen.js';
import PatternsScreen from './patterns/PatternsScreen.js';
import TestScreen from './test/TestScreen.js';

const options = {
  credits: {
    leadDesign: 'Amanda McGarry',
    softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
    team: 'Amy Hanson, Karina K. R. Hensberry, Ariel Paul, Kathy Perkins, Sam Reid, Beth Stade, David Webb',
    qualityAssurance: 'Steele Dalton, Amanda Davis, Andrea Lin, Ben Roberts'
  }
};

simLauncher.launch( () => {

  const screens = [
    new PatternsScreen( Tandem.ROOT.createTandem( 'patternsScreen' ) ),
    new NumbersScreen( Tandem.ROOT.createTandem( 'numbersScreen' ) ),
    new EquationsScreen( Tandem.ROOT.createTandem( 'equationsScreen' ) ),
    new MysteryScreen( Tandem.ROOT.createTandem( 'mysteryScreen' ) )
  ];

  if ( FBQueryParameters.testScreen ) {
    screens.push( new TestScreen() );
  }

  const sim = new Sim( functionBuilderStrings[ 'function-builder' ].title, screens, options );
  sim.start();
} );