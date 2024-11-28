// Copyright 2016-2024, University of Colorado Boulder

/**
 * The 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import Tandem from '../../../tandem/js/Tandem.js';
import FBColors from '../common/FBColors.js';
import FBIconFactory from '../common/view/FBIconFactory.js';
import functionBuilder from '../functionBuilder.js';
import FunctionBuilderStrings from '../FunctionBuilderStrings.js';
import MysteryModel from './model/MysteryModel.js';
import MysteryScreenView from './view/MysteryScreenView.js';

export default class MysteryScreen extends Screen<MysteryModel, MysteryScreenView> {

  public constructor( tandem: Tandem ) {

    const options: ScreenOptions = {
      name: FunctionBuilderStrings.screen.mysteryStringProperty,
      backgroundColorProperty: FBColors.mysteryScreenBackgroundColorProperty,
      homeScreenIcon: FBIconFactory.createMysteryScreenIcon(),
      tandem: tandem
    };

    super(
      () => new MysteryModel( options.tandem.createTandem( 'model' ) ),
      model => new MysteryScreenView( model, options.tandem.createTandem( 'view' ) ),
      options
    );
  }
}

functionBuilder.register( 'MysteryScreen', MysteryScreen );