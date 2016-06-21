// Copyright 2016, University of Colorado Boulder

/**
 * Abstract base type for displaying things that are common to all scenes.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var BuilderEndNode = require( 'FUNCTION_BUILDER/common/view/builder/BuilderEndNode' );
  var BuilderNode = require( 'FUNCTION_BUILDER/common/view/builder/BuilderNode' );
  var Carousel = require( 'SUN/Carousel' );
  var CheckBox = require( 'SUN/CheckBox' );
  var EraserButton = require( 'SCENERY_PHET/buttons/EraserButton' );
  var FBIconFactory = require( 'FUNCTION_BUILDER/common/view/FBIconFactory' );
  var FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionContainer = require( 'FUNCTION_BUILDER/common/view/containers/FunctionContainer' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var OutputCardsCarousel = require( 'FUNCTION_BUILDER/common/view/OutputCardsCarousel' );
  var PageControl = require( 'SUN/PageControl' );
  var platform = require( 'PHET_CORE/platform' );
  var PropertySet = require( 'AXON/PropertySet' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SeeInsideLayer = require( 'FUNCTION_BUILDER/common/view/SeeInsideLayer' );

  // constants
  var PAGE_CONTROL_SPACING = 8; // space between page controls and their associated carousels
  var PAGE_CONTROL_OPTIONS = {
    interactive: true,
    dotTouchAreaDilation: 4,
    dotMouseAreaDilation: 4
  };

  //FUTURE revisit this workaround, see https://github.com/phetsims/function-builder/issues/69
  var WORKAROUND_35_OPTIONS = platform.mobileSafari ? { renderer: 'canvas' } : {};

  /**
   * @param {Scene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {constructor} functionNodeConstructor - constructor for FunctionNode subtype
   * @param {Object} [options]
   * @constructor
   */
  function SceneNode( scene, layoutBounds, functionNodeConstructor, options ) {

    functionBuilder.log && functionBuilder.log( this.constructor.name + '.initialize' );

    options = _.extend( {
      seeInside: false, // {boolean} initial value of seeInsideProperty
      hideFunctions: false, // {boolean} initial value of hideFunctionsProperty
      cardCarouselDefaultPageNumber: 0, // {number} initial page number for card carousels
      cardsPerPage: 4, // {number} cards per page in the input and output carousels
      functionsPerPage: 3, // {number} functions per page in the functions carousel
      seeInsideIconType: 'number', // {string} see FBIconFactory.createSeeInsideIcon
      functionCarouselVisible: true, // {boolean} is the function carousel visible?
      hideFunctionsCheckBoxVisible: true // {boolean} is hideFunctionsCheckBox visible?
    }, options );

    var thisNode = this;

    // view-specific properties
    var viewProperties = new PropertySet( {

      // {boolean} show/hide windows that allow you to 'see inside' the builder
      seeInside: options.seeInside,

      // {boolean} should the identity of functions in the builder be hidden?
      hideFunctions: options.hideFunctions
    } );

    // cards are in this layer while they are draggable
    var cardsDragLayer = new Node();

    // functions are in this layer while they are draggable
    var functionsDragLayer = new Node();

    // basic UI controls get added to this layer
    var controlsLayer = new Node( WORKAROUND_35_OPTIONS );

    // drawers get added to this layer by subtypes
    var drawersLayer = new Node();

    // Builder, ends are separate nodes to provide illusion of dragging cards through the builder
    var builder = scene.builder;
    var BUILDER_END_OPTIONS = {
      radiusX: 15,
      radiusY: builder.endHeight / 2,
      fill: builder.colorScheme.ends,
      centerY: builder.location.y
    };
    var builderLeftEndNode = new BuilderEndNode( 'left', _.extend( {}, BUILDER_END_OPTIONS, {
      centerX: builder.left
    } ) );
    var builderRightEndNode = new BuilderEndNode( 'right', _.extend( {}, BUILDER_END_OPTIONS, {
      centerX: builder.right
    } ) );
    var builderNode = new BuilderNode( builder, viewProperties.hideFunctionsProperty, {
      endRadiusX: BUILDER_END_OPTIONS.radiusX,
      slotFill: null
    } );

    // Input carousel --------------------------------------------------------------------------------------------------

    // Containers in the input carousel
    var inputContainers = this.createCardContainers( scene );

    // Input carousel, at left
    var inputCarousel = new Carousel( inputContainers, {
      orientation: 'vertical',
      separatorsVisible: true,
      itemsPerPage: options.cardsPerPage,
      defaultPageNumber: options.cardCarouselDefaultPageNumber,
      buttonTouchAreaXDilation: 5,
      buttonTouchAreaYDilation: 15,
      left: layoutBounds.left + 30,
      top: layoutBounds.top + 50
    } );

    // Page control for input carousel
    var inputPageControl = new PageControl( inputCarousel.numberOfPages, inputCarousel.pageNumberProperty, _.extend( {
      orientation: 'vertical',
      right: inputCarousel.left - PAGE_CONTROL_SPACING,
      centerY: inputCarousel.centerY
    }, PAGE_CONTROL_OPTIONS ) );
    controlsLayer.addChild( inputPageControl );

    // Output carousel ------------------------------------------------------------------------------------------------

    // Containers in the output carousel
    var outputContainers = this.createCardContainers( scene, {
      emptyNode: null // don't show anything in empty output containers
    } );

    // Output carousel, at right
    var outputCarousel = new OutputCardsCarousel( outputContainers, {
      orientation: 'vertical',
      separatorsVisible: true,
      itemsPerPage: options.cardsPerPage,
      defaultPageNumber: options.cardCarouselDefaultPageNumber,
      buttonTouchAreaXDilation: 5,
      buttonTouchAreaYDilation: 15,
      right: layoutBounds.right - ( inputCarousel.left - layoutBounds.left ),
      bottom: inputCarousel.bottom
    } );

    // Page control for output carousel
    var outputPageControl = new PageControl( outputCarousel.numberOfPages, outputCarousel.pageNumberProperty, _.extend( {
      orientation: 'vertical',
      left: outputCarousel.right + PAGE_CONTROL_SPACING,
      centerY: outputCarousel.centerY
    }, PAGE_CONTROL_OPTIONS ) );
    controlsLayer.addChild( outputPageControl );

    // Eraser button, centered below the output carousel
    var eraserButton = new EraserButton( {
      listener: function() { thisNode.erase(); },
      iconWidth: 28,
      centerX: outputCarousel.centerX,
      top: outputCarousel.bottom + 25
    } );
    controlsLayer.addChild( eraserButton );
    eraserButton.touchArea = eraserButton.localBounds.dilatedXY( 10, 5 );

    // Disable the eraser button when the output carousel is empty.
    // unlink unnecessary, instances exist for lifetime of the sim.
    outputCarousel.numberOfCardsProperty.link( function( numberOfCards ) {
      eraserButton.enabled = ( numberOfCards > 0 );
    } );

    // Function carousel ----------------------------------------------------------------------------------------------

    // Containers in the function carousel
    var functionContainers = createFunctionContainers( scene.functionCreators, functionNodeConstructor );

    // Function carousel, centered below bottom builder
    var functionCarousel = new Carousel( functionContainers, {
      visible: options.functionCarouselVisible,
      orientation: 'horizontal',
      itemsPerPage: options.functionsPerPage,
      spacing: 12,
      buttonTouchAreaXDilation: 15,
      buttonTouchAreaYDilation: 5,
      centerX: layoutBounds.centerX,
      bottom: layoutBounds.bottom - 25
    } );

    // Page control for function carousel
    var functionPageControl = new PageControl( functionCarousel.numberOfPages, functionCarousel.pageNumberProperty, _.extend( {
      visible: options.functionCarouselVisible,
      orientation: 'horizontal',
      centerX: functionCarousel.centerX,
      top: functionCarousel.bottom + PAGE_CONTROL_SPACING
    }, PAGE_CONTROL_OPTIONS ) );
    controlsLayer.addChild( functionPageControl );

    //------------------------------------------------------------------------------------------------------------------

    // Link the input and output carousels, so that they display the same page number.
    // unlink unnecessary, instances exist for lifetime of the sim.
    assert && assert( inputCarousel.numberOfPages === outputCarousel.numberOfPages );
    inputCarousel.pageNumberProperty.link( function( pageNumber ) {
      outputCarousel.pageNumberProperty.set( pageNumber );
    } );
    outputCarousel.pageNumberProperty.link( function( pageNumber ) {
      inputCarousel.pageNumberProperty.set( pageNumber );
    } );

    // 'Hide Functions' feature ----------------------------------------------------------------------------------------

    var hideFunctionsCheckBox = new CheckBox(
      FBIconFactory.createHideFunctionsIcon(),
      viewProperties.hideFunctionsProperty, {
        visible: options.hideFunctionsCheckBoxVisible,
        spacing: 8,
        left: inputCarousel.left,
        top: functionCarousel.top
      } );
    controlsLayer.addChild( hideFunctionsCheckBox );
    hideFunctionsCheckBox.touchArea = hideFunctionsCheckBox.localBounds.dilatedXY( 10, 10 );

    // 'See Inside' feature --------------------------------------------------------------------------------------------

    var seeInsideLayer = new SeeInsideLayer( scene.builder, {
      visible: viewProperties.seeInsideProperty.get()
    } );

    var seeInsideCheckBox = new CheckBox(
      FBIconFactory.createSeeInsideIcon( { iconType: options.seeInsideIconType } ),
      viewProperties.seeInsideProperty, {
        spacing: 8,
        left: hideFunctionsCheckBox.left,
        top: hideFunctionsCheckBox.bottom + 25
      } );
    controlsLayer.addChild( seeInsideCheckBox );
    seeInsideCheckBox.touchArea = seeInsideCheckBox.localBounds.dilatedXY( 10, 10 );

    // unlink unnecessary, instances exist for lifetime of the sim
    viewProperties.seeInsideProperty.link( function( seeInside ) {
      seeInsideLayer.visible = seeInside;
    } );
    seeInsideCheckBox.visible = ( scene.builder.slots.length > 1 );

    //------------------------------------------------------------------------------------------------------------------

    // rendering order
    assert && assert( !options.children, 'decoration not supported' );
    options.children = [
      controlsLayer,
      inputCarousel, // 1 clipArea
      outputCarousel, // 1 clipArea
      functionCarousel, // 1 clipArea
      drawersLayer, // table drawer: 2 clipAreas; graph drawer: 1 clipArea; equation drawer: 1 clipArea
      builderLeftEndNode,
      builderRightEndNode,
      cardsDragLayer, // must be between the builder ends and the builder
      builderNode, // 1 clipArea
      seeInsideLayer, // 1 clipArea
      functionsDragLayer
    ];

    Node.call( this, options );

    //------------------------------------------------------------------------------------------------------------------
    // Create properties in one place, so we can see what's available and document visibility

    // @private populated by completeInitialization, needed by reset
    this.functionNodes = []; // {FunctionNode[]}
    this.cardNodes = []; // {CardNode[]}

    // @private needed by prototype functions
    this.scene = scene;
    this.viewProperties = viewProperties;
    this.cardsDragLayer = cardsDragLayer;
    this.seeInsideLayer = seeInsideLayer;
    this.inputCarousel = inputCarousel;
    this.outputCarousel = outputCarousel;

    // @protected needed by subtypes
    this.drawersLayer = drawersLayer;
    this.controlsLayer = controlsLayer;
    this.functionsDragLayer = functionsDragLayer;
    this.builderNode = builderNode;
    this.functionCarousel = functionCarousel;
    this.inputContainers = inputContainers;
    this.outputContainers = outputContainers;
    this.functionContainers = functionContainers;
    this.seeInsideCheckBox = seeInsideCheckBox;
  }

  functionBuilder.register( 'SceneNode', SceneNode );

  // Moves 1 of each card to the output carousel, used for testing.
  var populateOutputCarousel = function( inputCarousel, outputCarousel ) {

    assert && assert( inputCarousel.items.length === outputCarousel.items.length,
      'input and output carousels must have the same number of items' );

    for ( var i = 0; i < inputCarousel.items.length; i++ ) {

      var inputContainer = inputCarousel.items[ i ];
      var outputContainer = outputCarousel.items[ i ];

      var cardNode = inputContainer.getContents()[ 0 ];
      inputContainer.removeNode( cardNode );
      outputContainer.addNode( cardNode );
    }
  };

  /**
   * For a container that is visible in some carousel, gets the location of the container in the model coordinate frame.
   *
   * @param {Carousel} carousel
   * @param {MovableContainer} container
   * @param {Node} worldParent
   * @returns {Vector2}
   */
  var getCarouselLocation = function( carousel, container, worldParent ) {
    assert && assert( !carousel.animationEnabled );
    carousel.scrollToItem( container );
    return worldParent.globalToLocalPoint( container.parentToGlobalPoint( container.center ) );
  };

  /**
   * Has this Node been attached beneath a ScreenView?
   * This is a pre-requisite to calling completeInitialization.
   *
   * @param {Node} node
   * @returns {boolean}
   */
  var hasScreenViewAncestor = function( node ) {
    var found = false;
    while ( !found && node !== null ) {
      var parent = node.getParent();
      found = ( parent instanceof ScreenView );
      node = parent; // move up the scene graph by one level
    }
    return found;
  };

  /**
   * Creates the function containers that go in the function carousel.
   *
   * @param {FunctionCreator[]} functionCreators
   * @param {constructor} functionNodeConstructor - constructor for subtype of FunctionNode
   * @param {Object} [containerOptions] - see ImageFunctionContainer options
   * @returns {FunctionContainer[]}
   * @private
   */
  var createFunctionContainers = function( functionCreators, functionNodeConstructor, containerOptions ) {
    var functionContainers = [];
    functionCreators.forEach( function( functionCreator ) {
      functionContainers.push( new FunctionContainer( functionCreator, functionNodeConstructor, containerOptions ) );
    } );
    return functionContainers;
  };

  return inherit( Node, SceneNode, {

    // @public
    reset: function() {

      this.viewProperties.reset();

      // Reset carousels without animation
      this.functionCarousel.reset( { animationEnabled: false } );

      // Because the input and output carousels are linked, we need to use this approach:
      this.inputCarousel.animationEnabled = this.outputCarousel.animationEnabled = false;
      this.inputCarousel.reset();
      this.outputCarousel.reset();
      this.inputCarousel.animationEnabled = this.outputCarousel.animationEnabled = true;

      this.builderNode.reset();

      // Return all functions to the carousel
      this.functionNodes.forEach( function( functionNode ) {
        functionNode.moveToCarousel();
      } );

      // Return all cards to the input carousel
      this.cardNodes.forEach( function( cardNode ) {
        cardNode.moveToInputCarousel();
      } );
    },

    // @protected called when the 'eraser' button is pressed
    erase: function() {
      this.outputCarousel.erase();
    },

    /**
     * Completes initialization of the scene. This cannot be done until the scene is attached
     * to a ScreenView, because we need to know the location of the containers in the carousels.
     *
     * @public
     */
    completeInitialization: function() {
      assert && assert( hasScreenViewAncestor( this ), 'call this function after attaching to ScreenView' );
      this.populateFunctionCarousels();
      this.populateCardCarousels();
    },

    // @private populates the function carousel
    populateFunctionCarousels: function() {

      var thisNode = this;

      thisNode.functionCarousel.animationEnabled = false;

      thisNode.functionCarousel.items.forEach( function( functionContainer ) {

        // function container's location
        functionContainer.carouselLocation = getCarouselLocation( thisNode.functionCarousel, functionContainer, thisNode.functionsDragLayer );

        // populate the container with functions
        functionContainer.createFunctions( thisNode.scene.numberOfEachFunction, thisNode.scene, thisNode.builderNode, thisNode.functionsDragLayer );

        // get the functions that were added, needed for reset
        thisNode.functionNodes = thisNode.functionNodes.concat( functionContainer.getContents() );
      } );

      thisNode.functionCarousel.pageNumberProperty.reset();
      thisNode.functionCarousel.animationEnabled = true;
    },

    // @private populates the card carousels
    populateCardCarousels: function() {

      var thisNode = this;

      thisNode.inputCarousel.animationEnabled = thisNode.outputCarousel.animationEnabled = false;

      var inputContainers = thisNode.inputCarousel.items;
      var outputContainers = thisNode.outputCarousel.items;
      assert && assert( inputContainers.length === outputContainers.length );

      for ( var i = 0; i < inputContainers.length; i++ ) {

        // input container's location
        var inputContainer = inputContainers[ i ];
        inputContainer.carouselLocation = getCarouselLocation( thisNode.inputCarousel, inputContainer, thisNode.cardsDragLayer );

        // output container's location
        var outputContainer = outputContainers[ i ];
        outputContainer.carouselLocation = getCarouselLocation( thisNode.outputCarousel, outputContainer, thisNode.cardsDragLayer );

        // populate the input container with cards
        inputContainer.createCards( thisNode.scene.numberOfEachCard, thisNode.scene, inputContainer, outputContainer,
          thisNode.builderNode, thisNode.cardsDragLayer, thisNode.seeInsideLayer, thisNode.viewProperties.seeInsideProperty );

        // get the cards that were added, needed for reset
        thisNode.cardNodes = thisNode.cardNodes.concat( inputContainer.getContents() );
      }

      thisNode.inputCarousel.pageNumberProperty.reset();
      thisNode.outputCarousel.pageNumberProperty.reset();
      thisNode.inputCarousel.animationEnabled = thisNode.outputCarousel.animationEnabled = true;

      // move 1 of each card to the output carousel, for testing
      if ( FBQueryParameters.POPULATE_OUTPUT ) {
        populateOutputCarousel( thisNode.inputCarousel, thisNode.outputCarousel );
      }
    },

    /**
     * Creates the card containers that go in the card carousels.
     *
     * @param {Scene} scene
     * @param {Object} [containerOptions]
     * @returns {CardContainer[]}
     * @protected
     * @abstract
     */
    createCardContainers: function( scene, containerOptions ) {
      throw new Error( 'must be implemented by subtype' );
    }
  } );
} );
