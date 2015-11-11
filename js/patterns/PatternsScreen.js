// Copyright 2015, University of Colorado Boulder

/**
 * The 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PatternsModel = require( 'FUNCTION_BUILDER/patterns/model/PatternsModel' );
  var PatternsView = require( 'FUNCTION_BUILDER/patterns/view/PatternsView' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var screenPatternsString = require( 'string!FUNCTION_BUILDER/screen.patterns' );

  // creates the icon for this screen
  var createIcon = function() {
    //TODO
    return new Rectangle( 0, 0, Screen.HOME_SCREEN_ICON_SIZE.width, Screen.HOME_SCREEN_ICON_SIZE.height, { fill: 'white' } );
  };

  /**
   * @constructor
   */
  function PatternsScreen() {

    Screen.call( this,
      screenPatternsString,
      createIcon(),
      function() { return new PatternsModel(); },
      function( model ) { return new PatternsView( model ); },
      { backgroundColor: FBColors.SCREEN_BACKGROUND }
    );
  }

  functionBuilder.register( 'PatternsScreen', PatternsScreen );

  return inherit( Screen, PatternsScreen );
} );