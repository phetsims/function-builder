// Copyright 2015-2020, University of Colorado Boulder

/**
 * Displays a scene in the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import ImageCard from '../../common/model/cards/ImageCard.js';
import ImageCardNode from '../../common/view/cards/ImageCardNode.js';
import CardContainer from '../../common/view/containers/CardContainer.js';
import ImageFunctionNode from '../../common/view/functions/ImageFunctionNode.js';
import SceneNode from '../../common/view/SceneNode.js';
import functionBuilder from '../../functionBuilder.js';

/**
 * @param {PatternsScene} scene - model for this scene
 * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
 * @param {Object} [options]
 * @constructor
 */
function PatternsSceneNode( scene, layoutBounds, options ) {

  options = options || {};
  options.seeInsideIconType = 'image'; // see FBIconFactory.createSeeInsideIcon

  SceneNode.call( this, scene, layoutBounds, ImageFunctionNode, options );
}

functionBuilder.register( 'PatternsSceneNode', PatternsSceneNode );

export default inherit( SceneNode, PatternsSceneNode, {

  /**
   * Creates the card containers that go in the input and output carousels.
   *
   * @param {Scene} scene
   * @param {Object} [containerOptions] - see CardContainer options
   * @returns {CardContainer[]}
   * @protected
   * @override
   */
  createCardContainers: function( scene, containerOptions ) {
    const containers = [];
    scene.cardContent.forEach( function( cardImage ) {
      containers.push( new CardContainer( ImageCard, ImageCardNode, cardImage, containerOptions ) );
    } );
    return containers;
  }
} );