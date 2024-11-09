// Copyright 2015-2024, University of Colorado Boulder

/**
 * The 'Test' screen.  See FBQueryParameters for instructions on how to enabled this screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import TModel from '../../../joist/js/TModel.js';
import Tandem from '../../../tandem/js/Tandem.js';
import functionBuilder from '../functionBuilder.js';
import TestScreenView from './view/TestScreenView.js';

export default class TestScreen extends Screen<TestModel, TestScreenView> {

  public constructor() {

    const options: ScreenOptions = {
      name: new Property( 'Test' ),
      backgroundColorProperty: new Property( 'rgb( 255, 247, 234 )' ),
      tandem: Tandem.OPT_OUT
    };

    super(
      () => new TestModel(),
      model => new TestScreenView(),
      options
    );
  }
}

class TestModel implements TModel {
  public reset(): void {
    // do nothing
  }
}

functionBuilder.register( 'TestScreen', TestScreen );