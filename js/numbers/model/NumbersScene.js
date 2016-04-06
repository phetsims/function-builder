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
        fill: 'rgb( 165, 209, 167 )',
        apply: function( input ) { return input + 3; },
        invertible: true
      },

      // + 1
      {
        labelString: StringUtils.format( '{0} 1', FBSymbols.PLUS ),
        fill: 'rgb( 235, 191, 109 )',
        apply: function( input ) { return input + 1; },
        invertible: true
      },

      // + ?
      {
        labelString: StringUtils.format( '{0} ?', FBSymbols.PLUS ),
        fill: 'rgb( 232, 169, 236 )',
        apply: function( input ) { return input + 2; },
        invertible: true
      },

      // - 3
      {
        labelString: StringUtils.format( '{0} 3', FBSymbols.MINUS ),
        fill: 'rgb( 135, 196, 229 )',
        apply: function( input ) { return input - 3; },
        invertible: true
      },

      // - 2
      {
        labelString: StringUtils.format( '{0} 2', FBSymbols.MINUS ),
        fill: 'rgb( 198, 231, 220 )',
        apply: function( input ) { return input - 2; },
        invertible: true
      },

      // - ?
      {
        labelString: StringUtils.format( '{0} ?', FBSymbols.MINUS ),
        fill: 'rgb( 255, 246, 187 )',
        apply: function( input ) { return input; },
        invertible: true
      },

      // x 2
      {
        labelString: StringUtils.format( '{0} 2', FBSymbols.TIMES ),
        fill: 'rgb( 208, 201, 225 )',
        apply: function( input ) { return input * 2; },
        invertible: true
      },

      // x 0
      {
        labelString: StringUtils.format( '{0} 0', FBSymbols.TIMES ),
        fill: 'rgb( 255, 246, 187 )',
        apply: function( input ) { return 0; },
        invertible: false
      },

      // x ?
      {
        labelString: StringUtils.format( '{0} ?', FBSymbols.TIMES ),
        fill: 'rgb( 209, 151, 169 )',
        apply: function( input ) { return input * 1; },
        invertible: true
      },

      // x 2 , + 1
      {
        labelString: StringUtils.format( '{0} 2 , {1} 1', FBSymbols.TIMES, FBSymbols.PLUS ),
        fill: 'rgb( 208, 201, 225 )',
        apply: function( input ) { return ( input * 2 ) + 1; },
        invertible: true
      },

      // + 1 , x 2
      {
        labelString: StringUtils.format( '{0} 1 , {1} 2', FBSymbols.PLUS, FBSymbols.TIMES ),
        fill: 'rgb( 232, 169, 236 )',
        apply: function( input ) { return ( input + 1 ) * 2; },
        invertible: true
      },

      // + ? , x ?
      {
        labelString: StringUtils.format( '{0} ? , {1} ?', FBSymbols.PLUS, FBSymbols.TIMES ),
        fill: 'rgb( 135, 196, 229 )',
        apply: function( input ) { return ( input + 3 ) * 2; },
        invertible: true
      },

      // ? ?
      {
        labelString: '? ?',
        fill: 'rgb( 246, 181, 138 )',
        apply: function( input ) { return input * 2; },
        invertible: true
      },

      // ? ?
      {
        labelString: '? ?',
        fill: 'rgb( 232, 169, 236 )',
        apply: function( input ) { return input + 7; },
        invertible: true
      },

      // ? ? , ? ?
      {
        labelString: '? ? , ? ?',
        fill: 'rgb( 165, 209, 167 )',
        apply: function( input ) { return ( input * 2 ) - 3; },
        invertible: true
      }
    ];

    Scene.call( this, options );
  }

  functionBuilder.register( 'NumbersScene', NumbersScene );

  return inherit( Scene, NumbersScene );
} );
