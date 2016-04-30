// Copyright 2016, University of Colorado Boulder

/**
 * ScreenView for the 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {NumbersModel} model
   * @constructor
   */
  function MysteryScreenView( model ) {

    ScreenView.call( this, { layoutBounds: FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS } );

    //TODO
  }

  functionBuilder.register( 'MysteryScreenView', MysteryScreenView );

  return inherit( ScreenView, MysteryScreenView );
} );