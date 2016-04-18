// Copyright 2016, University of Colorado Boulder

/**
 * Displays a scene in the 'Equations' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EquationFunctionContainer = require( 'FUNCTION_BUILDER/equations/view/EquationFunctionContainer' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberCardContainer = require( 'FUNCTION_BUILDER/numbers/view/NumberCardContainer' );
  var NumbersSceneNode = require( 'FUNCTION_BUILDER/numbers/view/NumbersSceneNode' );
  var SceneNode = require( 'FUNCTION_BUILDER/common/view/SceneNode' );

  /**
   * @param {EquationsScene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   * @constructor
   */
  function EquationsSceneNode( scene, layoutBounds, options ) {

    NumbersSceneNode.call( this, scene, layoutBounds, options );

    //TODO add graph drawer
    //TODO move table drawer
  }

  functionBuilder.register( 'EquationsSceneNode', EquationsSceneNode );

  return inherit( NumbersSceneNode, EquationsSceneNode, {

    // @override
    reset: function() {
      SceneNode.prototype.reset.call( this );
      this.simplifyEquationProperty.reset();
      this.equationDrawer.reset( { animationEnabled: false } );
      this.tableDrawer.reset( { animationEnabled: false } );
    },

    /**
     * Creates the card containers that go in the card carousels.
     * See SceneNode.createCardContainers for params.
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
     * See SceneNode.createFunctionContainers for params.
     * @returns {EquationFunctionContainer[]}
     * @protected
     * @override
     */
    createFunctionContainers: function( scene, containerOptions ) {
      var functionContainers = [];
      scene.functionData.forEach( function( functionData ) {
        functionContainers.push( new EquationFunctionContainer( functionData, containerOptions ) );
      } );
      return functionContainers;
    }
  } );
} );
