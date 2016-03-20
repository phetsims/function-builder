// Copyright 2015-2016, University of Colorado Boulder

/**
 * The 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBIconFactory = require( 'FUNCTION_BUILDER/common/view/FBIconFactory' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PatternsModel = require( 'FUNCTION_BUILDER/patterns/model/PatternsModel' );
  var PatternsScreenView = require( 'FUNCTION_BUILDER/patterns/view/PatternsScreenView' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var screenPatternsString = require( 'string!FUNCTION_BUILDER/screen.patterns' );

  /**
   * @constructor
   */
  function PatternsScreen() {

    Screen.call( this,
      screenPatternsString,
      FBIconFactory.createPatternsScreenIcon(),
      function() { return new PatternsModel(); },
      function( model ) { return new PatternsScreenView( model ); },
      { backgroundColor: 'rgb( 255, 247, 234 )' }
    );
  }

  functionBuilder.register( 'PatternsScreen', PatternsScreen );

  return inherit( Screen, PatternsScreen );
} );