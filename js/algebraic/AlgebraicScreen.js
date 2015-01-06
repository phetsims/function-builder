// Copyright 2002-2015, University of Colorado Boulder

/**
 * The 'Algebraic' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AlgebraicModel = require( 'FUNCTION_BUILDER/algebraic/model/AlgebraicModel' );
  var AlgebraicView = require( 'FUNCTION_BUILDER/algebraic/view/AlgebraicView' );
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var screenTitle = require( 'string!FUNCTION_BUILDER/algebraic' );

  // creates the icon for this screen
  var createIcon = function() {
    //TODO
    return new Rectangle( 0, 0, 100, 100, { fill: 'white' } );
  };

  /**
   * @constructor
   */
  function AlgebraicScreen() {

    Screen.call( this,
      screenTitle,
      createIcon(),
      function() { return new AlgebraicModel(); },
      function( model ) { return new AlgebraicView( model ); },
      { backgroundColor: FBColors.SCREEN_BACKGROUND }
    );
  }

  return inherit( Screen, AlgebraicScreen );
} );