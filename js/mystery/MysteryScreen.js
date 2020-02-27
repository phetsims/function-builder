// Copyright 2016-2019, University of Colorado Boulder

/**
 * The 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import inherit from '../../../phet-core/js/inherit.js';
import merge from '../../../phet-core/js/merge.js';
import FBColors from '../common/FBColors.js';
import FBIconFactory from '../common/view/FBIconFactory.js';
import functionBuilderStrings from '../function-builder-strings.js';
import functionBuilder from '../functionBuilder.js';
import MysteryModel from './model/MysteryModel.js';
import MysteryScreenView from './view/MysteryScreenView.js';

const screenMysteryString = functionBuilderStrings.screen.mystery;

/**
 * @param {Tandem} tandem
 * @param {Object} [options]
 * @constructor
 */
function MysteryScreen( tandem, options ) {

  options = merge( {
    name: screenMysteryString,
    backgroundColorProperty: new Property( FBColors.MYSTERY_SCREEN_BACKGROUND ), // {Property.<Color|string>}
    homeScreenIcon: FBIconFactory.createMysteryScreenIcon()
  }, options );

  assert && assert( !options.tandem, 'tandem is a constructor parameter' );
  options.tandem = tandem;

  Screen.call( this,
    function() { return new MysteryModel(); },
    function( model ) { return new MysteryScreenView( model ); },
    options );
}

functionBuilder.register( 'MysteryScreen', MysteryScreen );

inherit( Screen, MysteryScreen );
export default MysteryScreen;