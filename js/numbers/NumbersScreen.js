// Copyright 2015-2020, University of Colorado Boulder

/**
 * The 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import merge from '../../../phet-core/js/merge.js';
import FBColors from '../common/FBColors.js';
import FBIconFactory from '../common/view/FBIconFactory.js';
import functionBuilderStrings from '../function-builder-strings.js';
import functionBuilder from '../functionBuilder.js';
import NumbersModel from './model/NumbersModel.js';
import NumbersScreenView from './view/NumbersScreenView.js';

// strings
const screenNumbersString = functionBuilderStrings.screen.numbers;

class NumbersScreen extends Screen {

  /**
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( tandem, options ) {

    options = merge( {
      name: screenNumbersString,
      backgroundColorProperty: new Property( FBColors.NUMBERS_SCREEN_BACKGROUND ), // {Property.<Color|string>}
      homeScreenIcon: FBIconFactory.createNumbersScreenIcon()
    }, options );

    assert && assert( !options.tandem, 'tandem is a constructor parameter' );
    options.tandem = tandem;

    super(
      () => new NumbersModel(),
      model => new NumbersScreenView( model ),
      options
    );
  }
}

functionBuilder.register( 'NumbersScreen', NumbersScreen );

export default NumbersScreen;