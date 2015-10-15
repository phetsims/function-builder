// Copyright 2002-2015, University of Colorado Boulder

/**
 * Functions that create icons for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NoFunction = require( 'FUNCTION_BUILDER/common/model/NoFunction' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // constants
  var DEFAULT_SCENE_ICON_WIDTH = 25;

  return {

    /**
     * Creates the icon for the 'single' scene.
     * @param {number} [width]
     * @returns {Node}
     * @public
     */
    createSingleSceneIcon: function( width ) {

      width = width || DEFAULT_SCENE_ICON_WIDTH;

      return new FunctionNode( new NoFunction( {
        fill: FBColors.LIGHT_GREEN
      } ), {
        backgroundWidth: width
      } );
    },

    /**
     * Creates the icon for the 'dual' scene.
     * @param {number} [width]
     * @returns {Node}
     * @public
     */
    createDualSceneIcon: function( width ) {

      width = width || DEFAULT_SCENE_ICON_WIDTH;

      var topNode = new FunctionNode( new NoFunction( {
        fill: FBColors.LIGHT_GREEN
      } ), {
        backgroundWidth: width
      } );

      var bottomNode = new FunctionNode( new NoFunction( {
        fill: FBColors.LIGHT_PURPLE
      } ), {
        backgroundWidth: width
      } );

      return new VBox( {
        spacing: 0.2 * topNode.height,
        children: [ topNode, bottomNode ]
      } );
    },

    /**
     * Creates the icon for the 'composed' scene.
     * @param {number} [width]
     * @returns {Node}
     * @public
     */
    createComposedSceneIcon: function( width ) {

      width = width || DEFAULT_SCENE_ICON_WIDTH;

      var leftNode = new FunctionNode( new NoFunction( {
        fill: FBColors.LIGHT_GREEN
      } ), {
        backgroundWidth: width
      } );

      var rightNode = new FunctionNode( new NoFunction( {
        fill: FBColors.LIGHT_PURPLE
      } ), {
        backgroundWidth: width,
        left: leftNode.right - leftNode.xInset - 1
      } );

      return new Node( { children: [ leftNode, rightNode ] } );
    }
  };
} );
