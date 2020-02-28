// Copyright 2015-2020, University of Colorado Boulder

/**
 * The 'Test' screen.  See FBQueryParameters for instructions on how to enabled this screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import inherit from '../../../phet-core/js/inherit.js';
import functionBuilder from '../functionBuilder.js';
import TestScreenView from './view/TestScreenView.js';

/**
 * @constructor
 */
function TestScreen() {

  const options = {
    name: 'Test',
    backgroundColorProperty: new Property( 'rgb( 255, 247, 234 )' )  // {Property.<Color|string>}
  };

  Screen.call( this,
    function() { return {}; },
    function( model ) { return new TestScreenView( model ); },
    options );
}

functionBuilder.register( 'TestScreen', TestScreen );

inherit( Screen, TestScreen );
export default TestScreen;