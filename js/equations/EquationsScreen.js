// Copyright 2015-2016, University of Colorado Boulder

/**
 * The 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EquationsModel = require( 'FUNCTION_BUILDER/equations/model/EquationsModel' );
  var EquationsView = require( 'FUNCTION_BUILDER/equations/view/EquationsView' );
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var screenEquationsString = require( 'string!FUNCTION_BUILDER/screen.equations' );

  //TODO creates the icon for this screen
  var createIcon = function() {
    //TODO
    return new Rectangle( 0, 0, Screen.HOME_SCREEN_ICON_SIZE.width, Screen.HOME_SCREEN_ICON_SIZE.height, { fill: 'white' } );
  };

  /**
   * @constructor
   */
  function EquationsScreen() {

    Screen.call( this,
      screenEquationsString,
      createIcon(),
      function() { return new EquationsModel(); },
      function( model ) { return new EquationsView( model ); },
      { backgroundColor: FBColors.SCREEN_BACKGROUND }
    );
  }

  functionBuilder.register( 'EquationsScreen', EquationsScreen );

  return inherit( Screen, EquationsScreen );
} );