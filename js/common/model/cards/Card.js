// Copyright 2015-2019, University of Colorado Boulder

/**
 * Base type for cards. Other than providing 'input' information to the builder, cards have no responsibility
 * for what is displayed on them. That is handled by CardNode and its subtypes.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../../phet-core/js/inherit.js';
import merge from '../../../../../phet-core/js/merge.js';
import functionBuilder from '../../../functionBuilder.js';
import FBConstants from '../../FBConstants.js';
import Movable from '../Movable.js';

/**
 * @param {Object} [options]
 * @constructor
 */
function Card( options ) {

  options = merge( {
    animationSpeed: FBConstants.CARD_ANIMATION_SPEED  // {number} distance/second when animating
  }, options );

  Movable.call( this, options );
}

functionBuilder.register( 'Card', Card );

inherit( Movable, Card );
export default Card;