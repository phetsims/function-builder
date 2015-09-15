// Copyright 2002-2015, University of Colorado Boulder

//TODO add optional item separators
//TODO add optional dots feature
//TODO trying to handle both orientations in one type is messy
/**
 * A scrolling carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CarouselButton = require( 'FUNCTION_BUILDER/common/view/CarouselButton' );
  var Dimension2 = require( 'DOT/Dimension2' );
  //var HSeparator = require( 'SUN/HSeparator' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var Util = require( 'DOT/Util' );
  //var VSeparator = require( 'SUN/VSeparator' );

  // constants
  var DEFAULT_OPTIONS = {

    // container
    orientation: 'horizontal', // {string} 'horizontal'|'vertical'
    fill: 'white', // {Color|string|null} background color of the carousel
    stroke: 'black', // {Color|string|null} color used to stroke the border of the carousel
    lineWidth: 1, // {number} width of the border around the carousel
    cornerRadius: 4, // {number} radius applied to the carousel and next/previous buttons
    defaultSetIndex: 0, // {number} determines which 'set' of items is initially visible, see this.setIndexProperty

    // items
    numberOfVisibleItems: 4, // {number} how many items are visible
    spacing: 10, // {number} spacing between items, and between items on the end and buttons
    margin: 10, // {number} margin between items and the edges of the carousel

    // next/previous buttons
    buttonColor: 'rgba( 200, 200, 200, 0.5 )', // {Color|string} base color for the buttons
    buttonStroke: undefined, // {Color|string|null|undefined} stroke around the buttons (null is no stroke, undefined derives color from buttonColor)
    buttonLineWidth: 1, // {number} lineWidth of buttons
    hideDisabledButtons: false, // {boolean} whether to hide buttons when they are disabled

    // item separators
    separators: true, // {boolean} whether to put separators between items
    separatorColor: 'black', // {Color|string} color for separators
    separatorLineWidth: 0.5, // {number} lineWidth for separators

    // dots
    dotRadius: 2, // {number} radius of the dots
    dotSelectedColor: 'black', // {Color|string}
    dotUnselectedColor: 'gray' // {Color|string}
  };

  /**
   * @param {Node[]} items - items in the carousel
   * @param {Object} [options]
   * @constructor
   */
  function Carousel( items, options ) {

    // options
    options = _.extend( _.clone( DEFAULT_OPTIONS ), options );
    assert && assert( options.orientation === 'horizontal' || options.orientation === 'vertical' );

    // To improve readability
    var isHorizontal = ( options.orientation === 'horizontal' );

    // Dimensions of largest item
    var maxItemWidth = _.max( items, function( item ) { return item.width; } ).width;
    var maxItemHeight = _.max( items, function( item ) { return item.height; } ).height;

    // This quantity is used make some other computations independent of orientation.
    var maxItemLength = isHorizontal ? maxItemWidth : maxItemHeight;

    // Options common to both buttons
    var buttonOptions = {
      xMargin: 5,
      yMargin: 5,
      baseColor: options.buttonColor,
      disabledBaseColor: options.fill, // same as carousel background
      stroke: options.buttonStroke,
      lineWidth: options.buttonLineWidth,
      cornerRadius: options.cornerRadius, // same as carousel background
      minWidth: isHorizontal ? 0 : maxItemWidth + ( 2 * options.margin ), // fill the width of a vertical carousel
      minHeight: isHorizontal ? maxItemHeight + ( 2 * options.margin ) : 0 // fill the height of a horizontal carousel
    };

    // Next/previous buttons
    var nextButton = new CarouselButton( _.extend( {
      arrowDirection: isHorizontal ? 'right' : 'down'
    }, buttonOptions ) );
    var previousButton = new CarouselButton( _.extend( {
      arrowDirection: isHorizontal ? 'left' : 'up'
    }, buttonOptions ) );

    // All items, arranged in the proper orientation, with margins and spacing.
    // Horizontal carousel arrange items left-to-right, vertical is top-to-bottom.
    // Translation of this node will be animated to give the effect of scrolling through the items.
    var scrollingLength = ( items.length * ( maxItemLength + options.spacing ) + options.spacing ); // orientation independent
    var scrollingWidth = isHorizontal ? scrollingLength : ( maxItemWidth + 2 * options.margin );
    var scrollingHeight = isHorizontal ? ( maxItemHeight + 2 * options.margin ) : scrollingLength;
    var scrollingNode = new Rectangle( 0, 0, scrollingWidth, scrollingHeight );
    items.forEach( function( item, index ) {
      var itemCenter = options.spacing + ( maxItemLength / 2 ) + ( index * ( maxItemLength + options.spacing ) ); // orientation independent
      if ( isHorizontal ) {
        item.centerX = itemCenter;
        item.centerY = options.margin + ( maxItemHeight / 2 );
      }
      else {
        item.centerX = options.margin + ( maxItemWidth / 2 );
        item.centerY = itemCenter;
      }
      scrollingNode.addChild( item );
    } );

    // How much to translate scrollingNode each time a next/previous button is pressed
    var scrollingDelta = options.numberOfVisibleItems * ( maxItemLength + options.spacing );

    // Clipping window, to show one 'set' of items at a time.
    // Clips at the midpoint of spacing between items so that you don't see any stray bits of the items that shouldn't be visible.
    var windowLength = ( scrollingDelta + options.spacing ); // orientation independent
    var windowWidth = isHorizontal ? windowLength : scrollingNode.width;
    var windowHeight = isHorizontal ? scrollingNode.height : windowLength;
    var clipArea = isHorizontal ?
                   Shape.rectangle( options.spacing / 2, 0, windowWidth - options.spacing, windowHeight ) :
                   Shape.rectangle( 0, options.spacing / 2, windowWidth, windowHeight - options.spacing );
    var windowNode = new Node( {
      children: [ scrollingNode ],
      clipArea: clipArea
    } );

    // Background - the carousel's fill color
    var backgroundWidth = isHorizontal ? ( windowWidth + nextButton.width + previousButton.width ) : windowWidth;
    var backgroundHeight = isHorizontal ? windowHeight : ( windowHeight + nextButton.height + previousButton.height );
    var backgroundNode = new Rectangle( 0, 0, backgroundWidth, backgroundHeight, options.cornerRadius, options.cornerRadius, {
      fill: options.fill
    } );

    // Foreground - the carousel's outline, created as a separate node so that it can be placed on top of everything, for a clean look.
    var foregroundNode = new Rectangle( 0, 0, backgroundWidth, backgroundHeight, options.cornerRadius, options.cornerRadius, {
      stroke: options.stroke
    } );

    // Layout
    if ( isHorizontal ) {
      nextButton.centerY = previousButton.centerY = windowNode.centerY = backgroundNode.centerY;
      nextButton.right = backgroundNode.right;
      previousButton.left = backgroundNode.left;
      windowNode.centerX = backgroundNode.centerX;
    }
    else {
      nextButton.centerX = previousButton.centerX = windowNode.centerX = backgroundNode.centerX;
      nextButton.bottom = backgroundNode.bottom;
      previousButton.top = backgroundNode.top;
      windowNode.centerY = backgroundNode.centerY;
    }

    // Number of sets of items, where one set is visible in the carousel at a time.
    var numberOfSets = items.length / options.numberOfVisibleItems;
    if ( !Util.isInteger( numberOfSets ) ) {
      numberOfSets = Math.floor( numberOfSets + 1 );
    }

    // Index of the 'set' of items that is visible in the carousel.
    var setIndexProperty = new Property( options.defaultSetIndex );

    // Scroll when the buttons are pressed
    var scrollTween;
    setIndexProperty.link( function( scrollIndex ) {

      assert && assert( scrollIndex >= 0 && scrollIndex <= numberOfSets - 1, 'scrollIndex out of range: ' + scrollIndex );

      // stop any animation that's in progress
      scrollTween && scrollTween.stop();

      // button state
      nextButton.enabled = scrollIndex < ( numberOfSets - 1 );
      previousButton.enabled = scrollIndex > 0;
      if ( options.hideDisabledButtons ) {
        nextButton.visible = nextButton.enabled;
        previousButton.visible = previousButton.enabled;
      }

      //TODO replace calls to Tween with a wrapper
      // Set up the animation to scroll the items in the carousel.
      var parameters;
      var animationDuration = 400; // ms
      var easing = TWEEN.Easing.Cubic.InOut;
      if ( isHorizontal ) {
        parameters = { left: scrollingNode.left };
        scrollTween = new TWEEN.Tween( parameters )
          .easing( easing )
          .to( { left: -scrollIndex * scrollingDelta }, animationDuration )
          .onUpdate( function() {
            scrollingNode.left = parameters.left;
          } )
          .start();
      }
      else {
        parameters = { top: scrollingNode.top };
        scrollTween = new TWEEN.Tween( parameters )
          .easing( easing )
          .to( { top: -scrollIndex * scrollingDelta }, animationDuration )
          .onUpdate( function() {
            scrollingNode.top = parameters.top;
          } )
          .start();
      }
    } );

    // Buttons modify the scroll index
    nextButton.addListener( function() {
      setIndexProperty.set( setIndexProperty.get() + 1 );
    } );
    previousButton.addListener( function() {
      setIndexProperty.set( setIndexProperty.get() - 1 );
    } );

    // public fields
    this.numberOfSets = numberOfSets; // @public (read-only) number of 'sets' of items, where one set is visible at a time
    this.setIndexProperty = setIndexProperty; // @public index of the set that is currently visible

    options.children = [ backgroundNode, windowNode, nextButton, previousButton, foregroundNode ];
    Node.call( this, options );
  }

  return inherit( Node, Carousel, {}, {

    // @static @public (read-only)
    DEFAULT_OPTIONS: DEFAULT_OPTIONS
  } );
} );
