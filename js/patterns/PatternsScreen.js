// Copyright 2015-2019, University of Colorado Boulder

/**
 * The 'Patterns' screen.
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
  const PatternsModel = require( 'FUNCTION_BUILDER/patterns/model/PatternsModel' );
  const PatternsScreenView = require( 'FUNCTION_BUILDER/patterns/view/PatternsScreenView' );
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const screenPatternsString = require( 'string!FUNCTION_BUILDER/screen.patterns' );

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

  return inherit( Screen, PatternsScreen );
} );