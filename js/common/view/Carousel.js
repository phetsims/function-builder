// Copyright 2002-2015, University of Colorado Boulder

//TODO add optional item separators
//TODO add optional dots feature
//TODO trying to handle both orientations in one type is messy
//TODO clean up some of the sizing and positioning dependencies, it's easy to break
/**
 * A scrolling carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var HSeparator = require( 'SUN/HSeparator' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var RectangularButtonView = require( 'SUN/buttons/RectangularButtonView' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var Shape = require( 'KITE/Shape' );
  var Util = require( 'DOT/Util' );
  var VSeparator = require( 'SUN/VSeparator' );

  // constants
  var DEFAULT_OPTIONS = {

    // container
    orientation: 'horizontal', // {string} 'horizontal'|'vertical'
    fill: 'white', // {Color|string|null} background color of the carousel
    stroke: 'black', // {Color|string|null} color used to stroke the border of the carousel
    lineWidth: 1, // {number} width of the border around the carousel
    cornerRadius: 4, // {number} radius applied to the carousel and arrow buttons

    // items
    numberOfVisibleItems: 4, // {number} how many items are visible
    spacing: 10, // {number} spacing between items, and between items on the end and buttons
    margin: 10, // {number} margin between items and the edges of the carousel

    // arrow buttons
    arrowButtonColor: 'rgba( 200, 200, 200, 0.5 )', // {Color|string} base color for the arrow buttons
    arrowSize: new Dimension2( 7, 20 ), // {Color|string} color used for the arrow icons, in horizontal orientation
    arrowStroke: 'black', // {Color|string} color used for the arrow icons
    arrowLineWidth: 3, // {number} line width used to stroke the arrow icons
    hideDisabledButtons: false, // {boolean} whether to hide arrow buttons when they are disabled

    // item separators
    separators: true, // {boolean} whether to put separators between items
    separatorColor: 'black', // {Color|string} color for separators
    separatorLineWidth: 0.5, // {number} lineWidth for separators

    // dots
    dotRadius: 2, // {number} radius of the dots
    dotSelectedColor: 'black', // {Color|string}
    dotUnselectedColor: 'gray', // {Color|string}

    // scroll index
    defaultScrollIndex: 0
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
    var maxItemLength = isHorizontal ? maxItemWidth : maxItemHeight;

    // Generic arrow shape, points to the right
    var arrowShape = new Shape()
      .moveTo( 0, 0 )
      .lineTo( options.arrowSize.width, options.arrowSize.height / 2 )
      .lineTo( 0, options.arrowSize.height );

    // 'Next' arrow points to the right or down
    var nextArrowShape = isHorizontal ? arrowShape : arrowShape.transformed( Matrix3.rotation2( Math.PI / 2 ) );
    // 'Previous' point to the left or up
    var previousArrowShape = isHorizontal ? arrowShape.transformed( Matrix3.rotation2( Math.PI ) ) : arrowShape.transformed( Matrix3.rotation2( -Math.PI / 2 ) );

    // Arrow paths
    var arrowOptions = {
      stroke: options.arrowStroke,
      lineWidth: options.arrowLineWidth,
      lineCap: 'square'
    };
    var nextArrowNode = new Path( nextArrowShape, arrowOptions );
    var previousArrowNode = new Path( previousArrowShape, arrowOptions );

    // Arrow buttons
    var buttonOptions = {
      xMargin: 4,
      buttonAppearanceStrategy: RectangularButtonView.flatAppearanceStrategy,
      baseColor: options.arrowButtonColor,
      disabledBaseColor: options.fill,
      cornerRadius: options.cornerRadius
    };
    if ( isHorizontal ) {
      buttonOptions.minHeight = maxItemHeight + ( 2 * options.margin );
    }
    else {
      buttonOptions.minWidth = maxItemWidth + ( 2 * options.margin );
    }
    var nextButton = new RectangularPushButton( _.extend( { content: nextArrowNode }, buttonOptions ) );
    var previousButton = new RectangularPushButton( _.extend( { content: previousArrowNode }, buttonOptions ) );

    // All items, arranged in the proper orientation, with margins and spacing.
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

    // How much to translate scrollingNode each time an arrow button is pressed
    var scrollingDelta = options.numberOfVisibleItems * ( maxItemLength + options.spacing );

    // Clipping window, to show a subset of the items.
    // Clips at the midpoint of spacing between items so that you don't see any stray bits of the items that shouldn't be visible.
    var windowLength = ( scrollingDelta + options.spacing );
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
    var setIndexProperty = new Property( options.defaultScrollIndex );

    // Scroll when the buttons are pressed
    var scrollTween;
    setIndexProperty.link( function( scrollIndex ) {

      assert && assert( scrollIndex >= 0 && scrollIndex <= numberOfSets - 1,
        'scrollIndex out of range: ' + scrollIndex );

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
      // Set up the animation to scroll the carousel's contents.
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
