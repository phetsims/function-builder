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
   * @param {Node} foregroundAnimationLayer
   * @param {Object} [options]
   * @constructor
   */
  function CardNode( card, contentNode, inputContainer, outputContainer, builderNode, dragLayer, foregroundAnimationLayer, options ) {

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
    this.foregroundAnimationLayer = foregroundAnimationLayer;

    var backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height,
      _.pick( options, 'cornerRadius', 'fill', 'stroke', 'lineWidth', 'lineDash' ) );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, contentNode ];
    contentNode.center = backgroundNode.center;

    var builder = builderNode.builder;

    var dragDirection = null; // {string} 'left'|'right'

    assert && assert( !options.startDrag );
    options.startDrag = function() {

      dragDirection = 'right';

      if ( inputContainer.containsNode( thisNode ) ) {

        // card is in the input carousel, pop it out
        inputContainer.removeNode( thisNode );
        dragLayer.addChild( thisNode );
        card.moveTo( inputContainer.carouselLocation.plus( FBConstants.CARD_POP_OUT_OFFSET ) );
        builderNode.addMole( thisNode );
      }
      else if ( outputContainer.containsNode( thisNode ) ) {

        // card is in the output carousel, pop it out
        outputContainer.removeNode( thisNode );
        dragLayer.addChild( thisNode );
        card.moveTo( outputContainer.carouselLocation.plus( FBConstants.CARD_POP_OUT_OFFSET ) );
        builderNode.addMole( thisNode );
      }
      else if ( foregroundAnimationLayer.hasChild( thisNode ) ) {

        // card was animating back to carousel when user grabbed it
        foregroundAnimationLayer.removeChild( thisNode );
        dragLayer.addChild( thisNode );
      }
      else {

        // card was grabbed while in dragLayer, do nothing
        assert && assert( dragLayer.hasChild( thisNode ) );
      }

      assert && assert( dragLayer.hasChild( thisNode ) );
    };

    // Constrain the user's dragging
    assert && assert( !options.translateMovable );
    options.translateMovable = function( movable, location, delta ) {
      dragDirection = ( delta.x < 0 ) ? 'left' : 'right';
      var y = 0;
      if ( location.x < ( builder.left - thisNode.width / 2 ) ) {

        // to the left of the builder, drag along the line between input carousel and builder input slot
        y = slopeLeft * ( location.x - inputContainer.carouselLocation.x ) + inputContainer.carouselLocation.y; // y = m(x-x1) + y1
        movable.moveTo( new Vector2( location.x, y ) );
      }
      else if ( location.x > ( builder.right + thisNode.width / 2 ) ) {

        // to the right of the builder, drag along the line between builder output slot and output carousel
        y = slopeRight * ( location.x - ( builder.right + thisNode.width / 2 ) ) + builder.location.y; // y = m(x-x1) + y1
        movable.moveTo( new Vector2( location.x, y ) );
      }
      else {

        // in the builder, drag 
        movable.moveTo( new Vector2( location.x, builder.location.y ) );
      }
    };

    // When the user stops dragging a function, decide what to do with it.
    assert && assert( !options.endDrag );
    options.endDrag = function() {

      if ( card.locationProperty.get().x < ( builder.left - thisNode.width ) ) {

        // card is to left of builder, return it to input carousel
        thisNode.returnToInputCarousel();
        builderNode.removeMole( thisNode );
      }
      else if ( card.locationProperty.get().x > builder.right + thisNode.width ) {

        // card is to right of builder, animate to output carousel
        thisNode.pickable = false;
        card.animateTo( outputContainer.carouselLocation,
          FBConstants.CARD_ANIMATION_SPEED,
          function() {
            dragLayer.removeChild( thisNode );
            outputContainer.addNode( thisNode );
            builderNode.removeMole( thisNode );
            thisNode.pickable = true;
          } );
      }
      else { // card is in the builder

        this.pickable = false;

        if ( dragDirection === 'right' ) {

          // snap to input slot if outside the builder
          if ( card.locationProperty.get().x < builder.left ) {
            card.moveTo( new Vector2( builder.left, builder.location.y ) );
          }

          // animate left-to-right through the builder, then to output carousel
          card.animateTo( new Vector2( builder.right + thisNode.width, builder.location.y ),
            FBConstants.CARD_ANIMATION_SPEED,
            function() {
              card.animateTo( outputContainer.carouselLocation,
                FBConstants.CARD_ANIMATION_SPEED,
                function() {
                  dragLayer.removeChild( thisNode );
                  outputContainer.addNode( thisNode );
                  builderNode.removeMole( thisNode );
                  thisNode.pickable = true;
                } );
            } );
        }
        else {
          assert && assert( dragDirection === 'left', 'invalid dragDirection: ' + dragDirection );

          // snap to output slot if outside the builder
          if ( card.locationProperty.get().x > builder.right ) {
            card.moveTo( new Vector2( builder.right, builder.location.y ) );
          }

          // animate right-to-left through the builder, then to input carousel
          card.animateTo( new Vector2( builder.left - thisNode.width, builder.location.y ),
            FBConstants.CARD_ANIMATION_SPEED,
            function() {
              card.animateTo( inputContainer.carouselLocation,
                FBConstants.CARD_ANIMATION_SPEED,
                function() {
                  dragLayer.removeChild( thisNode );
                  inputContainer.addNode( thisNode );
                  builderNode.removeMole( thisNode );
                  thisNode.pickable = true;
                } );
            } );
        }
      }
    };

    card.locationProperty.link( function( location ) {
      //TODO change card image based on location relative to builder slots
    } );

    MovableNode.call( this, card, options );

    // Compute below here need to be done after supertype constructor call, so the Node has valid bounds

    // slope of line between input carousel and builder's input slot, m = (y2-y1)/(x2-x1)
    var slopeLeft = ( builder.location.y - inputContainer.carouselLocation.y ) / ( ( builder.left - thisNode.width / 2 ) - inputContainer.carouselLocation.x );

    // slope of line between builder's output slot and output carousel, m = (y2-y1)/(x2-x1)
    var slopeRight = ( outputContainer.carouselLocation.y - builder.location.y ) / ( outputContainer.carouselLocation.x - ( builder.right + thisNode.width / 2 ) );
  }

  functionBuilder.register( 'CardNode', CardNode );

  return inherit( MovableNode, CardNode, {

    /**
     * Returns this card to the input carousel.
     *
     * @param {Object} [options]
     * @public
     */
    returnToInputCarousel: function( options ) {

      options = _.extend( {
        animate: true, // true: animate back to carousel, false: move immediate back to carousel
        animationSpeed: FBConstants.CARD_ANIMATION_SPEED
      }, options );

      if ( !this.inputContainer.containsNode( this ) ) {

        this.pickable = false; // prevent user from grabbing card

        if ( this.outputContainer.containsNode( this ) ) {

          // if in the output container, move to the foreground
          this.outputContainer.removeNode( this );
          this.foregroundAnimationLayer.addChild( this );
        }
        else if ( this.dragLayer.hasChild( this ) ) {

          // if in the drag layer, move to the foreground
          this.dragLayer.removeChild( this );
          this.foregroundAnimationLayer.addChild( this );
        }
        assert && assert( this.foregroundAnimationLayer.hasChild( this ) );

        if ( options.animate ) {

          // animate to the input carousel
          var thisNode = this;
          this.card.animateTo( this.inputContainer.carouselLocation,
            options.animationSpeed,
            function() {
              thisNode.foregroundAnimationLayer.removeChild( thisNode );
              thisNode.inputContainer.addNode( thisNode );
              thisNode.pickable = true;
            } );
        }
        else {

          // move immediately to the input carousel
          this.foregroundAnimationLayer.removeChild( this );
          this.card.moveTo( this.inputContainer.carouselLocation );
          this.inputContainer.addNode( this );
          this.pickable = true;
        }
      }
    }
  } );
} );
