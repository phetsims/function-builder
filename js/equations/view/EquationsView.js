// Copyright 2015-2016, University of Colorado Boulder

/**
 * View for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {EquationsModel} model
   * @constructor
   */
  function EquationsView( model ) {

    ScreenView.call( this, { layoutBounds: FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS } );

    this.addChild( new Text( 'Equations: Under Construction', {
      font: new FBFont( 36 ),
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

  functionBuilder.register( 'EquationsView', EquationsView );

  return inherit( ScreenView, EquationsView );
} );