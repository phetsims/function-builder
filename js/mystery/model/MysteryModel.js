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
  var NUMBER_OF_EACH_CARD = 1;
  var NUMBER_OF_EACH_FUNCTION = 1;

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
        numberOfEachCard: NUMBER_OF_EACH_CARD,
        numberOfEachFunction: NUMBER_OF_EACH_FUNCTION
      } ),

      // 2 functions scene
      new Scene( cardContent, functionCreators, builder2, {
        iconNode: FBIconFactory.createSceneIcon( 2 ),
        numberOfEachCard: NUMBER_OF_EACH_CARD,
        numberOfEachFunction: NUMBER_OF_EACH_FUNCTION
      } ),

      // 3 functions scene
      new Scene( cardContent, functionCreators, builder3, {
        iconNode: FBIconFactory.createSceneIcon( 3 ),
        numberOfEachCard: NUMBER_OF_EACH_CARD,
        numberOfEachFunction: NUMBER_OF_EACH_FUNCTION
      } )
    ];

    // @public {Property.<Scene>} the selected scene
    this.selectedSceneProperty = new Property( this.scenes[ 0 ] );
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
    }
  } );
} );
