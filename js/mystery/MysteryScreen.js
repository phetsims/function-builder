// Copyright 2016, University of Colorado Boulder

/**
 * The 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var FBIconFactory = require( 'FUNCTION_BUILDER/common/view/FBIconFactory' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MysteryModel = require( 'FUNCTION_BUILDER/mystery/model/MysteryModel' );
  var MysteryScreenView = require( 'FUNCTION_BUILDER/mystery/view/MysteryScreenView' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var screenMysteryString = require( 'string!FUNCTION_BUILDER/screen.mystery' );

  /**
   * @constructor
   */
  function MysteryScreen() {
    Screen.call( this,
      screenMysteryString,
      FBIconFactory.createMysteryScreenIcon(),
      function() { return new MysteryModel(); },
      function( model ) { return new MysteryScreenView( model ); },
      { backgroundColor: FBColors.MYSTERY_SCREEN_BACKGROUND }
    );
  }

  functionBuilder.register( 'MysteryScreen', MysteryScreen );

  return inherit( Screen, MysteryScreen );
} );