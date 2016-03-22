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
  var inherit = require( 'PHET_CORE/inherit' );
  var SceneNode = require( 'FUNCTION_BUILDER/common/view/SceneNode' );

  /**
   * @param {PatternsScene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   * @constructor
   */
  function PatternsSceneNode( scene, layoutBounds, options ) {
    SceneNode.call( this, scene, layoutBounds, options );
  }

  functionBuilder.register( 'SceneNode', SceneNode );

  return inherit( SceneNode, PatternsSceneNode );
} );
