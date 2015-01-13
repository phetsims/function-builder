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
  var inherit = require( 'PHET_CORE/inherit' );
  var PatternsModel = require( 'FUNCTION_BUILDER/patterns/model/PatternsModel' );
  var PatternsView = require( 'FUNCTION_BUILDER/patterns/view/PatternsView' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var screenTitle = require( 'string!FUNCTION_BUILDER/patterns' );

  // creates the icon for this screen
  var createIcon = function() {
    //TODO
    return new Rectangle( 0, 0, 100, 100, { fill: 'white' } );
  };

  /**
   * @constructor
   */
  function PatternsScreen() {

    Screen.call( this,
      screenTitle,
      createIcon(),
      function() { return new PatternsModel(); },
      function( model ) { return new PatternsView( model ); },
      { backgroundColor: FBColors.SCREEN_BACKGROUND }
    );
  }

  return inherit( Screen, PatternsScreen );
} );