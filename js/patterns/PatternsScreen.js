// Copyright 2015-2020, University of Colorado Boulder

/**
 * The 'Patterns' screen.
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
import PatternsModel from './model/PatternsModel.js';
import PatternsScreenView from './view/PatternsScreenView.js';

const screenPatternsString = functionBuilderStrings.screen.patterns;

/**
 * @param {Tandem} tandem
 * @param {Object} [options]
 * @constructor
 */
function PatternsScreen( tandem, options ) {

  options = merge( {
    name: screenPatternsString,
    backgroundColorProperty: new Property( FBColors.PATTERNS_SCREEN_BACKGROUND ), // {Property.<Color|string>}
    homeScreenIcon: FBIconFactory.createPatternsScreenIcon()
  }, options );

  assert && assert( !options.tandem, 'tandem is a constructor parameter' );
  options.tandem = tandem;

  Screen.call( this,
    function() { return new PatternsModel(); },
    function( model ) { return new PatternsScreenView( model ); },
    options );
}

functionBuilder.register( 'PatternsScreen', PatternsScreen );

inherit( Screen, PatternsScreen );
export default PatternsScreen;