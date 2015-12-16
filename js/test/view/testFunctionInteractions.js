// Copyright 2015, University of Colorado Boulder

/**
 * Test for FunctionCreatorNode.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Carousel = require( 'SUN/Carousel' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionCreatorNode = require( 'FUNCTION_BUILDER/common/view/FunctionCreatorNode' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var MovableFunctionNode = require( 'FUNCTION_BUILDER/common/view/MovableFunctionNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PageControl = require( 'SUN/PageControl' );

  // function modules
  var Erase = require( 'FUNCTION_BUILDER/patterns/model/functions/Erase' );
  var Grayscale = require( 'FUNCTION_BUILDER/patterns/model/functions/Grayscale' );
  var Identity = require( 'FUNCTION_BUILDER/patterns/model/functions/Identity' );
  var InvertRGB = require( 'FUNCTION_BUILDER/patterns/model/functions/InvertRGB' );
  var Mirror = require( 'FUNCTION_BUILDER/patterns/model/functions/Mirror' );
  var MysteryA = require( 'FUNCTION_BUILDER/patterns/model/functions/MysteryA' );
  var MysteryB = require( 'FUNCTION_BUILDER/patterns/model/functions/MysteryB' );
  var MysteryC = require( 'FUNCTION_BUILDER/patterns/model/functions/MysteryC' );
  var Rotate90 = require( 'FUNCTION_BUILDER/patterns/model/functions/Rotate90' );
  var Rotate180 = require( 'FUNCTION_BUILDER/patterns/model/functions/Rotate180' );
  var Shrink75 = require( 'FUNCTION_BUILDER/patterns/model/functions/Shrink75' );
  var Warhol = require( 'FUNCTION_BUILDER/patterns/model/functions/Warhol' );

  /**
   * @param {Bounds2} layoutBounds
   */
  function testFunctionInteractions( layoutBounds ) {

    // constructors for the types of functions that will appear in the carousel
    var functionConstructors = [
      Mirror,
      Rotate90,
      Grayscale,
      Rotate180,
      Identity,
      InvertRGB,
      Erase,
      Shrink75,
      Warhol,
      MysteryA,
      MysteryB,
      MysteryC
    ];

    // parent node for all functions
    var functionsParentNode = new Node();

    var functionCarouselItems = []; // {FunctionCreatorNode[]}
    for ( var i = 0; i < functionConstructors.length; i++ ) {
      functionCarouselItems.push( createFunctionCarouselItem( functionConstructors[ i ], functionsParentNode ) );
    }

    var functionsCarousel = new Carousel( functionCarouselItems, {
      orientation: 'horizontal',
      itemsPerPage: 3,
      centerX: layoutBounds.centerX,
      bottom: layoutBounds.bottom - 25
    } );

    var functionsPageControl = new PageControl( functionsCarousel.numberOfPages, functionsCarousel.pageNumberProperty, {
      orientation: 'horizontal',
      centerX: functionsCarousel.centerX,
      top: functionsCarousel.bottom + 8
    } );

    return new Node( {
      children: [ functionsCarousel, functionsPageControl, functionsParentNode ]
    } );
  }

  functionBuilder.register( 'testFunctionInteractions', testFunctionInteractions );

  //TODO determine whether function goes into the builder or is returned to carousel
  var adjustFunctionLocation = function( functionInstance, event, trail ) {
    functionInstance.locationProperty.reset();
  };

  /**
   * Creates an item for the function carousel.
   *
   * @param {function} FunctionConstructor - constructor of an {AbstractFunction}
   * @param {Node} functionsParentNode - parent for all function nodes that are created
   * @param {Object} [options]
   * @returns {FunctionCreatorNode}
   */
  var createFunctionCarouselItem = function( FunctionConstructor, functionsParentNode, options ) {

    options = _.extend( {
      maxInstances: 3
    }, options );

    var iconNode = new FunctionNode( new FunctionConstructor() );

    /**
     * Creates a function instance and wires it into the sim.
     * @param {Vector2} initialLocation
     * @returns {AbstractFunction}
     */
    var createFunctionInstance = function( initialLocation ) {

      // create the function instance
      var functionInstance = new FunctionConstructor( {
        location: initialLocation,
        dragging: true
      } );

      // create an associated node
      var functionNode = new MovableFunctionNode( functionInstance, {
        endDrag: adjustFunctionLocation
      } );
      functionsParentNode.addChild( functionNode );

      // when the function instance is disposed of, remove the associated node
      functionInstance.disposed.addListener( function() {
        functionNode.dispose();
        functionsParentNode.removeChild( functionNode );
      } );

      return functionInstance;
    };

    return new FunctionCreatorNode( iconNode, createFunctionInstance, options );
  };

  return testFunctionInteractions;
} );
