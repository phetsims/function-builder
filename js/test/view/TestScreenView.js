// Copyright 2015-2020, University of Colorado Boulder

/**
 * ScreenView for the 'Test' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import inherit from '../../../../phet-core/js/inherit.js';
import DemosScreenView from '../../../../sun/js/demo/DemosScreenView.js';
import functionBuilder from '../../functionBuilder.js';
import testImageFunctions from './testImageFunctions.js';
import testMysteryFunctionColors from './testMysteryFunctionColors.js';

/**
 * @constructor
 */
function TestScreenView() {
  DemosScreenView.call( this, [
    { label: 'imageFunctions', createNode: testImageFunctions },
    { label: 'mysteryFunctionColors', createNode: testMysteryFunctionColors }
  ] );
}

functionBuilder.register( 'TestScreenView', TestScreenView );

inherit( ScreenView, TestScreenView );
export default TestScreenView;