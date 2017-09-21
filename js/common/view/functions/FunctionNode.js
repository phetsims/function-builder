// Copyright 2016-2017, University of Colorado Boulder

/**
 * Base type for function nodes. Provides a background shape for the function. Subtypes are responsible for
 * ensuring that the content (what is displayed on the function) fits on the background.
 * All drag handling and animation behavior for functions is encapsulated here.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EyeCloseNode = require( 'FUNCTION_BUILDER/common/view/EyeCloseNode' );
  var FBColors = require( 'FUNCTION_BUILDER/common/FBColors' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FunctionBackgroundNode = require( 'FUNCTION_BUILDER/common/view/functions/FunctionBackgroundNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionSlot = require( 'FUNCTION_BUILDER/common/model/builder/FunctionSlot' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableNode = require( 'FUNCTION_BUILDER/common/view/MovableNode' );
  var NotInvertibleSymbolNode = require( 'FUNCTION_BUILDER/common/view/NotInvertibleSymbolNode' );
  var Property = require( 'AXON/Property' );

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
   * @constructor
   */
  function FunctionNode( functionInstance, contentNode, container, builderNode, dragLayer, options ) {

    options = _.extend( {

      size: FBConstants.FUNCTION_SIZE, // {Dimension2} size of the background
      identityVisible: true, // {boolean} is the function's identity visible?
      hiddenNode: null, // {Node} displayed when the function identity is hidden
      hiddenFill: FBColors.HIDDEN_FUNCTION, // {null|Color|string} background color when function identity is hidden

      //FUTURE remove this workaround, see https://github.com/phetsims/function-builder/issues/49
      allowTouchSnag: false
    }, options );

    if ( !options.hiddenNode ) {
      options.hiddenNode = new EyeCloseNode();
    }

    var self = this;

    var backgroundNode = new FunctionBackgroundNode( _.extend( {
      size: options.size
    }, functionInstance.viewOptions ) );

    // unlink unnecessary, instances exist for lifetime of the sim
    functionInstance.fillProperty.link( function( fill ) {
      backgroundNode.fill = fill;
    } );

    // center
    contentNode.center = backgroundNode.center;
    options.hiddenNode.center = backgroundNode.center;

    // @private
    var notInvertibleSymbolNode = new NotInvertibleSymbolNode( {
      center: backgroundNode.center,
      visible: false
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, contentNode, options.hiddenNode, notInvertibleSymbolNode ];

    // @public {Property.<boolean>}
    var identityVisibleProperty = new Property( options.identityVisible );
    // unlink unnecessary, instance owns this Property
    identityVisibleProperty.link( function( identityVisible ) {

      contentNode.visible = identityVisible;
      options.hiddenNode.visible = !identityVisible;

      if ( options.hiddenFill ) {
        backgroundNode.fill = identityVisible ? functionInstance.fillProperty.get() : options.hiddenFill;
      }
    } );

    //-------------------------------------------------------------------------------
    // start a drag cycle

    var slotNumberRemovedFrom = FunctionSlot.NO_SLOT_NUMBER;  // slot number that function was removed from at start of drag

    assert && assert( !options.startDrag );
    options.startDrag = function() {

      slotNumberRemovedFrom = FunctionSlot.NO_SLOT_NUMBER;

      if ( container.containsNode( self ) ) {

        // function is in the carousel, pop it out
        container.removeNode( self );
        dragLayer.addChild( self );
        functionInstance.moveTo( container.carouselLocation.plus( FBConstants.FUNCTION_POP_OUT_OFFSET ) );
      }
      else if ( builderNode.containsFunctionNode( self ) ) {

        // function is in the builder

        // if this node's 'not invertible' animation was running, stop it
        self.stopNotInvertibleAnimation();

        // pop it out of the builder
        slotNumberRemovedFrom = builderNode.removeFunctionNode( self );
        var slotLocation = builderNode.builder.getSlotLocation( slotNumberRemovedFrom );
        dragLayer.addChild( self );
        functionInstance.moveTo( slotLocation.plus( FBConstants.FUNCTION_POP_OUT_OFFSET ) );
      }
      else {
        // function was grabbed while in dragLayer, do nothing
      }

      assert && assert( dragLayer.hasChild( self ), 'startDrag: function should be in dragLayer' );
    };

    //-------------------------------------------------------------------------------
    // end a drag cycle
    assert && assert( !options.endDrag );
    options.endDrag = function() {

      assert && assert( dragLayer.hasChild( self ), 'endDrag: function should be in dragLayer' );

      // Find the closest slot in the builder
      var slotNumber = builderNode.builder.getClosestSlot( functionInstance.locationProperty.get(),
        FBConstants.FUNCTION_DISTANCE_THRESHOLD );

      if ( slotNumber === FunctionSlot.NO_SLOT_NUMBER ) {

        // no builder slot, animate back to the carousel
        self.animateToCarousel();
      }
      else {

        // put function in builder slot
        self.animateToBuilder( slotNumber, slotNumberRemovedFrom );
      }
    };

    MovableNode.call( this, functionInstance, options );

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

  functionBuilder.register( 'FunctionNode', FunctionNode );

  return inherit( MovableNode, FunctionNode, {

    /**
     * Animates this function to a slot in the builder.
     *
     * @param {number} slotNumber - slot number that the function is animating to
     * @param {number} slotNumberRemovedFrom - slot number that the function was removed from
     * @private
     */
    animateToBuilder: function( slotNumber, slotNumberRemovedFrom ) {
      assert && assert( this.dragLayer.hasChild( this ), 'card should be in dragLayer' );

      var self = this;

      // to improve readability
      var builderNode = this.builderNode;
      var builder = builderNode.builder;
      var dragLayer = this.dragLayer;

      this.functionInstance.animateTo( builder.getSlotLocation( slotNumber ),
        function() {

          // If the slot is occupied, relocate the occupier.
          var occupierNode = builderNode.getFunctionNode( slotNumber );
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

          dragLayer.removeChild( self );
          builderNode.addFunctionNode( self, slotNumber );
        } );
    },

    /**
     * Moves this function immediately to the builder, no animation.
     *
     * @param {number} slotNumber
     * @public
     */
    moveToBuilder: function( slotNumber ) {

      assert && assert( !this.builderNode.containsFunctionNode( this ), 'function is already in builder' );
      assert && assert( !this.builderNode.getFunctionNode( slotNumber ), 'slot ' + slotNumber + ' is occupied' );

      // remove from drag layer
      if ( this.dragLayer.hasChild( this ) ) {
        this.cancelDrag();
        this.dragLayer.removeChild( this );
      }

      // remove from carousel
      if ( this.container.containsNode( this ) ) {
        this.container.removeNode( this );
      }

      // move to builder
      var slotLocation = this.builderNode.builder.getSlotLocation( slotNumber );
      this.functionInstance.moveTo( slotLocation );
      this.builderNode.addFunctionNode( this, slotNumber );
    },

    /**
     * Animates this function to the carousel.
     *
     * @private
     */
    animateToCarousel: function() {
      assert && assert( this.dragLayer.hasChild( this ), 'card should be in dragLayer' );
      var self = this;
      self.functionInstance.animateTo( self.container.carouselLocation,
        function() {
          self.dragLayer.removeChild( self );
          self.container.addNode( self );
        } );
    },

    /**
     * Moves this function immediately to the carousel, no animation.
     * If the function is already in the carousel, this is a no-op.
     *
     * @public
     */
    moveToCarousel: function() {

      if ( this.dragLayer.hasChild( this ) ) {

        // remove from drag layer
        this.cancelDrag();
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
    },

    /**
     * Starts animation showing that a function is not invertible.
     *
     * @public
     */
    startNotInvertibleAnimation: function() {
      assert && assert( !this.functionInstance.invertible );
      this.notInvertibleSymbolNode.startAnimation();
    },

    /**
     * Stops animation showing that a function is not invertible.
     * If no animation is in progress, this is a no-op.
     *
     * @public
     */
    stopNotInvertibleAnimation: function() {
      this.notInvertibleSymbolNode.stopAnimation();
    }
  } );
} );
