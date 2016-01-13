// Copyright 2016, University of Colorado Boulder

//TODO much in common with MovableFunctionNode
/**
 * Card node that stays synchronized with the position of a card, and can be dragged by the user
 * to set the position of a card.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CardNode = require( 'FUNCTION_BUILDER/common/view/CardNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MoveTo = require( 'FUNCTION_BUILDER/common/view/MoveTo' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  /**
   * @param {AbstractCard} card
   * @param {Object} [options]
   * @constructor
   */
  function MovableCardNode( card, options ) {

    options = _.extend( {
      cursor: 'pointer',

      /**
       * {function} called at the start of each drag sequence
       * @param {AbstractCard} card
       * @param {Event} event
       * @param {Trail} trail
       */
      startDrag: function( card, event, trail ) {},

      /**
       * {function} called at the end of each drag sequence
       * @param {AbstractCard} card
       * @param {Event} event
       * @param {Trail} trail
       */
      endDrag: function( card, event, trail ) {}

    }, options );

    CardNode.call( this, card, options );

    var thisNode = this;
    var moveTo = null;

    function locationObserver( location ) {

      // stop any animation that is in progress
      moveTo && moveTo.stop();

      if ( card.dragging ) {

        // if under user control, move directly to the new location
        thisNode.center = location;
      }
      else {

        // animate to the new location
        moveTo = new MoveTo( thisNode, location, {

          onComplete: function() {
            if ( !card.dragging && location.equals( card.locationProperty.initialValue ) ) {
              // card has been returned to the Carousel
              card.dispose();
            }
          }
        } );
        moveTo.start();
      }
    }

    card.locationProperty.link( locationObserver );

    this.addInputListener( new SimpleDragHandler( {

      //TODO cancel drag if card is disposed of during a drag cycle, scenery#218

      allowTouchSnag: true,

      start: function( event, trail ) {
        event.currentTarget.moveToFront(); // dragging a card moves it to the front
        card.dragging = true;
        options.startDrag( card, event, trail );
      },

      // No need to constrain drag bounds because cards return to a carousel when released.
      // @param { {Vector2} delta, {Vector2} oldPosition, {Vector2} position } } translationParams
      translate: function( translationParams ) {
        var location = card.locationProperty.get().plus( translationParams.delta );
        card.locationProperty.set( location );
      },

      end: function( event, trail ) {
        card.dragging = false;
        options.endDrag( card, event, trail );
      }
    } ) );

    // @private
    this.disposeMovableCardNode = function() {
      moveTo && moveTo.stop();
      card.locationProperty.unlink( locationObserver );
    };
  }

  functionBuilder.register( 'MovableCardNode', MovableCardNode );

  return inherit( CardNode, MovableCardNode, {

    // @public
    dispose: function() {
      functionBuilder.log && functionBuilder.log( this.constructor.name + '.dispose' );
      this.disposeMovableCardNode();
    }
  } );
} );
