// Copyright 2016, University of Colorado Boulder

/**
 * Model for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EquationsScene = require( 'FUNCTION_BUILDER/equations/model/EquationsScene' );
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathBuilder = require( 'FUNCTION_BUILDER/common/model/MathBuilder' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var BUILDER_SLOTS = 3;
  var BUILDER_WIDTH = ( BUILDER_SLOTS * FBConstants.FUNCTION_SIZE.width ) + 70;
  var BUILDER_X = ( FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS.width / 2 ) - ( BUILDER_WIDTH / 2 );

  /**
   * @constructor
   */
  function EquationsModel() {

    this.scene = new EquationsScene( {
      numberOfEachCard: 1,
      numberOfEachFunction: 2,
      builder: new MathBuilder( {
        numberOfSlots: BUILDER_SLOTS,
        width: BUILDER_WIDTH,
        location: new Vector2( BUILDER_X, FBConstants.BUILDER_Y ), // center of input slot
        colorScheme: FBColors.BUILDER_BLUE
      } )
    } );
  }

  functionBuilder.register( 'EquationsModel', EquationsModel );

  return inherit( Object, EquationsModel, {

    // @public
    reset: function() {
      //TODO delete this if there's ultimately nothing to do
    },

    /**
     * Animates the model.
     *
     * @param {number} dt - time since the previous step, in seconds
     * @public
     */
    step: function( dt ) {
      this.scene.step( dt );
    }
  } );
} );