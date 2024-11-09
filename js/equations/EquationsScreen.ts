// Copyright 2015-2024, University of Colorado Boulder

/**
 * The 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import Tandem from '../../../tandem/js/Tandem.js';
import FBColors from '../common/FBColors.js';
import FBIconFactory from '../common/view/FBIconFactory.js';
import functionBuilder from '../functionBuilder.js';
import FunctionBuilderStrings from '../FunctionBuilderStrings.js';
import EquationsModel from './model/EquationsModel.js';
import EquationsScreenView from './view/EquationsScreenView.js';

export default class EquationsScreen extends Screen<EquationsModel, EquationsScreenView> {

  public constructor( tandem: Tandem ) {

    const options: ScreenOptions = {
      name: FunctionBuilderStrings.screen.equationsStringProperty,
      backgroundColorProperty: FBColors.equationsScreenBackgroundColorProperty,
      homeScreenIcon: FBIconFactory.createEquationsScreenIcon(),
      tandem: tandem
    };

    super(
      () => new EquationsModel( options.tandem.createTandem( 'model' ) ),
      model => new EquationsScreenView( model, options.tandem.createTandem( 'view' ) ),
      options
    );
  }
}

functionBuilder.register( 'EquationsScreen', EquationsScreen );