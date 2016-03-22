// Copyright 2016, University of Colorado Boulder

/**
 * Displays a scene in the 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberCardContainer = require( 'FUNCTION_BUILDER/numbers/view/NumberCardContainer' );
  var NumberFunctionContainer = require( 'FUNCTION_BUILDER/numbers/view/NumberFunctionContainer' );
  var SceneNode = require( 'FUNCTION_BUILDER/common/view/SceneNode' );

  /**
   * @param {NumbersScene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   * @constructor
   */
  function NumbersSceneNode( scene, layoutBounds, options ) {
    options = _.extend( {}, options, {
      cardCarouselDefaultPageNumber: 1
    } );
    SceneNode.call( this, scene, layoutBounds, options );
  }

  functionBuilder.register( 'NumbersSceneNode', NumbersSceneNode );

  return inherit( SceneNode, NumbersSceneNode, {

    /**
     * Creates the card containers that go in the card carousels.
     * @param {{NumbersScene}} scene
     * @param {Object} [containerOptions]
     * @returns {NumberCardContainer[]}
     * @protected
     * @override
     */
    createCardContainers: function( scene, containerOptions ) {
      var containers = [];
      scene.cardNumbers.forEach( function( value ) {
        containers.push( new NumberCardContainer( value, containerOptions ) );
      } );
      return containers;
    },

    /**
     * Creates the function containers that go in the function carousels.
     * @param {NumbersScene} scene
     * @param {Object} [containerOptions]
     * @returns {NumberFunctionContainer[]}
     * @protected
     * @override
     */
    createFunctionContainers: function( scene, containerOptions ) {
      var functionContainers = [];
      scene.functionConstructors.forEach( function( FunctionConstructor ) {
        functionContainers.push( new NumberFunctionContainer( FunctionConstructor, containerOptions ) );
      } );
      return functionContainers;
    }
  } );
} );
