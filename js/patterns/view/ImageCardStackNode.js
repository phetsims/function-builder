// Copyright 2016, University of Colorado Boulder

/**
 * A stack of {ImageCard} in the output carousel.
 * Displays a single card whose image is synchronized with the functions in the builder.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Emitter = require( 'AXON/Emitter' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FBQueryParameters = require( 'FUNCTION_BUILDER/common/FBQueryParameters' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var ImageCard = require( 'FUNCTION_BUILDER/patterns/model/ImageCard' );
  var ImageCardNode = require( 'FUNCTION_BUILDER/patterns/view/ImageCardNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  // constants
  var SHOW_BOUNDS = FBQueryParameters.DEV; // {boolean} stroke the bounds with 'red'

  /**
   * @param {HTMLImageElement} inputImage - image that appears on the corresponding card in the input carousel
   * @param {Builder} builder - builder that is applied to this card stack
   * @param {Object} [options]
   * @constructor
   */
  function ImageCardStackNode( inputImage, builder, options ) {

    var self = this;

    options = _.extend( {

      cardSize: FBConstants.CARD_SIZE,

      popOutOffset: FBConstants.CARD_POP_OUT_OFFSET,

      /**
       * {function(ImageCard)|null}
       * Optional listener to attach to removeEmitter, for notification of card removal from stack
       */
      removedListener: null

    }, options );

    // @private
    this.builder = builder;

    // @private
    this.cards = [];

    // @private
    this.inputImage = inputImage;

    // @private
    this.cardNode = new ImageCardNode( ImageCard.withImage( inputImage ) );

    // Add a background rectangle with no fill or stroke, so that this Node's visible bounds remain constant
    var backgroundNode = new Rectangle( 0, 0, this.cardNode.width, this.cardNode.height, {
      stroke: SHOW_BOUNDS ? 'red' : null
    } );

    this.cardNode.center = backgroundNode.center;
    //TODO this.cardNode.visible = false;

    // @public emit1( {ImageCard} instance ) is called when a card is removed from the stack
    this.removedEmitter = new Emitter();
    if ( options.removedListener ) {
      this.removedEmitter.addListener( options.removedListener );
    }

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, this.cardNode ];

    var dragHandler = new SimpleDragHandler( {

      //TODO cancel drag if card is disposed of during a drag cycle, scenery#218

      allowTouchSnag: true,

      start: function( event, trail ) {
        assert && assert( self.cards.length > 0, 'stack is empty' );
        var card = self.cards[ self.cards.length - 1 ];
        self.removeCard( card );
        self.removedEmitter.emit1( card );
      },

      // @param { {Vector2} delta, {Vector2} oldPosition, {Vector2} position } } translationParams
      translate: function( translationParams ) {
        //TODO these 2 lines are duplicated in MovableNode
        var location = this.movable.locationProperty.get().plus( translationParams.delta );
        this.movable.setLocation( options.dragBounds.closestPointTo( location ) );
      },

      end: function( event, trail ) {
        //TODO these 2 lines are duplicated in MovableNode
        this.movable.dragging = false;
        options.endDrag && options.endDrag( this.movable, event, trail );
        this.movable = null;
      }
    } );
    this.cardNode.addInputListener( dragHandler );

    Node.call( this, options );

    //TODO update this only when this.cardNode.visible
    // When any builder function changes, apply the functions to the card
    var updateCardNode = function() {
      var card =  ImageCard.withImage( self.inputImage ) ;
      for ( var i = 0; i < builder.slots.length; i++ ) {
        var functionInstance = builder.slots[ i ].functionInstanceProperty.get();
        if ( functionInstance ) {
          var outputCanvas = functionInstance.apply( card.canvas );
          card = new ImageCard( outputCanvas );
        }
      }
      self.cardNode.setCard( card );
    };
    builder.slots.forEach( function( slot ) {
      slot.functionInstanceProperty.link( updateCardNode );
    } );

    this.disposeImageCardStackNode = function() {

      // clean up emitter
      assert && assert( self.removedEmitter, 'called dispose twice?' );
      self.removedEmitter.removeAllListeners();
      self.removedEmitter = null;

      // clean up builder
      builder.slots.forEach( function( slot ) {
        slot.functionInstanceProperty.unlink( updateCardNode );
      } );

      // empty stack
      self.cards.length = 0;
      self.cardNode.visible = false;

      // cancel drag
      if ( dragHandler.dragging ) {
        dragHandler.endDrag( null, null );
      }
    };
  }

  functionBuilder.register( 'ImageCardStackNode', ImageCardStackNode );

  return inherit( Node, ImageCardStackNode, {

    /**
     * Ensures that this object is eligible for GC.
     * @public
     */
    dispose: function() {
      this.disposeImageCardStackNode();
    },

    /**
     * Adds a card to the stack.
     * @param {ImageCard} card
     */
    addCard: function( card ) {
      //TODO assert && assert( card instanceof this.cardType, 'unexpected type: ' + card.constructor.name );
      assert && assert( this.cards.indexOf( card ) === -1, 'attempted to add card twice' );
      this.cards.push( card );
      this.cardNode.visible = true;
    },

    /**
     * Removes a card from the stack.
     * @param {ImageCard} card
     * @returns {ImageCard}
     */
    removeCard: function( card ) {

      // remove card
      //TODO assert && assert( card instanceof this.cardType, 'unexpected type: ' + card.constructor.name );
      var index = this.cards.indexOf( card );
      assert && assert( index !== -1, 'attempted to remove unknown card' );
      this.cards.splice( index, 1 );

      // hide icon when no cards
      this.cardNode.visible = ( this.cards.length > 0 );
    }
  } );
} );
