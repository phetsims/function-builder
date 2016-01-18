// Copyright 2015-2016, University of Colorado Boulder

/**
 * View for the 'Test' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var DemosView = require( 'SUN/demo/DemosView' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var testImageFunctions = require( 'FUNCTION_BUILDER/test/view/testImageFunctions' );

  /**
   * @constructor
   */
  function TestView() {
    DemosView.call( this, 'test', [

    /**
     * To add a test, add an object literal here. Each object has these properties:
     *
     * {string} label - label in the combo box
     * {function(Bounds2): Node} getNode - creates the scene graph for the test
     */
      { label: 'Image functions', getNode: testImageFunctions }
    ] );
  }

  functionBuilder.register( 'TestView', TestView );

  return inherit( ScreenView, TestView );
} );