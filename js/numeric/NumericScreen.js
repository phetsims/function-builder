// Copyright 2002-2015, University of Colorado Boulder

/**
 * The 'Numeric' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumericModel = require( 'FUNCTION_BUILDER/numeric/model/NumericModel' );
  var NumericView = require( 'FUNCTION_BUILDER/numeric/view/NumericView' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var screenTitle = require( 'string!FUNCTION_BUILDER/numeric' );

  // creates the icon for this screen
  var createIcon = function() {
    //TODO
    return new Rectangle( 0, 0, 100, 100, { fill: 'white' } );
  };

  /**
   * @constructor
   */
  function NumericScreen() {

    //If this is a single-screen sim, then no icon is necessary.
    //If there are multiple screens, then the icon must be provided here.
    var icon = null;

    Screen.call( this,
      screenTitle,
      createIcon(),
      function() { return new NumericModel(); },
      function( model ) { return new NumericView( model ); },
      { backgroundColor: FBColors.SCREEN_BACKGROUND }
    );
  }

  return inherit( Screen, NumericScreen );
} );