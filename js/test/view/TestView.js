// Copyright 2015, University of Colorado Boulder

/**
 * View for the 'Test' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var DemosView = require( 'SUN/demo/DemosView' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var testPatternsFunctions = require( 'FUNCTION_BUILDER/test/view/testPatternsFunctions' );

  /**
   * @constructor
   */
  function TestView() {
    DemosView.call( this, 'test', [

      // To add a test, create an entry here.
      // label is a {string} that will appear in the combo box.
      // getNode is a {function} that takes a {Bounds2} layoutBounds and returns a {Node}.
      { label: 'Patterns functions', getNode: testPatternsFunctions }
    ] );
  }

  functionBuilder.register( 'TestView', TestView );

  return inherit( ScreenView, TestView );
} );