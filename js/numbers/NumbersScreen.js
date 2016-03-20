// Copyright 2015-2016, University of Colorado Boulder

/**
 * The 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBIconFactory = require( 'FUNCTION_BUILDER/common/view/FBIconFactory' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumbersModel = require( 'FUNCTION_BUILDER/numbers/model/NumbersModel' );
  var NumbersView = require( 'FUNCTION_BUILDER/numbers/view/NumbersView' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var screenNumbersString = require( 'string!FUNCTION_BUILDER/screen.numbers' );

  /**
   * @constructor
   */
  function NumbersScreen() {

    Screen.call( this,
      screenNumbersString,
      FBIconFactory.createNumbersScreenIcon(),
      function() { return new NumbersModel(); },
      function( model ) { return new NumbersView( model ); },
      { backgroundColor: 'rgb( 239, 255, 249 )' }
    );
  }

  functionBuilder.register( 'NumbersScreen', NumbersScreen );

  return inherit( Screen, NumbersScreen );
} );