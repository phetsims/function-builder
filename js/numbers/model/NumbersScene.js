// Copyright 2015-2018, University of Colorado Boulder

/**
 * Scene for the 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const FunctionCreator = require( 'FUNCTION_BUILDER/common/model/functions/FunctionCreator' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MathBuilder = require( 'FUNCTION_BUILDER/common/model/builder/MathBuilder' );
  const Range = require( 'DOT/Range' );
  const RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );
  const Scene = require( 'FUNCTION_BUILDER/common/model/Scene' );
  const Vector2 = require( 'DOT/Vector2' );

  // function modules
  const Divide = require( 'FUNCTION_BUILDER/common/model/functions/Divide' );
  const Minus = require( 'FUNCTION_BUILDER/common/model/functions/Minus' );
  const Plus = require( 'FUNCTION_BUILDER/common/model/functions/Plus' );
  const Times = require( 'FUNCTION_BUILDER/common/model/functions/Times' );

  // constants
  const CARD_NUMBERS_RANGE = new Range( -4, 7 );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function NumbersScene( options ) {

    options = _.extend( {
      numberOfSlots: 2, // number of slots in the builder
      numberOfEachCard: 1, // number of instances of each card type
      numberOfEachFunction: 2 // number of instances of each function type
    }, options );

    // {RationalNumber[]} number cards, in the order that they appear in the carousel
    const cardContent = [];
    for ( let i = CARD_NUMBERS_RANGE.min; i <= CARD_NUMBERS_RANGE.max; i++ ) {
      cardContent.push( RationalNumber.withInteger( i ) );
    }

    // {FunctionCreator[]} function creators, in the order that functions appear in the carousel
    const functionCreators = [
      new FunctionCreator( Plus, { operand: 1, fill: 'rgb( 128, 197, 237 )' } ),   // + 1
      new FunctionCreator( Plus, { operand: 2, fill: 'rgb( 147, 231, 128 )' } ),   // + 2
      new FunctionCreator( Plus, { operand: 3, fill: 'rgb( 255, 120, 120 )' } ),   // + 3
      new FunctionCreator( Minus, { operand: 1, fill: 'rgb( 147, 231, 128 )' } ),  // - 1
      new FunctionCreator( Minus, { operand: 2, fill: 'rgb( 255, 161, 43 )' } ),   // - 2
      new FunctionCreator( Minus, { operand: 3, fill: 'rgb( 255, 246, 187 )' } ),  // - 3
      new FunctionCreator( Times, { operand: 0, fill: 'rgb( 0, 222, 224 )' } ),    // * 0
      new FunctionCreator( Times, { operand: 1, fill: 'rgb( 246, 164, 255 )' } ),  // * 1
      new FunctionCreator( Times, { operand: 2, fill: 'rgb( 250, 186, 75 )' } ),   // * 2
      new FunctionCreator( Divide, { operand: 1, fill: 'rgb( 127, 225, 173 )' } ), // / 1
      new FunctionCreator( Divide, { operand: 2, fill: 'rgb( 249, 144, 99 )' } ),  // / 2
      new FunctionCreator( Divide, { operand: 3, fill: 'rgb( 222, 186, 247 )' } )  // / 3
    ];

    // builder
    const builderWidth = Scene.computeBuilderWidth( options.numberOfSlots );
    const builderX = ( FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS.width / 2 ) - ( builderWidth / 2 );
    const builder = new MathBuilder( {
      numberOfSlots: options.numberOfSlots,
      width: builderWidth,
      location: new Vector2( builderX, FBConstants.BUILDER_Y )
    } );

    Scene.call( this, cardContent, functionCreators, builder, options );
  }

  functionBuilder.register( 'NumbersScene', NumbersScene );

  return inherit( Scene, NumbersScene );
} );