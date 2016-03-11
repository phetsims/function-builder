// Copyright 2016, University of Colorado Boulder

/**
 * Base type for card nodes.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var MovableNode = require( 'FUNCTION_BUILDER/common/view/MovableNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {ImageFunction} card
   * @param {Node} contentNode
   * @param {ImageFunctionContainer} inputContainer
   * @param {ImageFunctionContainer} outputContainer
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer
   * @param {Node} animationLayer
   * @param {Object} [options]
   * @constructor
   */
  function CardNode( card, contentNode, inputContainer, outputContainer, builderNode, dragLayer, animationLayer, options ) {

    options = _.extend( {
      size: FBConstants.CARD_SIZE,
      cornerRadius: FBConstants.CARD_CORNER_RADIUS,
      fill: 'white',
      stroke: 'black',
      lineWidth: 1,
      lineDash: null
    }, options );

    var thisNode = this;

    // @private
    this.card = card;
    this.inputContainer = inputContainer;
    this.outputContainer = outputContainer;
    this.builderNode = builderNode;
    this.dragLayer = dragLayer;
    this.animationLayer = animationLayer;

    var backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height,
      _.pick( options, 'cornerRadius', 'fill', 'stroke', 'lineWidth', 'lineDash' ) );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, contentNode ];
    contentNode.center = backgroundNode.center;

    var builder = builderNode.builder;

    var MIN_DISTANCE = options.size.width; // minimum distance for card to be considered 'in' slot
    var dragDx = 0; // {number} most recent change in x while dragging

    //TODO compute slopes and carouselLocation in options.startDrag
    // slope of line between input carousel and builder's input slot, m = (y2-y1)/(x2-x1)
    var slopeLeft = ( builder.location.y - inputContainer.carouselLocation.y ) / ( ( builder.left - MIN_DISTANCE ) - inputContainer.carouselLocation.x );

    // slope of line between builder's output slot and output carousel, m = (y2-y1)/(x2-x1)
    var slopeRight = ( outputContainer.carouselLocation.y - builder.location.y ) / ( outputContainer.carouselLocation.x - ( builder.right + MIN_DISTANCE ) );

    assert && assert( !options.startDrag );
    options.startDrag = function() {

      dragDx = 0;

      if ( inputContainer.containsNode( thisNode ) ) {

        // card is in the input carousel, pop it out
        inputContainer.removeNode( thisNode );
        card.moveTo( inputContainer.carouselLocation.plus( FBConstants.CARD_POP_OUT_OFFSET ) );
        dragLayer.addChild( thisNode );
      }
      else if ( outputContainer.containsNode( thisNode ) ) {

        // card is in the output carousel, pop it out
        outputContainer.removeNode( thisNode );
        card.moveTo( outputContainer.carouselLocation.plus( FBConstants.CARD_POP_OUT_OFFSET ) );
        dragLayer.addChild( thisNode );
      }
      else {

        //TODO card was grabbed while paused in 'see inside' window
      }

      assert && assert( dragLayer.hasChild( thisNode ) );
    };

    // Constrain the user's dragging
    assert && assert( !options.translateMovable );
    options.translateMovable = function( movable, location, delta ) {
      dragDx = delta.x;
      var y = 0;
      if ( location.x < ( builder.left - MIN_DISTANCE ) ) {

        // to the left of the builder, drag along the line between input carousel and builder input slot
        y = slopeLeft * ( location.x - inputContainer.carouselLocation.x ) + inputContainer.carouselLocation.y; // y = m(x-x1) + y1
        movable.moveTo( new Vector2( location.x, y ) );
      }
      else if ( location.x > ( builder.right + MIN_DISTANCE ) ) {

        // to the right of the builder, drag along the line between builder output slot and output carousel
        y = slopeRight * ( location.x - ( builder.right + MIN_DISTANCE ) ) + builder.location.y; // y = m(x-x1) + y1
        movable.moveTo( new Vector2( location.x, y ) );
      }
      else {

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

      if ( card.locationProperty.get().x < ( builder.left - MIN_DISTANCE ) ) {

        // card is to left of builder, animate to input carousel
        card.animateTo( inputContainer.carouselLocation,
          FBConstants.CARD_ANIMATION_SPEED,
          function() {
            animationLayer.removeChild( thisNode );
            inputContainer.addNode( thisNode );
          } );
      }
      else if ( card.locationProperty.get().x > builder.right + MIN_DISTANCE ) {

        // card is to right of builder, animate to output carousel
        card.animateTo( outputContainer.carouselLocation,
          FBConstants.CARD_ANIMATION_SPEED,
          function() {
            animationLayer.removeChild( thisNode );
            outputContainer.addNode( thisNode );
          } );
      }
      else { // card is in the builder

        if ( dragDx > 0 ) { // dragging to the right

          // snap to input slot if outside the builder
          if ( card.locationProperty.get().x < builder.left ) {
            card.moveTo( new Vector2( builder.left, builder.location.y ) );
          }

          // animate left-to-right through the builder, then to output carousel
          card.animateTo( new Vector2( builder.right + MIN_DISTANCE, builder.location.y ),
            FBConstants.CARD_ANIMATION_SPEED,
            function() {
              card.animateTo( outputContainer.carouselLocation,
                FBConstants.CARD_ANIMATION_SPEED,
                function() {
                  animationLayer.removeChild( thisNode );
                  outputContainer.addNode( thisNode );
                } );
            } );
        }
        else { // dragging to the left

          // snap to output slot if outside the builder
          if ( card.locationProperty.get().x > builder.right ) {
            card.moveTo( new Vector2( builder.right, builder.location.y ) );
          }

          // animate right-to-left through the builder, then to input carousel
          card.animateTo( new Vector2( builder.left - MIN_DISTANCE, builder.location.y ),
            FBConstants.CARD_ANIMATION_SPEED,
            function() {
              card.animateTo( inputContainer.carouselLocation,
                FBConstants.CARD_ANIMATION_SPEED,
                function() {
                  animationLayer.removeChild( thisNode );
                  inputContainer.addNode( thisNode );
                } );
            } );
        }
      }
    };

    card.locationProperty.link( function( location ) {
      //TODO change card image based on location relative to builder slots
    } );

    MovableNode.call( this, card, options );
  }

  functionBuilder.register( 'CardNode', CardNode );

  return inherit( MovableNode, CardNode, {

    // @public Returns card immediately to the input carousel, no animation.
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
