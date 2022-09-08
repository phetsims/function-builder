// Copyright 2015-2022, University of Colorado Boulder

/**
 * The 'Patterns' screen.
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
import PatternsModel from './model/PatternsModel.js';
import PatternsScreenView from './view/PatternsScreenView.js';

class PatternsScreen extends Screen {

  /**
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( tandem, options ) {

    options = merge( {
      name: FunctionBuilderStrings.screen.patterns,
      backgroundColorProperty: new Property( FBColors.PATTERNS_SCREEN_BACKGROUND ), // {Property.<Color|string>}
      homeScreenIcon: FBIconFactory.createPatternsScreenIcon()
    }, options );

    assert && assert( !options.tandem, 'tandem is a constructor parameter' );
    options.tandem = tandem;

    super(
      () => new PatternsModel(),
      model => new PatternsScreenView( model ),
      options
    );
  }
}

functionBuilder.register( 'PatternsScreen', PatternsScreen );

export default PatternsScreen;