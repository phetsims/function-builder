// Copyright 2016, University of Colorado Boulder

/**
 * Model for the 'Mystery' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FunctionCreator = require( 'FUNCTION_BUILDER/common/model/functions/FunctionCreator' );
  var FBIconFactory = require( 'FUNCTION_BUILDER/common/view/FBIconFactory' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathBuilder = require( 'FUNCTION_BUILDER/common/model/MathBuilder' );
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
  var BUILDER_WIDTH = ( 3 * FBConstants.FUNCTION_SIZE.width ) + 70;
  var BUILDER_X = ( FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS.width / 2 ) - ( BUILDER_WIDTH / 2 );
  var CARD_NUMBERS_RANGE = new Range( -4, 6 );

  /**
   * @constructor
   */
  function MysteryModel() {

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

    // builder for '1 function' scene
    var builder1 = new MathBuilder( {
      numberOfSlots: 1,
      width: BUILDER_WIDTH,
      location: new Vector2( BUILDER_X, FBConstants.BUILDER_Y )
    } );

    // builder for '2 functions' scene
    var builder2 = new MathBuilder( {
      numberOfSlots: 2,
      width: BUILDER_WIDTH,
      location: new Vector2( BUILDER_X, FBConstants.BUILDER_Y )
    } );

    // builder for '3 functions' scene
    var builder3 = new MathBuilder( {
      numberOfSlots: 3,
      width: BUILDER_WIDTH,
      location: new Vector2( BUILDER_X, FBConstants.BUILDER_Y )
    } );

    // @public (read-only)
    this.scenes = [

      // 1 function scene
      new Scene( cardContent, functionCreators, builder1, {
        iconNode: FBIconFactory.createSceneIcon( 1 ),
        numberOfEachCard: 1,
        numberOfEachFunction: 1
      } ),

      // 2 functions scene
      new Scene( cardContent, functionCreators, builder2, {
        iconNode: FBIconFactory.createSceneIcon( 2 ),
        numberOfEachCard: 1,
        numberOfEachFunction: 2 //TODO adjust this when I see the actual pool of challenges
      } ),

      // 3 functions scene
      new Scene( cardContent, functionCreators, builder3, {
        iconNode: FBIconFactory.createSceneIcon( 3 ),
        numberOfEachCard: 1,
        numberOfEachFunction: 3 //TODO adjust this when I see the actual pool of challenges
      } )
    ];

    // @public {Property.<Scene>} the selected scene
    this.selectedSceneProperty = new Property( this.scenes[ 0 ] );

    //TODO instantiate these on demand from a description, to use fewer resources and improve readability?
    /**
     * Pre-defined pools of challenges, one pool for each scene, indexed by number of functions in the challenge.
     * The first challenge in each pool is always the first one chose when the sim starts.
     * @public
     */
    this.challengePools = [

      // pool of 1-function challenges
      [
        [ new Plus( { operand: 2 } ) ],
        [ new Minus( { operand: 3 } ) ],
        [ new Times( { operand: -2 } ) ],
        [ new Divide( { operand: 2 } ) ]
      ],

      // pool of 2-function challenges
      [
        [ new Plus( { operand: 1 } ), new Times( { operand: 2 } ) ],
        [ new Times( { operand: 2 } ), new Minus( { operand: 2 } ) ],
        [ new Times( { operand: -2 } ), new Plus( { operand: 3 } ) ],
        [ new Minus( { operand: 1 } ), new Divide( { operand: 2 } ) ]
      ],

      // pool of 3-function challenges
      [
        [ new Plus( { operand: 1 } ), new Times( { operand: 2 } ), new Minus( { operand: -1 } ) ],
        [ new Times( { operand: 2 } ), new Minus( { operand: 2 } ), new Divide( { operand: -1 } ) ],
        [ new Minus( { operand: 2 } ), new Times( { operand: -2 } ), new Plus( { operand: 3 } ) ],
        [ new Times( { operand: -1 } ), new Minus( { operand: 2 } ), new Divide( { operand: 3 } ) ]
      ]
    ];

    // verify that each challenge has the correct number of functions
    if ( assert ) {
      for ( var poolIndex = 0; poolIndex < this.challengePools.length; poolIndex++ ) {
        var pool = this.challengePools[ poolIndex ];
        for ( var challengeIndex = 0; challengeIndex < pool.length; challengeIndex++ ) {
          var challenge = pool[ challengeIndex ];
          assert( challenge.length === poolIndex + 1,
            'incorrect number of functions in challenge ' + challengeIndex + ' of pool ' + poolIndex + ': ' + challenge.length );
        }
      }
    }

    //TODO do we need a separate random number generator for each scene?
    // @private random number generator, for picking challenges
    this.random = new Random();
  }

  functionBuilder.register( 'MysteryModel', MysteryModel );

  return inherit( Object, MysteryModel, {

    // @public
    reset: function() {
      this.selectedSceneProperty.reset();
      for ( var sceneIndex = 0; sceneIndex < this.scenes.length; sceneIndex++ ) {
        this.scenes[ sceneIndex ].reset();
      }
    },

    /**
     * Animates the model.
     *
     * @param {number} dt - time since the previous step, in seconds
     * @public
     */
    step: function( dt ) {
      for ( var sceneIndex = 0; sceneIndex < this.scenes.length; sceneIndex++ ) {
        this.scenes[ sceneIndex ].step( dt );
      }
    },

    /**
     * Randomly selects a challenge.
     *
     * @param {number} numberOfFunctions
     * @returns {MathFunction[]}
     */
    getChallenge: function( numberOfFunctions ) {

      var pool = this.challengePools[ numberOfFunctions - 1 ];
      assert && assert( pool, 'pool index out of range: ' + ( numberOfFunctions - 1 ) );

      var challengeIndex = this.random.nextInt( pool.length ) - 1;
      assert && assert( challengeIndex >=0 && challengeIndex < pool.length );

      var challenge = pool[ challengeIndex ];
      assert && assert( challenge.length === numberOfFunctions );

      return challenge;
    }
  } );
} );
