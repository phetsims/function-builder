// Copyright 2015-2023, University of Colorado Boulder

/**
 * The 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen from '../../../joist/js/Screen.js';
import FBColors from '../common/FBColors.js';
import FBIconFactory from '../common/view/FBIconFactory.js';
import functionBuilder from '../functionBuilder.js';
import FunctionBuilderStrings from '../FunctionBuilderStrings.js';
import PatternsModel from './model/PatternsModel.js';
import PatternsScreenView from './view/PatternsScreenView.js';
import Tandem from '../../../tandem/js/Tandem.js';

export default class PatternsScreen extends Screen<PatternsModel, PatternsScreenView> {

  public constructor( tandem: Tandem ) {

    const options = {
      name: FunctionBuilderStrings.screen.patternsStringProperty,
      backgroundColorProperty: FBColors.patternScreenBackgroundColorProperty,
      homeScreenIcon: FBIconFactory.createPatternsScreenIcon(),
      tandem: tandem
    };

    super(
      () => new PatternsModel( options.tandem.createTandem( 'model' ) ),
      model => new PatternsScreenView( model, options.tandem.createTandem( 'view' ) ),
      options
    );
  }
}

functionBuilder.register( 'PatternsScreen', PatternsScreen );