// Copyright 2015, University of Colorado Boulder

/**
 * Functions that create icons for the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var FunctionBackgroundNode = require( 'FUNCTION_BUILDER/common/view/FunctionBackgroundNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Node = require( 'SCENERY/nodes/Node' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // constants
  var DEFAULT_SCENE_ICON_WIDTH = 25;

  var PatternsIconFactory = {

    /**
     * Creates the icon for the 'single' scene.
     * @param {number} [width]
     * @returns {Node}
     * @public
     */
    createSingleSceneIcon: function( width ) {

      width = width || DEFAULT_SCENE_ICON_WIDTH;

      return new FunctionBackgroundNode( {
        fill: FBColors.LIGHT_GREEN,
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

      var topNode = new FunctionBackgroundNode(  {
        fill: FBColors.LIGHT_GREEN,
        backgroundWidth: width
      } );

      var bottomNode = new FunctionBackgroundNode( {
        fill: FBColors.LIGHT_PURPLE,
        backgroundWidth: width
      } );

      return new VBox( {
        spacing: 0.2 * topNode.height,
        children: [ topNode, bottomNode ]
      } );
    },

    //TODO since the composed scene had 3 builder slots, shouldn't this icon also show 3 functions?
    /**
     * Creates the icon for the 'composed' scene.
     * @param {number} [width]
     * @returns {Node}
     * @public
     */
    createComposedSceneIcon: function( width ) {

      width = width || DEFAULT_SCENE_ICON_WIDTH;

      var leftNode = new FunctionBackgroundNode( {
        fill: FBColors.LIGHT_GREEN,
        backgroundWidth: width
      } );

      var rightNode = new FunctionBackgroundNode( {
        fill: FBColors.LIGHT_PURPLE,
        backgroundWidth: width,
        left: leftNode.right - leftNode.xInset - 1
      } );

      return new Node( { children: [ leftNode, rightNode ] } );
    }
  };

  functionBuilder.register( 'PatternsIconFactory', PatternsIconFactory );

  return PatternsIconFactory;
} );
