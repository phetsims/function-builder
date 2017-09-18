// Copyright 2015-2016, University of Colorado Boulder

/**
 * ScreenView for the 'Test' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var DemosScreenView = require( 'SUN/demo/DemosScreenView' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var testImageFunctions = require( 'FUNCTION_BUILDER/test/view/testImageFunctions' );
  var testMysteryFunctionColors = require( 'FUNCTION_BUILDER/test/view/testMysteryFunctionColors' );

  /**
   * @constructor
   */
  function TestScreenView() {
    DemosScreenView.call( this, [
      { label: 'imageFunctions', getNode: testImageFunctions },
      { label: 'mysteryFunctionColors', getNode: testMysteryFunctionColors }
    ] );
  }

  functionBuilder.register( 'TestScreenView', TestScreenView );

  return inherit( ScreenView, TestScreenView );
} );