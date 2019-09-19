// Copyright 2015-2016, University of Colorado Boulder

/**
 * Displays a scene in the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const CardContainer = require( 'FUNCTION_BUILDER/common/view/containers/CardContainer' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const ImageCard = require( 'FUNCTION_BUILDER/common/model/cards/ImageCard' );
  const ImageCardNode = require( 'FUNCTION_BUILDER/common/view/cards/ImageCardNode' );
  const ImageFunctionNode = require( 'FUNCTION_BUILDER/common/view/functions/ImageFunctionNode' );
  const inherit = require( 'PHET_CORE/inherit' );
  const SceneNode = require( 'FUNCTION_BUILDER/common/view/SceneNode' );

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

  return inherit( SceneNode, PatternsSceneNode, {

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
      var containers = [];
      scene.cardContent.forEach( function( cardImage ) {
        containers.push( new CardContainer( ImageCard, ImageCardNode, cardImage, containerOptions ) );
      } );
      return containers;
    }
  } );
} );
