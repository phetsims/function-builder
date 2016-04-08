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
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );

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
     * Data structures for creating {NumberFunction} instances, in the order that they appear in the function carousel.
     * @type {Object[]}
     * @public (read-only)
     */
    this.functionData = [

      // + 3
      {
        labelString: StringUtils.format( '{0} 3', FBSymbols.PLUS ),
        apply: function( input ) { return input + 3; },
        options: { fill: 'rgb( 165, 209, 167 )' }
      },

      // + 1
      {
        labelString: StringUtils.format( '{0} 1', FBSymbols.PLUS ),
        apply: function( input ) { return input + 1; },
        options: { fill: 'rgb( 235, 191, 109 )' }
      },

      // + ?
      {
        labelString: StringUtils.format( '{0} ?', FBSymbols.PLUS ),
        apply: function( input ) { return input + 2; },
        options: { fill: 'rgb( 232, 169, 236 )' }
      },

      // - 3
      {
        labelString: StringUtils.format( '{0} 3', FBSymbols.MINUS ),
        apply: function( input ) { return input - 3; },
        options: { fill: 'rgb( 135, 196, 229 )' }
      },

      // - 2
      {
        labelString: StringUtils.format( '{0} 2', FBSymbols.MINUS ),
        apply: function( input ) { return input - 2; },
        options: { fill: 'rgb( 198, 231, 220 )' }
      },

      // - ?
      {
        labelString: StringUtils.format( '{0} ?', FBSymbols.MINUS ),
        apply: function( input ) { return input; },
        options: { fill: 'rgb( 255, 246, 187 )' }
      },

      // x 2
      {
        labelString: StringUtils.format( '{0} 2', FBSymbols.TIMES ),
        apply: function( input ) { return input * 2; },
        options: { fill: 'rgb( 208, 201, 225 )' }
      },

      // x 0
      {
        labelString: StringUtils.format( '{0} 0', FBSymbols.TIMES ),
        apply: function( input ) { return 0; },
        options: {
          fill: 'rgb( 255, 246, 187 )',
          invertible: false
        }
      },

      // x ?
      {
        labelString: StringUtils.format( '{0} ?', FBSymbols.TIMES ),
        apply: function( input ) { return input * 1; },
        options: { fill: 'rgb( 209, 151, 169 )' }
      },

      // x 2 , + 1
      {
        labelString: StringUtils.format( '{0} 2 , {1} 1', FBSymbols.TIMES, FBSymbols.PLUS ),
        apply: function( input ) { return ( input * 2 ) + 1; },
        options: { fill: 'rgb( 208, 201, 225 )' }
      },

      // + 1 , x 2
      {
        labelString: StringUtils.format( '{0} 1 , {1} 2', FBSymbols.PLUS, FBSymbols.TIMES ),
        apply: function( input ) { return ( input + 1 ) * 2; },
        options: { fill: 'rgb( 232, 169, 236 )' }
      },

      // + ? , x ?
      {
        labelString: StringUtils.format( '{0} ? , {1} ?', FBSymbols.PLUS, FBSymbols.TIMES ),
        apply: function( input ) { return ( input + 3 ) * 2; },
        options: { fill: 'rgb( 135, 196, 229 )' }
      },

      // ? ?
      {
        labelString: '? ?',
        apply: function( input ) { return input * 2; },
        options: { fill: 'rgb( 246, 181, 138 )' }
      },

      // ? ?
      {
        labelString: '? ?',
        apply: function( input ) { return input + 7; },
        options: { fill: 'rgb( 232, 169, 236 )' }
      },

      // ? ? , ? ?
      {
        labelString: '? ? , ? ?',
        apply: function( input ) { return ( input * 2 ) - 3; },
        options: { fill: 'rgb( 165, 209, 167 )' }
      }
    ];

    Scene.call( this, options );
  }

  functionBuilder.register( 'NumbersScene', NumbersScene );

  return inherit( Scene, NumbersScene );
} );
