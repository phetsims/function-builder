// Copyright 2015-2023, University of Colorado Boulder

/**
 * The 'Test' screen.  See FBQueryParameters for instructions on how to enabled this screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import functionBuilder from '../functionBuilder.js';
import TestScreenView from './view/TestScreenView.js';

export default class TestScreen extends Screen {

  constructor() {

    const options = {
      name: new Property( 'Test' ),
      backgroundColorProperty: new Property( 'rgb( 255, 247, 234 )' )  // {Property.<Color|string>}
    };

    super(
      () => {
        return {};
      },
      model => new TestScreenView( model ),
      options
    );
  }
}

functionBuilder.register( 'TestScreen', TestScreen );