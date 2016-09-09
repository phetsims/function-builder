// Copyright 2015-2016, University of Colorado Boulder

/**
 * The 'Patterns' screen.
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
  var PatternsModel = require( 'FUNCTION_BUILDER/patterns/model/PatternsModel' );
  var PatternsScreenView = require( 'FUNCTION_BUILDER/patterns/view/PatternsScreenView' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var screenPatternsString = require( 'string!FUNCTION_BUILDER/screen.patterns' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function PatternsScreen( tandem ) {

    var options = {
      name: screenPatternsString,
      backgroundColor: FBColors.PATTERNS_SCREEN_BACKGROUND,
      homeScreenIcon: FBIconFactory.createPatternsScreenIcon(),
      tandem: tandem
    };

    Screen.call( this,
      function() { return new PatternsModel(); },
      function( model ) { return new PatternsScreenView( model ); },
      options );
  }

  functionBuilder.register( 'PatternsScreen', PatternsScreen );

  return inherit( Screen, PatternsScreen );
} );