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

    var functionsCarousel = new FunctionsCarousel( functionConstructors, functionsParentNode, {
      centerX: layoutBounds.centerX,
      bottom: layoutBounds.bottom - 25
    } );

    var functionsPageControl = new PageControl( functionsCarousel.numberOfPages, functionsCarousel.pageNumberProperty, {
      orientation: 'horizontal',
      centerX: functionsCarousel.centerX,
      top: functionsCarousel.bottom + 8
    } );

    var builder = new Builder();

    var builderNode = new BuilderNode( builder );

    return new Node( {
      children: [ functionsCarousel, functionsPageControl, builderNode, functionsParentNode ]
    } );
  }

  functionBuilder.register( 'testFunctionInteractions', testFunctionInteractions );

  //--------------------------------------------------------------------------------------------------------------------

  //TODO Carousel subtype needed because items require a reference to the carousel for scrolling. Is this feature desirable? Can this reference be eliminated?
  /**
   * Carousel for functions.
   *
   * @param {function} functionConstructors - constructors of type {AbstractFunction}
   * @param {Node} functionsParentNode
   * @param {Object} [options]
   * @constructor
   */
  function FunctionsCarousel( functionConstructors, functionsParentNode, options ) {

    options = _.extend( {
      orientation: 'horizontal',
      itemsPerPage: 3
    }, options );

    var functionCarouselItems = []; // {FunctionCreatorNode[]}
    for ( var i = 0; i < functionConstructors.length; i++ ) {
      functionCarouselItems.push( FunctionsCarousel.createItem( functionConstructors[ i ], this, functionsParentNode ) );
    }

    Carousel.call( this, functionCarouselItems, options );
  }

  functionBuilder.register( 'testFunctionInteractions.FunctionsCarousel', FunctionsCarousel );

  inherit( Carousel, FunctionsCarousel, {}, {

    //TODO too much reliance on closure vars in this function, difficult to grok, difficult to modify
    /**
     * Creates an item for the function carousel.
     *
     * @param {function} AbstractFunctionConstructor - constructor for an {AbstractFunction}
     * @param {Carousel} carousel
     * @param {Node} functionsParentNode - parent for all function nodes that are created
     * @param {Object} [options]
     * @returns {FunctionCreatorNode}
     * @private
     * @static
     */
    createItem: function( AbstractFunctionConstructor, carousel, functionsParentNode, options ) {

      options = _.extend( {
        maxInstances: 2
      }, options );

      var functionCreatorNode = new FunctionCreatorNode( AbstractFunctionConstructor, options );

      //TODO determine whether function goes into the builder or is returned to carousel
      var adjustFunctionLocation = function( functionInstance, event, trail ) {
        carousel.scrollToItem( functionCreatorNode );
        functionInstance.locationProperty.reset();
      };

      /**
       * Called when a function instance is created.
       * Creates an associated node and wires it into the sim.
       * @param {AbstractFunction} functionInstance
       */
      var functionInstanceCreatedListener = function( functionInstance ) {

        assert && assert( functionInstance, 'does the associated Emitter has the same number of args?' );

        // create an associated node
        var functionNode = new MovableFunctionNode( functionInstance, {
          endDrag: adjustFunctionLocation
        } );
        functionsParentNode.addChild( functionNode );

        // If the function node overlaps the carousel, scroll the carousel so that the function is visible.
        var boundsListener = function() {

          var globalFunctionNodeBounds = functionNode.parentToGlobalBounds( functionNode.bounds );
          var globalCarouselBounds = carousel.parentToGlobalBounds( carousel.bounds );
          var overlap = globalFunctionNodeBounds.intersectsBounds( globalCarouselBounds );

          if ( overlap ) {
            carousel.scrollToItem( functionCreatorNode );
          }
        };
        functionNode.on( 'bounds', boundsListener );

        // when dispose is called for the function instance, remove the associated node
        functionInstance.disposeCalledEmitter.addListener( function() {
          functionNode.off( 'bounds', boundsListener );
          functionNode.dispose();
          functionsParentNode.removeChild( functionNode );
        } );
      };

      functionCreatorNode.functionInstanceCreated.addListener( functionInstanceCreatedListener );

      return functionCreatorNode;
    }
  } );

  //--------------------------------------------------------------------------------------------------------------------

  //TODO function can be dropped only into an available slot in builder, otherwise returns to carousel

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
    assert && assert( totalWidthOfSlots > 0 );

    // create and populate slots
    var leftSlotLocation = new Vector2( this.location.x + ( this.width - totalWidthOfSlots + FBConstants.FUNCTION_WIDTH ) / 2, this.location.y );
    for ( var i = 0; i < this.numberOfFunctions; i++ ) {

      //TODO does not account for overlap of slot shapes
      // slot
      this.slotLocations.push( leftSlotLocation.plusXY( i * FBConstants.FUNCTION_WIDTH, 0 ) );

      // function in the slot
      this.functionProperties.push( new Property( null ) );
    }
  }

  functionBuilder.register( 'testFunctionInteractions.Builder', Builder );

  inherit( Object, Builder );

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

    var backgroundNode = new Rectangle( 0, -builder.height/2, builder.width, builder.height, {
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
