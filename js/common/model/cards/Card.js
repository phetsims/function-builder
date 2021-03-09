// Copyright 2015-2020, University of Colorado Boulder

/**
 * Base class for cards. Other than providing 'input' information to the builder, cards have no responsibility
 * for what is displayed on them. That is handled by CardNode and its subtypes.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../../phet-core/js/merge.js';
import functionBuilder from '../../../functionBuilder.js';
import FBConstants from '../../FBConstants.js';
import FBMovable from '../FBMovable.js';

class Card extends FBMovable {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      animationSpeed: FBConstants.CARD_ANIMATION_SPEED  // {number} distance/second when animating
    }, options );

    super( options );
  }
}

functionBuilder.register( 'Card', Card );

export default Card;