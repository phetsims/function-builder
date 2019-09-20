// Copyright 2015-2019, University of Colorado Boulder

/**
 * The 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const EquationsModel = require( 'FUNCTION_BUILDER/equations/model/EquationsModel' );
  const EquationsScreenView = require( 'FUNCTION_BUILDER/equations/view/EquationsScreenView' );
  const FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  const FBIconFactory = require( 'FUNCTION_BUILDER/common/view/FBIconFactory' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const screenEquationsString = require( 'string!FUNCTION_BUILDER/screen.equations' );

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

  return inherit( Screen, EquationsScreen );
} );