// Copyright 2015, University of Colorado Boulder

/**
 * Test for user interactions with functions, dragging between carousel and builder.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var BuilderNode = require( 'FUNCTION_BUILDER/common/view/BuilderNode' );
  var ComposedScene = require( 'FUNCTION_BUILDER/patterns/model/ComposedScene' );
  var Carousel = require( 'SUN/Carousel' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionCreatorNode = require( 'FUNCTION_BUILDER/common/view/FunctionCreatorNode' );
  var MovableFunctionNode = require( 'FUNCTION_BUILDER/common/view/MovableFunctionNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PageControl = require( 'SUN/PageControl' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );

  /**
   * Public interface for this test.
   * @param {Bounds2} layoutBounds
   */
  function testFunctionInteractions( layoutBounds ) {

    // model
    var scene = new ComposedScene();

    // parent node for all function nodes
    var functionsParentNode = new Node();

    /**
     * When a function instance is created, add it to the model and view.
     * This function relies heavily on closure vars!
     *
     * @param {AbstractFunction} functionInstance - the instance that was created
     * @param {FunctionCreatorNode} functionCreatorNode - the node that created the instance
     */
    var functionCreatedListener = function( functionInstance, functionCreatorNode ) {

      assert && assert( functionCreatorNode && functionInstance, 'does the associated Emitter call emit2?' );

      // IIFE
      (function() {

        // save args in closure vars
        var localFunctionInstance = functionInstance;
        var localFunctionCreatorNode = functionCreatorNode;

        // add functionInstance to model
        scene.addFunctionInstance( localFunctionInstance );

        // create a Node for the function instance
        var functionNode = new MovableFunctionNode( localFunctionInstance, {

          // If the function is in the builder, remove it.
          startDrag: function( functionInstance, event, trail ) {
            if ( scene.builder.containsFunctionInstance( functionInstance ) ) {
              scene.builder.removeFunctionInstance( functionInstance );
            }
          },

          // When done dragging the function ...
          endDrag: function( functionInstance, event, trail ) {

            // Try to add the function to the builder.
            var slotNumber = scene.builder.addFunctionInstance( functionInstance );

            // If the function isn't added to the builder, then return it to the carousel.
            if ( slotNumber === -1 ) {
              functionsCarousel.scrollToItem( localFunctionCreatorNode );
              functionInstance.locationProperty.reset();
            }
          }
        } );
        functionsParentNode.addChild( functionNode );

        // when dispose is called for the function instance, remove the associated Node
        localFunctionInstance.disposeCalledEmitter.addListener( function() {
          scene.removeFunctionInstance( localFunctionInstance );
          functionNode.dispose();
          functionsParentNode.removeChild( functionNode );
        } );
      })();
    };

    // Items in the functions carousel
    var functionCarouselItems = []; // {FunctionCreatorNode[]}
    for ( var i = 0; i < scene.functionConstructors.length; i++ ) {
      var functionCreatorNode = new FunctionCreatorNode( scene.functionConstructors[ i ], {

        // max number of instances of each function type
        maxInstances: 2,

        //TODO this is almost identical to options.endDrag for MovableFunctionNode, factor out?
        // When done dragging the newly-created function ...
        endDrag: function( functionInstance, functionCreatorNode, event, trail ) {

          // try to add function to builder
          var slotNumber = scene.builder.addFunctionInstance( functionInstance );

          // If the function isn't added to the builder, then return it to the carousel.
          if ( slotNumber === -1 ) {
            functionsCarousel.scrollToItem( functionCreatorNode );
            functionInstance.locationProperty.reset();
          }
        }
      } );
      functionCreatorNode.functionCreatedEmitter.addListener( functionCreatedListener );
      functionCarouselItems.push( functionCreatorNode );
    }

    // Functions carousel, at bottom center
    var functionsCarousel = new Carousel( functionCarouselItems, {
      orientation: 'horizontal',
      itemsPerPage: 3,
      centerX: layoutBounds.centerX,
      bottom: layoutBounds.bottom - 25
    } );

    // Page control for functions carousel
    var functionsPageControl = new PageControl( functionsCarousel.numberOfPages, functionsCarousel.pageNumberProperty, {
      orientation: 'horizontal',
      centerX: functionsCarousel.centerX,
      top: functionsCarousel.bottom + 8
    } );

    // Function builder
    var builderNode = new BuilderNode( scene.builder );

    // Reset All button at bottom-right
    var resetAllButton = new ResetAllButton( {
      right: layoutBounds.maxX - 20,
      bottom: layoutBounds.maxY - 20,
      listener: function() {
        scene.reset();
        functionsCarousel.reset();
      }
    } );

    return new Node( {
      children: [ functionsCarousel, functionsPageControl, builderNode, resetAllButton, functionsParentNode ]
    } );
  }

  functionBuilder.register( 'testFunctionInteractions', testFunctionInteractions );

  return testFunctionInteractions;
} );
