// Copyright 2016, University of Colorado Boulder

/**
 * Manages the lifecycle of {ImageFunction} instances.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var ImageFunction = require( 'FUNCTION_BUILDER/patterns/model/ImageFunction' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableImageFunctionNode = require( 'FUNCTION_BUILDER/patterns/view/MovableImageFunctionNode' );

  /**
   * @param {PatternsScene} scene
   * @param {Node} parentNode
   * @constructor
   */
  function ImageFunctionListener( scene, parentNode ) {
    this.scene = scene; // @private
    this.parentNode = parentNode; // @private
  }

  functionBuilder.register( 'ImageFunctionListener', ImageFunctionListener );

  return inherit( Object, ImageFunctionListener, {

    /**
     * When a function instance is created, add it to the model and view.
     * When the function instance is returned to the functions carousel, dispose of it.
     * When the function instance is disposed of, clean up the model and view.
     *
     * Pass this function to ImageFunctionCreatorNode via options.createdListener.
     *
     * @param {ImageFunction} functionInstance - the instance that was created
     * @public
     */
    createdListener: function( functionInstance ) {

      functionBuilder.log && functionBuilder.log( this.constructor.name + '.createdListener' );
      assert && assert( arguments.length === 1, 'does the associated Emitter call emit1?' );
      assert && assert( functionInstance instanceof ImageFunction, 'unexpected functionInstance type: ' + functionInstance.constructor.name );

      var thisListener = this;

      // add functionInstance to model
      thisListener.scene.addFunctionInstance( functionInstance );

      // create a Node for the function instance
      var builders = this.scene.builders;
      var functionNode = new MovableImageFunctionNode( functionInstance, {

        // If the function is in a builder, remove it.
        startDrag: function( functionInstance, event, trail ) {
          var removed = false;
          for ( var i = 0; i < builders.length && !removed; i++ ) {
            if ( builders[ i ].containsFunctionInstance( functionInstance ) ) {
              builders[ i ].removeFunctionInstance( functionInstance );
              removed = true;
            }
          }
        },

        // When done dragging the function ...
        endDrag: thisListener.endDrag.bind( thisListener )
      } );
      thisListener.parentNode.addChild( functionNode );

      /**
       * Use an IIFE to create a closure for future management of this functionInstance and its Node.
       * @param {ImageFunction} functionInstance
       * @param {Node} functionNode
       */
      (function( functionInstance, functionNode ) {

        // function has animated back to the functions carousel
        var locationListener = function( location ) {
          if ( !functionInstance.dragging && location.equals( functionInstance.locationProperty.initialValue ) ) {
            functionInstance.dispose();
          }
        };
        functionInstance.locationProperty.link( locationListener );

        // function has been disposed of
        functionInstance.disposeCalledEmitter.addListener( function( functionInstance ) {

          assert && assert( arguments.length === 1, 'does the associated Emitter call emit1?' );
          assert && assert( functionInstance instanceof ImageFunction, 'unexpected functionInstance type: ' + functionInstance.constructor.name );

          // clean up the instance
          functionInstance.locationProperty.unlink( locationListener );
          thisListener.scene.removeFunctionInstance( functionInstance );

          // clean up the associated Node
          thisListener.parentNode.removeChild( functionNode );
          functionNode.dispose();
        } );

      })( functionInstance, functionNode );
    },

    /**
     * When the user stops dragging a function instance, decide what to do with it.
     *
     * @param {ImageFunction} functionInstance
     * @param {Event} event
     * @param {Trail} trail
     * @public
     */
    endDrag: function( functionInstance, event, trail ) {

      functionBuilder.log && functionBuilder.log( this.constructor.name + '.endDrag' );
      assert && assert( functionInstance instanceof ImageFunction, 'unexpected functionInstance type: ' + functionInstance.constructor.name );

      if ( functionInstance.locationProperty.get().equals( functionInstance.locationProperty.initialValue ) ) {

        // function has been dragged back to exactly its original location in the carousel
        functionInstance.dispose();
      }
      else {

        // try to add function to a builder
        var slotNumber = -1;
        for ( var i = 0; i < this.scene.builders.length && slotNumber === -1; i++ ) {
          slotNumber = this.scene.builders[ i ].addFunctionInstance( functionInstance );
        }

        // If the function isn't added to a builder, then return it to the carousel.
        if ( slotNumber === -1 ) {
          functionInstance.destination = functionInstance.locationProperty.initialValue;
        }
      }
    }
  } );
} );
