// Copyright 2015-2016, University of Colorado Boulder

/**
 * Model for the 'Numbers' screen.
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
  var Range = require( 'DOT/Range' );
  var Vector2 = require( 'DOT/Vector2' );

  // function modules
  var Divide = require( 'FUNCTION_BUILDER/equations/model/functions/Divide' );
  var Plus = require( 'FUNCTION_BUILDER/equations/model/functions/Plus' );
  var Minus = require( 'FUNCTION_BUILDER/equations/model/functions/Minus' );
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

    // numeric cards
    var cardNumbers = [];
    for ( var i = CARD_NUMBERS_RANGE.min; i <= CARD_NUMBERS_RANGE.max; i++ ) {
      cardNumbers.push( i );
    }

    // function constructors and their (optional) options
    var functionData = [

      // +1
      {
        functionConstructor: Plus,
        options: {
          operand: 1,
          operandMutable: OPERAND_MUTABLE,
          fill: 'rgb( 165, 209, 167 )'
        }
      },

      // + 2
      {
        functionConstructor: Plus,
        options: {
          operand: 2,
          operandMutable: OPERAND_MUTABLE,
          fill: 'rgb( 235, 191, 109 )'
        }
      },

      // + 3
      {
        functionConstructor: Plus,
        options: {
          operand: 3,
          operandMutable: OPERAND_MUTABLE,
          fill: 'rgb( 232, 169, 236 )'
        }
      },

      // - 1
      {
        functionConstructor: Minus,
        options: {
          operand: 1,
          operandMutable: OPERAND_MUTABLE,
          fill: 'rgb( 135, 196, 229 )'
        }
      },

      // - 2
      {
        functionConstructor: Minus,
        options: {
          operand: 2,
          operandMutable: OPERAND_MUTABLE,
          fill: 'rgb( 198, 231, 220 )'
        }
      },

      // - 3
      {
        functionConstructor: Minus,
        options: {
          operand: 3,
          operandMutable: OPERAND_MUTABLE,
          fill: 'rgb( 255, 246, 187 )'
        }
      },

      // * 0
      {
        functionConstructor: Times,
        options: {
          operand: 0,
          operandMutable: OPERAND_MUTABLE,
          fill: 'rgb( 208, 201, 225 )'
        }
      },

      // * 1
      {
        functionConstructor: Times,
        options: {
          operand: 1,
          operandMutable: OPERAND_MUTABLE,
          fill: 'rgb( 255, 246, 187 )'
        }
      },

      // * 2
      {
        functionConstructor: Times,
        options: {
          operand: 2,
          operandMutable: OPERAND_MUTABLE,
          fill: 'rgb( 209, 151, 169 )'
        }
      },

      // / 1
      {
        functionConstructor: Divide,
        options: {
          operand: 1,
          operandMutable: OPERAND_MUTABLE,
          fill: 'rgb( 208, 201, 225 )'
        }
      },

      // / 2
      {
        functionConstructor: Divide,
        options: {
          operand: 2,
          operandMutable: OPERAND_MUTABLE,
          fill: 'rgb( 232, 169, 236 )'
        }
      },

      // / 3
      {
        functionConstructor: Divide,
        options: {
          operand: 3,
          operandMutable: OPERAND_MUTABLE,
          fill: 'rgb( 135, 196, 229 )'
        }
      }
    ];

    // builder
    var builder = new MathBuilder( {
      numberOfSlots: BUILDER_SLOTS,
      width: BUILDER_WIDTH,
      location: new Vector2( BUILDER_X, FBConstants.BUILDER_Y ), // center of input slot
      colorScheme: FBColors.BUILDER_BLUE
    } );

    // @public this Screen has a single scene, a variation of the 'Equations' scene
    this.scene = new EquationsScene( {

      // cards
      cardNumbers: cardNumbers,
      numberOfEachCard: 1,

      // functions
      functionData: functionData,
      numberOfEachFunction: 2,

      // builder
      builder: builder
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