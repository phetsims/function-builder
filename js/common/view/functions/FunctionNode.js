// Copyright 2016-2021, University of Colorado Boulder

/**
 * Base type for function nodes. Provides a background shape for the function. Subtypes are responsible for
 * ensuring that the content (what is displayed on the function) fits on the background.
 * All drag handling and animation behavior for functions is encapsulated here.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../../axon/js/BooleanProperty.js';
import merge from '../../../../../phet-core/js/merge.js';
import functionBuilder from '../../../functionBuilder.js';
import FBColors from '../../FBColors.js';
import FBConstants from '../../FBConstants.js';
import FunctionSlot from '../../model/builder/FunctionSlot.js';
import EyeCloseNode from '../EyeCloseNode.js';
import MovableNode from '../MovableNode.js';
import NotInvertibleSymbolNode from '../NotInvertibleSymbolNode.js';
import FunctionBackgroundNode from './FunctionBackgroundNode.js';

class FunctionNode extends MovableNode {

  /**
   * NOTE: The relatively large number of constructor parameters here is a trade-off. There are many things
   * involved in drag handling and animation. I could have reduced the number of parameters by distributing
   * the responsibility for drag handling and animation. But encapsulating all responsibilities here seemed
   * like a superior solution.  So I chose encapsulation at the expense of some increased coupling.
   * See discussion in https://github.com/phetsims/function-builder/issues/77
   *
   * @param {AbstractFunction} functionInstance - model element associated with this node
   * @param {Node} contentNode - content that appears on the function, specific to functionInstance
   * @param {FunctionContainer} container - container in the function carousel where this node originates
   * @param {BuilderNode} builderNode - BuilderNode that may contain this node
   * @param {Node} dragLayer - parent for this node when it's being dragged or animating
   * @param {Object} [options]
   */
  constructor( functionInstance, contentNode, container, builderNode, dragLayer, options ) {

    options = merge( {

      size: FBConstants.FUNCTION_SIZE, // {Dimension2} size of the background
      identityVisible: true, // {boolean} is the function's identity visible?
      hiddenNode: null, // {Node} displayed when the function identity is hidden
      hiddenFill: FBColors.HIDDEN_FUNCTION, // {null|Color|string} background color when function identity is hidden

      //TODO remove this workaround, see https://github.com/phetsims/function-builder/issues/49
      allowTouchSnag: false
    }, options );

    if ( !options.hiddenNode ) {
      options.hiddenNode = new EyeCloseNode();
    }

    const backgroundNode = new FunctionBackgroundNode( merge( {
      size: options.size
    }, functionInstance.viewOptions ) );

    // unlink unnecessary, instances exist for lifetime of the sim
    functionInstance.fillProperty.link( fill => {
      backgroundNode.fill = fill;
    } );

    // center
    contentNode.center = backgroundNode.center;
    options.hiddenNode.center = backgroundNode.center;

    // @private
    const notInvertibleSymbolNode = new NotInvertibleSymbolNode( {
      center: backgroundNode.center,
      visible: false
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, contentNode, options.hiddenNode, notInvertibleSymbolNode ];

    // @public
    const identityVisibleProperty = new BooleanProperty( options.identityVisible );
    // unlink unnecessary, instance owns this Property
    identityVisibleProperty.link( identityVisible => {

      contentNode.visible = identityVisible;
      options.hiddenNode.visible = !identityVisible;

      if ( options.hiddenFill ) {
        backgroundNode.fill = identityVisible ? functionInstance.fillProperty.get() : options.hiddenFill;
      }
    } );

    //-------------------------------------------------------------------------------
    // start a drag cycle

    let slotNumberRemovedFrom = FunctionSlot.NO_SLOT_NUMBER;  // slot number that function was removed from at start of drag

    assert && assert( !options.startDrag );
    options.startDrag = () => {

      slotNumberRemovedFrom = FunctionSlot.NO_SLOT_NUMBER;

      if ( container.containsNode( this ) ) {

        // function is in the carousel, pop it out
        container.removeNode( this );
        dragLayer.addChild( this );
        functionInstance.moveTo( container.carouselPosition.plus( FBConstants.FUNCTION_POP_OUT_OFFSET ) );
      }
      else if ( builderNode.containsFunctionNode( this ) ) {

        // function is in the builder

        // if this node's 'not invertible' animation was running, stop it
        this.stopNotInvertibleAnimation();

        // pop it out of the builder
        slotNumberRemovedFrom = builderNode.removeFunctionNode( this );
        const slotPosition = builderNode.builder.getSlotPosition( slotNumberRemovedFrom );
        dragLayer.addChild( this );
        functionInstance.moveTo( slotPosition.plus( FBConstants.FUNCTION_POP_OUT_OFFSET ) );
      }
      else {
        // function was grabbed while in dragLayer, do nothing
      }

      assert && assert( dragLayer.hasChild( this ), 'startDrag should be in dragLayer' );
    };

    //-------------------------------------------------------------------------------
    // end a drag cycle
    assert && assert( !options.endDrag );
    options.endDrag = () => {

      assert && assert( dragLayer.hasChild( this ), 'endDrag should be in dragLayer' );

      // Find the closest slot in the builder
      const slotNumber = builderNode.builder.getClosestSlot( functionInstance.positionProperty.get(),
        FBConstants.FUNCTION_DISTANCE_THRESHOLD );

      if ( slotNumber === FunctionSlot.NO_SLOT_NUMBER ) {

        // no builder slot, animate back to the carousel
        this.animateToCarousel();
      }
      else {

        // put function in builder slot
        this.animateToBuilder( slotNumber, slotNumberRemovedFrom );
      }
    };

    super( functionInstance, options );

    //------------------------------------------------------------------------------------------------------------------
    // Define properties in one place, so we can see what's available and document visibility

    // @public
    this.functionInstance = functionInstance;
    this.identityVisibleProperty = identityVisibleProperty;

    // @protected used by subtypes
    this.backgroundNode = backgroundNode;

    // @private used by prototype functions
    this.contentNode = contentNode;
    this.container = container;
    this.builderNode = builderNode;
    this.builder = builderNode.builder;
    this.dragLayer = dragLayer;
    this.notInvertibleSymbolNode = notInvertibleSymbolNode;
  }

  /**
   * Animates this function to a slot in the builder.
   *
   * @param {number} slotNumber - slot number that the function is animating to
   * @param {number} slotNumberRemovedFrom - slot number that the function was removed from
   * @private
   */
  animateToBuilder( slotNumber, slotNumberRemovedFrom ) {
    assert && assert( this.dragLayer.hasChild( this ), 'card should be in dragLayer' );

    // to improve readability
    const builderNode = this.builderNode;
    const builder = builderNode.builder;
    const dragLayer = this.dragLayer;

    this.functionInstance.animateTo( builder.getSlotPosition( slotNumber ),
      () => {

        // If the slot is occupied, relocate the occupier.
        const occupierNode = builderNode.getFunctionNode( slotNumber );
        if ( occupierNode ) {

          builderNode.removeFunctionNode( occupierNode, slotNumber );
          dragLayer.addChild( occupierNode );

          if ( builder.isValidSlotNumber( slotNumberRemovedFrom ) && Math.abs( slotNumberRemovedFrom - slotNumber ) === 1 ) {

            // swap adjacent slots
            occupierNode.animateToBuilder( slotNumberRemovedFrom, slotNumber );
          }
          else {

            // return function to the carousel.
            occupierNode.animateToCarousel();
          }
        }

        dragLayer.removeChild( this );
        builderNode.addFunctionNode( this, slotNumber );
      } );
  }

  /**
   * Moves this function immediately to the builder, no animation.
   *
   * @param {number} slotNumber
   * @public
   */
  moveToBuilder( slotNumber ) {

    assert && assert( !this.builderNode.containsFunctionNode( this ), 'function is already in builder' );
    assert && assert( !this.builderNode.getFunctionNode( slotNumber ), `slot ${slotNumber} is occupied` );

    // remove from drag layer
    if ( this.dragLayer.hasChild( this ) ) {
      this.interruptSubtreeInput(); // cancel drag
      this.dragLayer.removeChild( this );
    }

    // remove from carousel
    if ( this.container.containsNode( this ) ) {
      this.container.removeNode( this );
    }

    // move to builder
    const slotPosition = this.builderNode.builder.getSlotPosition( slotNumber );
    this.functionInstance.moveTo( slotPosition );
    this.builderNode.addFunctionNode( this, slotNumber );
  }

  /**
   * Animates this function to the carousel.
   *
   * @private
   */
  animateToCarousel() {
    assert && assert( this.dragLayer.hasChild( this ), 'card should be in dragLayer' );
    this.functionInstance.animateTo( this.container.carouselPosition,
      () => {
        this.dragLayer.removeChild( this );
        this.container.addNode( this );
      } );
  }

  /**
   * Moves this function immediately to the carousel, no animation.
   * If the function is already in the carousel, this is a no-op.
   *
   * @public
   */
  moveToCarousel() {

    if ( this.dragLayer.hasChild( this ) ) {

      // remove from drag layer
      this.interruptSubtreeInput(); // cancel drag
      this.dragLayer.removeChild( this );
    }
    else if ( this.builderNode.containsFunctionNode( this ) ) {

      // remove from builder
      this.stopNotInvertibleAnimation();
      this.builderNode.removeFunctionNode( this );
    }

    // move to function carousel
    if ( !this.container.containsNode( this ) ) {
      this.container.addNode( this );
    }
  }

  /**
   * Starts animation showing that a function is not invertible.
   *
   * @public
   */
  startNotInvertibleAnimation() {
    assert && assert( !this.functionInstance.invertible );
    this.notInvertibleSymbolNode.startAnimation();
  }

  /**
   * Stops animation showing that a function is not invertible.
   * If no animation is in progress, this is a no-op.
   *
   * @public
   */
  stopNotInvertibleAnimation() {
    this.notInvertibleSymbolNode.stopAnimation();
  }
}

functionBuilder.register( 'FunctionNode', FunctionNode );

export default FunctionNode;