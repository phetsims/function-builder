// Copyright 2016-2023, University of Colorado Boulder

/**
 * The 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import FBColors from '../common/FBColors.js';
import FBIconFactory from '../common/view/FBIconFactory.js';
import functionBuilder from '../functionBuilder.js';
import FunctionBuilderStrings from '../FunctionBuilderStrings.js';
import MysteryModel from './model/MysteryModel.js';
import MysteryScreenView from './view/MysteryScreenView.js';
import Tandem from '../../../tandem/js/Tandem.js';

export default class MysteryScreen extends Screen<MysteryModel, MysteryScreenView> {

  public constructor( tandem: Tandem ) {

    const options: ScreenOptions = {
      name: FunctionBuilderStrings.screen.mysteryStringProperty,
      backgroundColorProperty: new Property( FBColors.MYSTERY_SCREEN_BACKGROUND ),
      homeScreenIcon: FBIconFactory.createMysteryScreenIcon(),
      tandem: tandem
    };

    super(
      () => new MysteryModel(),
      model => new MysteryScreenView( model ),
      options
    );
  }
}

functionBuilder.register( 'MysteryScreen', MysteryScreen );