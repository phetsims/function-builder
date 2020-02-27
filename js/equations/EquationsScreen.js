// Copyright 2015-2019, University of Colorado Boulder

/**
 * The 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import inherit from '../../../phet-core/js/inherit.js';
import FBColors from '../common/FBColors.js';
import FBIconFactory from '../common/view/FBIconFactory.js';
import functionBuilderStrings from '../function-builder-strings.js';
import functionBuilder from '../functionBuilder.js';
import EquationsModel from './model/EquationsModel.js';
import EquationsScreenView from './view/EquationsScreenView.js';

const screenEquationsString = functionBuilderStrings.screen.equations;

/**
 * @param {Tandem} tandem
 * @constructor
 */
function EquationsScreen( tandem ) {

  const options = {
    name: screenEquationsString,
    backgroundColorProperty: new Property( FBColors.EQUATIONS_SCREEN_BACKGROUND ), // {Property.<Color|string>}
    homeScreenIcon: FBIconFactory.createEquationsScreenIcon(),
    tandem: tandem
  };

  Screen.call( this,
    function() { return new EquationsModel(); },
    function( model ) { return new EquationsScreenView( model ); },
    options );
}

functionBuilder.register( 'EquationsScreen', EquationsScreen );

inherit( Screen, EquationsScreen );
export default EquationsScreen;