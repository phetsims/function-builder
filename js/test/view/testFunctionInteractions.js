// Copyright 2015, University of Colorado Boulder

/**
 * Test for user interactions with functions, dragging between carousel and builder.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Builder = require( 'FUNCTION_BUILDER/common/model/Builder' );
  var BuilderNode = require( 'FUNCTION_BUILDER/common/view/BuilderNode' );
  var Carousel = require( 'SUN/Carousel' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionCreatorNode = require( 'FUNCTION_BUILDER/common/view/FunctionCreatorNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableFunctionNode = require( 'FUNCTION_BUILDER/common/view/MovableFunctionNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PageControl = require( 'SUN/PageControl' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );

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

  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Public interface for this test.
   * @param {Bounds2} layoutBounds
   */
  function testFunctionInteractions( layoutBounds ) {

    var model = new TestModel();

    // parent node for all function nodes
    var functionsParentNode = new Node();

    var functionCarouselItems = []; // {FunctionCreatorNode[]}
    for ( var i = 0; i < model.functionConstructors.length; i++ ) {
      functionCarouselItems.push( new FunctionCreatorNode( model.functionConstructors[ i ], {

        // max number of instances of each function type
        maxInstances: 2,

        //TODO this is almost identical to options.endDrag for MovableFunctionNode, factor out?
        // When done dragging the newly-created function ...
        endDrag: function( functionInstance, functionCreatorNode, event, trail ) {

          // try to add function to builder
          var slotNumber = model.builder.addFunctionInstance( functionInstance ); //TODO closure var: model

          // If the function isn't added to the builder, then return it to the carousel.
          if ( slotNumber === -1 ) {
            functionsCarousel.scrollToItem( functionCreatorNode ); //TODO closure var: functionsCarousel
            functionInstance.locationProperty.reset();
          }
        }
      } ) );
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

    var builderNode = new BuilderNode( model.builder );

    wireUpCarouselAndBuilder( functionsCarousel, functionCarouselItems, functionsParentNode, model );

    // Reset All button at bottom-right
    var resetAllButton = new ResetAllButton( {
      right: layoutBounds.maxX - 20,
      bottom: layoutBounds.maxY - 20,
      listener: function() {
        model.reset();
        functionsCarousel.reset();
      }
    } );

    return new Node( {
      children: [ functionsCarousel, functionsPageControl, builderNode, resetAllButton, functionsParentNode ]
    } );
  }

  functionBuilder.register( 'testFunctionInteractions', testFunctionInteractions );

  //--------------------------------------------------------------------------------------------------------------------

  //TODO what's the proper abstraction to wrap this in?
  function wireUpCarouselAndBuilder( carousel, functionCreatorNodes, functionsParentNode, model ) {

    /**
     * Called when a function instance is created.
     * Creates an associated node and wires it into the sim.
     *
     * @param {AbstractFunction} functionInstance - the instance that was created
     * @param {FunctionCreatorNode} functionCreatorNode - the node that created the instance
     */
    var functionCreatedListener = function( functionInstance, functionCreatorNode ) {

      assert && assert( functionCreatorNode && functionInstance, 'does the associated Emitter call emit2?' );

      // IIFE
      (function() {

        //TODO are all of these needed? better way to do this?
        // closure vars
        var localModel = model;
        var localFunctionInstance = functionInstance;
        var localFunctionCreatorNode = functionCreatorNode;
        var localFunctionsParentNode = functionsParentNode;
        var localFunctionNode = null; // instantiated below

        // add functionInstance to model
        localModel.addFunctionInstance( localFunctionInstance );

        // create a Node for the function instance
        localFunctionNode = new MovableFunctionNode( localFunctionInstance, {

          // If the function is in the builder, remove it.
          startDrag: function( functionInstance, event, trail ) {
            if ( localModel.builder.containsFunctionInstance( functionInstance ) ) {
              localModel.builder.removeFunctionInstance( functionInstance );
            }
          },

          // When done dragging the function ...
          endDrag: function( functionInstance, event, trail ) {

            // Try to add the function to the builder.
            var slotNumber = localModel.builder.addFunctionInstance( functionInstance );

            // If the function isn't added to the builder, then return it to the carousel.
            if ( slotNumber === -1 ) {
              carousel.scrollToItem( localFunctionCreatorNode );
              functionInstance.locationProperty.reset();
            }
          }
        } );
        localFunctionsParentNode.addChild( localFunctionNode );

        // when dispose is called for the function instance, remove the associated Node
        localFunctionInstance.disposeCalledEmitter.addListener( function() {
          localModel.removeFunctionInstance( localFunctionInstance );
          localFunctionNode.dispose();
          localFunctionsParentNode.removeChild( localFunctionNode );
        } );
      })();
    };

    functionCreatorNodes.forEach( function( functionCreatorNode ) {
      functionCreatorNode.functionCreatedEmitter.addListener( functionCreatedListener );
    } );
  }

  //--------------------------------------------------------------------------------------------------------------------

  /**
   * @constructor
   */
  function TestModel() {

    // @public (read-only) constructors for the types of functions that will appear in the carousel
    this.functionConstructors = [
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

    // @public (read-only)
    this.builder = new Builder();

    // @private
    this.functionInstances = [];
  }

  functionBuilder.register( 'testFunctionInteractions.TestModel', TestModel );

  inherit( Object, TestModel, {

    // @public
    reset: function() {

      this.builder.reset();

      // dispose of all function instances, operate on a copy of the array
      this.functionInstances.slice( 0 ).forEach( function( functionInstance ) {
        functionInstance.dispose();
      } );
      this.functionInstances.length = 0;
    },

    /**
     * Adds a function instance to the model.
     * @param {AbstractFunction} functionInstance
     */
    addFunctionInstance: function( functionInstance ) {
      assert && assert( this.functionInstances.indexOf( functionInstance ) === -1, 'attempted to add functionInstance twice' );
      this.functionInstances.push( functionInstance );
    },

    /**
     * Removes a function instance from the model.
     * @param {AbstractFunction} functionInstance
     */
    removeFunctionInstance: function( functionInstance ) {
      var index = this.functionInstances.indexOf( functionInstance );
      assert && assert( index !== -1, 'attempted to remove unknown functionInstance' );
      this.functionInstances.splice( index, 1 );
    }
  } );

  //--------------------------------------------------------------------------------------------------------------------

  return testFunctionInteractions;
} );
