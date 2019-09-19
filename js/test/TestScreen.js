// Copyright 2015-2017, University of Colorado Boulder

/**
 * The 'Test' screen.  See FBQueryParameters for instructions on how to enabled this screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );
  const TestScreenView = require( 'FUNCTION_BUILDER/test/view/TestScreenView' );

  /**
   * @constructor
   */
  function TestScreen() {

    var options = {
      name: 'Test',
      backgroundColorProperty: new Property( 'rgb( 255, 247, 234 )' )  // {Property.<Color|string>}
    };

    Screen.call( this,
      function() { return {}; },
      function( model ) { return new TestScreenView( model ); },
      options );
  }

  functionBuilder.register( 'TestScreen', TestScreen );

  return inherit( Screen, TestScreen );
} );