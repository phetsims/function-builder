// Copyright 2015, University of Colorado Boulder

//TODO model-view transform? currently implicit and 1:1

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

    // model ----------------------------------------------------------------------

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

    var builder = new Builder();

    //TODO how to 'Reset All'?

    // view ----------------------------------------------------------------------

    // parent node for all function nodes
    var functionsParentNode = new Node();

    var functionCarouselItems = []; // {FunctionCreatorNode[]}
    for ( var i = 0; i < functionConstructors.length; i++ ) {
      functionCarouselItems.push( new FunctionCreatorNode( functionConstructors[ i ], {

        // max number of instances of each function type
        maxInstances: 2,

        //TODO this is almost identical to options.endDrag for MovableFunctionNode, factor out?
        // If the function isn't added to the builder, then return it to the carousel.
        endDrag: function( functionInstance, functionCreatorNode, event, trail ) {
          var slotNumber = builder.addFunction( functionInstance );
          if ( slotNumber === -1 ) {
            functionsCarousel.scrollToItem( functionCreatorNode );
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

    var builderNode = new BuilderNode( builder );

    wireUpCarouselAndBuilder( functionsCarousel, functionCarouselItems, functionsParentNode, builder );

    return new Node( {
      children: [ functionsCarousel, functionsPageControl, builderNode, functionsParentNode ]
    } );
  }

  functionBuilder.register( 'testFunctionInteractions', testFunctionInteractions );

  //--------------------------------------------------------------------------------------------------------------------

  //TODO what's the proper abstraction to wrap this in?
  function wireUpCarouselAndBuilder( carousel, functionCreatorNodes, functionsParentNode, builder ) {

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

        // closure vars
        var localFunctionInstance = functionInstance;
        var localFunctionCreatorNode = functionCreatorNode;
        var localBuilder = builder;
        var localFunctionsParentNode = functionsParentNode;
        var localFunctionNode = null; // instantiated below

        // create a node of the function instance
        localFunctionNode = new MovableFunctionNode( localFunctionInstance, {

          // If the function is in the builder, remove it.
          startDrag: function( functionInstance, event, trail ) {
            if ( localBuilder.containsFunction( functionInstance ) ) {
              localBuilder.removeFunction( functionInstance );
            }
          },

          // If the function isn't added to the builder, then return it to the carousel.
          endDrag: function( functionInstance, event, trail ) {
            var slotNumber = localBuilder.addFunction( functionInstance );
            if ( slotNumber === -1 ) {
              carousel.scrollToItem( localFunctionCreatorNode );
              functionInstance.locationProperty.reset();
            }
          }
        } );
        localFunctionsParentNode.addChild( localFunctionNode );

        // when dispose is called for the function instance, remove the associated node
        localFunctionInstance.disposeCalledEmitter.addListener( function() {
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

    // @public (read-only) center of each slot in the builder
    this.slotLocations = [];

    // @public A {Property.<AbstractFunction|null>} for each slot in the builder. Null indicates that the slot is unoccupied.
    this.functionProperties = [];

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
      this.functionProperties.push( new Property( null ) );
    }
    assert && assert( this.slotLocations.length === this.functionProperties.length );
  }

  functionBuilder.register( 'testFunctionInteractions.Builder', Builder );

  inherit( Object, Builder, {

    /**
     * Does the builder container the specified function instance?
     *
     * @param {AbstractFunction} functionInstance
     * @returns {boolean}
     * @public
     */
    containsFunction: function( functionInstance ) {
      var found = false;
      for ( var i = 0; i < this.functionProperties.length && !found; i++ ) {
        found = ( this.functionProperties[ i ].get() === functionInstance );
      }
      return found;
    },

    /**
     * Adds a function to a slot in the builder, if it's close enough to an empty slot.
     *
     * @param {AbstractFunction} functionInstance
     * @returns {number} slot number it was added to, -1 if not added
     * @public
     */
    addFunction: function( functionInstance ) {
      var DISTANCE_THRESHOLD = 100; //TODO this should be computed, or moved elsewhere
      var slotNumber = this.getClosestEmptySlot( functionInstance.locationProperty.get(), DISTANCE_THRESHOLD );
      if ( slotNumber !== -1 ) {
        this.functionProperties[ slotNumber ].set( functionInstance );
        functionInstance.locationProperty.set( this.slotLocations[ slotNumber ] );
      }
      return slotNumber;
    },

    /**
     * Removes a specified function instance from the builder.
     *
     * @param {AbstractFunction} functionInstance
     * @returns {boolean} true if removed, false if not removed
     * @public
     */
    removeFunction: function( functionInstance ) {
      var removed = false;
      for ( var i = 0; i < this.functionProperties.length && !removed; i++ ) {
        if ( this.functionProperties[ i ].get() === functionInstance ) {
          this.functionProperties[ i ].set( null );
          removed = true;
        }
      }
      return removed;
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
        if ( this.functionProperties[ i ].get() === null ) {
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
