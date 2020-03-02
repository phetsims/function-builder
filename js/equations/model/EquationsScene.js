// Copyright 2015-2020, University of Colorado Boulder

/**
 * Scene for the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import FBConstants from '../../common/FBConstants.js';
import FBSymbols from '../../common/FBSymbols.js';
import MathBuilder from '../../common/model/builder/MathBuilder.js';
import Divide from '../../common/model/functions/Divide.js';
import FunctionCreator from '../../common/model/functions/FunctionCreator.js';
import Minus from '../../common/model/functions/Minus.js';
import Plus from '../../common/model/functions/Plus.js';
import Times from '../../common/model/functions/Times.js';
import RationalNumber from '../../common/model/RationalNumber.js';
import Scene from '../../common/model/Scene.js';
import functionBuilder from '../../functionBuilder.js';

// constants
const CARD_NUMBERS_RANGE = new Range( -4, 6 );

class EquationsScene extends Scene {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

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

    super( cardContent, functionCreators, builder, options );
  }
}

functionBuilder.register( 'EquationsScene', EquationsScene );

export default EquationsScene;