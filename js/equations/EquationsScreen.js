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
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var ScreenIcon = require( 'JOIST/ScreenIcon' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var screenEquationsString = require( 'string!FUNCTION_BUILDER/screen.equations' );

  // creates the {Node} icon for this screen
  var createIcon = function() {
    return new ScreenIcon( new Text( 'y = 2x + 1', { font: new FBFont( 80 ) } ), {
      fill: 'rgb( 255, 255, 235 )'
    } );
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