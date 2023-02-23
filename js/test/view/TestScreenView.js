// Copyright 2015-2023, University of Colorado Boulder

/**
 * ScreenView for the 'Test' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DemosScreenView from '../../../../sun/js/demo/DemosScreenView.js';
import functionBuilder from '../../functionBuilder.js';
import testImageFunctions from './testImageFunctions.js';
import testMysteryFunctionColors from './testMysteryFunctionColors.js';

export default class TestScreenView extends DemosScreenView {
  constructor() {
    super( [
      { label: 'imageFunctions', createNode: testImageFunctions },
      { label: 'mysteryFunctionColors', createNode: testMysteryFunctionColors }
    ] );
  }
}

functionBuilder.register( 'TestScreenView', TestScreenView );