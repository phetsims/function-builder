// Copyright 2015-2018, University of Colorado Boulder

/**
 * ScreenView for the 'Test' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const DemosScreenView = require( 'SUN/demo/DemosScreenView' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const testImageFunctions = require( 'FUNCTION_BUILDER/test/view/testImageFunctions' );
  const testMysteryFunctionColors = require( 'FUNCTION_BUILDER/test/view/testMysteryFunctionColors' );

  /**
   * @constructor
   */
  function TestScreenView() {
    DemosScreenView.call( this, [
      { label: 'imageFunctions', createNode: testImageFunctions },
      { label: 'mysteryFunctionColors', createNode: testMysteryFunctionColors }
    ] );
  }

  functionBuilder.register( 'TestScreenView', TestScreenView );

  return inherit( ScreenView, TestScreenView );
} );