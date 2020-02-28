// Copyright 2015-2020, University of Colorado Boulder

/**
 * Main entry point for the 'Function Builder' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Sim from '../../joist/js/Sim.js';
import SimLauncher from '../../joist/js/SimLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import FBQueryParameters from './common/FBQueryParameters.js';
import EquationsScreen from './equations/EquationsScreen.js';
import functionBuilderStrings from './function-builder-strings.js';
import MysteryScreen from './mystery/MysteryScreen.js';
import NumbersScreen from './numbers/NumbersScreen.js';
import PatternsScreen from './patterns/PatternsScreen.js';
import TestScreen from './test/TestScreen.js';

const functionBuilderTitleString = functionBuilderStrings[ 'function-builder' ].title;

// constants
const tandem = Tandem.ROOT;

const options = {
  credits: {
    leadDesign: 'Amanda McGarry',
    softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
    team: 'Amy Hanson, Karina K. R. Hensberry, Ariel Paul, Kathy Perkins, Sam Reid, Beth Stade, David Webb',
    qualityAssurance: 'Steele Dalton, Amanda Davis, Andrea Lin, Ben Roberts'
  }
};

SimLauncher.launch( () => {

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