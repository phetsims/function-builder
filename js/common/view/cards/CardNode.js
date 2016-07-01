// Copyright 2016, University of Colorado Boulder

/**
 * Abstract base type for card nodes.
 * All drag handling and animation behavior for cards is encapsulated here.
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
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * NOTE: The relatively large number of constructor parameters here is a tradeoff. There are many things
   * involved in drag handling and animation. I could have reduced the number of parameters by distributing
   * the responsibility for drag handling and animation. But encapsulating all responsibilities here seemed
   * like a superior solution.  So I chose encapsualtion at the expense of some increased coupling.
   * See discussion in https://github.com/phetsims/function-builder/issues/77
   *
   * @param {Card} card
   * @param {Node} contentNode - what appears on the card
   * @param {FunctionContainer} inputContainer - container in the input carousel
   * @param {FunctionContainer} outputContainer - container in the output carousel
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer - parent for this node when it's being dragged or animating
   * @param {Property.<boolean>} seeInsideProperty - are the 'See Inside' windows visible?
   * @param {Object} [options]
   * @constructor
   */
  function CardNode( card, contentNode, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty, options ) {

    options = _.extend( {}, FBConstants.CARD_OPTIONS, options );

    var thisNode = this;

    // @protected the basic shape of a blank card
    var backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height,
      _.pick( options, 'cornerRadius', 'fill', 'stroke', 'lineWidth', 'lineDash' ) );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, contentNode ];

    var builder = builderNode.builder;

    var MIN_DISTANCE = options.size.width; // minimum distance for card to be considered 'in' slot
    var INPUT_SLOT_X = builder.left - MIN_DISTANCE; // x coordinate where card is considered to be 'in' input slot
    var OUTPUT_SLOT_X = builder.right + MIN_DISTANCE; // x coordinate where card is considered to be 'in' output slot
    var BLOCKED_X_OFFSET = ( 0.4 * options.size.width ); // how far to move card to left of window for a non-invertible function

    var dragDx = 0; // most recent change in x while dragging
    var blocked = false; // was dragging to the left blocked by a non-invertible function?
    var slopeLeft = 0; // slope of the line connecting the input carousel and builder input slot
    var slopeRight = 0; // slope of the line connecting the output carousel and builder input slot

    //-------------------------------------------------------------------------------
    // start a drag cycle
    assert && assert( !options.startDrag );
    options.startDrag = function() {

      dragDx = 0;

      // points used to compute slope of line between input/output carousels and input/output builder slots
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

      // the card most recently grabbed is in the front
      thisNode.moveToFront();

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

        // card is to the right of the builder, drag along the line between output carousel and builder output
        y = slopeRight * ( location.x - OUTPUT_SLOT_X ) + builder.location.y; // y = m(x-x1) + y1
        card.moveTo( new Vector2( location.x, y ) );
      }
      else { // to left of builder's output slot

        // dragging to the left, check to see if blocked by a non-invertible function
        if ( dragDx < 0 ) {
          for ( var i = builder.numberOfSlots - 1; i >= 0 && !blocked; i-- ) {

            var slot = builder.slots[ i ];

            // if slot is to the left of where the card currently is ...
            if ( card.locationProperty.get().x > slot.location.x ) {

              var windowLocation = builder.getWindowLocation( i );

              // card has hit a non-invertible function
              if ( !slot.isInvertible() && location.x < windowLocation.x ) {

                blocked = true;
                thisNode.builderNode.getFunctionNode( i ).startNotInvertibleAnimation();

                // allow left edge of card to be dragged slightly past left edge of 'see inside' window
                var blockedX = windowLocation.x - BLOCKED_X_OFFSET;
                if ( location.x > blockedX ) {
                  card.moveTo( new Vector2( location.x, builder.location.y ) );

                }
                else {
                  card.moveTo( new Vector2( blockedX, builder.location.y ) );
                }
              }
            }
          }
        }

        if ( !blocked ) {
          if ( location.x < INPUT_SLOT_X ) {

            // card is to the left of the builder, drag along the line between input carousel and builder input slot
            y = slopeLeft * ( location.x - INPUT_SLOT_X ) + builder.location.y; // y = m(x-x1) + y1
            card.moveTo( new Vector2( location.x, y ) );
          }
          else {

            // card is in the builder, dragging horizontally
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

      if ( cardX < INPUT_SLOT_X ) {

        // card is to left of builder, animate to input carousel
        thisNode.animateToCarousel( inputContainer );
      }
      else if ( cardX > OUTPUT_SLOT_X ) {

        // card is to right of builder, animate to output carousel
        thisNode.animateToCarousel( outputContainer );
      }
      else { // card is in the builder

        if ( dragDx >= 0 || blocked ) { // dragging to the right or blocked by a non-invertible function

          // snap to input slot
          if ( cardX < builder.left ) {
            card.moveTo( new Vector2( builder.left, builder.location.y ) );
          }

          thisNode.animateLeftToRight( OUTPUT_SLOT_X );
        }
        else { // dragging to the left

          // snap to output slot
          if ( cardX > builder.right ) {
            card.moveTo( new Vector2( builder.right, builder.location.y ) );
          }

          thisNode.animateRightToLeft( INPUT_SLOT_X, OUTPUT_SLOT_X, BLOCKED_X_OFFSET );
        }
      }
    };

    // Number of functions to apply is based on where the card is located relative to the function slots in the builder
    var numberOfFunctionsToApplyProperty = new DerivedProperty( [ card.locationProperty ],
      function( location ) {
        for ( var i = builder.numberOfSlots - 1; i >= 0; i-- ) {
          if ( location.x >= builder.slots[ i ].location.x ) {
            return i + 1;
          }
        }
        return 0;
      }
    );

    MovableNode.call( this, card, options );

    //------------------------------------------------------------------------------------------------------------------
    // Define properties in one place, so we can see what's available and document visibility

    // @public
    this.card = card;

    // @protected
    this.backgroundNode = backgroundNode;

    // @private
    this.inputContainer = inputContainer;
    this.outputContainer = outputContainer;
    this.builderNode = builderNode;
    this.dragLayer = dragLayer;
    this.seeInsideProperty = seeInsideProperty;

    //------------------------------------------------------------------------------------------------------------------

    // unlink unnecessary, instances exist for lifetime of the sim
    numberOfFunctionsToApplyProperty.link( function( numberOfFunctionsToApply ) {
      thisNode.updateContent( builder, numberOfFunctionsToApply );
    } );

    // Updates any cards that are not in the input carousel when any function in the builder changes.
    // removeListener unnecessary, instances exist for the lifetime of the sim.
    builderNode.builder.functionChangedEmitter.addListener( function() {
      if ( !inputContainer.containsNode( thisNode ) ) {
        thisNode.updateContent( builder, numberOfFunctionsToApplyProperty.get() );
      }
    } );

    // When 'See Inside' is turned off, flush out any cards that are stopped in windows.
    // unlink unnecessary, instances exist for lifetime of the sim
    seeInsideProperty.lazyLink( function( seeInside ) {
      if ( !seeInside && !card.isAnimating() && dragLayer.hasChild( thisNode ) ) {
        thisNode.animateLeftToRight( OUTPUT_SLOT_X );
      }
    } );
  }

  functionBuilder.register( 'CardNode', CardNode );

  return inherit( MovableNode, CardNode, {

    /**
     * Updates the card's content, based on where the card is relative the the builder slots.
     *
     * @param {Builder} builder
     * @param {number} numberOfFunctionsToApply - how many functions to apply from the builder
     * @protected
     * @abstract
     */
    updateContent: function( builder, numberOfFunctionsToApply ) {
      throw new Error( 'must be implemented by subtype' );
    },

    /**
     * Animates this card to a container in a carousel.
     *
     * @param {CardContainer} container
     * @private
     */
    animateToCarousel: function( container ) {
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
     * If the card is already in the input carousel, this is a no-op.
     *
     * @public
     */
    moveToInputCarousel: function() {

      if ( this.dragLayer.hasChild( this ) ) {

        // remove from drag layer
        this.cancelDrag();
        this.dragLayer.removeChild( this );
      }
      else if ( this.outputContainer.containsNode( this ) ) {

        // remove from output carousel
        this.outputContainer.removeNode( this );
      }

      // move to input carousel
      if ( !this.inputContainer.containsNode( this ) ) {
        this.inputContainer.addNode( this );
      }
    },

    /**
     * Animates left-to-right through the builder, stopping at the first 'See Inside' window that's visible.
     * If no 'See Inside' window is visible, the card continues to the output carousel.
     *
     * @param outputSlotX - x coordinate where card is considered to be in the output slot
     * @private
     */
    animateLeftToRight: function( outputSlotX ) {
      assert && assert( this.dragLayer.hasChild( this ), 'card should be in dragLayer' );

      var thisNode = this;
      var builder = thisNode.builderNode.builder;
      var windowNumber = builder.getRightWindowNumber( thisNode.card.locationProperty.get().x );

      if ( builder.isValidWindowNumber( windowNumber ) ) {

        // animate to 'See Inside' window to right of card
        var windowLocation = builder.getWindowLocation( windowNumber );
        thisNode.card.animateTo( windowLocation, function() {

          // if 'See Inside' is not enabled, continue to next window
          if ( !thisNode.seeInsideProperty.get() ) {
            thisNode.animateLeftToRight( outputSlotX );
          }
        } );
      }
      else {

        // animate to output slot, then to output carousel
        thisNode.card.animateTo( new Vector2( outputSlotX, builder.location.y ),
          function() {
            thisNode.animateToCarousel( thisNode.outputContainer );
          } );
      }
    },

    /**
     * Animates right-to-left through the builder, stopping at the first 'See Inside' window that's visible.
     * If no 'See Inside' window is visible, the card continues to the input carousel.  If an non-invertible
     * function is encountered at any time, then the card reverses direction (see animateLeftToRight).
     *
     * @param {number} inputSlotX - x coordinate where card is considered to be in the input slot
     * @param {number} outputSlotX - x coordinate where card is considered to be in the output slot
     * @param {number} blockedXOffset - how far to move card to left of window for a non-invertible function
     * @private
     */
    animateRightToLeft: function( inputSlotX, outputSlotX, blockedXOffset ) {
      assert && assert( this.dragLayer.hasChild( this ), 'card should be in dragLayer' );

      var thisNode = this;
      var builder = thisNode.builderNode.builder;
      var windowNumber = builder.getLeftWindowNumber( thisNode.card.locationProperty.get().x );

      if ( builder.isValidWindowNumber( windowNumber ) ) {

        // animate to 'See Inside' window to left of card
        var windowLocation = builder.getWindowLocation( windowNumber );
        thisNode.card.animateTo( windowLocation, function() {

          var slot = builder.slots[ windowNumber ];

          if ( !slot.isEmpty() && !slot.functionInstance.invertible ) {

            // encountered a non-invertible function, go slightly past it, then reverse direction
            thisNode.builderNode.getFunctionNode( windowNumber ).startNotInvertibleAnimation();
            thisNode.card.animateTo( new Vector2( windowLocation.x - blockedXOffset, windowLocation.y ),
              function() {
                thisNode.animateLeftToRight( outputSlotX );
              } );
          }
          else if ( !thisNode.seeInsideProperty.get() ) {

            // if 'See Inside' is not enabled, continue to next window
            thisNode.animateRightToLeft( inputSlotX, outputSlotX, blockedXOffset );
          }
        } );
      }
      else {

        // animate to input slot, then to input carousel
        thisNode.card.animateTo( new Vector2( inputSlotX, builder.location.y ),
          function() {
            thisNode.animateToCarousel( thisNode.inputContainer );
          } );
      }
    }
  }, {

    /**
     * Creates a 'ghost' card that appears in an empty carousel.
     * The card has a dashed outline and its content is transparent.
     *
     * @param {Node} contentNode - what appears on the card
     * @param {Object} [options]
     * @returns {Node}
     * @public
     * @static
     */
    createGhostNode: function( contentNode, options ) {

      options = _.extend( {}, FBConstants.CARD_OPTIONS, options );
      options.lineDash = [ 4, 4 ];
      options.opacity = 0.5;

      var backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height,
        _.pick( options, 'cornerRadius', 'fill', 'stroke', 'lineWidth', 'lineDash' ) );

      // center content on background
      contentNode.center = backgroundNode.center;

      assert && assert( !options.children, 'decoration not supported' );
      options.children = [ backgroundNode, contentNode ];

      return new Node( options );
    },

    /**
     * Creates a card-like icon for x or y symbol, for use in equations.
     *
     * @param {Node} xyNode - the symbol on the card
     * @param {Object} [options]
     * @returns {Node}
     * @public
     * @static
     */
    createEquationXYNode: function( xyNode, options ) {

      options = _.extend( {
        xMargin: 30,
        yMargin: 15,
        minHeight: 35
      }, FBConstants.CARD_OPTIONS, options );

      var backgroundHeight = Math.max( options.minHeight, xyNode.height + options.yMargin );
      var backgroundWidth = Math.max( xyNode.width + options.xMargin, backgroundHeight );

      var backgroundNode = new Rectangle( 0, 0, backgroundWidth, backgroundHeight,
        _.pick( options, 'cornerRadius', 'fill', 'stroke', 'lineWidth', 'lineDash' ) );

      // center content on background
      xyNode.center = backgroundNode.center;

      assert && assert( !options.children, 'decoration not supported' );
      options.children = [ backgroundNode, xyNode ];

      return new Node( options );
    }
  } );
} );
