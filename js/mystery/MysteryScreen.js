// Copyright 2016-2022, University of Colorado Boulder

/**
 * The 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import merge from '../../../phet-core/js/merge.js';
import FBColors from '../common/FBColors.js';
import FBIconFactory from '../common/view/FBIconFactory.js';
import functionBuilder from '../functionBuilder.js';
import FunctionBuilderStrings from '../FunctionBuilderStrings.js';
import MysteryModel from './model/MysteryModel.js';
import MysteryScreenView from './view/MysteryScreenView.js';

export default class MysteryScreen extends Screen {

  /**
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( tandem, options ) {

    options = merge( {
      name: FunctionBuilderStrings.screen.mysteryStringProperty,
      backgroundColorProperty: new Property( FBColors.MYSTERY_SCREEN_BACKGROUND ), // {Property.<Color|string>}
      homeScreenIcon: FBIconFactory.createMysteryScreenIcon()
    }, options );

    assert && assert( !options.tandem, 'tandem is a constructor parameter' );
    options.tandem = tandem;

    super(
      () => new MysteryModel(),
      model => new MysteryScreenView( model ),
      options
    );
  }
}

functionBuilder.register( 'MysteryScreen', MysteryScreen );