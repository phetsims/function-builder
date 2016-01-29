// Copyright 2016, University of Colorado Boulder

/**
 * Functions that create icons for this sim.
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

  // constants
  var DEFAULT_SCENE_ICON_WIDTH = 25;

  var FBIconFactory = {

    /**
     * Creates the icon for the 'single' scene in the 'Patterns' screen.
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

    //TODO since the composed scene had 3 builder slots, should this icon show 3 functions?
    /**
     * Creates the icon for the 'composed' scene in the 'Patterns' screen.
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

  functionBuilder.register( 'FBIconFactory', FBIconFactory );

  return FBIconFactory;
} );
