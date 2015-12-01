// Copyright 2015, University of Colorado Boulder

/**
 * The 'composed' scene in the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var BuilderNode = require( 'FUNCTION_BUILDER/common/view/BuilderNode' );
  var Card = require( 'FUNCTION_BUILDER/common/model/Card' );
  var CardNode = require( 'FUNCTION_BUILDER/common/view/CardNode' );
  var Carousel = require( 'SUN/Carousel' );
  var DownUpListener = require( 'SCENERY/input/DownUpListener' );
  var EraserButton = require( 'SCENERY_PHET/buttons/EraserButton' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PageControl = require( 'SUN/PageControl' );
  var Property = require( 'AXON/Property' );
  var SpyGlassCheckBox = require( 'FUNCTION_BUILDER/common/view/SpyGlassCheckBox' );

  // constants
  var FUNCTION_PER_PAGE = 3;
  var INPUTS_PER_PAGE = 4;
  var PAGE_CONTROL_SPACING = 8;

  /**
   * @param {ComposedScene} scene - model for this scene
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

    // Functions, in a horizontal carousel at bottom-center
    var functionNodes = [];
    scene.functions.forEach( function( functionInstance ) {
      var functionNode = new FunctionNode( functionInstance, {
        cursor: 'pointer'
      } );
      functionNodes.push( functionNode );
    } );
    var functionsCarousel = new Carousel( functionNodes, {
      orientation: 'horizontal',
      itemsPerPage: FUNCTION_PER_PAGE,
      centerX: layoutBounds.centerX,
      bottom: layoutBounds.bottom - 25
    } );

    // Page controls for each carousel
    var inputsPageControl = new PageControl( inputsCarousel.numberOfPages, inputsCarousel.pageNumberProperty, {
      orientation: 'vertical',
      right: inputsCarousel.left - PAGE_CONTROL_SPACING,
      centerY: inputsCarousel.centerY
    } );
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
    outputsCarousel.pageNumberProperty.link( function( pageNumber ) {
      inputsCarousel.pageNumberProperty.set( pageNumber );
    } );

    // Function builder, in the center of the screen
    var builderNode = new BuilderNode( scene.builder, {
      centerX: layoutBounds.centerX,
      centerY: inputsCarousel.centerY
    } );

    // Spy Glass check box, to the right of functions carousel
    this.spyGlassVisibleProperty = new Property( false ); // @private
    var spyGlassCheckBox = new SpyGlassCheckBox( this.spyGlassVisibleProperty, {
      maxWidth: 0.85 * ( functionsCarousel.left - inputsCarousel.left ),
      left: inputsCarousel.left,
      top: functionsCarousel.top
    } );
    this.spyGlassVisibleProperty.link( function( visible ) {
      //TODO make spy glasses visible in the builder
    } );

    // @private Resets this node
    this.resetComposedSceneNode = function() {
      inputsCarousel.reset();
      functionsCarousel.reset();
      outputsCarousel.reset();
    };

    options.children = [
      builderNode,
      inputsCarousel, outputsCarousel, functionsCarousel,
      inputsPageControl, outputsPageControl, functionsPageControl,
      eraserButton, spyGlassCheckBox
    ];
    Node.call( this, options );

    //TODO temporary, to demonstrate function changes
    {
      // The slot that will be populated next in the builder
      var functionIndexProperty = new Property( 0 );
      this.functionIndexProperty = functionIndexProperty;

      // Clicking on a function populates one of the slots in the builder
      var functionInputListener = new DownUpListener( {
        down: function( event ) {
          assert && assert( event.currentTarget instanceof FunctionNode );
          scene.builder.functionProperties[ functionIndexProperty.get() ].set( event.currentTarget.functionInstance );
          if ( functionIndexProperty.get() >= scene.builder.functionProperties.length - 1 ) {
            functionIndexProperty.set( 0 );
          }
          else {
            functionIndexProperty.set( functionIndexProperty.get() + 1 );
          }
        }
      } );
      functionNodes.forEach( function( functionNode ) {
        functionNode.addInputListener( functionInputListener );
      } );

      // This arrow points to the function that will be changed next in the builder.
      var arrowNode = new ArrowNode( 0, 40, 0, 0, {
        headWidth: 20,
        top: builderNode.bottom
      } );
      this.addChild( arrowNode );
      functionIndexProperty.link( function( functionIndex ) {
        arrowNode.left = builderNode.left + 115 + ( functionIndex * 100 );
      } );

      // When any function changes, update all output cards.
      var functionPropertyObserver = function() {
        for ( var i = 0; i < scene.inputCards.length; i++ ) {
          var card = scene.inputCards[ i ];
          for ( var j = 0; j < scene.builder.functionProperties.length; j++ ) {
            var functionInstance = scene.builder.functionProperties[ j ].get();
            var outputName = card.name + '.' + functionInstance.name;
            var outputCanvas = functionInstance.apply( card.canvas );
            card = new Card( outputName, outputCanvas );
          }
          outputNodes[ i ].setCard( card );
        }
      };
      scene.builder.functionProperties.forEach( function( functionProperty ) {
        functionProperty.link( functionPropertyObserver );
      } );
    }
  }

  functionBuilder.register( 'ComposedSceneNode', ComposedSceneNode );

  return inherit( Node, ComposedSceneNode, {

    // @public
    reset: function() {
      this.resetComposedSceneNode();
      this.spyGlassVisibleProperty.reset();
      this.functionIndexProperty.reset();
    }
  } );
} );
