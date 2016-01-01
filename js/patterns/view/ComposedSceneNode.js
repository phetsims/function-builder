// Copyright 2015, University of Colorado Boulder

/**
 * The 'composed' scene in the 'Patterns' screen.
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

  /**
   * @param {PatternsScene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   * @constructor
   */
  function ComposedSceneNode( scene, layoutBounds, options ) {

    // Input cards, in a vertical carousel at left-center
    var inputNodes = [];
    scene.inputCards.forEach( function( card ) {
      inputNodes.push( new CardNode( card ) );
    } );
    var inputsCarousel = new Carousel( inputNodes, {
      orientation: 'vertical',
      separatorsVisible: true,
      itemsPerPage: INPUTS_PER_PAGE,
      left: layoutBounds.left + 50,
      top: layoutBounds.top + 50
    } );

    //TODO create an output carousel for each builder
    // Output cards, in a vertical carousel at right-center
    var outputNodes = [];
    scene.inputCards.forEach( function( card ) {
      outputNodes.push( new CardNode( card ) );
    } );
    var outputsCarousel = new Carousel( outputNodes, {
      orientation: 'vertical',
      separatorsVisible: true,
      itemsPerPage: INPUTS_PER_PAGE,
      right: layoutBounds.right - ( inputsCarousel.left - layoutBounds.left ),
      top: inputsCarousel.top
    } );

    // Eraser button, centered below the output carousel
    var eraserButton = new EraserButton( {
      iconWidth: 28,
      centerX: outputsCarousel.centerX,
      top: outputsCarousel.bottom + 30
    } );

    // parent node for all function nodes
    var functionsParentNode = new Node();

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
          assert && assert( removed, 'functionInstance was not removed' );
        },

        // When done dragging the function ...
        endDrag: functionEndDrag
      } );
      functionsParentNode.addChild( functionNode );

      // when dispose is called for the function instance, remove the associated Node
      functionInstance.disposeCalledEmitter.addListener( function() {
        scene.removeFunctionInstance( functionInstance );
        functionNode.dispose();
        functionsParentNode.removeChild( functionNode );
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

    // Functions, in a horizontal carousel at bottom-center
    var functionsCarousel = new Carousel( functionCarouselItems, {
      orientation: 'horizontal',
      itemsPerPage: 3,
      centerX: layoutBounds.centerX,
      bottom: layoutBounds.bottom - 25
    } );

    // Page controls for each carousel
    var inputsPageControl = new PageControl( inputsCarousel.numberOfPages, inputsCarousel.pageNumberProperty, {
      orientation: 'vertical',
      right: inputsCarousel.left - PAGE_CONTROL_SPACING,
      centerY: inputsCarousel.centerY
    } );
    //TODO create a page control for each output carousel
    var outputsPageControl = new PageControl( outputsCarousel.numberOfPages, outputsCarousel.pageNumberProperty, {
      orientation: 'vertical',
      left: outputsCarousel.right + PAGE_CONTROL_SPACING,
      centerY: outputsCarousel.centerY
    } );
    var functionsPageControl = new PageControl( functionsCarousel.numberOfPages, functionsCarousel.pageNumberProperty, {
      orientation: 'horizontal',
      centerX: functionsCarousel.centerX,
      top: functionsCarousel.bottom + PAGE_CONTROL_SPACING
    } );

    // Link input and output carousels, so that they display the same page number
    assert && assert( inputsCarousel.numberOfPages === outputsCarousel.numberOfPages );
    inputsCarousel.pageNumberProperty.link( function( pageNumber ) {
      outputsCarousel.pageNumberProperty.set( pageNumber );
    } );
    //TODO link all output carousels
    outputsCarousel.pageNumberProperty.link( function( pageNumber ) {
      inputsCarousel.pageNumberProperty.set( pageNumber );
    } );

    // Function builder
    var builderNodes = [];
    scene.builders.forEach( function( builder ) {
      builderNodes.push( new BuilderNode( builder, {

        //TODO different colors for each builder
        // colors matched to design document
        bodyTopColor: 'rgb( 168, 198, 216 )',
        bodyMiddleColor: 'rgb( 6, 114, 180 )',
        bodyBottomColor: 'rgb( 2, 46, 71 )',
        endColor: 'rgb( 189, 206, 216 )'
      } ) );
    } );

    // Spy Glass check box, to the right of functions carousel
    var spyGlassVisibleProperty = new Property( false ); // @private
    var spyGlassCheckBox = new SpyGlassCheckBox( spyGlassVisibleProperty, {
      maxWidth: 0.85 * ( functionsCarousel.left - inputsCarousel.left ),
      left: inputsCarousel.left,
      top: functionsCarousel.top
    } );
    spyGlassVisibleProperty.link( function( visible ) {
      //TODO make spy glasses visible in the builder
    } );

    // @private Resets this node
    this.resetComposedSceneNode = function() {
      inputsCarousel.reset();
      functionsCarousel.reset();
      outputsCarousel.reset();
      spyGlassVisibleProperty.reset();
    };

    options.children = [];
    options.children = options.children.concat( builderNodes );
    options.children = options.children.concat( [
      inputsCarousel, outputsCarousel, functionsCarousel,
      inputsPageControl, outputsPageControl, functionsPageControl,
      eraserButton, spyGlassCheckBox,
      functionsParentNode
    ] );

    Node.call( this, options );

    //TODO temporary, to demonstrate what happens as slots in the builder are populated
    {
      //TODO generalize for N builders
      assert && assert( scene.builders.length === 1 );

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

  functionBuilder.register( 'ComposedSceneNode', ComposedSceneNode );

  return inherit( Node, ComposedSceneNode, {

    // @public
    reset: function() { this.resetComposedSceneNode(); }
  } );
} );
