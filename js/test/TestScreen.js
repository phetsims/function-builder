// Copyright 2015, University of Colorado Boulder

/**
 * The 'Test' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );
  var TestView = require( 'FUNCTION_BUILDER/test/view/TestView' );

  /**
   * @constructor
   */
  function PatternsScreen() {

    Screen.call( this,
      'Test',
      new Rectangle( 0, 0, Screen.HOME_SCREEN_ICON_SIZE.width, Screen.HOME_SCREEN_ICON_SIZE.height, { fill: 'white' } ),
      function() { return {}; },
      function( model ) { return new TestView( model ); },
      { backgroundColor: FBColors.SCREEN_BACKGROUND }
    );
  }

  return inherit( Screen, PatternsScreen );
} );