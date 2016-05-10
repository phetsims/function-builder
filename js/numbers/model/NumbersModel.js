// Copyright 2015-2016, University of Colorado Boulder

/**
 * Model for the 'Numbers' screen, a variation of the 'Equations' model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionCreator = require( 'FUNCTION_BUILDER/common/model/FunctionCreator' );
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
  var BUILDER_SLOTS = 2;
  var BUILDER_WIDTH = ( BUILDER_SLOTS * FBConstants.FUNCTION_SIZE.width ) + 120;
  var BUILDER_X = ( FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS.width / 2 ) - ( BUILDER_WIDTH / 2 );
  var CARD_NUMBERS_RANGE = new Range( -4, 7 );
  var OPERAND_MUTABLE = false;

  /**
   * @constructor
   */
  function NumbersModel() {

    // {number[]} numeric cards, in the order that they appear in the carousel
    var cardContent = [];
    for ( var i = CARD_NUMBERS_RANGE.min; i <= CARD_NUMBERS_RANGE.max; i++ ) {
      cardContent.push( i );
    }

    // {FunctionCreator[]} function creators, in the order that functions appear in the carousel
    var functionCreators = [

      // +1
      new FunctionCreator( Plus, {
        operand: 1,
        operandMutable: OPERAND_MUTABLE,
        fill: 'rgb( 165, 209, 167 )'
      } ),

      // + 2
      new FunctionCreator( Plus, {
        operand: 2,
        operandMutable: OPERAND_MUTABLE,
        fill: 'rgb( 235, 191, 109 )'
      } ),

      // + 3
      new FunctionCreator( Plus, {
        operand: 3,
        operandMutable: OPERAND_MUTABLE,
        fill: 'rgb( 232, 169, 236 )'
      } ),

      // - 1
      new FunctionCreator( Minus, {
        operand: 1,
        operandMutable: OPERAND_MUTABLE,
        fill: 'rgb( 135, 196, 229 )'
      } ),

      // - 2
      new FunctionCreator( Minus, {
        operand: 2,
        operandMutable: OPERAND_MUTABLE,
        fill: 'rgb( 198, 231, 220 )'
      } ),

      // - 3
      new FunctionCreator( Minus, {
        operand: 3,
        operandMutable: OPERAND_MUTABLE,
        fill: 'rgb( 255, 246, 187 )'
      } ),

      // * 0
      new FunctionCreator( Times, {
        operand: 0,
        operandMutable: OPERAND_MUTABLE,
        fill: 'rgb( 208, 201, 225 )'
      } ),

      // * 1
      new FunctionCreator( Times, {
        operand: 1,
        operandMutable: OPERAND_MUTABLE,
        fill: 'rgb( 255, 246, 187 )'
      } ),

      // * 2
      new FunctionCreator( Times, {
        operand: 2,
        fill: 'rgb( 209, 151, 169 )'
      } ),

      // / 1
      new FunctionCreator( Divide, {
        operand: 1,
        operandMutable: OPERAND_MUTABLE,
        fill: 'rgb( 208, 201, 225 )'
      } ),

      // / 2
      new FunctionCreator( Divide, {
        operand: 2,
        operandMutable: OPERAND_MUTABLE,
        fill: 'rgb( 232, 169, 236 )'
      } ),

      // / 3
      new FunctionCreator( Divide, {
        operand: 3,
        operandMutable: OPERAND_MUTABLE,
        fill: 'rgb( 135, 196, 229 )'
      } )
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
      numberOfEachCard: 1,
      numberOfEachFunction: 2
    } );
  }

  functionBuilder.register( 'NumbersModel', NumbersModel );

  return inherit( Object, NumbersModel, {

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