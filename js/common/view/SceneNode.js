// Copyright 2016, University of Colorado Boulder

/**
 * Abstract base type for displaying things that are common to all scenes.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var BuilderEndNode = require( 'FUNCTION_BUILDER/common/view/BuilderEndNode' );
  var BuilderNode = require( 'FUNCTION_BUILDER/common/view/BuilderNode' );
  var Carousel = require( 'SUN/Carousel' );
  var CheckBox = require( 'SUN/CheckBox' );
  var EraserButton = require( 'SCENERY_PHET/buttons/EraserButton' );
  var FBIconFactory = require( 'FUNCTION_BUILDER/common/view/FBIconFactory' );
  var FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var OutputCardsCarousel = require( 'FUNCTION_BUILDER/common/view/OutputCardsCarousel' );
  var PageControl = require( 'SUN/PageControl' );
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

  /**
   * @param {Scene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   * @constructor
   */
  function SceneNode( scene, layoutBounds, options ) {

    functionBuilder.log && functionBuilder.log( this.constructor.name + '.initialize' );

    options = _.extend( {
      cardCarouselDefaultPageNumber: 0, // {number} initial page number for card carousels
      cardsPerPage: 4, // {number} cards per page in the input and output carousels
      functionsPerPage: 3, // {number} functions per page in the functions carousel
      seeInsideIconType: 'number' // {string} see FBIconFactory.createSeeInsideIcon
    }, options );

    var thisNode = this;

    // view-specific properties
    var viewProperties = new PropertySet( {
      seeInside: false, // {boolean} show/hide windows that allow you to 'see inside' the builder
      hideFunctions: false // {boolean} should the identity of functions in the builder be hidden?
    } );

    // cards are in this layer while they are draggable
    var cardsDragLayer = new Node();

    // functions are in this layer while they are draggable
    var functionsDragLayer = new Node();

    // basic UI controls get added to this layer
    var controlsLayer = new Node();

    // drawers get added to this layer by subtypes
    var drawersLayer = new Node();

    // Builder
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
    var functionContainers = this.createFunctionContainers( scene );

    // Function carousel, centered below bottom builder
    var functionCarousel = new Carousel( functionContainers, {
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
      orientation: 'horizontal',
      centerX: functionCarousel.centerX,
      top: functionCarousel.bottom + PAGE_CONTROL_SPACING
    }, PAGE_CONTROL_OPTIONS ) );
    controlsLayer.addChild( functionPageControl );

    //------------------------------------------------------------------------------------------------------------------

    // Link input carousel to output carousel, so that they display the same page number.
    // unlink unnecessary, instances exist for lifetime of the sim.
    assert && assert( inputCarousel.numberOfPages === outputCarousel.numberOfPages );
    inputCarousel.pageNumberProperty.link( function( pageNumber ) {
      outputCarousel.pageNumberProperty.set( pageNumber );
    } );

    // Link output carousel to input carousel.
    // unlink unnecessary, instances exist for lifetime of the sim.
    outputCarousel.pageNumberProperty.link( function( pageNumber ) {
      inputCarousel.pageNumberProperty.set( pageNumber );
    } );

    // Misc controls ----------------------------------------------------------------------------------------------------

    // hide function icons in the builder
    var hideFunctionsCheckBox = new CheckBox(
      FBIconFactory.createHideFunctionsIcon(),
      viewProperties.hideFunctionsProperty, {
        spacing: 8,
        left: inputCarousel.left,
        top: functionCarousel.top
      } );
    controlsLayer.addChild( hideFunctionsCheckBox );
    hideFunctionsCheckBox.touchArea = hideFunctionsCheckBox.localBounds.dilatedXY( 10, 10 );

    var seeInsideLayer = new SeeInsideLayer( scene.builder, {
      visible: viewProperties.seeInsideProperty.get()
    } );

    // 'See Inside' windows in builder
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

    // @private populated by populateCarousels, needed by reset
    this.functionNodes = []; // {FunctionNode[]}
    this.cardNodes = []; // {CardNode[]}

    // @private Resets this node
    this._reset = function() {

      viewProperties.reset();

      // Reset carousels without animation
      functionCarousel.reset( { animationEnabled: false } );

      // Because the input and output carousels are linked, we need to use this approach:
      inputCarousel.animationEnabled = outputCarousel.animationEnabled = false;
      inputCarousel.reset();
      outputCarousel.reset();
      inputCarousel.animationEnabled = outputCarousel.animationEnabled = true;

      builderNode.reset();

      // Return all functions to the carousel
      thisNode.functionNodes.forEach( function( functionNode ) {
        functionNode.moveToCarousel();
      } );

      // Return all cards to the input carousel
      thisNode.cardNodes.forEach( function( cardNode ) {
        cardNode.moveToInputCarousel();
      } );
    };

    // @private Populates the carousels, while we scroll them with animation disabled.
    this._populateCarousels = function() {

      // This cannot be done until this scene is attached to a ScreenView.
      assert && assert( hasScreenViewAncestor( thisNode ), 'call this function after attaching to ScreenView' );

      // functions
      functionCarousel.animationEnabled = false;
      functionContainers.forEach( function( functionContainer ) {

        // function container's location
        functionContainer.carouselLocation = getCarouselLocation( functionCarousel, functionContainer, functionsDragLayer );

        // populate the container with functions
        functionContainer.createFunctions( scene.numberOfEachFunction, scene, builderNode, functionsDragLayer );

        // get the functions that were added, needed for reset
        thisNode.functionNodes = thisNode.functionNodes.concat( functionContainer.getContents() );
      } );
      functionCarousel.pageNumberProperty.reset();
      functionCarousel.animationEnabled = true;

      // cards
      inputCarousel.animationEnabled = outputCarousel.animationEnabled = false;
      assert && assert( inputContainers.length === outputContainers.length );
      for ( var i = 0; i < inputContainers.length; i++ ) {

        // input container's location
        var inputContainer = inputContainers[ i ];
        inputContainer.carouselLocation = getCarouselLocation( inputCarousel, inputContainer, cardsDragLayer );

        // output container's location
        var outputContainer = outputContainers[ i ];
        outputContainer.carouselLocation = getCarouselLocation( outputCarousel, outputContainer, cardsDragLayer );

        // populate the input container with cards
        inputContainer.createCards( scene.numberOfEachCard, scene, inputContainer, outputContainer, builderNode,
          cardsDragLayer, seeInsideLayer, viewProperties.seeInsideProperty );

        // get the cards that were added, needed for reset
        thisNode.cardNodes = thisNode.cardNodes.concat( inputContainer.getContents() );
      }
      inputCarousel.pageNumberProperty.reset();
      outputCarousel.pageNumberProperty.reset();
      inputCarousel.animationEnabled = outputCarousel.animationEnabled = true;

      // move 1 of each card to the output carousel, for testing
      if ( FBQueryParameters.POPULATE_OUTPUT ) {
        populateOutputCarousel( inputCarousel, outputCarousel );
      }
    };

    // @private needed by prototype functions
    this.outputCarousel = outputCarousel;

    // @protected needed by subtypes
    this.viewProperties = viewProperties;
    this.drawersLayer = drawersLayer;
    this.inputContainers = inputContainers;
    this.outputContainers = outputContainers;
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
   * This is a pre-requisite to calling populateCarousels.
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

  return inherit( Node, SceneNode, {

    // @public
    reset: function() {
      this._reset();
    },

    // @protected called when the 'eraser' button is pressed
    erase: function() {
      this.outputCarousel.erase();
    },

    /**
     * Populates the function and card carousels. This must be done after the view is created, because
     * we need to know the location of the containers in the carousels.
     *
     * @public
     */
    populateCarousels: function() {
      this._populateCarousels();
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
    },

    /**
     * Creates the function containers that go in the function carousel.
     *
     * @param {Scene} scene
     * @param {Object} [containerOptions]
     * @returns {FunctionContainer[]}
     * @protected
     * @abstract
     */
    createFunctionContainers: function( scene, containerOptions ) {
      throw new Error( 'must be implemented by subtype' );
    }
  } );
} );
