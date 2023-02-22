// Copyright 2016-2021, University of Colorado Boulder

/**
 * The 'mole under the carpet' view of a card while it's inside the builder.
 * Shows the transparent outline of a card.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../../phet-core/js/merge.js';
import { Rectangle } from '../../../../../scenery/js/imports.js';
import functionBuilder from '../../../functionBuilder.js';
import FBConstants from '../../FBConstants.js';

export default class MoleCardNode extends Rectangle {

  /**
   * @param {Card} card
   * @param {Vector2} builderPosition
   * @param {Object} [options]
   */
  constructor( card, builderPosition, options ) {

    options = merge( {
      size: FBConstants.CARD_OPTIONS.size,
      cornerRadius: FBConstants.CARD_OPTIONS.cornerRadius,
      fill: 'white',
      stroke: 'black',
      lineWidth: 2,
      opacity: 0.2
    }, options );

    super( 0, 0, options.size.width, options.size.height, options );

    // unlink unnecessary, instances exist for lifetime of the sim
    card.positionProperty.link( position => {
      this.center = position.minus( builderPosition );
    } );
  }
}

functionBuilder.register( 'MoleCardNode', MoleCardNode );