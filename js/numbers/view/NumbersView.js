// Copyright 2015-2016, University of Colorado Boulder

/**
 * View for the 'Numbers' screen.
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
  var numbersMockupImage = require( 'mipmap!FUNCTION_BUILDER/mockups/Numbers-mockup.png' );

  /**
   * @param {NumbersModel} model
   * @constructor
   */
  function NumbersView( model ) {

    ScreenView.call( this, { layoutBounds: FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS } );

    //TODO replace mockup image
    this.addChild( new Image( numbersMockupImage, {
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

  functionBuilder.register( 'NumbersView', NumbersView );

  return inherit( ScreenView, NumbersView );
} );