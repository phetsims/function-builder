// Copyright 2015-2019, University of Colorado Boulder

/**
 * The 'Numbers' screen.
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
  const NumbersModel = require( 'FUNCTION_BUILDER/numbers/model/NumbersModel' );
  const NumbersScreenView = require( 'FUNCTION_BUILDER/numbers/view/NumbersScreenView' );
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const screenNumbersString = require( 'string!FUNCTION_BUILDER/screen.numbers' );

  /**
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function NumbersScreen( tandem, options ) {

    options = _.extend( {
      name: screenNumbersString,
      backgroundColorProperty: new Property( FBColors.NUMBERS_SCREEN_BACKGROUND ), // {Property.<Color|string>}
      homeScreenIcon: FBIconFactory.createNumbersScreenIcon()
    }, options );

    assert && assert( !options.tandem, 'tandem is a constructor parameter' );
    options.tandem = tandem;

    Screen.call( this,
      function() { return new NumbersModel(); },
      function( model ) { return new NumbersScreenView( model ); },
      options );
  }

  functionBuilder.register( 'NumbersScreen', NumbersScreen );

  return inherit( Screen, NumbersScreen );
} );