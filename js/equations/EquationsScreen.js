// Copyright 2015-2020, University of Colorado Boulder

/**
 * The 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import FBColors from '../common/FBColors.js';
import FBIconFactory from '../common/view/FBIconFactory.js';
import functionBuilderStrings from '../function-builder-strings.js';
import functionBuilder from '../functionBuilder.js';
import EquationsModel from './model/EquationsModel.js';
import EquationsScreenView from './view/EquationsScreenView.js';

// strings
const screenEquationsString = functionBuilderStrings.screen.equations;

class EquationsScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    const options = {
      name: screenEquationsString,
      backgroundColorProperty: new Property( FBColors.EQUATIONS_SCREEN_BACKGROUND ), // {Property.<Color|string>}
      homeScreenIcon: FBIconFactory.createEquationsScreenIcon(),
      tandem: tandem
    };

    super(
      () => new EquationsModel(),
      model => new EquationsScreenView( model ),
      options
    );
  }
}

functionBuilder.register( 'EquationsScreen', EquationsScreen );

export default EquationsScreen;