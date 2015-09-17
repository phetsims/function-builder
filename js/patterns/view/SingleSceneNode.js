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
  var CardStackNode = require( 'FUNCTION_BUILDER/common/view/CardStackNode' );
  var Carousel = require( 'SUN/Carousel' );
  var EraserButton = require( 'SCENERY_PHET/buttons/EraserButton' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PageControl = require( 'SUN/PageControl' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // constants
  var PAGE_CONTROL_SPACING = 8;
  var INPUTS_PER_PAGE = 4;
  var FUNCTION_PER_PAGE = 3;

  /**
   * @param model
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   * @constructor
   */
  function SingleSceneNode( model, layoutBounds, options ) {

    // Inputs, in a vertical carousel at left-center
    var inputNodes = [];
    model.inputs.forEach( function( input ) {
      inputNodes.push( new CardStackNode( {
        numberOfCards: 2,
        image: input.image
      } ) );
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

    // Functions, in a horizontal carousel at bottom-center
    var functionNodes = [];
    model.functions.forEach( function( functionInstance ) {
      functionNodes.push( new FunctionNode( {
        fill: functionInstance.backgroundColor,
        icon: new Image( functionInstance.image, { scale: 0.3 } )
      } ) );
    } );
    var functionsCarousel = new Carousel( functionNodes, {
      orientation: 'horizontal',
      pageControlVisible: true,
      pageControlLocation: 'bottom',
      itemsPerPage: FUNCTION_PER_PAGE,
      centerX: layoutBounds.centerX,
      bottom: layoutBounds.bottom - 15
    } );

    // Outputs, in a vertical carousel at right-center
    var outputNodes = [];
    for ( var i = 0; i < inputNodes.length; i++ ) {
      outputNodes.push( new Rectangle( 0, 0, inputNodes[ 0 ].width, inputNodes[ 0 ].height ) );
    }
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

    // Builder in the center of the screen
    var builderNode = new BuilderNode( {
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

    // Link input and output carousels, so that display the same page number
    assert && assert( inputsCarousel.numberOfPages === outputsCarousel.numberOfPages );
    inputsCarousel.pageNumberProperty.link( function( pageNumber ) {
      outputsCarousel.pageNumberProperty.set( pageNumber );
    } );
    outputsCarousel.pageNumberProperty.link( function( pageNumber ) {
      inputsCarousel.pageNumberProperty.set( pageNumber );
    } );

    // @private
    this.resetSingleSceneNode = function() {
      inputsCarousel.reset();
      functionsCarousel.reset();
      outputsCarousel.reset();
    };

    options.children = [ builderNode, inputsCarousel, outputsCarousel, functionsCarousel, eraserButton,
      inputsPageControl, outputsPageControl, functionsPageControl ];
    Node.call( this, options );
  }

  return inherit( Node, SingleSceneNode, {

    reset: function() {
      this.resetSingleSceneNode();
    }
  } );
} );
