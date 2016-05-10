// Copyright 2016, University of Colorado Boulder

/**
 * Model for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var FunctionCreator = require( 'FUNCTION_BUILDER/common/model/FunctionCreator' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathBuilder = require( 'FUNCTION_BUILDER/common/model/MathBuilder' );
  var Range = require( 'DOT/Range' );
  var Scene = require( 'FUNCTION_BUILDER/common/model/Scene' );
  var Vector2 = require( 'DOT/Vector2' );

  // function modules
  var Divide = require( 'FUNCTION_BUILDER/equations/model/functions/Divide' );
  var Minus = require( 'FUNCTION_BUILDER/equations/model/functions/Minus' );
  var Plus = require( 'FUNCTION_BUILDER/equations/model/functions/Plus' );
  var Times = require( 'FUNCTION_BUILDER/equations/model/functions/Times' );

  // constants
  var BUILDER_SLOTS = 3;
  var BUILDER_WIDTH = ( BUILDER_SLOTS * FBConstants.FUNCTION_SIZE.width ) + 70;
  var BUILDER_X = ( FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS.width / 2 ) - ( BUILDER_WIDTH / 2 );
  var CARD_NUMBERS_RANGE = new Range( -4, 6 );

  /**
   * @constructor
   */
  function EquationsModel() {

    // {number[]} numeric cards, in the order that they appear in the carousel
    var cardContent = [];
    for ( var i = CARD_NUMBERS_RANGE.min; i <= CARD_NUMBERS_RANGE.max; i++ ) {
      cardContent.push( i );
    }

    // {FunctionCreator[]} function creators, in the order that functions appear in the carousel
    var functionCreators = [
      new FunctionCreator( Plus ),
      new FunctionCreator( Minus ),
      new FunctionCreator( Times ),
      new FunctionCreator( Divide )
    ];

    // builder
    var builder = new MathBuilder( {
      numberOfSlots: BUILDER_SLOTS,
      width: BUILDER_WIDTH,
      location: new Vector2( BUILDER_X, FBConstants.BUILDER_Y ),
      colorScheme: FBColors.BUILDER_BLUE
    } );

    // @public This screen has a single scene.
    this.scene = new Scene( cardContent, functionCreators, builder, {
      cardSymbol: FBSymbols.X,
      numberOfEachCard: 1,
      numberOfEachFunction: 2
    } );
  }

  functionBuilder.register( 'EquationsModel', EquationsModel );

  return inherit( Object, EquationsModel, {

    // @public
    reset: function() {
      //TODO delete reset if there's ultimately nothing to do
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