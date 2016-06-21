// Copyright 2016, University of Colorado Boulder

/**
 * A scene in the 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBIconFactory = require( 'FUNCTION_BUILDER/common/view/FBIconFactory' );
  var FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var FunctionCreator = require( 'FUNCTION_BUILDER/common/model/functions/FunctionCreator' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathBuilder = require( 'FUNCTION_BUILDER/common/model/builder/MathBuilder' );
  var Property = require( 'AXON/Property' );
  var Random = require( 'DOT/Random' );
  var Range = require( 'DOT/Range' );
  var RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );
  var Scene = require( 'FUNCTION_BUILDER/common/model/Scene' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  // function modules
  var Divide = require( 'FUNCTION_BUILDER/common/model/functions/Divide' );
  var Minus = require( 'FUNCTION_BUILDER/common/model/functions/Minus' );
  var Plus = require( 'FUNCTION_BUILDER/common/model/functions/Plus' );
  var Times = require( 'FUNCTION_BUILDER/common/model/functions/Times' );

  // constants
  var MAX_SLOTS = 3; // max number of slots in the builder
  var BUILDER_WIDTH = ( MAX_SLOTS * FBConstants.FUNCTION_SIZE.width ) + 70;
  var BUILDER_X = ( FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS.width / 2 ) - ( BUILDER_WIDTH / 2 );
  var CARD_NUMBERS_RANGE = new Range( -4, 6 );
  var INCLUDE_X_CARD = false; // whether to include 'x' card in input carousel

  // pool of colors for functions
  var COLOR_POOL = [
    'rgb( 128, 197, 237 )',
    'rgb( 147, 231, 128 )',
    'rgb( 255, 120, 120 )',
    'rgb( 147, 231, 128 )',
    'rgb( 255, 161, 43 )',
    'rgb( 255, 246, 187 )',
    'rgb( 0, 222, 224 )',
    'rgb( 246, 164, 255 )',
    'rgb( 250, 186, 75 )',
    'rgb( 127, 225, 173 )',
    'rgb( 249, 144, 99 )',
    'rgb( 222, 186, 247 )'
  ];

  // maps operator token used in the pool to operator symbols used in functions
  var OPERATOR_MAP = {
    '+': FBSymbols.PLUS,
    '-': FBSymbols.MINUS,
    '*': FBSymbols.TIMES,
    '/': FBSymbols.DIVIDE
  };

  /**
   * @param {string[]} pool - pool of challenges
   * @param {Object} [options]
   * @constructor
   */
  function MysteryScene( pool, options ) {

    options = _.extend( {
      functionsPerChallenge: 1, // {number} number of functions in each challenge
      numberOfEachCard: 1,
      cardSymbol: INCLUDE_X_CARD ? FBSymbols.X : null
    }, options );
    assert && assert( options.functionsPerChallenge <= MAX_SLOTS );

    var thisScene = this;

    // @private
    this.functionsPerChallenge = options.functionsPerChallenge;

    // Supports the case when all 3 functions in a challenge have the same type
    options.numberOfEachFunction = options.functionsPerChallenge;

    // validate the pool
    if ( assert ) {

      // limit scope of for-loop var using IIFE
      ( function() {
        var duplicates = '';
        for ( var i = 0; i < pool.length; i++ ) {

          var challenge = pool[ i ];

          // validate challenge
          thisScene.parseChallenge( challenge );

          // check for duplicates
          if ( pool.indexOf( challenge, i + 1 ) !== -1 ) {
            if ( duplicates.length > 0 ) {
              duplicates += ', ';
            }
            duplicates += challenge;
          }
        }
        assert && assert( duplicates.length === 0, 'pool contains duplicate challenges: ' + duplicates );
      } )();
    }

    // {Node} scene selection icon
    assert && assert( !options.iconNode );
    options.iconNode = FBIconFactory.createSceneIcon( options.functionsPerChallenge );

    // @public the current challenge
    this.challengeProperty = new Property( pool[ 0 ] );

    // @private the original pool, do not modify!
    this.pool = pool;

    // @private pool of available challenges, first one removed
    this.availableChallenges = pool.slice( 1 );

    // @private random number generator for choosing challenges
    this.randomChallenge = new Random();

    // @private random number generator for choosing colors
    this.randomColor = new Random();

    // @private pool of available colors
    this.availableColors = COLOR_POOL.slice( 0 );

    // {RationalNumber[]} rational number cards, in the order that they appear in the carousel
    var cardContent = [];
    for ( var i = CARD_NUMBERS_RANGE.min; i <= CARD_NUMBERS_RANGE.max; i++ ) {
      cardContent.push( RationalNumber.withInteger( i ) );
    }

    // {FunctionCreator[]} function creators, in the order that functions appear in the carousel
    var functionCreators = [
      new FunctionCreator( Plus ),
      new FunctionCreator( Minus ),
      new FunctionCreator( Times ),
      new FunctionCreator( Divide )
    ];

    var builder = new MathBuilder( {
      numberOfSlots: options.functionsPerChallenge,
      width: BUILDER_WIDTH,
      location: new Vector2( BUILDER_X, FBConstants.BUILDER_Y )
    } );

    Scene.call( this, cardContent, functionCreators, builder, options );
  }

  functionBuilder.register( 'MysteryScene', MysteryScene );

  return inherit( Scene, MysteryScene, {

    /**
     * Resets the scene, sets the challenge index so that the first challenge in the pool will be selected.
     *
     * @public
     * @override
     */
    reset: function() {
      Scene.prototype.reset.call( this );
      this.challengeProperty.reset();
      this.availableChallenges = this.pool.slice( 1 );
    },

    /**
     * Each challenge in a pool is expressed as a string, to make them easy to read and modify.
     * This function converts the string representation of a challenge into something that can
     * be more easily processed programmatically.
     *
     * @param {string} challenge
     * @returns {{operator: string, operand: number}[]}
     * @public
     */
    parseChallenge: function( challenge ) {

      var tokens = challenge.split( ' ' );
      assert && assert( tokens.length === 2 * this.functionsPerChallenge,
        'malformed challenge: ' + challenge );

      var challengeObjects = [];

      for ( var i = 0; i < tokens.length; i = i + 2 ) {

        var challengeObject = {
          operator: OPERATOR_MAP[ tokens[ i ] ],
          operand: parseInt( tokens[ i + 1 ] )
        };

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
    },

    /**
     * Advances to the next randomly-selected challenge.  After a challenge has been selected, it is not selected
     * again until all challenges in the pool have been selected. When called for the first time (or after reset),
     * returns the first challenge in the pool. This provides a reproducible first challenge on startup and reset.
     *
     * @public
     */
    nextChallenge: function() {

      // available pool is empty, start over
      if ( this.availableChallenges.length === 0 ) {
        this.availableChallenges = this.pool.slice( 0 );
      }

      //TODO this could possibly select the same challenge twice in a row, when pool is refreshed
      // randomly select a challenge from the available pool
      var challengeIndex = FBQueryParameters.PLAY_ALL ? 0 : this.randomChallenge.nextInt( this.availableChallenges.length );
      assert && assert( challengeIndex >= 0 && challengeIndex < this.availableChallenges.length );
      var challenge = this.availableChallenges[ challengeIndex ];

      // remove the challenge from available pool
      this.availableChallenges.splice( challengeIndex, 1 );

      this.challengeProperty.set( challenge );
    },

    /**
     * Randomly selects a color from the pool.
     *
     * @returns {Color|string}
     * @public
     */
    nextColor: function() {

      // pool is empty, start over
      if ( this.availableColors.length === 0 ) {
        this.availableColors = COLOR_POOL.slice( 0 );
      }

      //TODO this could possibly select the same color twice in a row, or twice in the same challenge, when pool is refreshed
      // randomly select a color
      var colorIndex = this.randomColor.nextInt( this.availableColors.length );
      assert && assert( colorIndex >= 0 && colorIndex < this.availableColors.length );
      var color = this.availableColors[ colorIndex ];

      // remove the color from the pool
      this.availableColors.splice( colorIndex, 1 );

      return color;
    }
  } );
} );
