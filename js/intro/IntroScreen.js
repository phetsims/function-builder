// Copyright 2002-2015, University of Colorado Boulder

/**
 * The 'Intro' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var IntroModel = require( 'FUNCTION_BUILDER/intro/model/IntroModel' );
  var IntroView = require( 'FUNCTION_BUILDER/intro/view/IntroView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var screenTitle = require( 'string!FUNCTION_BUILDER/intro' );

  // creates the icon for this screen
  var createIcon = function() {
    //TODO
    return new Rectangle( 0, 0, 100, 100, { fill: 'white' } );
  };

  /**
   * @constructor
   */
  function IntroScreen() {

    Screen.call( this,
      screenTitle,
      createIcon(),
      function() { return new IntroModel(); },
      function( model ) { return new IntroView( model ); },
      { backgroundColor: FBColors.SCREEN_BACKGROUND }
    );
  }

  return inherit( Screen, IntroScreen );
} );