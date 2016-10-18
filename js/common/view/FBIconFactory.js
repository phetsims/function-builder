// Copyright 2016, University of Colorado Boulder

/**
 * Functions that create icons for this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EyeCloseNode = require( 'FUNCTION_BUILDER/common/view/EyeCloseNode' );
  var FBCanvasUtils = require( 'FUNCTION_BUILDER/patterns/model/FBCanvasUtils' );
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  var FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  var FunctionBackgroundNode = require( 'FUNCTION_BUILDER/common/view/functions/FunctionBackgroundNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ScreenIcon = require( 'JOIST/ScreenIcon' );
  var SlopeInterceptEquationNode = require( 'FUNCTION_BUILDER/common/view/equations/SlopeInterceptEquationNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Warhol = require( 'FUNCTION_BUILDER/patterns/model/functions/Warhol' );

  // images
  var butterflyHiRes = require( 'image!FUNCTION_BUILDER/cards/butterfly-hires.png' );
  var stickFigureImage = require( 'image!FUNCTION_BUILDER/cards/stickFigure.png' );

  // strings
  var mysteryCharacterString = require( 'string!FUNCTION_BUILDER/mysteryCharacter' );

  // constants
  var RADIO_BUTTON_ICON_SCALE = 0.35;
  var RADIO_BUTTON_ICON_LINE_WIDTH = 3;
  var CHECK_BOX_ICON_SCALE = 0.45;
  var CHECK_BOX_ICON_LINE_WIDTH = 3;

  var FBIconFactory = {

    /**
     * Creates the icon for the 'Patterns' screen, the Warhol function applied to an image.
     * Be sure to use a higher resolution version of the image or it will look lousy at the
     * size of the home screen icon.
     *
     * @returns {Node}
     */
    createPatternsScreenIcon: function() {

      // apply Warhol to the image
      var warhol = new Warhol();
      var inputCanvas = FBCanvasUtils.createCanvasWithImage( butterflyHiRes );
      var outputCanvas = warhol.apply( inputCanvas );

      // create the icon
      var iconNode = new Image( outputCanvas.toDataURL(), {

        // Dimensions are unlikely to be available when loading an image via a URL, so set the initial dimensions
        // explicitly. See https://github.com/phetsims/function-builder/issues/68
        initialWidth: outputCanvas.width,
        initialHeight: outputCanvas.height
      } );

      return new ScreenIcon( iconNode, { fill: FBColors.PATTERNS_SCREEN_BACKGROUND } );
    },

    /**
     * Creates the icon for the 'Numbers' screen, a function piece with '+ 3' on it.
     *
     * @returns {Node}
     */
    createNumbersScreenIcon: function() {

      var functionNode = new FunctionBackgroundNode( {
        fill: 'rgb( 255, 120, 120 )'
      } );

      // handle operator separately, so we can control spacing
      var operatorNode = new Text( FBSymbols.PLUS, {
        font: new FBFont( 80 ),
        maxWidth: 0.5 * functionNode.width,
        maxHeight: 0.95 * functionNode.height,
        center: functionNode.center
      } );

      var operandNode = new Text( '3', {
        font: new FBFont( 80 ),
        maxWidth: 0.5 * functionNode.width,
        maxHeight: 0.95 * functionNode.height,
        center: functionNode.center
      } );

      // operator & operand
      var parentNode = new HBox( {
        children: [ operatorNode, operandNode ],
        spacing: 6,
        maxWidth: 0.5 * functionNode.width,
        maxHeight: 0.95 * functionNode.height,
        center: functionNode.center
      } );

      var iconNode = new Node( { children: [ functionNode, parentNode ] } );

      return new ScreenIcon( iconNode, { fill: FBColors.NUMBERS_SCREEN_BACKGROUND } );
    },

    /**
     * Creates the icon for the 'Equations' screen, the equation y = 2x + 1
     *
     * @returns {Node}
     */
    createEquationsScreenIcon: function() {
      var iconNode = new SlopeInterceptEquationNode( new RationalNumber( 2, 3 ), RationalNumber.withInteger( 0 ) );
      return new ScreenIcon( iconNode, {
        fill: FBColors.EQUATIONS_SCREEN_BACKGROUND,
        maxIconWidthProportion: 0.75
      } );
    },

    /**
     * Creates the icon for the 'Mystery' screen.
     *
     * @returns {Node}
     */
    createMysteryScreenIcon: function() {

      var functionNode = new FunctionBackgroundNode( {
        fill: 'rgb( 147, 231, 128 )'
      } );

      var textNode = new Text( mysteryCharacterString, {
        font: new FBFont( 80 ),
        maxWidth: 0.5 * functionNode.width,
        maxHeight: 0.95 * functionNode.height,
        center: functionNode.center
      } );

      var iconNode = new Node( { children: [ functionNode, textNode ] } );

      return new ScreenIcon( iconNode, { fill: FBColors.MYSTERY_SCREEN_BACKGROUND } );
    },

    /**
     * Creates the icon for a scene selection radio button.
     * It consists of N functions in series.
     *
     * @param {number} numberOfFunctions
     * @param {Object} [options]
     * @returns {Node}
     */
    createSceneIcon: function( numberOfFunctions, options ) {

      options = _.extend( {
        colors: [ 'rgb( 147, 231, 129 )', 'rgb( 205, 175, 230 )', 'rgb( 255, 120, 120 )' ],
        scale: RADIO_BUTTON_ICON_SCALE,
        lineWidth: RADIO_BUTTON_ICON_LINE_WIDTH
      }, options );
      assert && assert( options.colors.length >= numberOfFunctions );

      assert && assert( !options.children );
      options.children = [];
      var previousFunctionNode = null;

      for ( var i = 0; i < numberOfFunctions; i++ ) {
        var functionNode = new FunctionBackgroundNode( {
          fill: options.colors[ i ],
          lineWidth: options.lineWidth
        } );
        if ( previousFunctionNode ) {
          functionNode.left = previousFunctionNode.right - previousFunctionNode.xInset - ( 2 * RADIO_BUTTON_ICON_LINE_WIDTH );
        }
        options.children.push( functionNode );
        previousFunctionNode = functionNode;
      }

      return new Node( options );
    },

    /**
     * Creates the icon for the 'see inside' check box, which shows/hides windows in the builder.
     *
     * @param {Object} [options]
     * @returns {Node}
     */
    createSeeInsideIcon: function( options ) {

      options = _.extend( {
        iconType: 'number' // {string} whether to show a 'number' or 'image' on the card in the window
      }, options );
      assert && assert( options.iconType === 'number' || options.iconType === 'image' );

      var functionNode = new FunctionBackgroundNode( {
        fill: 'rgb( 147, 231, 129 )',
        lineWidth: CHECK_BOX_ICON_LINE_WIDTH,
        scale: CHECK_BOX_ICON_SCALE
      } );

      var windowLength = 0.75 * functionNode.height;
      var windowNode = new Rectangle( 0, 0, windowLength, windowLength, {
        cornerRadius: 3,
        fill: 'white',
        stroke: 'black',
        lineWidth: 1,
        centerX: functionNode.right - ( FBConstants.FUNCTION_X_INSET_FACTOR * functionNode.width ),
        centerY: functionNode.centerY
      } );

      var contentNode = null;
      if ( options.iconType === 'number' ) {

        // number '2'
        contentNode = new Text( '2', {
          font: new FBFont( 20 ),
          maxHeight: 0.85 * windowNode.height
        } );
      }
      else {

        // image
        contentNode = new Image( stickFigureImage, {
          maxHeight: 0.75 * windowNode.height
        } );
      }
      contentNode.center = windowNode.center;

      return new Node( {
        children: [ functionNode, windowNode, contentNode ]
      } );
    },

    /**
     * Creates the icon for the 'hide functions' check box, which hides the identity of functions in the builder.
     *
     * @returns {Node}
     */
    createHideFunctionsIcon: function() {

      var functionNode = new FunctionBackgroundNode( {
        fill: FBColors.HIDDEN_FUNCTION,
        lineWidth: CHECK_BOX_ICON_LINE_WIDTH,
        scale: CHECK_BOX_ICON_SCALE
      } );

      var eyeCloseNode = new EyeCloseNode( {
        maxHeight: 0.65 * functionNode.height,
        center: functionNode.center
      } );

      return new Node( {
        children: [ functionNode, eyeCloseNode ]
      } );
    }
  };

  functionBuilder.register( 'FBIconFactory', FBIconFactory );

  return FBIconFactory;
} );
