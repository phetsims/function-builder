// Copyright 2016-2023, University of Colorado Boulder

/**
 * Abstract base class for card nodes. Provides a background shape for the card. Subtypes are responsible for the
 * card's 'content' (what is displayed on the card), and for constraining the content to the dimensions of the card.
 * All drag handling and animation behavior for cards is encapsulated here.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import Vector2 from '../../../../../dot/js/Vector2.js';
import merge from '../../../../../phet-core/js/merge.js';
import { Node, Rectangle } from '../../../../../scenery/js/imports.js';
import functionBuilder from '../../../functionBuilder.js';
import FBConstants from '../../FBConstants.js';
import MovableNode from '../MovableNode.js';

export default class CardNode extends MovableNode {

  /**
   * NOTE: The relatively large number of constructor parameters here is a trade-off. There are many things
   * involved in drag handling and animation. I could have reduced the number of parameters by distributing
   * the responsibility for drag handling and animation. But encapsulating all responsibilities here seemed
   * like a superior solution.  So I chose encapsulation at the expense of some increased coupling.
   * See discussion in https://github.com/phetsims/function-builder/issues/77
   *
   * @param {Card} card
   * @param {FunctionContainer} inputContainer - container in the input carousel
   * @param {FunctionContainer} outputContainer - container in the output carousel
   * @param {BuilderNode} builderNode
   * @param {Node} dragLayer - parent for this node when it's being dragged or animating
   * @param {Property.<boolean>} seeInsideProperty - are the 'See Inside' windows visible?
   * @param {function( CardNode, Builder, number )} updateContent - updates the card's content, based on where the card
   * is relative to the builder slots. Parameters are {CardNode} cardNode, {Builder} builder and {number}
   * numberOfFunctionsToApply, how many functions to apply from the builder.
   * @param {Object} [options]
   */
  constructor( card, inputContainer, outputContainer, builderNode, dragLayer, seeInsideProperty, updateContent, options ) {

    options = merge( {}, FBConstants.CARD_OPTIONS, options );

    // the basic shape of a blank card
    const backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height,
      _.pick( options, 'cornerRadius', 'fill', 'stroke', 'lineWidth', 'lineDash' ) );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode ];

    const builder = builderNode.builder;

    const MIN_DISTANCE = options.size.width; // minimum distance for card to be considered 'in' slot
    const INPUT_SLOT_X = builder.left - MIN_DISTANCE; // x coordinate where card is considered to be 'in' input slot
    const OUTPUT_SLOT_X = builder.right + MIN_DISTANCE; // x coordinate where card is considered to be 'in' output slot
    const BLOCKED_X_OFFSET = ( 0.4 * options.size.width ); // how far to move card to left of window for a non-invertible function

    let dragDx = 0; // most recent change in x while dragging
    let blocked = false; // was dragging to the left blocked by a non-invertible function?
    let slopeLeft = 0; // slope of the line connecting the input carousel and builder input slot
    let slopeRight = 0; // slope of the line connecting the output carousel and builder input slot

    //-------------------------------------------------------------------------------
    // start a drag cycle
    assert && assert( !options.startDrag );
    options.startDrag = () => {

      dragDx = 0;

      // points used to compute slope of line between input/output carousels and input/output builder slots
      let leftPoint = inputContainer.carouselPosition;
      let rightPoint = outputContainer.carouselPosition;

      if ( inputContainer.containsNode( this ) ) {

        // card is in the input carousel, pop it out
        inputContainer.removeNode( this );
        card.moveTo( inputContainer.carouselPosition.plus( FBConstants.CARD_POP_OUT_OFFSET ) );
        dragLayer.addChild( this );

        // adjust for pop-out offset
        leftPoint = card.positionProperty.get();
      }
      else if ( outputContainer.containsNode( this ) ) {

        // card is in the output carousel, pop it out
        outputContainer.removeNode( this );
        card.moveTo( outputContainer.carouselPosition.plus( FBConstants.CARD_POP_OUT_OFFSET ) );
        dragLayer.addChild( this );

        // adjust for pop-out offset
        rightPoint = card.positionProperty.get();
      }
      else {

        // card was grabbed while animating or while in 'see inside' window
        this.unregisterAsSeeInsideCard();
      }
      assert && assert( dragLayer.hasChild( this ), 'startDrag must move node to dragLayer' );

      // the card most recently grabbed is in the front
      this.moveToFront();

      // slope of line between input carousel and builder's input slot, m = (y2-y1)/(x2-x1)
      slopeLeft = ( leftPoint.y - builder.position.y ) / ( leftPoint.x - INPUT_SLOT_X );

      // slope of line between output carousel and builder's output slot, m = (y2-y1)/(x2-x1)
      slopeRight = ( rightPoint.y - builder.position.y ) / ( rightPoint.x - OUTPUT_SLOT_X );
    };

    //-------------------------------------------------------------------------------
    // constrain dragging
    assert && assert( !options.translateMovable );
    options.translateMovable = ( card, position, delta ) => {

      blocked = false; // assume we're not blocked, because functions may be changing simultaneously via multi-touch
      dragDx = delta.x;

      let y = 0;

      if ( position.x > OUTPUT_SLOT_X ) {

        // card is to the right of the builder, drag along the line between output carousel and builder output
        y = slopeRight * ( position.x - OUTPUT_SLOT_X ) + builder.position.y; // y = m(x-x1) + y1
        card.moveTo( new Vector2( position.x, y ) );
      }
      else { // to left of builder's output slot

        // dragging to the left, check to see if blocked by a non-invertible function
        if ( dragDx < 0 ) {
          for ( let i = builder.numberOfSlots - 1; i >= 0 && !blocked; i-- ) {

            const slot = builder.slots[ i ];

            // if slot is to the left of where the card currently is ...
            if ( card.positionProperty.get().x > slot.position.x ) {

              const windowPosition = builder.getWindowPosition( i );

              // card has hit a non-invertible function
              if ( !slot.isInvertible() && position.x < windowPosition.x ) {

                blocked = true;
                this.builderNode.getFunctionNode( i ).startNotInvertibleAnimation();

                // allow left edge of card to be dragged slightly past left edge of 'see inside' window
                const blockedX = windowPosition.x - BLOCKED_X_OFFSET;
                if ( position.x > blockedX ) {
                  card.moveTo( new Vector2( position.x, builder.position.y ) );

                }
                else {
                  card.moveTo( new Vector2( blockedX, builder.position.y ) );
                }
              }
            }
          }
        }

        if ( !blocked ) {
          if ( position.x < INPUT_SLOT_X ) {

            // card is to the left of the builder, drag along the line between input carousel and builder input slot
            y = slopeLeft * ( position.x - INPUT_SLOT_X ) + builder.position.y; // y = m(x-x1) + y1
            card.moveTo( new Vector2( position.x, y ) );
          }
          else {

            // card is in the builder, dragging horizontally
            card.moveTo( new Vector2( position.x, builder.position.y ) );
          }
        }
      }
    };

    //-------------------------------------------------------------------------------
    // end a drag cycle
    assert && assert( !options.endDrag );
    options.endDrag = () => {

      assert && assert( dragLayer.hasChild( this ), 'endDrag: card should be in dragLayer' );

      const cardX = card.positionProperty.get().x;

      if ( cardX < INPUT_SLOT_X ) {

        // card is to left of builder, animate to input carousel
        this.animateToCarousel( inputContainer );
      }
      else if ( cardX > OUTPUT_SLOT_X ) {

        // card is to right of builder, animate to output carousel
        this.animateToCarousel( outputContainer );
      }
      else { // card is in the builder

        if ( dragDx >= 0 || blocked ) { // dragging to the right or blocked by a non-invertible function

          // snap to input slot
          if ( cardX < builder.left ) {
            card.moveTo( new Vector2( builder.left, builder.position.y ) );
          }

          this.animateLeftToRight( OUTPUT_SLOT_X );
        }
        else { // dragging to the left

          // snap to output slot
          if ( cardX > builder.right ) {
            card.moveTo( new Vector2( builder.right, builder.position.y ) );
          }

          this.animateRightToLeft( INPUT_SLOT_X, OUTPUT_SLOT_X, BLOCKED_X_OFFSET );
        }
      }
    };

    // {Property.<number>} Number of functions to apply is based on where the card is located relative to the
    // function slots in the builder
    const numberOfFunctionsToApplyProperty = new DerivedProperty( [ card.positionProperty ],
      position => {
        for ( let i = builder.numberOfSlots - 1; i >= 0; i-- ) {
          if ( position.x >= builder.slots[ i ].position.x ) {
            return i + 1;
          }
        }
        return 0;
      }
    );

    super( card, options );

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
    numberOfFunctionsToApplyProperty.link( numberOfFunctionsToApply => {
      updateContent( this, builder, numberOfFunctionsToApply );
    } );

    // Updates any cards that are not in the input carousel when any function in the builder changes.
    // removeListener unnecessary, instances exist for the lifetime of the sim.
    builderNode.builder.functionChangedEmitter.addListener( () => {
      if ( !inputContainer.containsNode( this ) ) {
        updateContent( this, builder, numberOfFunctionsToApplyProperty.get() );
      }
    } );

    // When 'See Inside' is turned off, flush out any cards that are stopped in windows.
    // unlink unnecessary, instances exist for lifetime of the sim
    seeInsideProperty.lazyLink( seeInside => {
      if ( !seeInside && !card.isAnimating() && dragLayer.hasChild( this ) ) {
        this.unregisterAsSeeInsideCard();
        this.animateLeftToRight( OUTPUT_SLOT_X );
      }
    } );
  }

  /**
   * Animates this card to a container in a carousel.
   *
   * @param {CardContainer} container
   * @private
   */
  animateToCarousel( container ) {
    assert && assert( this.dragLayer.hasChild( this ), 'animateToCarousel: card should be in dragLayer' );
    this.card.animateTo( container.carouselPosition, () => {
      this.dragLayer.removeChild( this );
      container.addNode( this );
    } );
  }

  /**
   * Moves this card immediately to the input carousel, no animation.
   * If the card is already in the input carousel, this is a no-op.
   *
   * @public
   */
  moveToInputCarousel() {

    if ( this.dragLayer.hasChild( this ) ) {

      // remove from drag layer
      this.interruptSubtreeInput(); // cancel drag
      this.dragLayer.removeChild( this );
      this.unregisterAsSeeInsideCard();
    }
    else if ( this.outputContainer.containsNode( this ) ) {

      // remove from output carousel
      this.outputContainer.removeNode( this );
    }

    // move to input carousel
    if ( !this.inputContainer.containsNode( this ) ) {
      this.inputContainer.addNode( this );
    }
  }

  /**
   * Animates left-to-right through the builder, stopping at the first 'See Inside' window that's visible.
   * If no 'See Inside' window is visible, the card continues to the output carousel.
   *
   * @param outputSlotX - x coordinate where card is considered to be in the output slot
   * @private
   */
  animateLeftToRight( outputSlotX ) {
    assert && assert( this.dragLayer.hasChild( this ), 'animateLeftToRight: card should be in dragLayer' );

    const builder = this.builderNode.builder;
    const windowNumber = builder.getWindowNumberGreaterThan( this.card.positionProperty.get().x );

    if ( builder.isValidWindowNumber( windowNumber ) ) {

      // animate to 'See Inside' window to right of card
      const windowPosition = builder.getWindowPosition( windowNumber );
      this.card.animateTo( windowPosition, () => {

        if ( this.seeInsideProperty.get() ) {

          // stop at this window, register as the 'see inside' card
          this.registerAsSeeInsideCard( outputSlotX );
        }
        else {

          // continue to next window
          this.animateLeftToRight( outputSlotX );
        }
      } );
    }
    else {

      // animate to output slot, then to output carousel
      this.card.animateTo( new Vector2( outputSlotX, builder.position.y ),
        () => this.animateToCarousel( this.outputContainer ) );
    }
  }

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
  animateRightToLeft( inputSlotX, outputSlotX, blockedXOffset ) {
    assert && assert( this.dragLayer.hasChild( this ), 'animateRightToLeft: card should be in dragLayer' );

    const builder = this.builderNode.builder;
    const windowNumber = builder.getWindowNumberLessThanOrEqualTo( this.card.positionProperty.get().x );

    if ( builder.isValidWindowNumber( windowNumber ) ) {

      // animate to 'See Inside' window to left of card
      const windowPosition = builder.getWindowPosition( windowNumber );
      this.card.animateTo( windowPosition, () => {

        const slot = builder.slots[ windowNumber ];

        if ( !slot.isEmpty() && !slot.functionInstance.invertible ) {

          // encountered a non-invertible function, go slightly past it, then reverse direction
          this.builderNode.getFunctionNode( windowNumber ).startNotInvertibleAnimation();
          this.card.animateTo( new Vector2( windowPosition.x - blockedXOffset, windowPosition.y ),
            () => this.animateLeftToRight( outputSlotX ) );
        }
        else if ( this.seeInsideProperty.get() ) {

          // stop at this window, register as the 'see inside' card
          this.registerAsSeeInsideCard( outputSlotX );
        }
        else {

          // If a card is exactly centered in a window, it will stop there, regardless of 'see inside' state.
          // So before continuing to the next window, move the card 1 unit to the left.
          // See https://github.com/phetsims/function-builder/issues/107
          if ( this.card.positionProperty.get().x === windowPosition.x ) {
            this.card.moveTo( new Vector2( this.card.positionProperty.get().x - 1, builder.position.y ) );
          }

          // continue to next window
          this.animateRightToLeft( inputSlotX, outputSlotX, blockedXOffset );
        }
      } );
    }
    else {

      // animate to input slot, then to input carousel
      this.card.animateTo( new Vector2( inputSlotX, builder.position.y ),
        () => this.animateToCarousel( this.inputContainer ) );
    }
  }

  /**
   * Flushes this card from a 'see inside' window.  Sends it directly to its container in the output carousel,
   * without stopping at any 'see inside' windows. See issue #44.
   *
   * @param outputSlotX - x coordinate where card is considered to be in the output slot
   * @public
   */
  flushSeeInsideCard( outputSlotX ) {
    assert && assert( this.dragLayer.hasChild( this ), 'flushSeeInsideCard: card should be in dragLayer' );
    assert && assert( !this.card.dragging, 'flushSeeInsideCard: card should be parked in See Inside window' );
    assert && assert( this.builderNode.seeInsideCardNode === this, 'flushSeeInsideCard: not a See Inside card' );

    // animate to output slot, then to output carousel
    this.card.animateTo( new Vector2( outputSlotX, this.builderNode.builder.position.y ),
      () => this.animateToCarousel( this.outputContainer ) );
  }

  /**
   * Registers this card as the sole card that may occupy 'see inside' windows.
   * Any card that currently occupies a window is flushed to the output carousel.
   * See issue #44.
   *
   * @param {number} outputSlotX - x coordinate where card is considered to be in the output slot
   * @private
   */
  registerAsSeeInsideCard( outputSlotX ) {

    // flush any existing 'see inside' card
    if ( this.builderNode.seeInsideCardNode ) {
      this.builderNode.seeInsideCardNode.flushSeeInsideCard( outputSlotX );
      this.builderNode.seeInsideCardNode = null;
    }

    // register as the 'see inside' card
    this.builderNode.seeInsideCardNode = this;
  }

  /**
   * Unregisters this card as the sole card that may occupy 'see inside' windows. See issue #44.
   * If this card is not currently registered, this is a no-op.
   *
   * @private
   */
  unregisterAsSeeInsideCard() {
    if ( this === this.builderNode.seeInsideCardNode ) {
      this.builderNode.seeInsideCardNode = null;
    }
  }

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
  static createGhostNode( contentNode, options ) {

    options = merge( {}, FBConstants.CARD_OPTIONS, options );
    options.lineDash = [ 4, 4 ];
    options.opacity = 0.5;

    const backgroundNode = new Rectangle( 0, 0, options.size.width, options.size.height,
      _.pick( options, 'cornerRadius', 'fill', 'stroke', 'lineWidth', 'lineDash' ) );

    // center content on background
    contentNode.center = backgroundNode.center;

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, contentNode ];

    return new Node( options );
  }

  /**
   * Creates a card-like icon for x or y symbol, for use in equations.
   *
   * @param {Node} xyNode - the symbol on the card
   * @param {Object} [options]
   * @returns {Node}
   * @public
   * @static
   */
  static createEquationXYNode( xyNode, options ) {

    options = merge( {
      xMargin: 30,
      yMargin: 15,
      minHeight: 35
    }, FBConstants.CARD_OPTIONS, options );

    const backgroundHeight = Math.max( options.minHeight, xyNode.height + options.yMargin );
    const backgroundWidth = Math.max( xyNode.width + options.xMargin, backgroundHeight );

    const backgroundNode = new Rectangle( 0, 0, backgroundWidth, backgroundHeight,
      _.pick( options, 'cornerRadius', 'fill', 'stroke', 'lineWidth', 'lineDash' ) );

    // center content on background
    xyNode.center = backgroundNode.center;

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, xyNode ];

    return new Node( options );
  }
}

functionBuilder.register( 'CardNode', CardNode );