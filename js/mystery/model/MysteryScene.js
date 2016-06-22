// Copyright 2016, University of Colorado Boulder

/**
 * A scene in the 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBIconFactory = require( 'FUNCTION_BUILDER/common/view/FBIconFactory' );
  var FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var FunctionCreator = require( 'FUNCTION_BUILDER/common/model/functions/FunctionCreator' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathBuilder = require( 'FUNCTION_BUILDER/common/model/builder/MathBuilder' );
  var MysteryChallenges = require( 'FUNCTION_BUILDER/mystery/model/MysteryChallenges' );
  var Property = require( 'AXON/Property' );
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
  var MAX_SLOTS = 3; // max number of slots in the builder
  var BUILDER_WIDTH = ( MAX_SLOTS * FBConstants.FUNCTION_SIZE.width ) + 70;
  var BUILDER_X = ( FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS.width / 2 ) - ( BUILDER_WIDTH / 2 );
  var CARD_NUMBERS_RANGE = new Range( -4, 6 );
  var INCLUDE_X_CARD = false; // whether to include 'x' card in input carousel
  var DEFAULT_CHALLENGE_INDEX = 0; // the first challenge in the pool is used on startup and reset

  /**
   * @param {string[]} challengePool
   * @param {Object} [options]
   * @constructor
   */
  function MysteryScene( challengePool, options ) {

    options = _.extend( {
      functionsPerChallenge: 1, // {number} number of functions in each challenge
      numberOfEachCard: 1,
      cardSymbol: INCLUDE_X_CARD ? FBSymbols.X : null
    }, options );
    assert && assert( options.functionsPerChallenge <= MAX_SLOTS );

    // {Node} scene selection icon
    assert && assert( !options.iconNode );
    options.iconNode = FBIconFactory.createSceneIcon( options.functionsPerChallenge );

    // @private
    this.functionsPerChallenge = options.functionsPerChallenge;

    // Supports the case where all 3 functions in a challenge have the same type
    options.numberOfEachFunction = options.functionsPerChallenge;

    // validate the challenge pool
    if ( assert ) {

      // limit scope of for-loop var using IIFE
      (function() {
        var duplicates = '';
        for ( var i = 0; i < challengePool.length; i++ ) {

          var challenge = challengePool[ i ];

          // validate challenge
          var challengeObjects = MysteryChallenges.parseChallenge( challenge );
          assert && assert( challengeObjects.length === options.functionsPerChallenge,
            'incorrect number of functions in challenge: ' + challenge );

          // check for duplicates
          if ( challengePool.indexOf( challenge, i + 1 ) !== -1 ) {
            if ( duplicates.length > 0 ) {
              duplicates += ', ';
            }
            duplicates += challenge;
          }
        }
        assert && assert( duplicates.length === 0, 'pool contains duplicate challenges: ' + duplicates );
      })();
    }

    // @public the current challenge, initialized to the first challenge in the pool
    this.challengeProperty = new Property( challengePool[ DEFAULT_CHALLENGE_INDEX ] );

    // @private
    this.challengePool = challengePool; // the original challenge pool, do not modify!
    this.availableChallenges = challengePool.slice( 0 ); // available challenges
    this.availableChallenges.splice( DEFAULT_CHALLENGE_INDEX, 1 ); // remove the default challenge
    this.nextColorIndexDebug = 0; // debug support for the 'showAllColors' query parameter
    this.randomChallenge = new Random(); // random number generator for choosing challenges
    this.randomColor = new Random(); // random number generator for choosing colors
    this.availableColorSets = FBColors.MYSTERY_COLOR_SETS.slice( 0 ); // pool of available colors
    this.previousColorSets = []; // pool that was used on previous call to nextColors

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
     * Resets the scene.
     * Resets the challenge to its initial value, restocks the challenge pool.
     *
     * @public
     * @override
     */
    reset: function() {
      Scene.prototype.reset.call( this );

      // force notification when initial challenge is displayed
      if ( this.challengeProperty.get() === this.challengeProperty.initialValue ) {
        this.challengeProperty.notifyObserversStatic();
      }
      else {
        this.challengeProperty.reset();
      }

      // restock the available challenges, with default challenge removed
      this.availableChallenges = this.challengePool.slice( 0 );
      this.availableChallenges.splice( DEFAULT_CHALLENGE_INDEX, 1 );
    },

    /**
     * Advances to the next randomly-selected challenge.  After a challenge has been selected, it is not selected
     * again until all challenges in the pool have been selected.
     *
     * @public
     */
    nextChallenge: function() {

      // available pool is empty
      if ( this.availableChallenges.length === 0 ) {

        // restock the pool
        this.availableChallenges = this.challengePool.slice( 0 );

        // remove the current challenge, so we don't select it twice in a row
        var currentChallengeIndex = this.availableChallenges.indexOf( this.challengeProperty.get() );
        this.availableChallenges.splice( currentChallengeIndex, 1 );
      }

      // randomly select a challenge from the available pool
      var challengeIndex = FBQueryParameters.PLAY_ALL ? 0 : this.randomChallenge.nextInt( this.availableChallenges.length );
      assert && assert( challengeIndex >= 0 && challengeIndex < this.availableChallenges.length );
      var challenge = this.availableChallenges[ challengeIndex ];

      // remove the challenge from available pool
      this.availableChallenges.splice( challengeIndex, 1 );

      this.challengeProperty.set( challenge );
    },

    /**
     * Randomly selects N colors from the pool, where N is equal to the number of functions in challenges.
     * Avoids similar colors by selecting N sets of colors, then choosing 1 color from each set.
     * The same N sets are not used on consecutive calls.
     *
     * @returns {<Color|string>[]}
     * @public
     */
    nextColors: function() {

      var i;
      var colors = [];

      if ( FBQueryParameters.SHOW_ALL_COLORS ) {
        for ( i = 0; i < this.functionsPerChallenge; i++ ) {
          colors.push( this.nextColorDebug() );
        }
      }
      else {
        assert && assert( this.availableColorSets.length >= this.functionsPerChallenge );

        var colorSets = [];

        for ( i = 0; i < this.functionsPerChallenge; i++ ) {

          // select a color set
          var colorSetIndex = this.randomColor.nextInt( this.availableColorSets.length );
          var colorSet = this.availableColorSets[ colorSetIndex ];
          colorSets.push( colorSet );

          // remove the set from the available sets
          this.availableColorSets.splice( colorSetIndex, 1 );

          // select a color from the set
          var colorIndex = this.randomColor.nextInt( colorSet.length );
          var color = colorSet[ colorIndex ];
          colors.push( color );
        }

        // make sets from previous call available
        this.availableColorSets = this.availableColorSets.concat( this.previousColorSets );

        // remember sets from this call
        this.previousColorSets = colorSets;
      }

      return colors;
    },

    /**
     * Gets the next color, in order.
     * This is used to support the 'showAllColors' query parameter.
     *
     * @private
     */
    nextColorDebug: function() {
      var allColors = [].concat.apply( [], FBColors.MYSTERY_COLOR_SETS ); // flatten the color pool
      var color = allColors[ this.nextColorIndexDebug++ ];
      if ( this.nextColorIndexDebug > allColors.length - 1 ) {
        this.nextColorIndexDebug = 0;
      }
      return color;
    }
  } );
} );
