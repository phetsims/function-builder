// Copyright 2015, University of Colorado Boulder

/**
 * Test for user interactions with functions, dragging between carousel and builder.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Carousel = require( 'SUN/Carousel' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionCreatorNode = require( 'FUNCTION_BUILDER/common/view/FunctionCreatorNode' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableFunctionNode = require( 'FUNCTION_BUILDER/common/view/MovableFunctionNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PageControl = require( 'SUN/PageControl' );
  var PlaceholderFunction = require( 'FUNCTION_BUILDER/common/model/PlaceholderFunction' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var Vector2 = require( 'DOT/Vector2' );

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
        // If the function isn't added to the builder, then return it to the carousel.
        endDrag: function( functionInstance, functionCreatorNode, event, trail ) {
          var slotNumber = model.builder.addFunctionInstance( functionInstance ); //TODO closure var: model
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

          // If the function isn't added to the builder, then return it to the carousel.
          endDrag: function( functionInstance, event, trail ) {
            var slotNumber = localModel.builder.addFunctionInstance( functionInstance );
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
      //TODO dispose of function instances
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

  /**
   * Simplified builder for this test.
   * @param {Object} [options]
   * @constructor
   */
  function Builder( options ) {

    options = _.extend( {
      numberOfFunctions: 3, // {number} maximum number of functions in the pipeline
      width: 400, // {number} distance between input and output slot
      height: 88, // {number} height of tallest part of the builder
      location: new Vector2( 312, 240 ) // {Vector2} left center (input slot)
    }, options );

    // @public (read-only)
    this.numberOfFunctions = options.numberOfFunctions;
    this.width = options.width;
    this.height = options.height;
    this.location = options.location;

    // @public A {Property.<AbstractFunction|null>} for each slot in the builder. Null indicates that the slot is unoccupied.
    this.functionInstancesProperties = [];

    // @public (read-only) center of each slot in the builder. 1:1 index correspondence with functionInstancesProperties.
    this.slotLocations = [];

    // width occupied by slots
    var totalWidthOfSlots = this.numberOfFunctions * FBConstants.FUNCTION_WIDTH;
    if ( this.numberOfFunctions > 1 ) {
      totalWidthOfSlots -= ( ( this.numberOfFunctions - 1 ) * FBConstants.FUNCTION_X_INSET_FACTOR * FBConstants.FUNCTION_WIDTH );
    }
    assert && assert( totalWidthOfSlots > 0 );

    // create and populate slots
    var leftSlotLocation = new Vector2( this.location.x + ( this.width - totalWidthOfSlots + FBConstants.FUNCTION_WIDTH ) / 2, this.location.y );
    for ( var i = 0; i < this.numberOfFunctions; i++ ) {

      // slot, location is at its center
      this.slotLocations.push( leftSlotLocation.plusXY(
        i * FBConstants.FUNCTION_WIDTH - i * FBConstants.FUNCTION_X_INSET_FACTOR * FBConstants.FUNCTION_WIDTH, 0 ) );

      // function in the slot
      this.functionInstancesProperties.push( new Property( null ) );
    }
    assert && assert( this.slotLocations.length === this.functionInstancesProperties.length );
  }

  functionBuilder.register( 'testFunctionInteractions.Builder', Builder );

  inherit( Object, Builder, {

    // @public
    reset: function() {
      this.functionInstancesProperties.forEach( function( functionInstance ) {
        functionInstance.reset();
      } );
    },

    /**
     * Does the builder contain the specified function instance?
     *
     * @param {AbstractFunction} functionInstance
     * @returns {boolean}
     * @public
     */
    containsFunctionInstance: function( functionInstance ) {
      var found = false;
      for ( var i = 0; i < this.functionInstancesProperties.length && !found; i++ ) {
        found = ( this.functionInstancesProperties[ i ].get() === functionInstance );
      }
      return found;
    },

    /**
     * Adds a function instance, if it's close enough to an empty slot.
     *
     * @param {AbstractFunction} functionInstance
     * @returns {number} slot number it was added to, -1 if not added
     * @public
     */
    addFunctionInstance: function( functionInstance ) {
      var DISTANCE_THRESHOLD = 100; //TODO should this be computed? move elsewhere?
      var slotNumber = this.getClosestEmptySlot( functionInstance.locationProperty.get(), DISTANCE_THRESHOLD );
      if ( slotNumber !== -1 ) {
        this.functionInstancesProperties[ slotNumber ].set( functionInstance );
        functionInstance.locationProperty.set( this.slotLocations[ slotNumber ] );
      }
      return slotNumber;
    },

    /**
     * Removes a function instance.
     *
     * @param {AbstractFunction} functionInstance
     * @public
     */
    removeFunctionInstance: function( functionInstance ) {
      var removed = false;
      for ( var i = 0; i < this.functionInstancesProperties.length && !removed; i++ ) {
        if ( this.functionInstancesProperties[ i ].get() === functionInstance ) {
          this.functionInstancesProperties[ i ].set( null );
          removed = true;
        }
      }
      assert && assert( removed );
    },

    /**
     * Gets the empty slot that is closest to the specified location.
     *
     * @param {Vector2} location - the location of the function instance
     * @param {number} distanceThreshold - must be at least this close
     * @returns {number} slot number, -1 if no slot
     * @private
     */
    getClosestEmptySlot: function( location, distanceThreshold ) {
      var slotNumber = -1;
      for ( var i = 0; i < this.slotLocations.length; i++ ) {
        if ( this.functionInstancesProperties[ i ].get() === null ) {
          if ( slotNumber === -1 ) {
            if ( this.slotLocations[ i ].distance( location ) < distanceThreshold ) {
              slotNumber = i;
            }
          }
          else if ( this.slotLocations[ i ].distance( location ) < this.slotLocations[ slotNumber ].distance( location ) ) {
            slotNumber = i;
          }
        }
      }
      return slotNumber;
    }
  } );

  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Simplified builder node for this test
   * @param {Builder} builder
   * @param {Object} options
   * @constructor
   */
  function BuilderNode( builder, options ) {

    options = _.extend( {
      functionLineWidth: 1
    }, options );

    options.left = builder.location.x;
    options.centerY = builder.location.y;

    var backgroundNode = new Rectangle( 0, -builder.height / 2, builder.width, builder.height, {
      fill: 'rgb( 130, 62, 85 )',
      stroke: 'black'
    } );

    // slots
    var slotNodes = [];
    for ( var i = 0; i < builder.slotLocations.length; i++ ) {
      slotNodes.push( new FunctionNode( new PlaceholderFunction(), {
        centerX: builder.slotLocations[ i ].x - builder.location.x,
        centerY: 0
      } ) );
    }

    var slotsParent = new Node( {
      children: slotNodes
    } );

    options.children = [ backgroundNode, slotsParent ];
    Node.call( this, options );
  }

  functionBuilder.register( 'testFunctionInteractions.BuilderNode', BuilderNode );

  inherit( Node, BuilderNode );

  //--------------------------------------------------------------------------------------------------------------------

  return testFunctionInteractions;
} );
