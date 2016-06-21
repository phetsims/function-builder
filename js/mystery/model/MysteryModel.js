// Copyright 2016, University of Colorado Boulder

/**
 * Model for the 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBModel = require( 'FUNCTION_BUILDER/common/model/FBModel' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MysteryScene = require( 'FUNCTION_BUILDER/mystery/model/MysteryScene' );
  var Util = require( 'DOT/Util' );

  // pool of 1-function challenges
  var POOL1 = [
    '+ 0',
    '+ 1',
    '+ 2',
    '+ 3',
    '- 0',
    '- 1',
    '- 2',
    '- 3',
    '* -3',
    '* -2',
    '* -1',
    '* 0',
    '* 1',
    '* 2',
    '* 3',
    '/ -3',
    '/ -2',
    '/ -1',
    '/ 0',
    '/ 1',
    '/ 2',
    '/ 3'
  ];

  // pool of 2-function challenges
  var POOL2 = [
    '+ 1 + 3',
    '+ 1 + 2',
    '* 2 * 0',
    '* 0 * 1',
    '* -1 * -2',
    '* 2 * 1',
    '* -3 * 2',
    '* 2 * -3',
    '* 3 + 3',
    '* 2 + 3',
    '* 2 - 2',
    '* 1 + 3',
    '* 1 + 2',
    '/ 1 - 1',
    '* 0 + 3',
    '* -3 + 0',
    '/ 3 - 3',
    '/ 3 + 2',
    '/ -1 - 3',
    '/ -2 + 2',
    '+ 3 * 3',
    '- 3 * 2',
    '+ 2 * 2',
    '+ 3 * 1',
    '+ 2 / 1',
    '- 1 * 1',
    '+ 3 * 0',
    '+ 0 * -3',
    '- 3 / 3',
    '- 2 / 3',
    '+ 3 / -1',
    '+ 2 / -1'
  ];

  // pool of 3-function challenges
  var POOL3 = [
    '* 1 + 2 / 3',
    '/ 1 - 2 * 3',
    '* 2 + 3 / 2',
    '/ 2 - 3 * 2'
  ];

  // maps operator token used in the pool to operator symbols used in functions
  var OPERATOR_MAP = {
    '+': FBSymbols.PLUS,
    '-': FBSymbols.MINUS,
    '*': FBSymbols.TIMES,
    '/': FBSymbols.DIVIDE
  };

  /**
   * @constructor
   */
  function MysteryModel() {

    var scenes = [
      new MysteryScene( POOL1, { functionsPerChallenge: 1 } ),
      new MysteryScene( POOL2, { functionsPerChallenge: 2 } ),
      new MysteryScene( POOL3, { functionsPerChallenge: 3 } )
    ];

    FBModel.call( this, scenes );
  }

  functionBuilder.register( 'MysteryModel', MysteryModel );

  return inherit( FBModel, MysteryModel, {}, {

    /**
     * Each challenge in a pool is expressed as a string, to make them easy to read and modify.
     * This function converts the string representation of a challenge into something that can
     * be more easily processed programmatically.
     *
     * @param {string} challenge
     * @returns {{operator: string, operand: number}[]}
     */
    parseChallenge: function( challenge ) {

      var tokens = challenge.split( ' ' );
      assert && assert( tokens.length % 2 === 0 );

      var challengeObjects = [];

      for ( var i = 0; i < tokens.length; i = i + 2 ) {

        var challengeObject = {
          operator: OPERATOR_MAP[ tokens[ i ] ],
          operand: parseInt( tokens[ i + 1 ] )
        };

        assert && assert( challengeObject.operator );
        assert && assert( Util.isInteger( challengeObject.operand ), 'bad operand in ' + challenge );
        assert && assert( !( challengeObject.operand < 0 &&
        ( challengeObject.operator === FBSymbols.PLUS || challengeObject.operator === FBSymbols.PLUS ) ),
          'negative operand not allowed with plus and minus: ' + challenge );

        challengeObjects.push( challengeObject );
      }

      return challengeObjects;
    }
  } );
} );
