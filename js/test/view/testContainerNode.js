// Copyright 2016, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // modules
  var Builder = require( 'FUNCTION_BUILDER/common/model/Builder' );
  var Carousel = require( 'SUN/Carousel' );
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var ImageFunctionContainerNode = require( 'FUNCTION_BUILDER/test/view/ImageFunctionContainerNode' );
  var MovableImageFunctionNode = require( 'FUNCTION_BUILDER/patterns/view/MovableImageFunctionNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PatternsIconFactory = require( 'FUNCTION_BUILDER/patterns/view/PatternsIconFactory' );
  var PatternsScene = require( 'FUNCTION_BUILDER/patterns/model/PatternsScene' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param layoutBounds
   * @returns {*}
   */
  function testContainerNode( layoutBounds ) {

    var scene = new PatternsScene(
      [
        new Builder( {
          width: 350,
          numberOfSlots: 1,
          location: new Vector2( 335, 280 ),
          colorScheme: FBColors.BUILDER_MAROON
        } )
      ],
      PatternsIconFactory.createSingleSceneIcon,
      {
        maxFunctionInstances: 2
      } );

    // When a function is removed from the carousel, add it to this parent
    var functionsParentNode = new Node();

    // Add one container for each function type
    var functionCarouselItems = [];
    scene.functionConstructors.forEach( function( FunctionConstructor ) {
      functionCarouselItems.push( new ImageFunctionContainerNode( FunctionConstructor, scene.maxFunctionInstances, functionsParentNode, scene ) );
    } );

    var functionCarousel = new Carousel( functionCarouselItems, {
      orientation: 'horizontal',
      itemsPerPage: 3,
      buttonTouchAreaXDilation: 15,
      buttonTouchAreaYDilation: 5,
      centerX: layoutBounds.centerX,
      bottom: layoutBounds.bottom - 25
    } );

    var options = {
      children: [ functionCarousel, functionsParentNode ]
    };

    var node = new Node( options );

    //TODO this is wrong, probably because it's not connected to the scenegraph yet in TestView
    functionCarouselItems.forEach( function( item ) {
      functionCarousel.scrollToItem( item );
      var viewLocation = item.localToGlobalPoint( item.center );
      console.log( 'viewLocation=' + viewLocation.toString() ); //XXX
      item.location = functionsParentNode.getParent().globalToLocalPoint( viewLocation );
    } );
    functionCarousel.scrollToItemIndex( 0 );

    return node;
  }

  return testContainerNode;
} );
