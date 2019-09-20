// Copyright 2016-2019, University of Colorado Boulder

/**
 * Challenges for the 'Mystery' screen, with function for parsing them.
 * To make them easier to read and modify, challenges are expressed as strings,
 * with operators and operands separated by spaces.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const Util = require( 'DOT/Util' );

  // maps operator tokens used in challenges to operator symbols used in functions
  const OPERATOR_MAP = {
    '+': FBSymbols.PLUS,
    '-': FBSymbols.MINUS,
    '*': FBSymbols.TIMES,
    '/': FBSymbols.DIVIDE
  };

  const MysteryChallenges = {

    // Index of the challenge in each pool that is display on startup and reset.
    // This provides a reproducible challenge for the teacher.
    DEFAULT_CHALLENGE_INDEX: 0,

    // 1-function challenges
    POOL1: [
      '+ 3', // selected on startup and reset
      '+ 2',
      '+ 1',
      '+ 0',
      '- 3',
      '- 2',
      '- 1',
      '- 0',
      '* 3',
      '* 2',
      '* 1',
      '* 0',
      '* -1',
      '* -2',
      '* -3',
      '/ 3',
      '/ 2',
      '/ 1',
      '/ -1',
      '/ -2',
      '/ -3'
    ],

    // 2-function challenges
    POOL2: [
      '+ 1 * 2', // selected on startup and reset
      '+ 1 + 3',
      '+ 1 + 2',
      '* 2 * 0',
      '* 0 * 1',
      '* -1 * -2',
      '* -3 * 2',
      '* 3 + 3',
      '* 2 + 3',
      '* 2 - 2',
      '* 3 - 1',
      '* -3 + 0',
      '* -2 + 1',
      '* 1 + 3',
      '* 1 - 2',
      '* 0 + 3',
      '* 0 - 2',
      '/ 1 - 1',
      '/ 3 - 3',
      '/ 3 + 2',
      '/ -1 - 3',
      '/ -2 + 2',
      '+ 3 * 3',
      '- 1 * 3',
      '+ 2 * 2',
      '+ 3 * 1',
      '+ 2 / 1',
      '+ 3 * 0',
      '+ 0 * -3',
      '- 3 / 2',
      '- 2 / 3',
      '+ 3 / -1'
    ],

    // 3-function challenges
    POOL3: [
      '+ 2 * 1 + 2', // selected on startup and reset
      '* -3 * -1 * 0',
      '* 3 * -2 * -1',
      '* 2 * -2 * -2',
      '/ 3 / -1 / -1',
      '/ 2 / 3 / -2',
      '/ 1 / -1 / 2',
      '* 3 * -3 + 3',
      '/ 2 * 2 - 2',
      '+ 3 * 1 + 3',
      '- 1 / 1 - 1',
      '+ 3 * 0 + 3',
      '+ 2 * -2 + 3',
      '+ 0 * -3 + 0',
      '+ 1 - 3 * 2',
      '- 3 / 3 - 3',
      '- 2 / 3 + 2',
      '+ 3 / -1 - 3',
      '+ 2 / -2 + 2',
      '* -3 + 3 + 3',
      '/ 3 - 3 - 3',
      '* 0 + 2 + 2',
      '* 3 + 3 * 1',
      '/ 2 + 2 / 1',
      '/ 2 - 1 * 1',
      '* -2 + 3 * 0',
      '* 1 + 0 * -3',
      '* 0 - 3 + 3',
      '* -1 - 2 / 3',
      '* 0 + 3 / -1'
    ],

    /**
     * Converts the string representation of a challenge into an array of Objects
     * that is easier to process programmatically.
     *
     * @param {string} challenge
     * @returns {{operator: string, operand: number}[]}
     * @static
     * @public
     */
    parseChallenge: function( challenge ) {

      const challengeObjects = [];

      const tokens = challenge.split( ' ' );
      assert && assert( tokens.length % 2 === 0, 'malformed challenge: ' + challenge );

      for ( let i = 0; i < tokens.length; i = i + 2 ) {

        const challengeObject = {
          operator: OPERATOR_MAP[ tokens[ i ] ],
          operand: parseInt( tokens[ i + 1 ], 10 )
        };

        // validation
        assert && assert( challengeObject.operator, 'bad operator in challenge: ' + challenge );
        assert && assert( Util.isInteger( challengeObject.operand ), 'bad operand in challenge: ' + challenge );
        assert && assert( !( challengeObject.operand < 0 && challengeObject.operator === FBSymbols.PLUS  ),
          'negative operand not allowed with plus in challenge: ' + challenge );
        assert && assert( !( challengeObject.operand < 0 && challengeObject.operator === FBSymbols.MINUS ),
          'negative operand not allowed with minus in challenge: ' + challenge );
        assert && assert( !( challengeObject.operand === 0 && challengeObject.operator === FBSymbols.DIVIDE ),
          'division by zero not allowed in challenge: ' + challenge );

        challengeObjects.push( challengeObject );
      }

      return challengeObjects;
    }
  };

  functionBuilder.register( 'MysteryChallenges', MysteryChallenges );

  return MysteryChallenges;
} );
