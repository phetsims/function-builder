// Copyright 2016-2025, University of Colorado Boulder

/**
 * The 'mole under the carpet' view of a card while it's inside the builder.
 * Shows the transparent outline of a card.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../../dot/js/Vector2.js';
import Rectangle from '../../../../../scenery/js/nodes/Rectangle.js';
import functionBuilder from '../../../functionBuilder.js';
import FBConstants from '../../FBConstants.js';
import Card from '../../model/cards/Card.js';

export default class MoleCardNode extends Rectangle {

  public constructor( card: Card, builderPosition: Vector2 ) {

    super( 0, 0, FBConstants.CARD_OPTIONS.size.width, FBConstants.CARD_OPTIONS.size.height, {
      cornerRadius: FBConstants.CARD_OPTIONS.cornerRadius,
      fill: 'white',
      stroke: 'black',
      lineWidth: 2,
      opacity: 0.2,
      isDisposable: false
    } );

    card.addPositionListener( position => {
      this.center = position.minus( builderPosition );
    } );
  }
}

functionBuilder.register( 'MoleCardNode', MoleCardNode );