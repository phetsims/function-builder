// Copyright 2002-2015, University of Colorado Boulder

/**
 * The 'single' scene in the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CardNode = require( 'FUNCTION_BUILDER/common/view/CardNode' );
  var CardStackNode = require( 'FUNCTION_BUILDER/common/view/CardStackNode' );
  var Carousel = require( 'SUN/Carousel' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  function SingleSceneNode( model, layoutBounds, options ) {

    // Input cards, in a vertical carousel
    var inputNodes = [];
    model.inputs.forEach( function( input ) {
      inputNodes.push( new CardStackNode( input.image, {
        numberOfCards: 2
      } ) );
    } );
    var inputsCarousel = new Carousel( inputNodes, {
      orientation: 'vertical',
      pageControlVisible: true,
      separatorsVisible: true,
      itemsPerPage: 4,
      left: layoutBounds.left + 50,
      centerY: layoutBounds.centerY
    } );

    // Functions, in a horizontal carousel
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
      itemsPerPage: 3,
      centerX: layoutBounds.centerX,
      bottom: layoutBounds.bottom - 50
    } );

    // Outputs, in a vertical carousel
    var outputNodes = [];
    for ( var i = 0; i < inputNodes.length; i++ ) {
      outputNodes.push( new CardNode( {
        fill: null,
        stroke: null
      } ) );
    }
    var outputsCarousel = new Carousel( outputNodes, {
      orientation: 'vertical',
      pageControlVisible: true,
      separatorsVisible: true,
      itemsPerPage: 4,
      right: layoutBounds.right - 50,
      centerY: inputsCarousel.centerY
    } );

    // Link scrolling of input and output carousels
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

    options.children = [ inputsCarousel, functionsCarousel, outputsCarousel ];
    Node.call( this, options );
  }

  return inherit( Node, SingleSceneNode, {

    reset: function() {
      this.resetSingleSceneNode();
    }
  } );
} );
