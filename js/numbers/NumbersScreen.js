// Copyright 2002-2015, University of Colorado Boulder

/**
 * The 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumbersModel = require( 'FUNCTION_BUILDER/numbers/model/NumbersModel' );
  var NumbersView = require( 'FUNCTION_BUILDER/numbers/view/NumbersView' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var screenTitle = require( 'string!FUNCTION_BUILDER/numbers' );

  // creates the icon for this screen
  var createIcon = function() {
    //TODO
    return new Rectangle( 0, 0, 100, 100, { fill: 'white' } );
  };

  /**
   * @constructor
   */
  function NumbersScreen() {

    Screen.call( this,
      screenTitle,
      createIcon(),
      function() { return new NumbersModel(); },
      function( model ) { return new NumbersView( model ); },
      { backgroundColor: FBColors.SCREEN_BACKGROUND }
    );
  }

  return inherit( Screen, NumbersScreen );
} );