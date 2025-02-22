// Copyright 2015-2024, University of Colorado Boulder

/**
 * Card is the base class for cards. Other than providing 'input' information to the builder, cards have no
 * responsibility for what is displayed on them. That is handled by CardNode and its subtypes.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../../phet-core/js/optionize.js';
import functionBuilder from '../../../functionBuilder.js';
import FBConstants from '../../FBConstants.js';
import FBMovable, { FBMovableOptions } from '../FBMovable.js';

type SelfOptions = EmptySelfOptions;
export type CardOptions = SelfOptions & FBMovableOptions;

export default class Card extends FBMovable {

  protected constructor( providedOptions?: CardOptions ) {

    const options = optionize<CardOptions, SelfOptions, FBMovableOptions>()( {

      // FBMovableOptions
      animationSpeed: FBConstants.CARD_ANIMATION_SPEED
    }, providedOptions );

    super( options );
  }
}

functionBuilder.register( 'Card', Card );