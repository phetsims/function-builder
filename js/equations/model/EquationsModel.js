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
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathBuilder = require( 'FUNCTION_BUILDER/common/model/MathBuilder' );
  var MathScene = require( 'FUNCTION_BUILDER/common/model/MathScene' );
  var Range = require( 'DOT/Range' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var BUILDER_SLOTS = 3;
  var BUILDER_WIDTH = ( BUILDER_SLOTS * FBConstants.FUNCTION_SIZE.width ) + 70;
  var BUILDER_X = ( FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS.width / 2 ) - ( BUILDER_WIDTH / 2 );
  var CARD_NUMBERS_RANGE = new Range( -4, 6 );

  /**
   * @constructor
   */
  function EquationsModel() {

    // numeric cards
    var cardNumbers = [];
    for ( var i = CARD_NUMBERS_RANGE.min; i <= CARD_NUMBERS_RANGE.max; i++ ) {
      cardNumbers.push( i );
    }

    // symbolic cards
    var cardSymbols = [ FBSymbols.X ];

    // data structures for creating {MathFunction} instances,
    var functionData = [

      // plus
      {
        operatorString: FBSymbols.PLUS,
        apply: function( input, operand ) { return input.plus( operand ); },
        options: {
          fill: 'rgb( 246, 203, 144 )',
          pickerColor: 'rgb( 227, 114, 42 )'
        }
      },

      // minus
      {
        operatorString: FBSymbols.MINUS,
        apply: function( input, operand ) { return input.minus( operand ); },
        options: {
          fill: 'rgb( 152, 231, 156 )',
          pickerColor: 'rgb( 25, 168, 52 )'
        }
      },

      // times
      {
        operatorString: FBSymbols.TIMES,
        apply: function( input, operand ) { return input.times( operand ); },
        options: {
          fill: 'rgb( 237, 165, 222 )',
          pickerColor: 'rgb( 223, 17, 213 )',

          // multiplication by zero is not invertible
          isInvertibleWithOperand: function( operand ) {
            return ( operand !== 0 );
          }
        }
      },

      // divide
      {
        operatorString: FBSymbols.DIVIDE,
        apply: function( input, operand ) {
          assert && assert( operand !== 0, 'attempt to divide by zero' );
          return input.divide( operand );
        },
        options: {
          fill: 'rgb( 183, 200, 249 )',
          pickerColor: 'rgb( 14, 89, 218 )',

          // zero is not a valid operand, since division by zero is undefined
          zeroOperandValid: false
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

    // @public this Screen has a single scene
    this.scene = new MathScene( {

      // cards
      cardNumbers: cardNumbers,
      cardSymbols: cardSymbols,
      numberOfEachCard: 1,

      // functions
      functionData: functionData,
      numberOfEachFunction: 2,

      // builder
      builder: builder
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