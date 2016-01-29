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
  var Image = require( 'SCENERY/nodes/Image' );
  var ImageCard = require( 'FUNCTION_BUILDER/patterns/model/ImageCard' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ScreenIcon = require( 'JOIST/ScreenIcon' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Warhol = require( 'FUNCTION_BUILDER/patterns/model/functions/Warhol' );

  // images
  var starImage = require( 'image!FUNCTION_BUILDER/inputs/star.png' );

  // constants
  var DEFAULT_SCENE_ICON_WIDTH = 25;

  var FBIconFactory = {

    /**
     * Creates the icon for the 'Patterns' screen, the Warhol function applied to the star image.
     * @returns {Node}
     */
    createPatternsScreenIcon: function() {
      var functionInstance = new Warhol();
      var card = ImageCard.withImage( starImage );
      var imageNode = new Image( functionInstance.apply( card.canvas ) );
      return new ScreenIcon( imageNode, { fill: 'rgb( 255, 247, 235 )' } );
    },

    /**
     * Creates the icon for the 'Numbers' screen, a function piece with '+ 3' on it.
     * @returns {Node}
     */
    createNumbersScreenIcon: function() {
      var functionNode = new FunctionBackgroundNode( {
        fill: 'rgb( 255, 246, 187 )'
      });
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
