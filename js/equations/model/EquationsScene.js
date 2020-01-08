// Copyright 2015-2020, University of Colorado Boulder

/**
 * Scene for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  const FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const FunctionCreator = require( 'FUNCTION_BUILDER/common/model/functions/FunctionCreator' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MathBuilder = require( 'FUNCTION_BUILDER/common/model/builder/MathBuilder' );
  const merge = require( 'PHET_CORE/merge' );
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
  const CARD_NUMBERS_RANGE = new Range( -4, 6 );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function EquationsScene( options ) {

    options = merge( {
      numberOfSlots: 3, // number of slots in the builder
      numberOfEachCard: 1, // number of instances of each card type
      numberOfEachFunction: 2, // number of instances of each function type
      cardSymbol: FBSymbols.X // add 'x' card to the carousels
    }, options );

    // {RationalNumber[]} number cards, in the order that they appear in the carousel
    const cardContent = [];
    for ( let i = CARD_NUMBERS_RANGE.min; i <= CARD_NUMBERS_RANGE.max; i++ ) {
      cardContent.push( RationalNumber.withInteger( i ) );
    }

    // {FunctionCreator[]} function creators, in the order that functions appear in the carousel
    const functionCreators = [
      new FunctionCreator( Plus ),
      new FunctionCreator( Minus ),
      new FunctionCreator( Times ),
      new FunctionCreator( Divide )
    ];

    // builder
    const builderWidth = Scene.computeBuilderWidth( options.numberOfSlots );
    const builderX = ( FBConstants.SCREEN_VIEW_LAYOUT_BOUNDS.width / 2 ) - ( builderWidth / 2 );
    const builder = new MathBuilder( {
      numberOfSlots: options.numberOfSlots,
      width: builderWidth,
      position: new Vector2( builderX, FBConstants.BUILDER_Y )
    } );

    Scene.call( this, cardContent, functionCreators, builder, options );
  }

  functionBuilder.register( 'EquationsScene', EquationsScene );

  return inherit( Scene, EquationsScene );
} );
