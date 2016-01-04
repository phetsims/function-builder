// Copyright 2015, University of Colorado Boulder

/**
 * Composite node that contains all of the nodes that make up a 'scene' in the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var BuilderNode = require( 'FUNCTION_BUILDER/common/view/BuilderNode' );
  var Card = require( 'FUNCTION_BUILDER/common/model/Card' );
  var CardNode = require( 'FUNCTION_BUILDER/common/view/CardNode' );
  var Carousel = require( 'SUN/Carousel' );
  var EraserButton = require( 'SCENERY_PHET/buttons/EraserButton' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionCreatorNode = require( 'FUNCTION_BUILDER/common/view/FunctionCreatorNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableFunctionNode = require( 'FUNCTION_BUILDER/common/view/MovableFunctionNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PageControl = require( 'SUN/PageControl' );
  var Property = require( 'AXON/Property' );
  var SpyGlassCheckBox = require( 'FUNCTION_BUILDER/common/view/SpyGlassCheckBox' );

  // constants
  var INPUTS_PER_PAGE = 4;
  var PAGE_CONTROL_SPACING = 8;
  var OUTPUT_CAROUSELS_SPACING = 15;

  /**
   * @param {PatternsScene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   * @constructor
   */
  function PatternsSceneNode( scene, layoutBounds, options ) {

    // Builders
    var builderNodes = [];
    scene.builders.forEach( function( builder ) {
      builderNodes.push( new BuilderNode( builder ) );
    } );

    // Input cards, in a vertical carousel at left-center
    var inputNodes = [];
    scene.inputCards.forEach( function( card ) {
      inputNodes.push( new CardNode( card ) );
    } );
    var inputCarousel = new Carousel( inputNodes, {
      orientation: 'vertical',
      separatorsVisible: true,
      itemsPerPage: INPUTS_PER_PAGE,
      left: layoutBounds.left + 50,
      top: layoutBounds.top + 50
    } );

    // Create a vertical output carousel for each builder, at right-center
    var outputCarousels = [];
    for ( var j = 0; j < scene.builders.length; j++ ) {

      var outputNodes = [];
      scene.inputCards.forEach( function( card ) {
        outputNodes.push( new CardNode( card ) );
      } );

      var outputCarousel = new Carousel( outputNodes, {
        orientation: 'vertical',
        separatorsVisible: true,
        itemsPerPage: INPUTS_PER_PAGE,
        left: ( j === 0 ) ? 0 : outputCarousels[ j - 1 ].right + OUTPUT_CAROUSELS_SPACING,
        top: inputCarousel.top
      } );

      outputCarousels.push( outputCarousel );
    }

    var outputCarouselsParent = new Node( {
      children: outputCarousels,
      right: layoutBounds.right - ( inputCarousel.left - layoutBounds.left ),
      top: inputCarousel.top
    } );

    // Eraser button, centered below the output carousels
    var eraserButton = new EraserButton( {
      iconWidth: 28,
      centerX: outputCarouselsParent.centerX,
      top: outputCarouselsParent.bottom + 30
    } );

    // parent node for all nodes that are dynamically created
    var dynamicParent = new Node();

    /**
     * When the user stops dragging a function, decide whether to put it in the builder
     * or return it to the functions carousel.
     *
     * @param {AbstractFunction} functionInstance
     * @param {Event} event
     * @param {Trail} trail
     */
    var functionEndDrag = function( functionInstance, event, trail ) {

      assert && assert( functionInstance.creator, 'missing functionInstance.creator' );

      // try to add function to a builder
      var slotNumber = -1;
      for ( var i = 0; i < scene.builders.length && slotNumber === -1; i++ ) {
        slotNumber = scene.builders[ i ].addFunctionInstance( functionInstance );
      }

      // If the function isn't added to a builder, then return it to the carousel.
      if ( slotNumber === -1 ) {
        functionsCarousel.scrollToItem( functionInstance.creator );
        functionInstance.locationProperty.reset();
      }
    };

    /**
     * When a function instance is created, add it to the model and view.
     *
     * @param {AbstractFunction} functionInstance - the instance that was created
     */
    var functionCreatedListener = function( functionInstance ) {

      assert && assert( arguments.length === 1, 'does the associated Emitter call emit1?' );

      // add functionInstance to model
      scene.addFunctionInstance( functionInstance );

      // create a Node for the function instance
      var functionNode = new MovableFunctionNode( functionInstance, {

        // If the function is in a builder, remove it.
        startDrag: function( functionInstance, event, trail ) {
          var removed = false;
          for ( var i = 0; i < scene.builders.length && !removed; i++ ) {
            if ( scene.builders[ i ].containsFunctionInstance( functionInstance ) ) {
              scene.builders[ i ].removeFunctionInstance( functionInstance );
              removed = true;
            }
          }
        },

        // When done dragging the function ...
        endDrag: functionEndDrag
      } );
      dynamicParent.addChild( functionNode );

      // when dispose is called for the function instance, remove the associated Node
      functionInstance.disposeCalledEmitter.addListener( function() {
        scene.removeFunctionInstance( functionInstance );
        functionNode.dispose();
        dynamicParent.removeChild( functionNode );
      } );
    };

    // Items in the functions carousel
    var functionCarouselItems = []; // {FunctionCreatorNode[]}
    for ( var i = 0; i < scene.functionConstructors.length; i++ ) {

      var functionCreatorNode = new FunctionCreatorNode( scene.functionConstructors[ i ], {

        // max number of instances of each function type
        maxInstances: 2,

        // When done dragging the newly-created function ...
        endDrag: functionEndDrag
      } );

      functionCreatorNode.functionCreatedEmitter.addListener( functionCreatedListener );
      functionCarouselItems.push( functionCreatorNode );
    }

    // Functions, in a horizontal carousel, centered below bottom builder
    var functionsCarousel = new Carousel( functionCarouselItems, {
      orientation: 'horizontal',
      itemsPerPage: 3,
      centerX: builderNodes[ builderNodes.length - 1 ].centerX,
      bottom: layoutBounds.bottom - 25
    } );

    // Page controls for carousels
    var inputsPageControl = new PageControl( inputCarousel.numberOfPages, inputCarousel.pageNumberProperty, {
      orientation: 'vertical',
      right: inputCarousel.left - PAGE_CONTROL_SPACING,
      centerY: inputCarousel.centerY
    } );
    var outputsPageControl = new PageControl( outputCarousels[ 0 ].numberOfPages, outputCarousels[ 0 ].pageNumberProperty, {
      orientation: 'vertical',
      left: outputCarouselsParent.right + PAGE_CONTROL_SPACING,
      centerY: outputCarouselsParent.centerY
    } );
    var functionsPageControl = new PageControl( functionsCarousel.numberOfPages, functionsCarousel.pageNumberProperty, {
      orientation: 'horizontal',
      centerX: functionsCarousel.centerX,
      top: functionsCarousel.bottom + PAGE_CONTROL_SPACING
    } );

    // Link input carousel to all output carousels, so that they display the same page number
    assert && assert( inputCarousel.numberOfPages === outputCarousels[ 0 ].numberOfPages );
    inputCarousel.pageNumberProperty.link( function( pageNumber ) {
      outputCarousels.forEach( function( outputCarousel ) {
        outputCarousel.pageNumberProperty.set( pageNumber );
      } );
    } );

    // Link all output carousels to input carousel
    outputCarousels.forEach( function( outputCarousel ) {
      outputCarousel.pageNumberProperty.link( function( pageNumber ) {
        inputCarousel.pageNumberProperty.set( pageNumber );
      } );
    } );

    // parent for all static nodes (created once, rendering order remains the same)
    var staticChildren = [];
    staticChildren = staticChildren.concat( builderNodes );
    staticChildren = staticChildren.concat( [
      inputCarousel, outputCarouselsParent, functionsCarousel,
      inputsPageControl, outputsPageControl, functionsPageControl,
      eraserButton
    ] );
    var staticParent = new Node( { children: staticChildren } );

    options.children = [ staticParent, dynamicParent ];

    Node.call( this, options );

    // Spy Glass check box, to the right of functions carousel
    var spyGlassVisibleProperty = new Property( false ); // @private
    if ( scene.builders[ 0 ].slots.length > 1 ) { //TODO this is a little brittle
      var spyGlassCheckBox = new SpyGlassCheckBox( spyGlassVisibleProperty, {
        maxWidth: 0.85 * ( functionsCarousel.left - inputCarousel.left ),
        left: inputCarousel.left,
        top: functionsCarousel.top
      } );
      spyGlassVisibleProperty.link( function( visible ) {
        //TODO make spy glasses visible in the builder
      } );
      staticParent.addChild( spyGlassCheckBox );
    }

    // @private Resets this node
    this.resetPatternsSceneNode = function() {
      functionsCarousel.reset();
      inputCarousel.reset();
      outputCarousels.forEach( function( outputCarousel ) {
        outputCarousel.reset();
      } );
      spyGlassVisibleProperty.reset();
    };

    //TODO temporary, to demonstrate what happens as slots in the builder are populated
    {
      //TODO generalize for N builders
      // When any function changes, update all output cards.
      var functionInstancePropertyObserver = function() {
        for ( var i = 0; i < scene.inputCards.length; i++ ) {
          var card = scene.inputCards[ i ];
          for ( var j = 0; j < scene.builders[ 0 ].slots.length; j++ ) {
            var functionInstance = scene.builders[ 0 ].slots[ j ].functionInstanceProperty.get();
            if ( functionInstance ) {
              var outputName = card.name + '.' + functionInstance.name;
              var outputCanvas = functionInstance.apply( card.canvas );
              card = new Card( outputName, outputCanvas );
            }
          }
          outputNodes[ i ].setCard( card );
        }
      };
      scene.builders[ 0 ].slots.forEach( function( slot ) {
        slot.functionInstanceProperty.link( functionInstancePropertyObserver );
      } );
    }
  }

  functionBuilder.register( 'PatternsSceneNode', PatternsSceneNode );

  return inherit( Node, PatternsSceneNode, {

    // @public
    reset: function() {
      this.resetPatternsSceneNode();
    }
  } );
} );
