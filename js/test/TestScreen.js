// Copyright 2015-2016, University of Colorado Boulder

/**
 * The 'Test' screen.  See FBQueryParameters for instructions on how to enabled this screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );
  var TestScreenView = require( 'FUNCTION_BUILDER/test/view/TestScreenView' );

  /**
   * @constructor
   */
  function TestScreen() {
    Screen.call( this,
      'Test',
      new Rectangle( 0, 0, Screen.HOME_SCREEN_ICON_SIZE.width, Screen.HOME_SCREEN_ICON_SIZE.height, { fill: 'red' } ),
      function() { return {}; },
      function( model ) { return new TestScreenView( model ); },
      { backgroundColor: 'rgb( 255, 247, 234 )' }
    );
  }

  functionBuilder.register( 'TestScreen', TestScreen );

  return inherit( Screen, TestScreen );
} );