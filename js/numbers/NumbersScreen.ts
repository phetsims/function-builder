// Copyright 2015-2023, University of Colorado Boulder

/**
 * The 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import FBColors from '../common/FBColors.js';
import FBIconFactory from '../common/view/FBIconFactory.js';
import functionBuilder from '../functionBuilder.js';
import FunctionBuilderStrings from '../FunctionBuilderStrings.js';
import NumbersModel from './model/NumbersModel.js';
import NumbersScreenView from './view/NumbersScreenView.js';
import Tandem from '../../../tandem/js/Tandem.js';

export default class NumbersScreen extends Screen<NumbersModel, NumbersScreenView> {

  public constructor( tandem: Tandem ) {

    const options: ScreenOptions = {
      name: FunctionBuilderStrings.screen.numbersStringProperty,
      backgroundColorProperty: new Property( FBColors.NUMBERS_SCREEN_BACKGROUND ), // {Property.<Color|string>}
      homeScreenIcon: FBIconFactory.createNumbersScreenIcon(),
      tandem: tandem
    };

    super(
      () => new NumbersModel(),
      model => new NumbersScreenView( model ),
      options
    );
  }
}

functionBuilder.register( 'NumbersScreen', NumbersScreen );