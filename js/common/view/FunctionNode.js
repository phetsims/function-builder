// Copyright 2016, University of Colorado Boulder

/**
 * Base type for function nodes.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FunctionBackgroundNode = require( 'FUNCTION_BUILDER/common/view/FunctionBackgroundNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionSlot = require( 'FUNCTION_BUILDER/common/model/FunctionSlot' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableNode = require( 'FUNCTION_BUILDER/common/view/MovableNode' );
  var NotInvertibleSymbolNode = require( 'FUNCTION_BUILDER/common/view/NotInvertibleSymbolNode' );

  /**
   * @param {ImageFunction} functionInstance - model element associated with this node
   * @param {Node} contentNode - content that appears on the function, specific to functionInstance
   * @param {ImageFunctionContainer} container - container in the function carousel where this node originates
   * @param {BuilderNode} builderNode - BuilderNode that may contain this node
   * @param {Node} dragLayer - parent for this node when it's being dragged or animating
   * @param {Object} [options]
   * @constructor
   */
  function FunctionNode( functionInstance, contentNode, container, builderNode, dragLayer, options ) {

    options = options || {};

    var thisNode = this;

    // @public
    this.functionInstance = functionInstance;

    // @private
    this.container = container;
    this.builderNode = builderNode;
    this.dragLayer = dragLayer;

    var backgroundNode = new FunctionBackgroundNode( functionInstance.viewOptions );
    contentNode.center = backgroundNode.center;

    // @private
    this.notInvertibleSymbolNode = new NotInvertibleSymbolNode( {
      center: backgroundNode.center,
      visible: false
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, contentNode, this.notInvertibleSymbolNode ];

    var slotNumberRemovedFrom = FunctionSlot.NO_SLOT_NUMBER;  // slot number that function was removed from at start of drag

    //-------------------------------------------------------------------------------
    // start a drag cycle
    assert && assert( !options.startDrag );
    options.startDrag = function() {

      slotNumberRemovedFrom = FunctionSlot.NO_SLOT_NUMBER;

      if ( container.containsNode( thisNode ) ) {

        // function is in the carousel, pop it out
        container.removeNode( thisNode );
        dragLayer.addChild( thisNode );
        functionInstance.moveTo( container.carouselLocation.plus( FBConstants.FUNCTION_POP_OUT_OFFSET ) );
      }
      else if ( builderNode.containsFunctionNode( thisNode ) ) {

        // function is in the builder

        // if this node's 'not invertible' animation was running, stop it
        thisNode.stopNotInvertibleAnimation();

        // pop it out of the builder
        var slotNumber = builderNode.getSlotNumber( thisNode );
        var slotLocation = builderNode.getSlotLocation( slotNumber );
        builderNode.removeFunctionNode( thisNode, slotNumber );
        slotNumberRemovedFrom = slotNumber;
        dragLayer.addChild( thisNode );
        functionInstance.moveTo( slotLocation.plus( FBConstants.FUNCTION_POP_OUT_OFFSET ) );
      }
      else {
        // function was grabbed while in dragLayer, do nothing
      }

      assert && assert( dragLayer.hasChild( thisNode ), 'startDrag: function should be in dragLayer' );
    };

    //-------------------------------------------------------------------------------
    // end a drag cycle
    assert && assert( !options.endDrag );
    options.endDrag = function() {

      assert && assert( dragLayer.hasChild( thisNode ), 'endDrag: function should be in dragLayer' );

      // Find the closest slot in the builder
      var slotNumber = builderNode.getClosestSlot( functionInstance.locationProperty.get() );

      if ( slotNumber === FunctionSlot.NO_SLOT_NUMBER ) {

        // no builder slot, animate back to the carousel
        thisNode.animateToCarousel();
      }
      else {

        // put function in builder slot
        thisNode.animateToBuilder( slotNumber, slotNumberRemovedFrom );
      }
    };

    MovableNode.call( this, functionInstance, options );
  }

  functionBuilder.register( 'FunctionNode', FunctionNode );

  return inherit( MovableNode, FunctionNode, {

    /**
     * Animates this function to a slot in the builder.
     * @param {number} slotNumber - slot number that the function is animating to
     * @param {number} slotNumberRemovedFrom - slot number that the function was removed from
     * @private
     */
    animateToBuilder: function( slotNumber, slotNumberRemovedFrom ) {
      assert && assert( this.dragLayer.hasChild( this ), 'card should be in dragLayer' );
      var thisNode = this;
      this.functionInstance.animateTo( this.builderNode.getSlotLocation( slotNumber ),
        function() {

          // If the slot is occupied, relocate the occupier.
          var occupierNode = thisNode.builderNode.getFunctionNode( slotNumber );
          if ( occupierNode ) {

            thisNode.builderNode.removeFunctionNode( occupierNode, slotNumber );
            thisNode.dragLayer.addChild( occupierNode );

            if ( thisNode.builderNode.isValidSlotNumber( slotNumberRemovedFrom ) && Math.abs( slotNumberRemovedFrom - slotNumber ) === 1 ) {

              // swap adjacent slots
              occupierNode.animateToBuilder( slotNumberRemovedFrom, slotNumber );
            }
            else {

              // return function to the carousel.
              occupierNode.animateToCarousel();
            }
          }

          thisNode.dragLayer.removeChild( thisNode );
          thisNode.builderNode.addFunctionNode( thisNode, slotNumber );
        } );
    },

    /**
     * Animates this function to the carousel.
     * @private
     */
    animateToCarousel: function() {
      assert && assert( this.dragLayer.hasChild( this ), 'card should be in dragLayer' );
      var thisNode = this;
      this.functionInstance.animateTo( this.container.carouselLocation,
        function() {
          thisNode.dragLayer.removeChild( thisNode );
          thisNode.container.addNode( thisNode );
        } );
    },

    /**
     * Moves this function immediately to the carousel, no animation.
     * @public
     */
    moveToCarousel: function() {
      assert && assert( !this.container.containsNode( this ) );
      if ( this.dragLayer.hasChild( this ) ) {
        this.dragLayer.removeChild( this );
      }
      this.container.addNode( this );
    },

    /**
     * Starts animation showing that a function is not invertible.
     * @public
     */
    startNotInvertibleAnimation: function() {
      assert && assert( !this.functionInstance.invertible );
      this.notInvertibleSymbolNode.startAnimation();
    },

    /**
     * Stops animation showing that a function is not invertible.
     * If no animation is in progress, this is a no-op.
     * @public
     */
    stopNotInvertibleAnimation: function() {
      this.notInvertibleSymbolNode.stopAnimation();
    }
  } );
} );
