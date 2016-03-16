// Copyright 2016, University of Colorado Boulder

/**
 * Base type for card nodes.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var MovableNode = require( 'FUNCTION_BUILDER/common/view/MovableNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {ImageFunction} card
   * @param {ImageFunctionContainer} inputContainer
   * @param {ImageFunctionContainer} outputContainer
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer
   * @param {Node} animationLayer
   * @param {Object} [options]
   * @constructor
   */
  function CardNode( card, inputContainer, outputContainer, builderNode, dragLayer, animationLayer, options ) {

    options = _.extend( {
      size: FBConstants.CARD_SIZE,
      cornerRadius: FBConstants.CARD_CORNER_RADIUS,
      fill: 'white',
      stroke: 'black',
      lineWidth: 1,
      lineDash: null
    }, options );

    var thisNode = this;

    // @protected
    this.card = card;
    this.inputContainer = inputContainer;
    this.outputContainer = outputContainer;
    this.builderNode = builderNode;
    this.dragLayer = dragLayer;
    this.animationLayer = animationLayer;

    // @protected
    this.backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height,
      _.pick( options, 'cornerRadius', 'fill', 'stroke', 'lineWidth', 'lineDash' ) );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ this.backgroundNode ];

    var builder = builderNode.builder;

    var MIN_DISTANCE = options.size.width; // minimum distance for card to be considered 'in' slot
    var INPUT_SLOT_X = builder.left - MIN_DISTANCE; // x coordinate where card is considered to be 'in' input slot
    var OUTPUT_SLOT_X = builder.right + MIN_DISTANCE; // x coordinate where card is considered to be 'in' output slot

    var dragDx = 0; // {number} most recent change in x while dragging
    var slopeLeft = 0; // {number} slope of the line connecting the input carousel and builder input slot
    var slopeRight = 0; // {number} slope of the line connecting the ouptut carousel and builder input slot

    assert && assert( !options.startDrag );
    options.startDrag = function() {

      dragDx = 0;

      var leftPoint = inputContainer.carouselLocation;
      var rightPoint = outputContainer.carouselLocation;

      if ( inputContainer.containsNode( thisNode ) ) {

        // card is in the input carousel, pop it out
        inputContainer.removeNode( thisNode );
        card.moveTo( inputContainer.carouselLocation.plus( FBConstants.CARD_POP_OUT_OFFSET ) );
        dragLayer.addChild( thisNode );

        // adjust for pop-out offset
        leftPoint = card.locationProperty.get();
      }
      else if ( outputContainer.containsNode( thisNode ) ) {

        // card is in the output carousel, pop it out
        outputContainer.removeNode( thisNode );
        card.moveTo( outputContainer.carouselLocation.plus( FBConstants.CARD_POP_OUT_OFFSET ) );
        dragLayer.addChild( thisNode );

        // adjust for pop-out offset
        rightPoint = card.locationProperty.get();
      }
      else {
        //TODO card was grabbed while paused in 'see inside' window
      }
      assert && assert( dragLayer.hasChild( thisNode ) );

      // slope of line between input carousel and builder's input slot, m = (y2-y1)/(x2-x1)
      slopeLeft = ( leftPoint.y - builder.location.y ) / ( leftPoint.x - INPUT_SLOT_X );

      // slope of line between output carousel and builder's output slot, m = (y2-y1)/(x2-x1)
      slopeRight = ( rightPoint.y - builder.location.y ) / ( rightPoint.x - OUTPUT_SLOT_X );
    };

    // Constrain the user's dragging
    assert && assert( !options.translateMovable );
    options.translateMovable = function( movable, location, delta ) {
      dragDx = delta.x;
      var y = 0;
      if ( location.x < INPUT_SLOT_X ) {

        // to the left of the builder, drag along the line between input carousel and builder input slot
        y = slopeLeft * ( location.x - INPUT_SLOT_X ) + builder.location.y; // y = m(x-x1) + y1
        movable.moveTo( new Vector2( location.x, y ) );
      }
      else if ( location.x > OUTPUT_SLOT_X ) {

        // to the right of the builder, drag along the line between output carousel and builder output
        y = slopeRight * ( location.x - OUTPUT_SLOT_X ) + builder.location.y; // y = m(x-x1) + y1
        movable.moveTo( new Vector2( location.x, y ) );
      }
      else {

        //TODO constrain dragging to the left for non-invertible functions
        // in the builder, drag horizontally
        movable.moveTo( new Vector2( location.x, builder.location.y ) );
      }
    };

    // When the user stops dragging a function, animate it to the proper location
    assert && assert( !options.endDrag );
    options.endDrag = function() {

      // move card to animation layer
      dragLayer.removeChild( thisNode );
      animationLayer.addChild( thisNode );

      if ( card.locationProperty.get().x < INPUT_SLOT_X ) {

        // card is to left of builder, animate to input carousel
        thisNode.animateToContainer( inputContainer );
      }
      else if ( card.locationProperty.get().x > OUTPUT_SLOT_X ) {

        // card is to right of builder, animate to output carousel
        thisNode.animateToContainer( outputContainer );
      }
      else { // card is in the builder

        //TODO if 'see inside' feature is on, animate to next window
        //TODO constrain animation to the left for non-invertible functions

        if ( dragDx > 0 ) { // dragging to the right

          // snap to input slot if outside the builder
          if ( card.locationProperty.get().x < builder.left ) {
            card.moveTo( new Vector2( builder.left, builder.location.y ) );
          }

          // animate left-to-right through the builder, then to output carousel
          card.animateTo( new Vector2( OUTPUT_SLOT_X, builder.location.y ),
            FBConstants.CARD_ANIMATION_SPEED,
            function() {
              thisNode.animateToContainer( outputContainer );
            } );
        }
        else { // dragging to the left

          // snap to output slot if outside the builder
          if ( card.locationProperty.get().x > builder.right ) {
            card.moveTo( new Vector2( builder.right, builder.location.y ) );
          }

          // animate right-to-left through the builder, then to input carousel
          card.animateTo( new Vector2( INPUT_SLOT_X, builder.location.y ),
            FBConstants.CARD_ANIMATION_SPEED,
            function() {
              thisNode.animateToContainer( inputContainer );
            } );
        }
      }
    };

    MovableNode.call( this, card, options );

    // @protected Number of functions to apply is based on where the card is located relative to the function slots in the builder
    this.numberOfFunctionsToApplyProperty = new DerivedProperty( [ card.locationProperty ],
      function( location ) {
        for ( var i = builder.slots.length - 1; i >= 0; i-- ) {
         if ( location.x >= builder.slots[ i ].location.x ) {
            return i + 1;
         }
        }
        return 0;
      }
    );
  }

  functionBuilder.register( 'CardNode', CardNode );

  return inherit( MovableNode, CardNode, {

    /**
     * Animates this card to a container in a carousel.
     * @param {CardContainer} container
     * @private
     */
    animateToContainer: function( container ) {
      var thisNode = this;
      thisNode.card.animateTo( container.carouselLocation,
        FBConstants.CARD_ANIMATION_SPEED,
        function() {
          thisNode.animationLayer.removeChild( thisNode );
          container.addNode( thisNode );
        } );
    },

    /**
     * Returns this card immediately to the input carousel, no animation.
     * @public
     */
    returnToInputCarousel: function() {
      if ( !this.inputContainer.containsNode( this ) ) {

        // remove from other parents
        if ( this.outputContainer.containsNode( this ) ) { this.outputContainer.removeNode( this ); }
        if ( this.dragLayer.hasChild( this ) ) { this.dragLayer.removeChild( this ); }
        if ( this.animationLayer.hasChild( this ) ) { this.animationLayer.removeChild( this ); }

        // put card in the input carousel
        this.card.moveTo( this.inputContainer.carouselLocation );
        this.inputContainer.addNode( this );
      }
    }
  } );
} );
