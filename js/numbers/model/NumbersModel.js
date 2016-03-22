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

  /**
   * @constructor
   */
  function NumbersModel() {

    this.scene =
      new NumbersScene( {
        numberOfEachCard: 2,
        numberOfEachFunction: 2,
        builder: new Builder( {
          width: BUILDER_WIDTH,
          numberOfSlots: 2,
          // center of input slot
          location: new Vector2( ( FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS.width / 2 ) - ( BUILDER_WIDTH / 2 ), 280 ),
          colorScheme: FBColors.BUILDER_BLUE
        } )
      } );
  }

  functionBuilder.register( 'NumbersModel', NumbersModel );

  return inherit( Object, NumbersModel, {

    // @public
    reset: function() {
      //TODO delete this if there's ultimately nothing to do
    }
  } );
} );