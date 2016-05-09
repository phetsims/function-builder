// Copyright 2015-2016, University of Colorado Boulder

/**
 * Displays a scene in the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var ImageCardContainer = require( 'FUNCTION_BUILDER/patterns/view/ImageCardContainer' );
  var ImageFunctionContainer = require( 'FUNCTION_BUILDER/patterns/view/ImageFunctionContainer' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SceneNode = require( 'FUNCTION_BUILDER/common/view/SceneNode' );

  /**
   * @param {PatternsScene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   * @constructor
   */
  function PatternsSceneNode( scene, layoutBounds, options ) {

    options = options || {};
    options.seeInsideIconType = 'image'; // see FBIconFactory.createSeeInsideIcon

    SceneNode.call( this, scene, layoutBounds, options );
  }

  functionBuilder.register( 'PatternsSceneNode', PatternsSceneNode );

  return inherit( SceneNode, PatternsSceneNode, {

    /**
     * Creates the card containers that go in the input and output carousels.
     *
     * @param {Scene} scene
     * @param {Object} [containerOptions] - see ImageCardContainer options
     * @returns {CardContainer[]}
     * @protected
     * @override
     */
    createCardContainers: function( scene, containerOptions ) {
      var containers = [];
      scene.cardImages.forEach( function( cardImage ) {
        containers.push( new ImageCardContainer( cardImage, containerOptions ) );
      } );
      return containers;
    },

    /**
     * Creates the function containers that go in the function carousel.
     *
     * @param {Scene} scene
     * @param {Object} [containerOptions] - see ImageFunctionContainer options
     * @returns {FunctionContainer[]}
     * @protected
     * @override
     */
    createFunctionContainers: function( scene, containerOptions ) {
      var functionContainers = [];
      scene.functionCreators.forEach( function( functionCreator ) {
        functionContainers.push( new ImageFunctionContainer( functionCreator, containerOptions ) );
      } );
      return functionContainers;
    }
  } );
} );
