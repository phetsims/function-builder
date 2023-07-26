// Copyright 2015-2023, University of Colorado Boulder

/**
 * Abstract base type for displaying things that are common to all scenes.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import merge from '../../../../phet-core/js/merge.js';
import EraserButton from '../../../../scenery-phet/js/buttons/EraserButton.js';
import { Node } from '../../../../scenery/js/imports.js';
import Carousel from '../../../../sun/js/Carousel.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import PageControl from '../../../../sun/js/PageControl.js';
import functionBuilder from '../../functionBuilder.js';
import FBQueryParameters from '../FBQueryParameters.js';
import BuilderEndNode from './builder/BuilderEndNode.js';
import BuilderNode from './builder/BuilderNode.js';
import FunctionContainer from './containers/FunctionContainer.js';
import FBIconFactory from './FBIconFactory.js';
import OutputCardsCarousel from './OutputCardsCarousel.js';
import SeeInsideLayer from './SeeInsideLayer.js';

// constants
const PAGE_CONTROL_SPACING = 8; // space between page controls and their associated carousels
const PAGE_CONTROL_OPTIONS = {
  interactive: true
};

export default class FBSceneNode extends Node {

  /**
   * @param {FBScene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {constructor} functionNodeConstructor - constructor for FunctionNode subtype
   * @param {Object} [options]
   */
  constructor( scene, layoutBounds, functionNodeConstructor, options ) {

    options = merge( {
      seeInside: false, // {boolean} initial value of seeInsideProperty
      hideFunctions: false, // {boolean} initial value of hideFunctionsProperty
      cardCarouselDefaultPageNumber: 0, // {number} initial page number for card carousels
      cardsPerPage: 4, // {number} cards per page in the input and output carousels
      functionsPerPage: 3, // {number} functions per page in the functions carousel
      seeInsideIconType: 'number', // {string} see FBIconFactory.createSeeInsideIcon
      functionCarouselVisible: true, // {boolean} is the function carousel visible?
      hideFunctionsCheckboxVisible: true // {boolean} is hideFunctionsCheckbox visible?
    }, options );

    super();
    phet.log && phet.log( `${this.constructor.name}.initialize` );

    // @protected show/hide windows that allow you to 'see inside' the builder
    this.seeInsideProperty = new BooleanProperty( options.seeInside );

    // @private should the identity of functions in the builder be hidden?
    this.hideFunctionsProperty = new BooleanProperty( options.hideFunctions );

    // cards are in this layer while they are draggable
    const cardsDragLayer = new Node();

    // functions are in this layer while they are draggable
    const functionsDragLayer = new Node();

    // basic UI controls get added to this layer
    const controlsLayer = new Node();

    // drawers get added to this layer by subtypes
    const drawersLayer = new Node();

    // Builder, ends are separate nodes to provide illusion of dragging cards through the builder
    const builder = scene.builder;
    const BUILDER_END_OPTIONS = {
      radiusX: 15,
      radiusY: builder.endHeight / 2,
      fill: builder.colorScheme.ends,
      centerY: builder.position.y
    };
    const builderLeftEndNode = new BuilderEndNode( 'left', merge( {}, BUILDER_END_OPTIONS, {
      centerX: builder.left
    } ) );
    const builderRightEndNode = new BuilderEndNode( 'right', merge( {}, BUILDER_END_OPTIONS, {
      centerX: builder.right
    } ) );
    const builderNode = new BuilderNode( builder, this.hideFunctionsProperty, {
      endRadiusX: BUILDER_END_OPTIONS.radiusX,
      slotFill: null
    } );

    // Input carousel --------------------------------------------------------------------------------------------------

    // Input carousel, at left
    const inputCarousel = new Carousel( this.createCardCarouselItems( scene ), {
      orientation: 'vertical',
      separatorsVisible: true,
      itemsPerPage: options.cardsPerPage,
      defaultPageNumber: options.cardCarouselDefaultPageNumber,
      buttonOptions: {
        touchAreaXDilation: 5,
        touchAreaYDilation: 15
      },
      spacing: 20,
      margin: 10,
      left: layoutBounds.left + 30,
      top: layoutBounds.top + 50
    } );

    // Page control for input carousel
    const inputPageControl = new PageControl( inputCarousel.pageNumberProperty, inputCarousel.numberOfPagesProperty, merge( {
      orientation: 'vertical',
      right: inputCarousel.left - PAGE_CONTROL_SPACING,
      centerY: inputCarousel.centerY
    }, PAGE_CONTROL_OPTIONS ) );
    controlsLayer.addChild( inputPageControl );

    // Output carousel ------------------------------------------------------------------------------------------------

    // Containers in the output carousel
    const outputContainers = this.createCardCarouselItems( scene, {
      emptyNode: null // don't show anything in empty output containers
    } );

    // Output carousel, at right
    const outputCarousel = new OutputCardsCarousel( outputContainers, {
      orientation: 'vertical',
      separatorsVisible: true,
      itemsPerPage: options.cardsPerPage,
      defaultPageNumber: options.cardCarouselDefaultPageNumber,
      buttonTouchAreaXDilation: 5,
      buttonTouchAreaYDilation: 15,
      spacing: 20,
      margin: 10,
      right: layoutBounds.right - ( inputCarousel.left - layoutBounds.left ),
      bottom: inputCarousel.bottom
    } );

    // Page control for output carousel
    const outputPageControl = new PageControl( outputCarousel.pageNumberProperty, outputCarousel.numberOfPagesProperty, merge( {
      orientation: 'vertical',
      left: outputCarousel.right + PAGE_CONTROL_SPACING,
      centerY: outputCarousel.centerY
    }, PAGE_CONTROL_OPTIONS ) );
    controlsLayer.addChild( outputPageControl );

    // Eraser button, centered below the output carousel
    const eraserButton = new EraserButton( {
      listener: () => this.erase(),
      iconWidth: 28,
      centerX: outputCarousel.centerX,
      top: outputCarousel.bottom + 25
    } );
    controlsLayer.addChild( eraserButton );
    eraserButton.touchArea = eraserButton.localBounds.dilatedXY( 10, 5 );

    // Disable the eraser button when the output carousel is empty.
    // unlink unnecessary, instances exist for lifetime of the sim.
    outputCarousel.numberOfCardsProperty.link( numberOfCards => {
      eraserButton.enabled = ( numberOfCards > 0 );
    } );

    // Function carousel ----------------------------------------------------------------------------------------------

    // Containers in the function carousel
    const functionCarouselItems = createFunctionCarouselItems( scene.functionCreators, functionNodeConstructor );

    // Function carousel, centered below bottom builder
    const functionCarousel = new Carousel( functionCarouselItems, {
      visible: options.functionCarouselVisible,
      orientation: 'horizontal',
      itemsPerPage: options.functionsPerPage,
      spacing: 12,
      margin: 10,
      buttonTouchAreaXDilation: 15,
      buttonTouchAreaYDilation: 5,
      centerX: layoutBounds.centerX,
      bottom: layoutBounds.bottom - 25
    } );

    // Page control for function carousel
    const functionPageControl = new PageControl( functionCarousel.pageNumberProperty, functionCarousel.numberOfPagesProperty, merge( {
      visible: options.functionCarouselVisible,
      orientation: 'horizontal',
      centerX: functionCarousel.centerX,
      top: functionCarousel.bottom + PAGE_CONTROL_SPACING
    }, PAGE_CONTROL_OPTIONS ) );
    controlsLayer.addChild( functionPageControl );

    //------------------------------------------------------------------------------------------------------------------

    // Link the input and output carousels, so that they display the same page number.
    // unlink unnecessary, instances exist for lifetime of the sim.
    assert && assert( inputCarousel.numberOfPagesProperty.value === outputCarousel.numberOfPagesProperty.value );
    inputCarousel.pageNumberProperty.link( pageNumber => {
      outputCarousel.pageNumberProperty.value = pageNumber;
    } );
    outputCarousel.pageNumberProperty.link( pageNumber => {
      inputCarousel.pageNumberProperty.value = pageNumber;
    } );

    // 'Hide Functions' feature ----------------------------------------------------------------------------------------

    const hideFunctionsCheckbox = new Checkbox( this.hideFunctionsProperty, FBIconFactory.createHideFunctionsIcon(), {
      visible: options.hideFunctionsCheckboxVisible,
      spacing: 8,
      left: inputCarousel.left,
      top: functionCarousel.top
    } );
    controlsLayer.addChild( hideFunctionsCheckbox );
    hideFunctionsCheckbox.touchArea = hideFunctionsCheckbox.localBounds.dilatedXY( 10, 10 );

    // 'See Inside' feature --------------------------------------------------------------------------------------------

    const seeInsideLayer = new SeeInsideLayer( scene.builder, {
      visible: this.seeInsideProperty.value
    } );

    const seeInsideCheckbox = new Checkbox( this.seeInsideProperty, FBIconFactory.createSeeInsideIcon( { iconType: options.seeInsideIconType } ), {
      spacing: 8,
      left: hideFunctionsCheckbox.left,
      top: hideFunctionsCheckbox.bottom + 25
    } );
    controlsLayer.addChild( seeInsideCheckbox );
    seeInsideCheckbox.touchArea = seeInsideCheckbox.localBounds.dilatedXY( 10, 10 );

    // unlink unnecessary, instances exist for lifetime of the sim
    this.seeInsideProperty.link( seeInside => {
      seeInsideLayer.visible = seeInside;
    } );

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

    this.mutate( options );

    //------------------------------------------------------------------------------------------------------------------
    // Define properties in one place, so we can see what's available and document visibility

    // @private populated by completeInitialization, needed by reset
    this.functionNodes = []; // {FunctionNode[]}
    this.cardNodes = []; // {CardNode[]}

    // @private needed by prototype functions
    this.scene = scene;
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
    this.inputContainers = inputCarousel.carouselItemNodes;
    this.outputContainers = outputCarousel.carouselItemNodes;
    assert && assert( this.inputContainers.length === this.outputContainers.length );
    this.functionContainers = functionCarousel.carouselItemNodes;
    this.seeInsideCheckbox = seeInsideCheckbox;
  }

  // @public
  reset() {
    this.seeInsideProperty.reset();
    this.hideFunctionsProperty.reset();
    this.resetCarousels();
    this.builderNode.reset();
    this.resetFunctions();
    this.resetCards();
  }

  /**
   * Returns all functions to the function carousel
   *
   * @protected
   */
  resetFunctions() {
    this.functionNodes.forEach( functionNode => functionNode.moveToCarousel() );
  }

  /**
   * Returns all cards to the input carousel
   *
   * @protected
   */
  resetCards() {
    this.cardNodes.forEach( cardNode => cardNode.moveToInputCarousel() );
  }

  /**
   * Resets the carousels without animation.
   *
   * @protected
   */
  resetCarousels() {

    this.functionCarousel.reset();

    // Because the input and output carousels are linked, we need to use this approach:
    this.inputCarousel.animationEnabled = this.outputCarousel.animationEnabled = false;
    this.inputCarousel.reset();
    this.outputCarousel.reset();
    this.inputCarousel.animationEnabled = this.outputCarousel.animationEnabled = true;
  }

  // @protected called when the 'eraser' button is pressed
  erase() {
    this.outputCarousel.erase();
  }

  /**
   * Completes initialization of the scene. This cannot be done until the scene is attached
   * to a ScreenView, because we need to know the position of the containers in the carousels.
   *
   * @public
   */
  completeInitialization() {
    assert && assert( hasScreenViewAncestor( this ), 'call this function after attaching to ScreenView' );
    this.populateFunctionCarousels();
    this.populateCardCarousels();
  }

  // @private populates the function carousel
  populateFunctionCarousels() {

    this.functionCarousel.animationEnabled = false;

    this.functionContainers.forEach( ( functionContainer, i ) => {

      // function container's position
      functionContainer.carouselPosition = getCarouselPosition( this.functionCarousel, this.functionCarousel.items[ i ], this.functionsDragLayer );

      // populate the container with functions
      functionContainer.createFunctions( this.scene.numberOfEachFunction, this.scene, this.builderNode, this.functionsDragLayer );

      // get the functions that were added, needed for reset
      this.functionNodes = this.functionNodes.concat( functionContainer.getContents() );
    } );

    this.functionCarousel.pageNumberProperty.reset();
    this.functionCarousel.animationEnabled = true;
  }

  // @private populates the card carousels
  populateCardCarousels() {

    this.inputCarousel.animationEnabled = this.outputCarousel.animationEnabled = false;

    for ( let i = 0; i < this.inputContainers.length; i++ ) {

      // input container's position
      const inputContainer = this.inputContainers[ i ];
      inputContainer.carouselPosition = getCarouselPosition( this.inputCarousel, this.inputCarousel.items[ i ], this.cardsDragLayer );

      // output container's position
      const outputContainer = this.outputContainers[ i ];
      outputContainer.carouselPosition = getCarouselPosition( this.outputCarousel, this.outputCarousel.items[ i ], this.cardsDragLayer );

      // populate the input container with cards
      inputContainer.createCards( this.scene.numberOfEachCard, this.scene, inputContainer, outputContainer,
        this.builderNode, this.cardsDragLayer, this.seeInsideLayer, this.seeInsideProperty );

      // get the cards that were added, needed for reset
      this.cardNodes = this.cardNodes.concat( inputContainer.getContents() );
    }

    this.inputCarousel.pageNumberProperty.reset();
    this.outputCarousel.pageNumberProperty.reset();
    this.inputCarousel.animationEnabled = this.outputCarousel.animationEnabled = true;

    // move 1 of each card to the output carousel, for testing
    if ( FBQueryParameters.populateOutput ) {
      this.populateOutputCarousel();
    }
  }

  /**
   * Moves 1 of each card to the output carousel, used for testing.
   * If an outputContainer already contains cards, this is a no-op for that container.
   *
   * @public
   */
  populateOutputCarousel() {
    for ( let i = 0; i < this.outputCarousel.carouselItemNodes.length; i++ ) {

      const outputContainer = this.outputCarousel.carouselItemNodes[ i ];
      if ( outputContainer.isEmpty() ) {

        const inputContainer = this.inputCarousel.carouselItemNodes[ i ];

        const cardNode = inputContainer.getContents()[ 0 ];
        inputContainer.removeNode( cardNode );
        outputContainer.addNode( cardNode );
      }
    }
  }

  /**
   * Creates the card containers that go in the card carousels.
   *
   * @param {FBScene} scene
   * @param {Object} [containerOptions]
   * @returns {CarouselItem[]}
   * @protected
   * @abstract
   */
  createCardCarouselItems( scene, containerOptions ) {
    throw new Error( 'must be implemented by subtype' );
  }
}

/**
 * For a container that is visible in some carousel, gets the position of the container in the global coordinate frame.
 *
 * @param {Carousel} carousel
 * @param {CarouselItem} carouselItem
 * @param {Node} worldParent
 * @returns {Vector2}
 */
function getCarouselPosition( carousel, carouselItem, worldParent ) {
  assert && assert( !carousel.animationEnabled );
  carousel.scrollToItem( carouselItem );
  const node = carousel.getNodeForItem( carouselItem );
  return worldParent.globalToLocalPoint( node.parentToGlobalPoint( node.center ) );
}

/**
 * Has this Node been attached beneath a ScreenView?
 * This is a pre-requisite to calling completeInitialization.
 *
 * @param {Node} node
 * @returns {boolean}
 */
function hasScreenViewAncestor( node ) {
  let found = false;
  while ( !found && node !== null ) {
    const parent = node.getParent();
    found = ( parent instanceof ScreenView );
    node = parent; // move up the scene graph by one level
  }
  return found;
}

/**
 * Creates the function containers that go in the function carousel.
 *
 * @param {FunctionCreator[]} functionCreators
 * @param {constructor} functionNodeConstructor - constructor for subtype of FunctionNode
 * @param {Object} [containerOptions] - see ImageFunctionContainer options
 * @returns {FunctionContainer[]}
 * @private
 */
function createFunctionCarouselItems( functionCreators, functionNodeConstructor, containerOptions ) {
  return functionCreators.map( functionCreator => {
    return {
      createNode: () => new FunctionContainer( functionCreator, functionNodeConstructor, containerOptions )
    };
  } );
}

functionBuilder.register( 'FBSceneNode', FBSceneNode );