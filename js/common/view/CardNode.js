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
  var FunctionSlot = require( 'FUNCTION_BUILDER/common/model/FunctionSlot' );
  var MovableNode = require( 'FUNCTION_BUILDER/common/view/MovableNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {ImageFunction} card
   * @param {ImageFunctionContainer} inputContainer
   * @param {ImageFunctionContainer} outputContainer
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer
   * @param {Property.<boolean>} seeInsideProperty
   * @param {Object} [options]
   * @constructor
   */
  function CardNode( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty, options ) {

    options = _.extend( {}, FBConstants.CARD_OPTIONS, options );

    var thisNode = this;

    // @public
    this.card = card;

    // @private
    this.inputContainer = inputContainer;
    this.builderNode = builderNode;
    this.dragLayer = dragLayer;

    // @protected the basic shape of a blank card
    this.backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height,
      _.pick( options, 'cornerRadius', 'fill', 'stroke', 'lineWidth', 'lineDash' ) );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ this.backgroundNode ];

    var builder = builderNode.builder;

    var MIN_DISTANCE = options.size.width; // minimum distance for card to be considered 'in' slot
    var INPUT_SLOT_X = builder.left - MIN_DISTANCE; // x coordinate where card is considered to be 'in' input slot
    var OUTPUT_SLOT_X = builder.right + MIN_DISTANCE; // x coordinate where card is considered to be 'in' output slot
    var BLOCKED_X_OFFSET = -( 0.4 * options.size.width ); // x offset from window location for a non-invertible function

    var dragDx = 0; // {number} most recent change in x while dragging
    var blocked = false; // {boolean} was dragging to the left blocked by a non-invertible function?
    var slopeLeft = 0; // {number} slope of the line connecting the input carousel and builder input slot
    var slopeRight = 0; // {number} slope of the line connecting the ouptut carousel and builder input slot

    //-------------------------------------------------------------------------------
    // start a drag cycle
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
        // card was grabbed while in 'see inside' window
      }
      assert && assert( dragLayer.hasChild( thisNode ), 'startDrag must move node to dragLayer' );

      // slope of line between input carousel and builder's input slot, m = (y2-y1)/(x2-x1)
      slopeLeft = ( leftPoint.y - builder.location.y ) / ( leftPoint.x - INPUT_SLOT_X );

      // slope of line between output carousel and builder's output slot, m = (y2-y1)/(x2-x1)
      slopeRight = ( rightPoint.y - builder.location.y ) / ( rightPoint.x - OUTPUT_SLOT_X );
    };

    //-------------------------------------------------------------------------------
    // constrain dragging
    assert && assert( !options.translateMovable );
    options.translateMovable = function( card, location, delta ) {

      blocked = false; // assume we're not blocked, because functions may be changing simultaneously via multi-touch
      dragDx = delta.x;

      var y = 0;

      if ( location.x > OUTPUT_SLOT_X ) {

        // to the right of the builder, drag along the line between output carousel and builder output
        y = slopeRight * ( location.x - OUTPUT_SLOT_X ) + builder.location.y; // y = m(x-x1) + y1
        card.moveTo( new Vector2( location.x, y ) );
      }
      else { // to left of builder's output slot

        // dragging to the left, check to see if blocked by a non-invertible function
        if ( dragDx < 0 ) {
          for ( var i = builder.slots.length - 1; i >= 0 && !blocked; i-- ) {
            var slot = builder.slots[ i ];
            if ( card.locationProperty.get().x > slot.location.x ) { // only slots to the left
              var windowLocation = builder.getWindowLocation( i );

              // block when left edge of card is slightly past left edge of 'see inside' window for a non-invertible function
              var blockedX = windowLocation.x + BLOCKED_X_OFFSET;
              if ( !slot.isInvertible() && location.x < blockedX ) {
                blocked = true;
                card.moveTo( new Vector2( blockedX, builder.location.y ) );
                thisNode.builderNode.getFunctionNode( i ).startNotInvertibleAnimation();
              }
            }
          }
        }

        if ( !blocked ) {

          if ( location.x < INPUT_SLOT_X ) {

            // to the left of the builder, drag along the line between input carousel and builder input slot
            y = slopeLeft * ( location.x - INPUT_SLOT_X ) + builder.location.y; // y = m(x-x1) + y1
            card.moveTo( new Vector2( location.x, y ) );
          }
          else {

            // in the builder, dragging horizontally
            card.moveTo( new Vector2( location.x, builder.location.y ) );
          }
        }
      }
    };

    //-------------------------------------------------------------------------------
    // end a drag cycle
    assert && assert( !options.endDrag );
    options.endDrag = function() {

      assert && assert( dragLayer.hasChild( thisNode ), 'endDrag: card should be in dragLayer' );

      var cardX = card.locationProperty.get().x;
      var windowNumber; // {number}
      var windowLocation; // {Vector2}

      if ( cardX < INPUT_SLOT_X ) {

        // card is to left of builder, animate to input carousel
        thisNode.animateToContainer( inputContainer );
      }
      else if ( cardX > OUTPUT_SLOT_X ) {

        // card is to right of builder, animate to output carousel
        thisNode.animateToContainer( outputContainer );
      }
      else { // card is in the builder

        if ( dragDx >= 0 || blocked ) { // dragging to the right or blocked by a non-invertible function

          // snap to input slot if outside the builder
          if ( cardX < builder.left ) {
            card.moveTo( new Vector2( builder.left, builder.location.y ) );
          }

          windowNumber = builder.getRightWindowNumber( card.locationProperty.get() );
          if ( seeInsideProperty.get() && builder.isValidWindowNumber( windowNumber ) ) {

            // animate to 'see inside' window to right of card
            windowLocation = builder.getWindowLocation( windowNumber );
            card.animateTo( windowLocation );
          }
          else {

            // animate left-to-right through the builder, then to output carousel
            card.animateTo( new Vector2( OUTPUT_SLOT_X, builder.location.y ),
              function() {
                thisNode.animateToContainer( outputContainer );
              } );
          }
        }
        else { // dragging to the left

          // snap to output slot if outside the builder
          if ( cardX > builder.right ) {
            card.moveTo( new Vector2( builder.right, builder.location.y ) );
          }

          var blockedSlotNumber = FunctionSlot.NO_SLOT_NUMBER;
          for ( var i = builder.slots.length - 1; i >= 0; i-- ) {
            var slot = builder.slots[ i ];
            if ( card.locationProperty.get().x > slot.location.x && !slot.isInvertible() ) { // only slots to the left
              blockedSlotNumber = i;
              break;
            }
          }

          if ( builder.isValidSlotNumber( blockedSlotNumber ) ) {

            // animate to non-invertible function, then reverse direction to window or output carousel
            windowLocation = builder.getWindowLocation( blockedSlotNumber );
            var blockedX = windowLocation.x + BLOCKED_X_OFFSET;
            card.animateTo( new Vector2( blockedX, windowLocation.y ),
              function() {
                thisNode.builderNode.getFunctionNode( blockedSlotNumber ).startNotInvertibleAnimation();
                if ( seeInsideProperty.get() ) {

                  // animate to 'see inside' window associated with blocked slot
                  card.animateTo( windowLocation );
                }
                else {

                  // animate to output carousel
                  card.animateTo( new Vector2( OUTPUT_SLOT_X, builder.location.y ),
                    function() {
                      thisNode.animateToContainer( outputContainer );
                    } );
                }
              } );
          }
          else {

            // all functions are invertible
            windowNumber = builder.getLeftWindowNumber( card.locationProperty.get() );
            if ( seeInsideProperty.get() && builder.isValidWindowNumber( windowNumber ) ) {

              // animate to 'see inside' window to the left of card
              windowLocation = builder.getWindowLocation( windowNumber );
              card.animateTo( windowLocation );
            }
            else {

              // animate right-to-left through the builder, then to input carousel
              card.animateTo( new Vector2( INPUT_SLOT_X, builder.location.y ),
                function() {
                  thisNode.animateToContainer( inputContainer );
                } );
            }
          }
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

    // unlink unnecessary, instances exist for lifetime of the sim
    this.numberOfFunctionsToApplyProperty.link( function( numberOfFunctionsToApply ) {
      thisNode.updateContent( builder, numberOfFunctionsToApply );
    } );

    // Updates any cards that are not in the input carousel when any function in the builder changes.
    // removeListener unnecessary, instances exist for the lifetime of the sim.
    builderNode.builder.functionChangedEmitter.addListener( function() {
      if ( !inputContainer.containsNode( thisNode ) ) {
        thisNode.updateContent( builder, thisNode.numberOfFunctionsToApplyProperty.get() );
      }
    } );
  }

  functionBuilder.register( 'CardNode', CardNode );

  return inherit( MovableNode, CardNode, {

    /**
     * Updates the card's content, based on where the card is relative the the builder slots.
     * @param {Builder} builder
     * @param {number} numberOfFunctionsToApply - how many functions to apply from the builder
     * @protected
     */
    updateContent: function( builder, numberOfFunctionsToApply ) {
      throw new Error( 'must be implemented by subtype' );
    },

    /**
     * Animates this card to a container in a carousel.
     * @param {CardContainer} container
     * @private
     */
    animateToContainer: function( container ) {
      assert && assert( this.dragLayer.hasChild( this ), 'card should be in dragLayer' );
      var thisNode = this;
      thisNode.card.animateTo( container.carouselLocation,
        function() {
          thisNode.dragLayer.removeChild( thisNode );
          container.addNode( thisNode );
        } );
    },

    /**
     * Moves this card immediately to the input carousel, no animation.
     * @public
     */
    moveToInputCarousel: function() {
      assert && assert( !this.inputContainer.containsNode( this ) );
      if ( this.dragLayer.hasChild( this ) ) {
        this.dragLayer.removeChild( this );
      }
      this.inputContainer.addNode( this );
    }
  } );
} );
