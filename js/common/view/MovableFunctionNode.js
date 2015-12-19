// Copyright 2002-2015, University of Colorado Boulder

/**
 * Function node that stays synchronized with the position of a function instance, and can be dragged by the user
 * to set the position of a function instance.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var FunctionNode = require( 'FUNCTION_BUILDER/common/view/FunctionNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MoveTo = require( 'FUNCTION_BUILDER/common/view/MoveTo' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );

  /**
   * @param {AbstractFunction} functionInstance
   * @param {Object} [options]
   * @constructor
   */
  function MovableFunctionNode( functionInstance, options ) {

    options = _.extend( {
      cursor: 'pointer',
      startDrag: function( event, trail ) {}, // {function} called at the start of each drag sequence
      endDrag: function( event, trail ) {} // {function} called at the end of each drag sequence
    }, options );

    FunctionNode.call( this, functionInstance, options );

    var thisNode = this;
    var moveTo = null;

    function locationObserver( location ) {

      if ( functionInstance.dragging ) {

        // if under user control, move directly to the new location
        thisNode.center = location;
      }
      else {

        //TODO should this animation be handled in the model?

        // stop any animation that is in progress
        if ( moveTo ) {
          moveTo.stop();
        }

        // create the animation
        moveTo = new MoveTo( thisNode, location, {

          onStart: function() {
            thisNode.pickable = false;
          },

          onComplete: function() {
            thisNode.pickable = true;
            if ( location.equals( functionInstance.locationProperty.initialValue ) ) {
              // function has been returned to the Carousel
              functionInstance.locationProperty.unlink( locationObserver );
              functionInstance.dispose();
            }
          },

          onStop: function() {
            thisNode.pickable = true;
          }
        } );

        // start the animation
        moveTo.start();
      }
    }

    functionInstance.locationProperty.link( locationObserver );

    this.addInputListener( new SimpleDragHandler( {

      allowTouchSnag: true,

      start: function( event, trail ) {
        event.currentTarget.moveToFront(); // dragging a function moves it to the front
        functionInstance.dragging = true;
        options.startDrag( functionInstance, event, trail );
      },

      translate: function( translationParams ) {
        var location = functionInstance.locationProperty.get().plus( translationParams.delta );
        functionInstance.locationProperty.set( location );
      },

      end: function( event, trail ) {
        functionInstance.dragging = false;
        options.endDrag( functionInstance, event, trail );
      }
    } ) );

    // @private
    this.disposeMovableFunctionNode = function() {
      functionInstance.locationProperty.unlink( locationObserver );
    };
  }

  functionBuilder.register( 'MovableFunctionNode', MovableFunctionNode );

  return inherit( FunctionNode, MovableFunctionNode, {

    // @public
    dispose: function() {
      this.disposeMovableFunctionNode();
    }
  } );
} );
