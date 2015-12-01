// Copyright 2015, University of Colorado Boulder

/**
 * View for the 'Test' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var TestPatternsFunctions = require( 'FUNCTION_BUILDER/test/view/TestPatternsFunctions' );

  /**
   * @constructor
   */
  function TestView() {

    ScreenView.call( this, FBConstants.SCREEN_VIEW_OPTIONS );

    this.addChild( new TestPatternsFunctions( {
      center: this.layoutBounds.center
    } ) );
  }

  functionBuilder.register( 'TestView', TestView );

  return inherit( ScreenView, TestView );
} );