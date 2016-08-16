// Copyright 2015-2016, University of Colorado Boulder

/**
 * The 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var FBIconFactory = require( 'FUNCTION_BUILDER/common/view/FBIconFactory' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumbersModel = require( 'FUNCTION_BUILDER/numbers/model/NumbersModel' );
  var NumbersScreenView = require( 'FUNCTION_BUILDER/numbers/view/NumbersScreenView' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var screenNumbersString = require( 'string!FUNCTION_BUILDER/screen.numbers' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function NumbersScreen( tandem ) {
    Screen.call( this,
      screenNumbersString,
      FBIconFactory.createNumbersScreenIcon(),
      function() { return new NumbersModel(); },
      function( model ) { return new NumbersScreenView( model ); }, {
        backgroundColor: FBColors.NUMBERS_SCREEN_BACKGROUND,
        tandem: tandem
      }
    );
  }

  functionBuilder.register( 'NumbersScreen', NumbersScreen );

  return inherit( Screen, NumbersScreen );
} );