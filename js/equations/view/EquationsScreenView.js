// Copyright 2015-2016, University of Colorado Boulder

/**
 * ScreenView for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );

  // images
  var equationsMockupImage = require( 'mipmap!FUNCTION_BUILDER/mockups/Equations-mockup.png' );

  /**
   * @param {EquationsModel} model
   * @constructor
   */
  function EquationsScreenView( model ) {

    ScreenView.call( this, { layoutBounds: FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS } );

    //TODO replace mockup image
    this.addChild( new Image( equationsMockupImage, {
      opacity: 0.5,
      center: this.layoutBounds.center
    } ) );

    // Reset All button
    var resetAllButton = new ResetAllButton( {
      listener: function() { model.reset(); },
      right: this.layoutBounds.maxX - 20,
      bottom: this.layoutBounds.maxY - 20
    } );
    this.addChild( resetAllButton );
  }

  functionBuilder.register( 'EquationsScreenView', EquationsScreenView );

  return inherit( ScreenView, EquationsScreenView );
} );