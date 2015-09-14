// Copyright 2002-2015, University of Colorado Boulder

/**
 * A scrolling carousel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
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

  // constants
  var DEFAULT_OPTIONS = {
    orientation: 'horizontal', // {string} 'horizontal'|'vertical'
    numberOfVisibleItems: 4, // {number} how many items are visible
    spacing: 10, // {number} spacing between items, and between items on the end and buttons
    margin: 10, // {number} margin beteen items and the edges of the carousel
    fill: 'white', // {Color|string|null} background color of the carousel
    stroke: 'black', // {Color|string|null} color used to stroke the border of the carousel
    lineWidth: 1, // {number} width of the border around the carousel
    cornerRadius: 4, // {number} radius applied to the carousel and arrow buttons
    arrowButtonColor: 'rgba( 200, 200, 200, 0.5 )', // {Color|string} base color for the arrow buttons
    arrowSize: new Dimension2( 7, 20 ), // {Color|string} color used for the arrow icons, in horizontal orientation
    arrowStroke: 'black', // {Color|string} color used for the arrow icons
    arrowLineWidth: 3 // {number} line width used to stroke the arrow icons
  };

  /**
   * @param {Node[]} items - items in the carousel
   * @param {Object} [options]
   * @constructor
   */
  function Carousel( items, options ) {

    options = _.extend( _.clone( DEFAULT_OPTIONS ), options );

    // validate options
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

    // All items, arranged in the proper orientation, with margins and spacing
    var scrollingWidth = isHorizontal ? ( items.length * ( maxItemWidth + options.spacing ) + options.spacing ) : ( maxItemWidth + 2 * options.margin );
    var scrollingHeight = isHorizontal ? ( maxItemHeight + 2 * options.margin ) : ( items.length * ( maxItemHeight + options.spacing ) + options.spacing );
    var scrollingNode = new Rectangle( 0, 0, scrollingWidth, scrollingHeight );
    items.forEach( function( item, index ) {
      if ( isHorizontal ) {
        item.centerX = options.spacing + ( maxItemWidth / 2 ) + ( index * ( maxItemWidth + options.spacing ) );
        item.centerY = options.margin + maxItemHeight / 2;
      }
      else {
        item.centerX = options.margin + ( maxItemWidth / 2 );
        item.centerY = options.spacing + ( maxItemHeight / 2 ) + ( index * ( maxItemHeight + options.spacing ) );
      }
      scrollingNode.addChild( item );
    } );
    var scrollingDelta = options.numberOfVisibleItems * ( maxItemLength + options.spacing );

    // Clipping window, to show a subset of the items
    var windowWidth = isHorizontal ? ( scrollingDelta + options.spacing ) : ( maxItemWidth + 2 * options.margin );
    var windowHeight = isHorizontal ? ( maxItemHeight + 2 * options.margin ) : ( scrollingDelta + options.spacing );
    var clipArea = isHorizontal ?
                   Shape.rectangle( options.spacing / 2, 0, windowWidth - options.spacing, windowHeight ) :
                   Shape.rectangle( 0, options.spacing / 2, windowWidth, windowHeight - options.spacing );
    var windowNode = new Node( {
      children: [ scrollingNode ],
      clipArea: clipArea
    } );

    // Background
    var backgroundWidth = isHorizontal ? ( windowWidth + nextButton.width + previousButton.width ) : windowWidth;
    var backgroundHeight = isHorizontal ? windowHeight : ( windowHeight + nextButton.height + previousButton.height );
    var backgroundNode = new Rectangle( 0, 0, backgroundWidth, backgroundHeight, options.cornerRadius, options.cornerRadius, {
      fill: options.fill
    } );

    // Outline, on top of everything
    var backgroundOutline = new Rectangle( 0, 0, backgroundWidth, backgroundHeight, options.cornerRadius, options.cornerRadius, {
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

    // Number of times that we can scroll the carousel
    var numberOfScrolls = items.length / options.numberOfVisibleItems;
    if ( !Util.isInteger( numberOfScrolls ) ) {
      numberOfScrolls = Math.floor( numberOfScrolls + 1 );
    }
    var scrollIndexRange = new Range( 0, numberOfScrolls - 1 );
    var scrollIndex = new Property( scrollIndexRange.min ); // {number}

    // Scroll when the buttons are pressed
    scrollIndex.link( function( scrollIndex ) {

      assert && assert( scrollIndexRange.contains( scrollIndex ), 'scrollIndex out of range: ' + scrollIndex );

      //TODO support disabling
      // visibility of buttons
      nextButton.enabled = scrollIndex < scrollIndexRange.max;
      previousButton.enabled = scrollIndex > scrollIndexRange.min;

      //TODO abstract Tween away, remove duplicate code, stop any animation that is already running
      // Set up the animation to scroll to the next location.
      if ( isHorizontal ) {
        new TWEEN.Tween( scrollingNode )
          .to( { left: -scrollIndex * scrollingDelta }, 400 )
          .easing( TWEEN.Easing.Cubic.InOut )
          .start();
      }
      else {
        new TWEEN.Tween( scrollingNode )
          .to( { top: -scrollIndex * scrollingDelta }, 400 )
          .easing( TWEEN.Easing.Cubic.InOut )
          .start();
      }
    } );

    // Hook up the scrolling nodes to the buttons.
    nextButton.addListener( function() {
      scrollIndex.set( scrollIndex.get() + 1 );
    } );
    previousButton.addListener( function() {
      scrollIndex.set( scrollIndex.get() - 1 );
    } );

    options.children = [ backgroundNode, windowNode, nextButton, previousButton, backgroundOutline ];
    Node.call( this, options );
  }

  return inherit( Node, Carousel, {}, {

    // @static @public (read-only)
    DEFAULT_OPTIONS: DEFAULT_OPTIONS
  } );
} );
