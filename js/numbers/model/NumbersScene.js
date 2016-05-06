// Copyright 2016, University of Colorado Boulder

/**
 * The scene for the 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Range = require( 'DOT/Range' );
  var Scene = require( 'FUNCTION_BUILDER/common/model/Scene' );

  // constants
  var CARD_NUMBERS_RANGE = new Range( -4, 7 );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function NumbersScene( options ) {

    /**
     * Numbers for the input cards, in the order that they appear in the input carousel.
     * @type {HTMLImageElement[]}
     * @public (read-only)
     */
    this.cardNumbers = [];
    for ( var i = CARD_NUMBERS_RANGE.min; i <= CARD_NUMBERS_RANGE.max; i++ ) {
      this.cardNumbers.push( i );
    }

    /**
     * Data structures for creating {MathFunction} instances, in the order that they appear in the function carousel.
     * @type {Object[]}
     * @public (read-only)
     */
    this.functionData = [

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

    Scene.call( this, options );
  }

  functionBuilder.register( 'NumbersScene', NumbersScene );

  return inherit( Scene, NumbersScene );
} );
