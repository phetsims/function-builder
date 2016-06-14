// Copyright 2016, University of Colorado Boulder

/**
 * ScreenView for the 'Numbers' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBScreenView = require( 'FUNCTION_BUILDER/common/view/FBScreenView' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumbersSceneNode = require( 'FUNCTION_BUILDER/numbers/view/NumbersSceneNode' );

  /**
   * @param {NumbersModel} model
   * @param {Object} [options]
   * @constructor
   */
  function NumbersScreenView( model, options ) {
    FBScreenView.call( this, model, options );
  }

  functionBuilder.register( 'NumbersScreenView', NumbersScreenView );

  return inherit( FBScreenView, NumbersScreenView, {

    /**
     * Creates the node for a scene.
     *
     * @param {Scene} scene
     * @param {Bounds2} layoutBounds
     * @param {Object} options - options to SceneNode constructor
     * @returns {SceneNode}
     * @protected
     * @override
     */
    createSceneNode: function( scene, layoutBounds, options ) {
      return new NumbersSceneNode( scene, layoutBounds, options );
    }
  } );
} );