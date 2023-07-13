// Copyright 2015-2023, University of Colorado Boulder

/**
 * Main entry point for the 'Function Builder' sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { AnyScreen } from '../../joist/js/Screen.js';
import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import FBConstants from './common/FBConstants.js';
import FBQueryParameters from './common/FBQueryParameters.js';
import EquationsScreen from './equations/EquationsScreen.js';
import FunctionBuilderStrings from './FunctionBuilderStrings.js';
import MysteryScreen from './mystery/MysteryScreen.js';
import NumbersScreen from './numbers/NumbersScreen.js';
import PatternsScreen from './patterns/PatternsScreen.js';
import TestScreen from './test/TestScreen.js';

simLauncher.launch( () => {

  const titleStringProperty = FunctionBuilderStrings[ 'function-builder' ].titleStringProperty;

  const screens: AnyScreen[] = [
    new PatternsScreen( Tandem.ROOT.createTandem( 'patternsScreen' ) ),
    new NumbersScreen( Tandem.ROOT.createTandem( 'numbersScreen' ) ),
    new EquationsScreen( Tandem.ROOT.createTandem( 'equationsScreen' ) ),
    new MysteryScreen( Tandem.ROOT.createTandem( 'mysteryScreen' ) )
  ];

  if ( FBQueryParameters.testScreen ) {
    screens.push( new TestScreen() );
  }

  const sim = new Sim( titleStringProperty, screens, {
    credits: FBConstants.CREDITS
  } );
  sim.start();
} );