// Copyright 2015-2020, University of Colorado Boulder

/**
 * Displays a scene in the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ImageCard from '../../common/model/cards/ImageCard.js';
import ImageCardNode from '../../common/view/cards/ImageCardNode.js';
import CardContainer from '../../common/view/containers/CardContainer.js';
import ImageFunctionNode from '../../common/view/functions/ImageFunctionNode.js';
import SceneNode from '../../common/view/SceneNode.js';
import functionBuilder from '../../functionBuilder.js';

class PatternsSceneNode extends SceneNode {

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
   * @param {Scene} scene
   * @param {Object} [containerOptions] - see CardContainer options
   * @returns {CardContainer[]}
   * @protected
   * @override
   */
  createCardContainers( scene, containerOptions ) {
    const containers = [];
    scene.cardContent.forEach( cardImage => {
      containers.push( { createNode: tandem => new CardContainer( ImageCard, ImageCardNode, cardImage, containerOptions ) } );
    } );
    return containers;
  }
}

functionBuilder.register( 'PatternsSceneNode', PatternsSceneNode );

export default PatternsSceneNode;