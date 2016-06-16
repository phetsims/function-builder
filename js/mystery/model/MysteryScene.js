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
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var FunctionCreator = require( 'FUNCTION_BUILDER/common/model/functions/FunctionCreator' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathBuilder = require( 'FUNCTION_BUILDER/common/model/builder/MathBuilder' );
  var Random = require( 'DOT/Random' );
  var Range = require( 'DOT/Range' );
  var RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );
  var Scene = require( 'FUNCTION_BUILDER/common/model/Scene' );
  var Vector2 = require( 'DOT/Vector2' );

  // function modules
  var Divide = require( 'FUNCTION_BUILDER/common/model/functions/Divide' );
  var Minus = require( 'FUNCTION_BUILDER/common/model/functions/Minus' );
  var Plus = require( 'FUNCTION_BUILDER/common/model/functions/Plus' );
  var Times = require( 'FUNCTION_BUILDER/common/model/functions/Times' );

  // constants
  var BUILDER_WIDTH = ( 3 * FBConstants.FUNCTION_SIZE.width ) + 70;
  var BUILDER_X = ( FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS.width / 2 ) - ( BUILDER_WIDTH / 2 );
  var CARD_NUMBERS_RANGE = new Range( -4, 6 );
  var INCLUDE_X_CARD = false; // whether to include 'x' card in input carousel

  /**
   * @param {string[]} pool - pool of challenges
   * @param {Object} [options]
   * @constructor
   */
  function MysteryScene( pool, options ) {

    //TODO verify that each challenge contains the correct number of functions

    options = _.extend( {
      functionsPerChallenge: 1, // {number} number of functions in each challenge
      numberOfEachCard: 1,
      cardSymbol: INCLUDE_X_CARD ? FBSymbols.X : null
    }, options );

    options.numberOfEachFunction = options.functionsPerChallenge; //TODO revisit this value, after pools are specified

    // {Node} scene selection icon
    assert && assert( !options.iconNode );
    options.iconNode = FBIconFactory.createSceneIcon( options.functionsPerChallenge );

    // @private pool of available challenges
    this.availablePool = pool.slice( 0 );

    // @private pool of challenges that have already been selected
    this.usedPool = [];

    // @private the previous challenge index, so we don't select the same challenge twice in a row
    this.previousChallengeIndex = -1;

    // @private random number generator, for picking challenges
    this.random = new Random();

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
      this.previousChallengeIndex = -1;
    },

    /**
     * Randomly selects a challenge.  After a challenge has been selected, it is not selected again
     * until all challenges in the pool have been selected. When called for the first time (or after reset),
     * returns the first challenge in the pool. This provides a reproducible first challenge on startup and reset.
     *
     * @returns {string}
     */
    getChallenge: function() {

      // available pool is empty, start over
      if ( this.availablePool.length === 0 ) {
        this.availablePool = this.usedPool;
        this.usedPool = [];
      }

      // randomly select a challenge from the available pool
      var challengeIndex = 0;
      if ( this.previousChallengeIndex !== -1 ) {
        challengeIndex = this.random.nextInt( this.availablePool.length );
        assert && assert( challengeIndex >= 0 && challengeIndex < this.availablePool.length );
      }
      var challenge = this.availablePool[ challengeIndex ];
      this.previousChallengeIndex = challengeIndex;

      // move the challenge from available pool to used pool
      this.availablePool.splice( challengeIndex, 1 );
      this.usedPool.push( challenge );

      return challenge;
    }
  } );
} );
