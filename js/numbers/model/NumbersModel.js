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
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathBuilder = require( 'FUNCTION_BUILDER/common/model/MathBuilder' );
  var Range = require( 'DOT/Range' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var BUILDER_SLOTS = 2;
  var BUILDER_WIDTH = ( BUILDER_SLOTS * FBConstants.FUNCTION_SIZE.width ) + 120;
  var BUILDER_X = ( FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS.width / 2 ) - ( BUILDER_WIDTH / 2 );
  var CARD_NUMBERS_RANGE = new Range( -4, 7 );

  /**
   * @constructor
   */
  function NumbersModel() {

    // numeric cards
    var cardNumbers = [];
    for ( var i = CARD_NUMBERS_RANGE.min; i <= CARD_NUMBERS_RANGE.max; i++ ) {
      cardNumbers.push( i );
    }

    // data structures for creating {MathFunction} instances
    var functionData = [

      // + 1
      {
        apply: function( input ) { return input.plus( 1 ); },
        operatorString: FBSymbols.PLUS,
        options: {
          operand: 1,
          fill: 'rgb( 165, 209, 167 )'
        }
      },

      // + 2
      {
        apply: function( input ) { return input.plus( 2 ); },
        operatorString: FBSymbols.PLUS,
        options: {
          operand: 2,
          fill: 'rgb( 235, 191, 109 )'
        }
      },

      // + 3
      {
        apply: function( input ) { return input.plus( 3 ); },
        operatorString: FBSymbols.PLUS,
        options: {
          operand: 3,
          fill: 'rgb( 232, 169, 236 )'
        }
      },

      // - 1
      {
        apply: function( input ) { return input.minus( 1 ); },
        operatorString: FBSymbols.MINUS,
        options: {
          operand: 1,
          fill: 'rgb( 135, 196, 229 )'
        }
      },

      // - 2
      {
        apply: function( input ) { return input.minus( 2 ); },
        operatorString: FBSymbols.MINUS,
        options: {
          operand: 2,
          fill: 'rgb( 198, 231, 220 )'
        }
      },

      // - 3
      {
        apply: function( input ) { return input.minus( 3 ); },
        operatorString: FBSymbols.MINUS,
        options: {
          operand: 3,
          fill: 'rgb( 255, 246, 187 )'
        }
      },

      // * 0
      {
        apply: function( input ) { return input.times( 0 ); },
        operatorString: FBSymbols.TIMES,
        options: {
          operand: 0,
          fill: 'rgb( 208, 201, 225 )',
          invertible: false
        }
      },

      // * 1
      {
        apply: function( input ) { return input.times( 1 ); },
        operatorString: FBSymbols.TIMES,
        options: {
          operand: 1,
          fill: 'rgb( 255, 246, 187 )'
        }
      },

      // * 2
      {
        apply: function( input ) { return input.times( 2 ); },
        operatorString: FBSymbols.TIMES,
        options: {
          operand: 2,
          fill: 'rgb( 209, 151, 169 )'
        }
      },

      // / 1
      {
        apply: function( input ) { return input.divide( 1 ); },
        operatorString: FBSymbols.DIVIDE,
        options: {
          operand: 1,
          fill: 'rgb( 208, 201, 225 )'
        }
      },

      // / 2
      {
        apply: function( input ) { return input.divide( 2 ); },
        operatorString: FBSymbols.DIVIDE,
        options: {
          operand: 2,
          fill: 'rgb( 232, 169, 236 )'
        }
      },

      // / 3
      {
        apply: function( input ) { return input.divide( 3 ); },
        operatorString: FBSymbols.DIVIDE,
        options: {
          operand: 3,
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