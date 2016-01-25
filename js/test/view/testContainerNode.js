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

    var functionEndDrag = function( functionInstance, containerNode ) {
      if ( functionInstance.locationProperty.get().distance( containerNode.location ) < 200 ) {
        //  functionInstance.destination = containerNode.location;
        functionInstance.locationProperty.set( containerNode.location ); //TODO animate
      }
    };

    // Add one container for each function type
    var functionCarouselItems = [];
    scene.functionConstructors.forEach( function( FunctionConstructor ) {

      var containerNode = new ImageFunctionContainerNode( functionsParentNode, {
        endDrag: function( functionInstance, event, trail ) {
          functionEndDrag( functionInstance, containerNode );
        }
      } );
      functionCarouselItems.push( containerNode );

      for ( var i = 0; i < scene.maxFunctionInstances; i++ ) {

        // IIFE to create a closure for each function instance
        (function( containerNode ) {

          var functionInstance = new FunctionConstructor();
          var functionNode = new MovableImageFunctionNode( functionInstance, {
            endDrag: function( functionInstance, event, trail ) {
              functionEndDrag( functionInstance, containerNode );
            }
          } );
          containerNode.push( functionNode );

          functionInstance.locationProperty.lazyLink( function( location ) {
            if ( !functionInstance.dragging && location.equals( containerNode.location ) ) {
              containerNode.push( functionNode ); // return to carousel
            }
          } );
        })( containerNode );
      }
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

    return new Node( options );
  }

  return testContainerNode;
} );
