// Copyright 2015-2019, University of Colorado Boulder

/**
 * Functions that create icons for this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const EyeCloseNode = require( 'FUNCTION_BUILDER/common/view/EyeCloseNode' );
  const FBCanvasUtils = require( 'FUNCTION_BUILDER/patterns/model/FBCanvasUtils' );
  const FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  const FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  const FBFont = require( 'FUNCTION_BUILDER/common/FBFont' );
  const FBSymbols = require( 'FUNCTION_BUILDER/common/FBSymbols' );
  const FunctionBackgroundNode = require( 'FUNCTION_BUILDER/common/view/functions/FunctionBackgroundNode' );
  const functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const Image = require( 'SCENERY/nodes/Image' );
  const Node = require( 'SCENERY/nodes/Node' );
  const RationalNumber = require( 'FUNCTION_BUILDER/common/model/RationalNumber' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const ScreenIcon = require( 'JOIST/ScreenIcon' );
  const SlopeInterceptEquationNode = require( 'FUNCTION_BUILDER/common/view/equations/SlopeInterceptEquationNode' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Warhol = require( 'FUNCTION_BUILDER/patterns/model/functions/Warhol' );

  // images
  const butterflyHiRes = require( 'image!FUNCTION_BUILDER/cards/butterfly-hires.png' );
  const stickFigureImage = require( 'image!FUNCTION_BUILDER/cards/stickFigure.png' );

  // strings
  const mysteryCharacterString = require( 'string!FUNCTION_BUILDER/mysteryCharacter' );

  // constants
  const RADIO_BUTTON_ICON_SCALE = 0.35;
  const RADIO_BUTTON_ICON_LINE_WIDTH = 3;
  const CHECKBOX_ICON_SCALE = 0.45;
  const CHECKBOX_ICON_LINE_WIDTH = 3;

  const FBIconFactory = {

    /**
     * Creates the icon for the 'Patterns' screen, the Warhol function applied to an image.
     * Be sure to use a higher resolution version of the image or it will look lousy at the
     * size of the home screen icon.
     *
     * @param {Object} [options]
     * @returns {Node}
     */
    createPatternsScreenIcon: function( options ) {

      options = _.extend( {
        fill: FBColors.PATTERNS_SCREEN_BACKGROUND
      }, options );

      // apply Warhol to the image
      const warhol = new Warhol();
      const inputCanvas = FBCanvasUtils.createCanvasWithImage( butterflyHiRes );
      const outputCanvas = warhol.apply( inputCanvas );

      // create the icon
      const iconNode = new Image( outputCanvas.toDataURL(), {

        // Dimensions are unlikely to be available when loading an image via a URL, so set the initial dimensions
        // explicitly. See https://github.com/phetsims/function-builder/issues/68
        initialWidth: outputCanvas.width,
        initialHeight: outputCanvas.height
      } );

      return new ScreenIcon( iconNode, options );
    },

    /**
     * Creates the icon for the 'Numbers' screen, a function piece with '+ 3' on it.
     *
     * @param {Object} [options]
     * @returns {Node}
     */
    createNumbersScreenIcon: function( options ) {

      options = _.extend( {
        fill: FBColors.NUMBERS_SCREEN_BACKGROUND
      }, options );

      const functionNode = new FunctionBackgroundNode( {
        fill: 'rgb( 255, 120, 120 )'
      } );

      // handle operator separately, so we can control spacing
      const operatorNode = new Text( FBSymbols.PLUS, {
        font: new FBFont( 80 ),
        maxWidth: 0.5 * functionNode.width,
        maxHeight: 0.95 * functionNode.height,
        center: functionNode.center
      } );

      const operandNode = new Text( '3', {
        font: new FBFont( 80 ),
        maxWidth: 0.5 * functionNode.width,
        maxHeight: 0.95 * functionNode.height,
        center: functionNode.center
      } );

      // operator & operand
      const parentNode = new HBox( {
        children: [ operatorNode, operandNode ],
        spacing: 6,
        maxWidth: 0.5 * functionNode.width,
        maxHeight: 0.95 * functionNode.height,
        center: functionNode.center
      } );

      const iconNode = new Node( { children: [ functionNode, parentNode ] } );

      return new ScreenIcon( iconNode, options );
    },

    /**
     * Creates the icon for the 'Equations' screen, the equation y = 2x + 1
     *
     * @param {Object} [options]
     * @returns {Node}
     */
    createEquationsScreenIcon: function( options ) {

      options = _.extend( {
        fill: FBColors.EQUATIONS_SCREEN_BACKGROUND,
        maxIconWidthProportion: 0.75
      }, options );

      const iconNode = new SlopeInterceptEquationNode( new RationalNumber( 2, 3 ), RationalNumber.withInteger( 0 ) );

      return new ScreenIcon( iconNode, options );
    },

    /**
     * Creates the icon for the 'Mystery' screen.
     *
     * @param {Object} [options]
     * @returns {Node}
     */
    createMysteryScreenIcon: function( options ) {

      options = _.extend( {
        fill: FBColors.MYSTERY_SCREEN_BACKGROUND,
        functionFill: 'rgb( 147, 231, 128 )',
        questionMarkFill: 'black'
      }, options );

      const functionNode = new FunctionBackgroundNode( {
        fill: options.functionFill
      } );

      const textNode = new Text( mysteryCharacterString, {
        font: new FBFont( { size: 80, weight: 'bold' } ),
        fill: options.questionMarkFill,
        maxWidth: 0.5 * functionNode.width,
        maxHeight: 0.95 * functionNode.height,
        center: functionNode.center
      } );

      const iconNode = new Node( { children: [ functionNode, textNode ] } );

      return new ScreenIcon( iconNode, options );
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
      let previousFunctionNode = null;

      for ( let i = 0; i < numberOfFunctions; i++ ) {
        const functionNode = new FunctionBackgroundNode( {
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
     * Creates the icon for the 'see inside' checkbox, which shows/hides windows in the builder.
     *
     * @param {Object} [options]
     * @returns {Node}
     */
    createSeeInsideIcon: function( options ) {

      options = _.extend( {
        iconType: 'number' // {string} whether to show a 'number' or 'image' on the card in the window
      }, options );
      assert && assert( options.iconType === 'number' || options.iconType === 'image' );

      const functionNode = new FunctionBackgroundNode( {
        fill: 'rgb( 147, 231, 129 )',
        lineWidth: CHECKBOX_ICON_LINE_WIDTH,
        scale: CHECKBOX_ICON_SCALE
      } );

      const windowLength = 0.75 * functionNode.height;
      const windowNode = new Rectangle( 0, 0, windowLength, windowLength, {
        cornerRadius: 3,
        fill: 'white',
        stroke: 'black',
        lineWidth: 1,
        centerX: functionNode.right - ( FBConstants.FUNCTION_X_INSET_FACTOR * functionNode.width ),
        centerY: functionNode.centerY
      } );

      let contentNode = null;
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
     * Creates the icon for the 'hide functions' checkbox, which hides the identity of functions in the builder.
     *
     * @returns {Node}
     */
    createHideFunctionsIcon: function() {

      const functionNode = new FunctionBackgroundNode( {
        fill: FBColors.HIDDEN_FUNCTION,
        lineWidth: CHECKBOX_ICON_LINE_WIDTH,
        scale: CHECKBOX_ICON_SCALE
      } );

      const eyeCloseNode = new EyeCloseNode( {
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
