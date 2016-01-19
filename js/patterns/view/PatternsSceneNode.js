// Copyright 2015-2016, University of Colorado Boulder

/**
 * Composite Node that contains all of the Nodes that make up a 'scene' in the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var BuilderNode = require( 'FUNCTION_BUILDER/common/view/BuilderNode' );
  var Carousel = require( 'SUN/Carousel' );
  var EraserButton = require( 'SCENERY_PHET/buttons/EraserButton' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var ImageCard = require( 'FUNCTION_BUILDER/patterns/model/ImageCard' );
  var ImageCardCreatorNode = require( 'FUNCTION_BUILDER/patterns/view/ImageCardCreatorNode' );
  var ImageCardListener = require( 'FUNCTION_BUILDER/patterns/view/ImageCardListener' );
  var ImageCardNode = require( 'FUNCTION_BUILDER/patterns/view/ImageCardNode' );
  var ImageFunctionCreatorNode = require( 'FUNCTION_BUILDER/patterns/view/ImageFunctionCreatorNode' );
  var ImageFunctionListener = require( 'FUNCTION_BUILDER/patterns/view/ImageFunctionListener' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PageControl = require( 'SUN/PageControl' );
  var Property = require( 'AXON/Property' );
  var SpyGlassCheckBox = require( 'FUNCTION_BUILDER/common/view/SpyGlassCheckBox' );

  // constants
  var INPUTS_PER_PAGE = 4;
  var PAGE_CONTROL_SPACING = 8;
  var OUTPUT_CAROUSELS_SPACING = 15;

  /**
   * @param {PatternsScene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {function(Event): Vector2} viewToModelVector2 - converts a view {Event} to a model {Vector2}
   * @param {Object} [options]
   * @constructor
   */
  function PatternsSceneNode( scene, layoutBounds, viewToModelVector2, options ) {

    // no options specific to this type
    options = options || {};

    // parent node for all cards, while the user is dragging them
    var cardsParent = new Node();

    // parent node for all function instances, while the user is dragging them
    var functionsParent = new Node();

    // Builders
    var builderNodes = [];
    scene.builders.forEach( function( builder ) {
      builderNodes.push( new BuilderNode( builder ) );
    } );

    // Items in the input carousel
    var inputCarouselItems = [];
    var cardListener = new ImageCardListener( scene, cardsParent );
    scene.cardImages.forEach( function( cardImage ) {
      inputCarouselItems.push( new ImageCardCreatorNode( cardImage, viewToModelVector2, cardListener ) );
    } );

    // Input carousel, at left
    var inputCarousel = new Carousel( inputCarouselItems, {
      orientation: 'vertical',
      separatorsVisible: true,
      itemsPerPage: INPUTS_PER_PAGE,
      buttonTouchAreaXDilation: 5,
      buttonTouchAreaYDilation: 15,
      left: layoutBounds.left + 50,
      top: layoutBounds.top + 50
    } );

    // Output carousels, one for each builder
    var outputCarousels = [];
    scene.builders.forEach( function( builder ) {

      //TODO temporary, some other type of Node is needed in the output carousels
      var outputCarouselItems = [];
      scene.cardImages.forEach( function( cardImage ) {
        var card = ImageCard.withImage( cardImage );
        outputCarouselItems.push( new ImageCardNode( card ) );
      } );

      var outputCarousel = new Carousel( outputCarouselItems, {
        orientation: 'vertical',
        buttonColor: builder.colorScheme.middle, // color code buttons with their associated builder
        separatorsVisible: true,
        itemsPerPage: INPUTS_PER_PAGE,
        buttonTouchAreaXDilation: 5,
        buttonTouchAreaYDilation: 15
      } );

      outputCarousels.push( outputCarousel );
    } );

    // Horizontal layout of output carousels, at right-center
    var outputCarouselsParent = new HBox( {
      children: outputCarousels,
      spacing: OUTPUT_CAROUSELS_SPACING,
      right: layoutBounds.right - ( inputCarousel.left - layoutBounds.left ),
      bottom: inputCarousel.bottom
    } );

    // Eraser button, centered below the output carousels
    var eraserButtonListener = function() {
      //TODO return all cards to the input carousel
    };
    var eraserButton = new EraserButton( {
      listener: eraserButtonListener,
      iconWidth: 28,
      centerX: outputCarouselsParent.centerX,
      top: outputCarouselsParent.bottom + 40
    } );

    // Items in the functions carousel
    var functionCarouselItems = []; // {ImageFunctionCreatorNode[]}
    var functionListener = new ImageFunctionListener( scene, functionsParent );
    scene.functionConstructors.forEach( function( FunctionConstructor ) {
      functionCarouselItems.push( new ImageFunctionCreatorNode( FunctionConstructor, viewToModelVector2, functionListener ) );
    } );

    // Functions carousel, centered below bottom builder
    var functionsCarousel = new Carousel( functionCarouselItems, {
      orientation: 'horizontal',
      itemsPerPage: 3,
      buttonTouchAreaXDilation: 15,
      buttonTouchAreaYDilation: 5,
      centerX: builderNodes[ builderNodes.length - 1 ].centerX,
      bottom: layoutBounds.bottom - 25
    } );

    // Page controls for carousels
    var PAGE_CONTROL_OPTIONS = {
      interactive: true,
      dotTouchAreaDilation: 4,
      dotMouseAreaDilation: 4
    };
    var inputsPageControl = new PageControl( inputCarousel.numberOfPages, inputCarousel.pageNumberProperty, _.extend( {
      orientation: 'vertical',
      right: inputCarousel.left - PAGE_CONTROL_SPACING,
      centerY: inputCarousel.centerY
    }, PAGE_CONTROL_OPTIONS ) );
    var outputsPageControl = new PageControl( outputCarousels[ 0 ].numberOfPages, outputCarousels[ 0 ].pageNumberProperty, _.extend( {
      orientation: 'vertical',
      left: outputCarouselsParent.right + PAGE_CONTROL_SPACING,
      centerY: outputCarouselsParent.centerY
    }, PAGE_CONTROL_OPTIONS ) );
    var functionsPageControl = new PageControl( functionsCarousel.numberOfPages, functionsCarousel.pageNumberProperty, _.extend( {
      orientation: 'horizontal',
      centerX: functionsCarousel.centerX,
      top: functionsCarousel.bottom + PAGE_CONTROL_SPACING
    }, PAGE_CONTROL_OPTIONS ) );

    // Link input carousel to all output carousels, so that they display the same page number
    assert && assert( inputCarousel.numberOfPages === outputCarousels[ 0 ].numberOfPages );
    inputCarousel.pageNumberProperty.link( function( pageNumber ) {
      outputCarousels.forEach( function( outputCarousel ) {
        outputCarousel.pageNumberProperty.set( pageNumber );
      } );
    } );

    // Link all output carousels to input carousel
    outputCarousels.forEach( function( outputCarousel ) {
      outputCarousel.pageNumberProperty.link( function( pageNumber ) {
        inputCarousel.pageNumberProperty.set( pageNumber );
      } );
    } );

    // Spy Glass check box, to the right of functions carousel
    var spyGlassVisibleProperty = new Property( false );
    var spyGlassCheckBox = new SpyGlassCheckBox( spyGlassVisibleProperty, {
      maxWidth: 0.85 * ( functionsCarousel.left - inputCarousel.left ),
      left: inputCarousel.left,
      top: functionsCarousel.top
    } );
    spyGlassVisibleProperty.link( function( visible ) {
      //TODO implement the spy glass feature
    } );
    spyGlassCheckBox.visible = scene.spyGlassEnabled;

    // rendering order
    assert && assert( !options.children, 'decoration not supported' );
    options.children = [
      spyGlassCheckBox, eraserButton,
      inputCarousel, outputCarouselsParent, functionsCarousel,
      inputsPageControl, outputsPageControl, functionsPageControl
    ];
    options.children = options.children.concat( builderNodes );
    options.children = options.children.concat( [ functionsParent, cardsParent ] );

    Node.call( this, options );

    // @private Resets this node
    this.resetPatternsSceneNode = function() {
      functionsCarousel.reset();
      inputCarousel.reset();
      outputCarousels.forEach( function( outputCarousel ) {
        outputCarousel.reset();
      } );
      spyGlassVisibleProperty.reset();
    };

    //TODO temporary, to demonstrate update of cards in output carousels
    for ( var i = 0; i < scene.builders.length; i++ ) {

      // IIFE to store builder in a closure var
      // When a builder's functions change, update it's corresponding output carousel.
      (function( builderIndex ) {

        var builder = scene.builders[ builderIndex ];

        var updateOutputItems = function() {
          for ( var i = 0; i < scene.cardImages.length; i++ ) {
            var card = ImageCard.withImage( scene.cardImages[ i ] );
            for ( var j = 0; j < builder.slots.length; j++ ) {
              var functionInstance = builder.slots[ j ].functionInstanceProperty.get();
              if ( functionInstance ) {
                var outputCanvas = functionInstance.apply( card.canvas );
                card = new ImageCard( outputCanvas );
              }
            }
            outputCarousels[ builderIndex ].items[ i ].setCard( card );
          }
        };

        builder.slots.forEach( function( slot ) {
          slot.functionInstanceProperty.link( updateOutputItems );
        } );

      })( i );
    }
  }

  functionBuilder.register( 'PatternsSceneNode', PatternsSceneNode );

  return inherit( Node, PatternsSceneNode, {

    // @public
    reset: function() {
      this.resetPatternsSceneNode();
    }
  } );
} );
