// Copyright 2015-2023, University of Colorado Boulder

/**
 * Displays a scene in the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ImageCard from '../../common/model/cards/ImageCard.js';
import ImageCardNode from '../../common/view/cards/ImageCardNode.js';
import CardContainer from '../../common/view/containers/CardContainer.js';
import ImageFunctionNode from '../../common/view/functions/ImageFunctionNode.js';
import FBSceneNode from '../../common/view/FBSceneNode.js';
import functionBuilder from '../../functionBuilder.js';

export default class PatternsSceneNode extends FBSceneNode {

  /**
   * @param {PatternsScene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   */
  constructor( scene, layoutBounds, options ) {

    options = options || {};
    options.seeInsideIconType = 'image'; // see FBIconFactory.createSeeInsideIcon

    super( scene, layoutBounds, ImageFunctionNode, options );
  }

  /**
   * Creates the card containers that go in the input and output carousels.
   *
   * @param {FBScene} scene
   * @param {Object} [containerOptions] - see CardContainer options
   * @returns {CarouselItem[]}
   * @protected
   * @override
   */
  createCardCarouselItems( scene, containerOptions ) {
    const containers = [];
    scene.cardContent.forEach( cardImage => {
      containers.push( { createNode: tandem => new CardContainer( ImageCard, ImageCardNode, cardImage, containerOptions ) } );
    } );
    return containers;
  }
}

functionBuilder.register( 'PatternsSceneNode', PatternsSceneNode );