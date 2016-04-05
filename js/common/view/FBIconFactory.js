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
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var FunctionBackgroundNode = require( 'FUNCTION_BUILDER/common/view/FunctionBackgroundNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ScreenIcon = require( 'JOIST/ScreenIcon' );
  var StarShape = require( 'SCENERY_PHET/StarShape' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var xString = require( 'string!FUNCTION_BUILDER/x' );
  var yString = require( 'string!FUNCTION_BUILDER/y' );

  var FBIconFactory = {

    /**
     * Creates the icon for the 'Patterns' screen, the Warhol function applied to a star shape.
     * To improve the quality at the larger size needed, we're not actually using the Warhol function.
     * @returns {Node}
     */
    createPatternsScreenIcon: function() {

      var leftTopStar = createStarWithBackground( {
        backgroundFill: FBColors.WARHOL.leftTop,
        starFill: FBColors.WARHOL.rightBottom
      } );
      var rightTopStar = createStarWithBackground( {
        backgroundFill: FBColors.WARHOL.rightTop,
        starFill: FBColors.WARHOL.leftBottom,
        left: leftTopStar.right,
        top: leftTopStar.top
      } );
      var leftBottomStar = createStarWithBackground( {
        backgroundFill: FBColors.WARHOL.leftBottom,
        starFill: FBColors.WARHOL.rightTop,
        left: leftTopStar.left,
        top: leftTopStar.bottom
      } );
      var rightBottomStar = createStarWithBackground( {
        backgroundFill: FBColors.WARHOL.rightBottom,
        starFill: FBColors.WARHOL.leftTop,
        left: leftBottomStar.right,
        top: leftTopStar.bottom
      } );

      var parent = new Node( {
        children: [ leftTopStar, rightTopStar,leftBottomStar, rightBottomStar ]
      } );

      return new ScreenIcon( parent, { fill: FBColors.PATTERNS_SCREEN_BACKGROUND } );
    },

    /**
     * Creates the icon for the 'Numbers' screen, a function piece with '+ 3' on it.
     * @returns {Node}
     */
    createNumbersScreenIcon: function() {
      var functionNode = new FunctionBackgroundNode( {
        fill: 'rgb( 255, 246, 187 )'
      } );
      var textNode = new Text( FBSymbols.PLUS + ' 3', {
        font: new FBFont( 36 ),
        center: functionNode.center
      } );
      var iconNode = new Node( { children: [ functionNode, textNode ] } );
      return new ScreenIcon( iconNode, { fill: FBColors.NUMBERS_SCREEN_BACKGROUND } );
    },

    /**
     * Creates the icon for the 'Equations' screen, the equation y = 2x + 1
     * @returns {Node}
     */
    createEquationsScreenIcon: function() {
      var equationString = StringUtils.format( '{0} = 2{1} {2} 1', yString, xString, FBSymbols.PLUS );
      var iconNode = new Text( equationString, { font: new FBFont( 80 ) } );
      return new ScreenIcon( iconNode, { fill: FBColors.EQUATIONS_SCREEN_BACKGROUND } );
    },

    /**
     * Creates the icon for the 'single' scene in the 'Patterns' screen, a single function piece.
     * @returns {Node}
     */
    createSingleSceneIcon: function() {
      return new FunctionBackgroundNode( {
        fill: 'rgb( 147, 231, 129 )',
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
        fill: 'rgb( 147, 231, 129 )',
        lineWidth: 3
      } );

      var rightNode = new FunctionBackgroundNode( {
        fill: 'rgb( 205, 175, 230 )',
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
   *
   * @param {Object} [options]
   * @returns {Node}
   */
  var createStarWithBackground = function( options ) {

    options = _.extend( {
      starFill: 'white', // {Color|string}
      backgroundFill: 'black' // {Color|string}
    }, options );

    var starNode = new Path( new StarShape(), { fill: options.starFill } );
    var backgroundNode = new Rectangle( 0, 0, starNode.width, starNode.height, { fill: options.backgroundFill } );
    starNode.center = backgroundNode.center;

    options.children = [ backgroundNode, starNode ];
    return new Node( options );
  };

  return FBIconFactory;
} );
