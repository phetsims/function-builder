// Copyright 2016-2023, University of Colorado Boulder

/**
 * Layer that implements the 'See Inside' feature. Each function in the builders has a 'window' at its right edge,
 * which lets you see the card change as it moves through the builder. Cards can be grabbed through these windows.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Shape } from '../../../../kite/js/imports.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import { Node, NodeOptions, Path } from '../../../../scenery/js/imports.js';
import functionBuilder from '../../functionBuilder.js';
import FBConstants from '../FBConstants.js';
import Builder from '../model/builder/Builder.js';
import CardNode from './cards/CardNode.js';

// constants
const WINDOW_SIZE = FBConstants.CARD_OPTIONS.size;
const CORNER_RADIUS = FBConstants.CARD_OPTIONS.cornerRadius;

type SelfOptions = EmptySelfOptions;

type SeeInsideLayerOptions = SelfOptions & PickOptional<NodeOptions, 'visible'>;

export default class SeeInsideLayer extends Node {

  private readonly cardsParent: Node;

  public constructor( builder: Builder, providedOptions?: SeeInsideLayerOptions ) {

    const options = optionize<SeeInsideLayerOptions, SelfOptions, NodeOptions>()( {}, providedOptions );

    // add a window at the right end of each slot
    const windowsShape = new Shape();
    for ( let i = 0; i < builder.numberOfSlots; i++ ) {

      const windowPosition = builder.getWindowPosition( i );
      const windowLeft = windowPosition.x - ( WINDOW_SIZE.width / 2 );
      const windowY = windowPosition.y - ( WINDOW_SIZE.height / 2 );
      if ( i !== 0 ) {
        // move to center of rounded rect, so we don't see a line at rounded corner
        windowsShape.moveTo( windowPosition.x, windowY );
      }
      windowsShape.roundRect( windowLeft, windowY, WINDOW_SIZE.width, WINDOW_SIZE.height, CORNER_RADIUS, CORNER_RADIUS );
    }

    // parent for all cards, clip to the windows
    const cardsParent = new Node( {
      clipArea: windowsShape
    } );

    // background, black because it's dark inside the builder :)
    const backgroundNode = new Path( windowsShape, {
      fill: 'black'
    } );

    // foreground, stroked with builder color, so it looks like we cut out a window
    const foregroundNode = new Path( windowsShape, {
      stroke: builder.colorScheme.middle,
      lineWidth: 2
    } );

    options.children = [ backgroundNode, cardsParent, foregroundNode ];

    super( options );

    this.cardsParent = cardsParent;
  }

  /**
   * Adds a card to this layer.
   * Cards are added when they are created, and remain in this layer for the lifetime of the sim.
   */
  public addCardNode( cardNode: CardNode ): void {
    this.cardsParent.addChild( cardNode );
  }
}

functionBuilder.register( 'SeeInsideLayer', SeeInsideLayer );