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
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var FunctionBackgroundNode = require( 'FUNCTION_BUILDER/common/view/FunctionBackgroundNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ScreenIcon = require( 'JOIST/ScreenIcon' );
  var StarShape = require( 'SCENERY_PHET/StarShape' );
  var Text = require( 'SCENERY/nodes/Text' );

  var FBIconFactory = {

    /**
     * Creates the icon for the 'Patterns' screen, the Warhol function applied to the star image.
     * @returns {Node}
     */
    createPatternsScreenIcon: function() {

      var leftTopStar = createStarWithBackground( FBColors.WARHOL.rightBottom, FBColors.WARHOL.leftTop );
      var rightTopStar = createStarWithBackground( FBColors.WARHOL.leftBottom, FBColors.WARHOL.rightTop, {
        left: leftTopStar.right,
        top: leftTopStar.top
      } );
      var leftBottomStar = createStarWithBackground( FBColors.WARHOL.rightTop, FBColors.WARHOL.leftBottom, {
        left: leftTopStar.left,
        top: leftTopStar.bottom
      } );
      var rightBottomStar = createStarWithBackground( FBColors.WARHOL.leftTop, FBColors.WARHOL.rightBottom, {
        left: leftBottomStar.right,
        top: leftTopStar.bottom
      } );

      var parent = new Node( {
        children: [ leftTopStar, rightTopStar,leftBottomStar, rightBottomStar ]
      } );

      return new ScreenIcon( parent, { fill: 'rgb( 255, 247, 235 )' } );
    },

    /**
     * Creates the icon for the 'Numbers' screen, a function piece with '+ 3' on it.
     * @returns {Node}
     */
    createNumbersScreenIcon: function() {
      var functionNode = new FunctionBackgroundNode( {
        fill: 'rgb( 255, 246, 187 )'
      } );
      var textNode = new Text( '+ 3', {
        font: new FBFont( 36 ),
        center: functionNode.center
      } );
      var iconNode = new Node( { children: [ functionNode, textNode ] } );
      return new ScreenIcon( iconNode, {
        fill: 'rgb( 239, 255, 249 )'
      } );
    },

    /**
     * Creates the icon for the 'Equations' screen, an equation.
     * @returns {Node}
     */
    createEquationsScreenIcon: function() {
      return new ScreenIcon( new Text( 'y = 2x + 1', { font: new FBFont( 80 ) } ), {
        fill: 'rgb( 255, 255, 235 )'
      } );
    },

    /**
     * Creates the icon for the 'single' scene in the 'Patterns' screen, a single function piece.
     * @returns {Node}
     */
    createSingleSceneIcon: function() {
      return new FunctionBackgroundNode( {
        fill: FBColors.LIGHT_GREEN,
        lineWidth: 3,
        scale: 0.25
      } );
    },

    /**
     * Creates the icon for the 'composed' scene in the 'Patterns' screen, 2 function pieces in series.
     * @returns {Node}
     */
    createComposedSceneIcon: function() {

      var leftNode = new FunctionBackgroundNode( {
        fill: FBColors.LIGHT_GREEN,
        lineWidth: 3
      } );

      var rightNode = new FunctionBackgroundNode( {
        fill: FBColors.LIGHT_PURPLE,
        lineWidth: 3,
        left: leftNode.right - leftNode.xInset - 1
      } );

      return new Node( {
        children: [ leftNode, rightNode ],
        scale: 0.25
      } );
    }
  };

  functionBuilder.register( 'FBIconFactory', FBIconFactory );

  /**
   * Creates a star on a background rectangle.
   * @param {Color|string} starFill
   * @param {Color|string} backgroundFill
   * @param {Object} [options]
   * @returns {Node}
   */
  var createStarWithBackground = function( starFill, backgroundFill, options ) {
    options = options || {};
    var starNode = new Path( new StarShape(), { fill: starFill } );
    var backgroundNode = new Rectangle( 0, 0, starNode.width, starNode.height, { fill: backgroundFill } );
    starNode.center = backgroundNode.center;
    options.children = [ backgroundNode, starNode ];
    return new Node( options );
  };

  return FBIconFactory;
} );
