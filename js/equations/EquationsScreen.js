// Copyright 2015-2016, University of Colorado Boulder

/**
 * The 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EquationsModel = require( 'FUNCTION_BUILDER/equations/model/EquationsModel' );
  var EquationsScreenView = require( 'FUNCTION_BUILDER/equations/view/EquationsScreenView' );
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var FBIconFactory = require( 'FUNCTION_BUILDER/common/view/FBIconFactory' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var screenEquationsString = require( 'string!FUNCTION_BUILDER/screen.equations' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function EquationsScreen( tandem ) {

    var options = {
      name: screenEquationsString,
      backgroundColor: FBColors.EQUATIONS_SCREEN_BACKGROUND,
      homeScreenIcon: FBIconFactory.createEquationsScreenIcon(),
      tandem: tandem
    };

    Screen.call( this,
      function() { return new EquationsModel(); },
      function( model ) { return new EquationsScreenView( model ); },
      options );
  }

  functionBuilder.register( 'EquationsScreen', EquationsScreen );

  return inherit( Screen, EquationsScreen );
} );