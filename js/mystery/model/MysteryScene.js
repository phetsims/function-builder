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
  var FunctionCreator = require( 'FUNCTION_BUILDER/common/model/functions/FunctionCreator' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathBuilder = require( 'FUNCTION_BUILDER/common/model/builder/MathBuilder' );
  var MysteryChallenges = require( 'FUNCTION_BUILDER/mystery/model/MysteryChallenges' );
  var Property = require( 'AXON/Property' );
  var RangeWithValue = require( 'DOT/RangeWithValue' );
  var RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );
  var Scene = require( 'FUNCTION_BUILDER/common/model/Scene' );
  var Vector2 = require( 'DOT/Vector2' );

  // function modules
  var Divide = require( 'FUNCTION_BUILDER/common/model/functions/Divide' );
  var Minus = require( 'FUNCTION_BUILDER/common/model/functions/Minus' );
  var Plus = require( 'FUNCTION_BUILDER/common/model/functions/Plus' );
  var Times = require( 'FUNCTION_BUILDER/common/model/functions/Times' );

  // constants
  var CARD_NUMBERS_RANGE = new RangeWithValue( -4, 7 );
  var MAX_SLOTS = 3; // max number of slots in the builder

  /**
   * @param {string[]} challengePool
   * @param {Object} [options]
   * @constructor
   */
  function MysteryScene( challengePool, options ) {

    options = _.extend( {
      numberOfSlots: 1,
      numberOfEachCard: 1
    }, options );
    assert && assert( options.numberOfSlots <= MAX_SLOTS );

    // {Node} scene selection icon
    assert && assert( !options.iconNode );
    options.iconNode = FBIconFactory.createSceneIcon( options.numberOfSlots );

    // Create enough instances of each function type to support the case where all functions
    // in a challenge have the same type.
    assert && assert( !options.numberOfEachFunction );
    options.numberOfEachFunction = options.numberOfSlots;

    // @private
    this.numberOfSlots = options.numberOfSlots;

    // validate the challenge pool
    if ( assert ) {

      // limit scope of for-loop var using IIFE
      (function() {
        var duplicates = '';
        for ( var i = 0; i < challengePool.length; i++ ) {

          var challenge = challengePool[ i ];

          // validate challenge
          var challengeObjects = MysteryChallenges.parseChallenge( challenge );
          assert && assert( challengeObjects.length === options.numberOfSlots,
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

    // @public {Property.<string>} the challenge that is displayed
    this.challengeProperty = new Property( challengePool[ MysteryChallenges.DEFAULT_CHALLENGE_INDEX ] );
    this.challengePool = challengePool; // (read-only) for debug only, the original challenge pool, do not modify!

    // @private
    this.availableChallenges = challengePool.slice( 0 ); // available challenges
    this.availableChallenges.splice( MysteryChallenges.DEFAULT_CHALLENGE_INDEX, 1 ); // remove the default challenge
    this.availableColorSets = FBColors.MYSTERY_COLOR_SETS.slice( 0 ); // pool of available colors
    this.previousColorSets = []; // pool that was used on previous call to getColors
    this.nextColorIndexDebug = 0; // debug support for the 'showAllColors' query parameter

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

    // All builders have the same width, regardless of number of slots
    var builderWidth = Scene.computeBuilderWidth( MAX_SLOTS );
    var builderX = ( FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS.width / 2 ) - ( builderWidth / 2 );
    var builder = new MathBuilder( {
      numberOfSlots: options.numberOfSlots,
      width: builderWidth,
      location: new Vector2( builderX, FBConstants.BUILDER_Y )
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
      this.availableChallenges.splice( MysteryChallenges.DEFAULT_CHALLENGE_INDEX, 1 );
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
        if ( !FBQueryParameters.playAll ) {
          var currentChallengeIndex = this.availableChallenges.indexOf( this.challengeProperty.get() );
          this.availableChallenges.splice( currentChallengeIndex, 1 );
          assert && assert( this.availableChallenges.length === this.challengePool.length - 1 );
        }
      }

      // randomly select a challenge from the available pool
      var challengeIndex = FBQueryParameters.playAll ? 0 : phet.joist.random.nextInt( this.availableChallenges.length );
      assert && assert( challengeIndex >= 0 && challengeIndex < this.availableChallenges.length );
      var challenge = this.availableChallenges[ challengeIndex ];

      // remove the challenge from the available pool
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
    getColors: function() {

      var i;
      var colors = [];

      if ( FBQueryParameters.showAllColors ) {
        for ( i = 0; i < this.numberOfSlots; i++ ) {
          colors.push( this.getColorDebug() );
        }
      }
      else if ( this.challengePool.indexOf( this.challengeProperty.get() ) === MysteryChallenges.DEFAULT_CHALLENGE_INDEX ) {

        // Always use the same colors for the default challenge. This provides a reproducible challenge for the teacher.
        colors = FBColors.MYSTERY_DEFAULT_CHALLENGE_COLORS[ this.numberOfSlots - 1 ];
      }
      else {
        assert && assert( this.availableColorSets.length >= this.numberOfSlots );

        var colorSets = [];

        for ( i = 0; i < this.numberOfSlots; i++ ) {

          // select a color set
          var colorSetIndex = phet.joist.random.nextInt( this.availableColorSets.length );
          var colorSet = this.availableColorSets[ colorSetIndex ];
          colorSets.push( colorSet );

          // remove the set from the available sets
          this.availableColorSets.splice( colorSetIndex, 1 );

          // select a color from the set
          var colorIndex = phet.joist.random.nextInt( colorSet.length );
          var color = colorSet[ colorIndex ];
          colors.push( color );
        }

        // make sets from previous call available
        this.availableColorSets = this.availableColorSets.concat( this.previousColorSets );

        // remember sets from this call
        this.previousColorSets = colorSets;
      }

      assert && assert( colors && colors.length > 0, 'what, no colors?' );
      return colors;
    },

    /**
     * Gets the next color, in order that they appear in the color pool.
     * This is used to support the 'showAllColors' query parameter.
     *
     * @private
     */
    getColorDebug: function() {
      var allColors = [].concat.apply( [], FBColors.MYSTERY_COLOR_SETS ); // flatten the color pool
      var color = allColors[ this.nextColorIndexDebug++ ];
      if ( this.nextColorIndexDebug > allColors.length - 1 ) {
        this.nextColorIndexDebug = 0;
      }
      return color;
    }
  } );
} );
