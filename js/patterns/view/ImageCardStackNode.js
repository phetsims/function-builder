// Copyright 2016, University of Colorado Boulder

//TODO not sure about this approach, it may be better to put ImageCardNodes into some container in output carousel
/**
 * A stack of {ImageCard}, which appears in the output carousel.
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
   * @param {HTMLImageElement} image - image that appears on the card when it's created
   * @param {Object} [options]
   * @constructor
   */
  function ImageCardStackNode( image, options ) {

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
    this.cards = [];

    // @private
    this.iconNode = new ImageCardNode( ImageCard.withImage( image ) );

    // Add a background rectangle with no fill or stroke, so that this Node's visible bounds remain constant
    var backgroundNode = new Rectangle( 0, 0, this.iconNode.width, this.iconNode.height, {
      stroke: SHOW_BOUNDS ? 'red' : null
    } );

    this.iconNode.center = backgroundNode.center;
    this.iconNode.visible = false;

    // @public emit1( {ImageCard} instance ) is called when a card is removed from the stack
    this.removedEmitter = new Emitter();
    if ( options.removedListener ) {
      this.removedEmitter.addListener( options.removedListener );
    }

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, this.iconNode ];

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
    this.iconNode.addInputListener( dragHandler );

    Node.call( this, options );

    this.disposeImageCardStackNode = function() {

      // clean up emitter
      assert && assert( self.removedEmitter, 'called dispose twice?' );
      self.removedEmitter.removeAllListeners();
      self.removedEmitter = null;

      // empty stack
      self.cards.length = 0;
      self.iconNode.visible = false;

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
      this.iconNode.visible = true;
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
      this.iconNode.visible = ( this.cards.length > 0 );
    }
  } );
} );
