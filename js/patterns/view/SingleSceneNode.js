// Copyright 2002-2015, University of Colorado Boulder

/**
 * The 'single' scene in the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var BuilderNode = require( 'FUNCTION_BUILDER/common/view/BuilderNode' );
  var CardNode = require( 'FUNCTION_BUILDER/common/view/CardNode' );
  var Carousel = require( 'SUN/Carousel' );
  var DownUpListener = require( 'SCENERY/input/DownUpListener' );
  var EraserButton = require( 'SCENERY_PHET/buttons/EraserButton' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PageControl = require( 'SUN/PageControl' );

  // constants
  var FUNCTION_PER_PAGE = 3;
  var INPUTS_PER_PAGE = 4;
  var PAGE_CONTROL_SPACING = 8;

  /**
   * @param model
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   * @constructor
   */
  function SingleSceneNode( model, layoutBounds, options ) {

    // Input cards, in a vertical carousel at left-center
    var inputNodes = [];
    model.inputCards.forEach( function( card ) {
      inputNodes.push( new CardNode( card ) );
    } );
    var inputsCarousel = new Carousel( inputNodes, {
      orientation: 'vertical',
      pageControlVisible: true,
      pageControlLocation: 'left',
      separatorsVisible: true,
      itemsPerPage: INPUTS_PER_PAGE,
      left: layoutBounds.left + 50,
      top: layoutBounds.top + 50
    } );

    // Output cards, in a vertical carousel at right-center
    var outputNodes = [];
    model.inputCards.forEach( function( card ) {
      outputNodes.push( new CardNode( card ) );
    } );
    var outputsCarousel = new Carousel( outputNodes, {
      orientation: 'vertical',
      pageControlVisible: true,
      pageControlLocation: 'right',
      separatorsVisible: true,
      itemsPerPage: INPUTS_PER_PAGE,
      right: layoutBounds.right - ( inputsCarousel.left - layoutBounds.left ),
      top: inputsCarousel.top
    } );

    // Eraser button, centered below the output carousel
    var eraserButton = new EraserButton( {
      iconWidth: 28,
      centerX: outputsCarousel.centerX,
      top: outputsCarousel.bottom + 30
    } );

    // Clicking on a function selects it
    var functionInputListener = new DownUpListener( {
      down: function( event ) {
        assert && assert( event.currentTarget instanceof FunctionNode );
        model.builder.functionProperties[ 0 ].set( event.currentTarget.functionInstance );
      }
    } );

    // Functions, in a horizontal carousel at bottom-center
    var functionNodes = [];
    model.functions.forEach( function( functionInstance ) {
      var functionNode = new FunctionNode( functionInstance, {
        cursor: 'pointer'
      } );
      functionNodes.push( functionNode );
      functionNode.addInputListener( functionInputListener );
    } );
    var functionsCarousel = new Carousel( functionNodes, {
      orientation: 'horizontal',
      pageControlVisible: true,
      pageControlLocation: 'bottom',
      itemsPerPage: FUNCTION_PER_PAGE,
      centerX: layoutBounds.centerX,
      bottom: layoutBounds.bottom - 25
    } );

    // Function builder, in the center of the screen
    var builderNode = new BuilderNode( model.builder, {
      centerX: layoutBounds.centerX,
      centerY: inputsCarousel.centerY
    } );

    // Page controls for each carousel
    var inputsPageControl = new PageControl( inputsCarousel.numberOfPages, inputsCarousel.pageNumberProperty, {
      orientation: 'vertical',
      right: inputsCarousel.left - PAGE_CONTROL_SPACING,
      centerY: inputsCarousel.centerY
    } );
    var outputsPageControl = new PageControl( outputsCarousel.numberOfPages, outputsCarousel.pageNumberProperty, {
      orientation: 'vertical',
      left: outputsCarousel.right + PAGE_CONTROL_SPACING,
      centerY: outputsCarousel.centerY
    } );
    var functionsPageControl = new PageControl( functionsCarousel.numberOfPages, functionsCarousel.pageNumberProperty, {
      orientation: 'horizontal',
      centerX: functionsCarousel.centerX,
      top: functionsCarousel.bottom + PAGE_CONTROL_SPACING
    } );

    // Link input and output carousels, so that they display the same page number
    assert && assert( inputsCarousel.numberOfPages === outputsCarousel.numberOfPages );
    inputsCarousel.pageNumberProperty.link( function( pageNumber ) {
      outputsCarousel.pageNumberProperty.set( pageNumber );
    } );
    outputsCarousel.pageNumberProperty.link( function( pageNumber ) {
      inputsCarousel.pageNumberProperty.set( pageNumber );
    } );

    // @private Resets this node
    this.resetSingleSceneNode = function() {
      inputsCarousel.reset();
      functionsCarousel.reset();
      outputsCarousel.reset();
    };

    options.children = [
      builderNode,
      inputsCarousel, outputsCarousel, functionsCarousel,
      inputsPageControl, outputsPageControl, functionsPageControl,
      eraserButton
    ];
    Node.call( this, options );

    //XXX test functions
    {
      var Card = require( 'FUNCTION_BUILDER/common/model/Card' );
      var Disappear = require( 'FUNCTION_BUILDER/common/model/Disappear' );
      var Grayscale = require( 'FUNCTION_BUILDER/common/model/Grayscale' );
      var HBox = require( 'SCENERY/nodes/HBox' );
      var InvertRGB = require( 'FUNCTION_BUILDER/common/model/InvertRGB' );
      var Mirror = require( 'FUNCTION_BUILDER/common/model/Mirror' );
      var MysteryB = require( 'FUNCTION_BUILDER/common/model/MysteryB' );
      var MysteryC = require( 'FUNCTION_BUILDER/common/model/MysteryC' );
      var Rotate90 = require( 'FUNCTION_BUILDER/common/model/Rotate90' );
      var Rotate180 = require( 'FUNCTION_BUILDER/common/model/Rotate180' );
      var Shrink75 = require( 'FUNCTION_BUILDER/common/model/Shrink75' );
      var cherriesImage = require( 'image!FUNCTION_BUILDER/inputs/cherries.png' );

      var inputCard = new Card( 'butterfly', cherriesImage );

      var functions = [
        new Disappear(),
        new Grayscale(),
        new InvertRGB(),
        new MysteryB(),
        new MysteryC(),
        new Mirror(),
        new Rotate90(),
        new Rotate180(),
        new Shrink75()
      ];

      var boxChildren = [];
      functions.forEach( function( functionInstance ) {
        var outputCard = functionInstance.apply( inputCard );
        boxChildren.push( new CardNode( outputCard ) );
      } );

      this.addChild( new HBox( {
        children: boxChildren,
        spacing: 15,
        centerX: layoutBounds.centerX,
        centerY: layoutBounds.centerY + 100
      } ) );
    }
  }

  return inherit( Node, SingleSceneNode, {

    reset: function() {
      this.resetSingleSceneNode();
    }
  } );
} );
