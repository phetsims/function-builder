// Copyright 2016-2019, University of Colorado Boulder

/**
 * The 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  const FBIconFactory = require( 'FUNCTION_BUILDER/common/view/FBIconFactory' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const MysteryModel = require( 'FUNCTION_BUILDER/mystery/model/MysteryModel' );
  const MysteryScreenView = require( 'FUNCTION_BUILDER/mystery/view/MysteryScreenView' );
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const screenMysteryString = require( 'string!FUNCTION_BUILDER/screen.mystery' );

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

  return inherit( Screen, MysteryScreen );
} );