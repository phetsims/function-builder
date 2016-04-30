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
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var FunctionBackgroundNode = require( 'FUNCTION_BUILDER/common/view/FunctionBackgroundNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var HiddenFunctionNode = require( 'FUNCTION_BUILDER/common/view/HiddenFunctionNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ScreenIcon = require( 'JOIST/ScreenIcon' );
  var StarShape = require( 'SCENERY_PHET/StarShape' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Warhol = require( 'FUNCTION_BUILDER/patterns/model/functions/Warhol' );

  // strings
  var mysteryCharacterString = require( 'string!FUNCTION_BUILDER/mysteryCharacter' );

  // constants
  var FUNCTION_ICON_SCALE = 0.35; // uniform scale for function icons on all controls

  var FBIconFactory = {

    /**
     * Creates the icon for the 'Patterns' screen, the Warhol function applied to a star shape.
     * To provide the quality needed for the icon, we're not actually using the Warhol function,
     * but we are using its color maps.
     * @returns {Node}
     */
    createPatternsScreenIcon: function() {

      var leftTopStar = createWarholStar( Warhol.LEFT_TOP_COLOR_MAP );
      
      var rightTopStar = createWarholStar( Warhol.RIGHT_TOP_COLOR_MAP, {
        left: leftTopStar.right,
        top: leftTopStar.top
      } );

      var leftBottomStar = createWarholStar( Warhol.LEFT_BOTTOM_COLOR_MAP, {
        left: leftTopStar.left,
        top: leftTopStar.bottom
      } );

      var rightBottomStar = createWarholStar( Warhol.RIGHT_BOTTOM_COLOR_MAP, {
        left: leftBottomStar.right,
        top: leftTopStar.bottom
      } );

      var iconNode = new Node( {
        children: [ leftTopStar, rightTopStar,leftBottomStar, rightBottomStar ]
      } );

      return new ScreenIcon( iconNode, { fill: FBColors.PATTERNS_SCREEN_BACKGROUND } );
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
      var equationString = StringUtils.format( '{0} {1} 2{2} {3} 1', FBSymbols.Y, FBSymbols.EQUALS, FBSymbols.X, FBSymbols.PLUS );
      var iconNode = new Text( equationString, { font: new FBFont( 80 ) } );
      return new ScreenIcon( iconNode, { fill: FBColors.EQUATIONS_SCREEN_BACKGROUND } );
    },

    /**
     * Creates the icon for the 'Mystery' screen.
     * @returns {Node}
     */
    createMysteryScreenIcon: function() {
      var iconNode = new Text( mysteryCharacterString, {
        font: new FBFont( 30 )
      } );
      return new ScreenIcon( iconNode, { fill: FBColors.MYSTERY_SCREEN_BACKGROUND } );
    },

    /**
     * Creates the icon for the 'single' scene in the 'Patterns' screen, a single function piece.
     * @returns {Node}
     */
    createSingleSceneIcon: function() {
      return new FunctionBackgroundNode( {
        fill: 'rgb( 147, 231, 129 )',
        lineWidth: 3,
        scale: FUNCTION_ICON_SCALE
      } );
    },

    /**
     * Creates the icon for the 'composed' scene in the 'Patterns' screen, 2 function pieces in series.
     * @returns {Node}
     */
    createComposedSceneIcon: function() {

      var LINE_WIDTH = 3;

      var leftNode = new FunctionBackgroundNode( {
        fill: 'rgb( 147, 231, 129 )',
        lineWidth: LINE_WIDTH
      } );

      var rightNode = new FunctionBackgroundNode( {
        fill: 'rgb( 205, 175, 230 )',
        lineWidth: LINE_WIDTH,
        left: leftNode.right - leftNode.xInset - ( 2 * LINE_WIDTH )
      } );

      return new Node( {
        children: [ leftNode, rightNode ],
        scale: FUNCTION_ICON_SCALE
      } );
    },

    /**
     * Creates the icon for the control that shows/hides the 'see inside' windows on the builder.
     * @returns {Node}
     */
    createSeeInsideIcon: function() {

      var functionNode = new FunctionBackgroundNode( {
        fill: 'rgb( 147, 231, 129 )',
        lineWidth: 3,
        scale: FUNCTION_ICON_SCALE
      } );

      var windowLength = 0.85 * functionNode.height;
      var windowNode = new Rectangle( 0, 0, windowLength, windowLength, {
        cornerRadius: FBConstants.CARD_OPTIONS.cornerRadius,
        fill: 'black',
        stroke: 'gray',
        centerX: functionNode.right - ( FBConstants.FUNCTION_X_INSET_FACTOR * functionNode.width ),
        centerY: functionNode.centerY
      } );

      return new Node( {
        children: [ functionNode, windowNode ]
      } );
    },

    /**
     * Creates the icon for the control that hides the identity of functions in the builder.
     * @returns {Node}
     */
    createHideFunctionsIcon: function() {
      return new HiddenFunctionNode( {
        lineWidth: 3,
        scale: FUNCTION_ICON_SCALE
      } );
    }
  };

  functionBuilder.register( 'FBIconFactory', FBIconFactory );

  /**
   * Creates a star on a background rectangle.
   *
   * @param {Color[]} colorMap
   * @param {Object} [options]
   * @returns {Node}
   */
  var createWarholStar = function( colorMap, options ) {

    assert && assert( colorMap.length === 4 );

    options = options || {};

    var starNode = new Path( new StarShape(), {
      fill: colorMap[ 2 ],  // assumes that star.png is filled with yellow
      stroke: colorMap[ 0 ] // assumes that star.png is stroked with black
    } );

    var backgroundNode = new Rectangle( 0, 0, starNode.width, starNode.height, {
      fill: colorMap[ 3 ],  // assumes that transparent pixels in star.png are converted to opaque white
      center: starNode.center
    } );

    options.children = [ backgroundNode, starNode ];
    return new Node( options );
  };

  return FBIconFactory;
} );
