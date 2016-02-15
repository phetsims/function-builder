// Copyright 2015-2016, University of Colorado Boulder

/**
 * Composite Node that contains all of the Nodes that make up a 'scene' in the 'Patterns' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var BuilderNode = require( 'FUNCTION_BUILDER/common/view/BuilderNode' );
  var Carousel = require( 'SUN/Carousel' );
  var EraserButton = require( 'SCENERY_PHET/buttons/EraserButton' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var ImageCardContainerNode = require( 'FUNCTION_BUILDER/patterns/view/ImageCardContainerNode' );
  var ImageFunctionContainerNode = require( 'FUNCTION_BUILDER/patterns/view/ImageFunctionContainerNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PageControl = require( 'SUN/PageControl' );
  var Property = require( 'AXON/Property' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SpyGlassCheckBox = require( 'FUNCTION_BUILDER/common/view/SpyGlassCheckBox' );

  // constants
  var CARDS_PER_PAGE = 4; // number of cards per page in the input and output carousels
  var PAGE_CONTROL_SPACING = 8; // space between page controls and their associated carousels
  var PAGE_CONTROL_OPTIONS = {
    interactive: true,
    dotTouchAreaDilation: 4,
    dotMouseAreaDilation: 4
  };

  /**
   * @param {PatternsScene} scene - model for this scene
   * @param {Bounds2} layoutBounds - layoutBounds of the parent ScreenView
   * @param {Object} [options]
   * @constructor
   */
  function PatternsSceneNode( scene, layoutBounds, options ) {

    // no options specific to this type
    options = options || {};

    // parent node for all cards, while the user is dragging them
    var cardsParent = new Node();

    // parent node for all function instances, while the user is dragging them
    var functionsParent = new Node();

    // Builder
    var builderNode = new BuilderNode( scene.builder );

    // Input carousel --------------------------------------------------------------------------------------------------

    // Items in the input carousel
    var inputCarouselItems = [];
    scene.cardImages.forEach( function( cardImage ) {
      inputCarouselItems.push( new ImageCardContainerNode( cardImage, scene.numberOfEachCard, cardsParent, scene ) );
    } );

    // Input carousel, at left
    var inputCarousel = new Carousel( inputCarouselItems, {
      orientation: 'vertical',
      separatorsVisible: true,
      itemsPerPage: CARDS_PER_PAGE,
      buttonTouchAreaXDilation: 5,
      buttonTouchAreaYDilation: 15,
      left: layoutBounds.left + 50,
      top: layoutBounds.top + 50
    } );

    // Page control for input carousel
    var inputPageControl = new PageControl( inputCarousel.numberOfPages, inputCarousel.pageNumberProperty, _.extend( {
      orientation: 'vertical',
      right: inputCarousel.left - PAGE_CONTROL_SPACING,
      centerY: inputCarousel.centerY
    }, PAGE_CONTROL_OPTIONS ) );

    // Output carousel ------------------------------------------------------------------------------------------------

    // Items in the output carousel
    var outputCarouselItems = []; // {ImageCardStackNode[]}
    scene.cardImages.forEach( function( cardImage ) {
      outputCarouselItems.push( new ImageCardContainerNode( cardImage, 0, cardsParent, scene ) );
    } );

    // Output carousel, at right
    var outputCarousel = new Carousel( outputCarouselItems, {
      orientation: 'vertical',
      separatorsVisible: true,
      itemsPerPage: CARDS_PER_PAGE,
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

    // Eraser button, centered below the output carousel
    var eraserButtonListener = function() {
      //TODO return all cards to the input carousel
    };
    var eraserButton = new EraserButton( {
      listener: eraserButtonListener,
      iconWidth: 28,
      centerX: outputCarousel.centerX,
      top: outputCarousel.bottom + 40
    } );

    // Function carousel ----------------------------------------------------------------------------------------------

    // Items in the function carousel
    var functionCarouselItems = [];
    scene.functionConstructors.forEach( function( FunctionConstructor ) {
      functionCarouselItems.push( new ImageFunctionContainerNode( FunctionConstructor, functionsParent, scene ) );
    } );

    // Function carousel, centered below bottom builder
    var functionCarousel = new Carousel( functionCarouselItems, {
      orientation: 'horizontal',
      itemsPerPage: 3,
      buttonTouchAreaXDilation: 15,
      buttonTouchAreaYDilation: 5,
      centerX: builderNode.centerX,
      bottom: layoutBounds.bottom - 25
    } );

    // Page control for function carousel
    var functionPageControl = new PageControl( functionCarousel.numberOfPages, functionCarousel.pageNumberProperty, _.extend( {
      orientation: 'horizontal',
      centerX: functionCarousel.centerX,
      top: functionCarousel.bottom + PAGE_CONTROL_SPACING
    }, PAGE_CONTROL_OPTIONS ) );

    //------------------------------------------------------------------------------------------------------------------

    // Link input carousel to output carousel, so that they display the same page number
    assert && assert( inputCarousel.numberOfPages === outputCarousel.numberOfPages );
    inputCarousel.pageNumberProperty.link( function( pageNumber ) {
      outputCarousel.pageNumberProperty.set( pageNumber );
    } );

    // Link output carousel to input carousel
    outputCarousel.pageNumberProperty.link( function( pageNumber ) {
      inputCarousel.pageNumberProperty.set( pageNumber );
    } );

    // Spy Glass check box, to the right of functions carousel
    var spyGlassVisibleProperty = new Property( false );
    var spyGlassCheckBox = new SpyGlassCheckBox( spyGlassVisibleProperty, {
      maxWidth: 0.85 * ( functionCarousel.left - inputCarousel.left ),
      left: inputCarousel.left,
      top: functionCarousel.top
    } );
    spyGlassVisibleProperty.link( function( visible ) {
      //TODO implement the spy glass feature
    } );
    spyGlassCheckBox.visible = scene.spyGlassEnabled;

    // rendering order
    assert && assert( !options.children, 'decoration not supported' );
    options.children = [
      spyGlassCheckBox, eraserButton,
      inputCarousel, inputPageControl,
      outputCarousel, outputPageControl,
      functionCarousel, functionPageControl,
      builderNode, functionsParent, cardsParent
    ];

    Node.call( this, options );

    // @private Resets this node
    this.resetPatternsSceneNode = function() {
      functionCarousel.reset();
      inputCarousel.reset();
      outputCarousel.reset();
      spyGlassVisibleProperty.reset();
    };

    // @private Populates the carousels, while we scroll them with animation disabled.
    this._populateCarousels = function() {

      // functions
      functionCarousel.animationEnabled = false;
      functionCarouselItems.forEach( function( item ) {

        // make sure the item is visible in the carousel
        functionCarousel.scrollToItem( item );

        // compute the item's location in the model coordinate frame
        var viewLocation = item.parentToGlobalPoint( item.center );
        var modelLocation = item.parentNode.globalToLocalPoint( viewLocation );

        // create functions at the item's location
        item.populateContainer( scene.numberOfEachFunction, modelLocation );
      } );
      functionCarousel.pageNumberProperty.reset();
      functionCarousel.animationEnabled = true;

      // cards
      inputCarousel.animationEnabled = false;
      inputCarouselItems.forEach( function( item ) {

        // make sure the item is visible in the carousel
        inputCarousel.scrollToItem( item );

        // compute the item's location in the model coordinate frame
        var viewLocation = item.parentToGlobalPoint( item.center );
        var modelLocation = item.parentNode.globalToLocalPoint( viewLocation );

        // create functions at the item's location
        item.populateContainer( scene.numberOfEachCard, modelLocation );
      } );
      inputCarousel.pageNumberProperty.reset();
      inputCarousel.animationEnabled = true;
    };
  }

  functionBuilder.register( 'PatternsSceneNode', PatternsSceneNode );

  /**
   * Has this Node been attached beneath a ScreenView?
   * This is a pre-requisite to calling populateCarousels.
   * @param {Node} node
   * @returns {boolean}
   * @private
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

  return inherit( Node, PatternsSceneNode, {

    // @public
    reset: function() {
      this.resetPatternsSceneNode();
    },

    /**
     * Populates the carousels with functions and card. This cannot be done until the carousels (view components)
     * are instantiated and attached to a ScreenView, because functions and cards need to know the location of
     * their respective carousels.
     * @public
     */
    populateCarousels: function() {
      assert && assert( hasScreenViewAncestor( this ), 'call this function after attaching to ScreenView' );
      this._populateCarousels();
    }
  } );
} );
