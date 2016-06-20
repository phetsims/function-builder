// Copyright 2015-2016, University of Colorado Boulder

/**
 * Model for the 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBModel = require( 'FUNCTION_BUILDER/common/model/FBModel' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionCreator = require( 'FUNCTION_BUILDER/common/model/functions/FunctionCreator' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathBuilder = require( 'FUNCTION_BUILDER/common/model/builder/MathBuilder' );
  var Range = require( 'DOT/Range' );
  var RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );
  var Scene = require( 'FUNCTION_BUILDER/common/model/Scene' );
  var Vector2 = require( 'DOT/Vector2' );

  // function modules
  var Divide = require( 'FUNCTION_BUILDER/common/model/functions/Divide' );
  var Minus = require( 'FUNCTION_BUILDER/common/model/functions/Minus' );
  var Plus = require( 'FUNCTION_BUILDER/common/model/functions/Plus' );
  var Times = require( 'FUNCTION_BUILDER/common/model/functions/Times' );

  // constants
  var BUILDER_SLOTS = 2;
  var BUILDER_WIDTH = ( BUILDER_SLOTS * FBConstants.FUNCTION_SIZE.width ) + 120;
  var BUILDER_X = ( FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS.width / 2 ) - ( BUILDER_WIDTH / 2 );
  var CARD_NUMBERS_RANGE = new Range( -4, 7 );

  /**
   * @constructor
   */
  function NumbersModel() {

    // {RationalNumber[]} rational number cards, in the order that they appear in the carousel
    var cardContent = [];
    for ( var i = CARD_NUMBERS_RANGE.min; i <= CARD_NUMBERS_RANGE.max; i++ ) {
      cardContent.push( RationalNumber.withInteger( i ) );
    }

    // {FunctionCreator[]} function creators, in the order that functions appear in the carousel
    var functionCreators = [
      new FunctionCreator( Plus, { operand: 1, fill: 'rgb( 128, 197, 237 )' } ),   // + 1
      new FunctionCreator( Plus, { operand: 2, fill: 'rgb( 147, 231, 128 )' } ),   // + 2
      new FunctionCreator( Plus, { operand: 3, fill: 'rgb( 255, 120, 120 )' } ),   // + 3
      new FunctionCreator( Minus, { operand: 1, fill: 'rgb( 147, 231, 128 )' } ),  // - 1
      new FunctionCreator( Minus, { operand: 2, fill: 'rgb( 255, 161, 43 )' } ),   // - 2
      new FunctionCreator( Minus, { operand: 3, fill: 'rgb( 255, 246, 187 )' } ),  // - 3
      new FunctionCreator( Times, { operand: 0, fill: 'rgb( 0, 222, 224 )' } ),    // * 0
      new FunctionCreator( Times, { operand: 1, fill: 'rgb( 246, 164, 255 )' } ),  // * 1
      new FunctionCreator( Times, { operand: 2, fill: 'rgb( 250, 186, 75 )' } ),   // * 2
      new FunctionCreator( Divide, { operand: 1, fill: 'rgb( 127, 225, 173 )' } ), // / 1
      new FunctionCreator( Divide, { operand: 2, fill: 'rgb( 249, 144, 99 )' } ),  // / 2
      new FunctionCreator( Divide, { operand: 3, fill: 'rgb( 222, 186, 247 )' } )  // / 3
    ];

    // builder
    var builder = new MathBuilder( {
      numberOfSlots: BUILDER_SLOTS,
      width: BUILDER_WIDTH,
      location: new Vector2( BUILDER_X, FBConstants.BUILDER_Y )
    } );

    // this screen has 1 scene
    var scenes = [
      new Scene( cardContent, functionCreators, builder, {
        numberOfEachCard: 1,
        numberOfEachFunction: 2
      } )
    ];

    FBModel.call( this, scenes );
  }

  functionBuilder.register( 'NumbersModel', NumbersModel );

  return inherit( FBModel, NumbersModel );
} );