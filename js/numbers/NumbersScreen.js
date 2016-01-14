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
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumbersModel = require( 'FUNCTION_BUILDER/numbers/model/NumbersModel' );
  var NumbersView = require( 'FUNCTION_BUILDER/numbers/view/NumbersView' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var screenNumbersString = require( 'string!FUNCTION_BUILDER/screen.numbers' );

  // creates the icon for this screen
  var createIcon = function() {
    //TODO
    return new Rectangle( 0, 0, Screen.HOME_SCREEN_ICON_SIZE.width, Screen.HOME_SCREEN_ICON_SIZE.height, { fill: 'white' } );
  };

  /**
   * @constructor
   */
  function NumbersScreen() {

    Screen.call( this,
      screenNumbersString,
      createIcon(),
      function() { return new NumbersModel(); },
      function( model ) { return new NumbersView( model ); },
      { backgroundColor: FBColors.SCREEN_BACKGROUND }
    );
  }

  functionBuilder.register( 'NumbersScreen', NumbersScreen );

  return inherit( Screen, NumbersScreen );
} );