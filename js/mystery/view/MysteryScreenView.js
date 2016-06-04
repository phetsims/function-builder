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

    // @private
    this.model = model;

    ScreenView.call( this, { layoutBounds: FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS } );

    if ( !FBConstants.INITIALIZE_SCREEN_VIEWS_ON_DEMAND ) {
      this.initialize();
    }
  }

  functionBuilder.register( 'MysteryScreenView', MysteryScreenView );

  return inherit( ScreenView, MysteryScreenView, {

    /**
     * Called when the simulation clock ticks.
     *
     * @param {number} dt - clock time change, in seconds
     * @public
     */
    step: function( dt ) {
      if ( !this.initialized ) {
        this.initialize();
      }
    },

    /**
     * Deferred initialization, to improve startup time. Called from step.
     *
     * @private
     */
    initialize: function() {

      functionBuilder.log && functionBuilder.log( this.constructor.name + '.initialize' );

      //TODO implement initialize
    }
  } );
} );