// Copyright 2015-2016, University of Colorado Boulder

/**
 * Model for the 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Builder = require( 'FUNCTION_BUILDER/common/model/Builder' );
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumbersScene = require( 'FUNCTION_BUILDER/numbers/model/NumbersScene' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var BUILDER_WIDTH = 420;
  var BUILDER_X = ( FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS.width / 2 ) - ( BUILDER_WIDTH / 2 );
  var BUILDER_Y = 280;

  /**
   * @constructor
   */
  function NumbersModel() {

    this.scene = new NumbersScene( {
      numberOfEachCard: 1,
      numberOfEachFunction: 2,
      builder: new Builder( {
        width: BUILDER_WIDTH,
        numberOfSlots: 2,
        location: new Vector2( BUILDER_X, BUILDER_Y ), // center of input slot
        colorScheme: FBColors.BUILDER_BLUE
      } )
    } );
  }

  functionBuilder.register( 'NumbersModel', NumbersModel );

  return inherit( Object, NumbersModel, {

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