// Copyright 2016, University of Colorado Boulder

/**
 *  Listens for creation of {ImageFunction} instances.
 *
 *  Responsibilities:
 *
 *  - add the instance to the model
 *  - create a Node for the instance
 *  - remove the Node when the instance is disposed of
 *  - decide what to do with the instance when the user stops dragging it
 *
 *  @author Chris Malley (PixelZoom, Inc.)
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
  function ImageFunctionCreatedListener( scene, parentNode ) {
    this.scene = scene; // @private
    this.parentNode = parentNode; // @private
  }

  functionBuilder.register( 'ImageFunctionCreatedListener', ImageFunctionCreatedListener );

  return inherit( Object, ImageFunctionCreatedListener, {

    /**
     * When a function instance is created, add it to the model and view.
     * Pass this function to ImageFunctionCreatorNode via options.createdEmitterListener
     *
     * @param {ImageFunction} functionInstance - the instance that was created
     * @public
     */
    createdEmitterListener: function( functionInstance ) {

      functionBuilder.log && functionBuilder.log( this.constructor.name + '.createdListener' );
      assert && assert( arguments.length === 1, 'does the associated Emitter call emit1?' );
      assert && assert( functionInstance instanceof ImageFunction, 'unexpected functionInstance type: ' + functionInstance.constructor.name );

      // Use IIFE to create a closure
      (function( functionInstance, scene, parentNode, endDrag ) {

        // add functionInstance to model
        scene.addFunctionInstance( functionInstance );

        // create a Node for the function instance
        var functionNode = new MovableImageFunctionNode( functionInstance, {

          // If the function is in a builder, remove it.
          startDrag: function( functionInstance, event, trail ) {
            var removed = false;
            for ( var i = 0; i < scene.builders.length && !removed; i++ ) {
              if ( scene.builders[ i ].containsFunctionInstance( functionInstance ) ) {
                scene.builders[ i ].removeFunctionInstance( functionInstance );
                removed = true;
              }
            }
          },

          // When done dragging the function ...
          endDrag: endDrag
        } );
        parentNode.addChild( functionNode );

        // function has animated back to the functions carousel
        var locationListener = function( location ) {
          if ( !functionInstance.isDragging && location.equals( functionInstance.locationProperty.initialValue ) ) {
            functionInstance.dispose();
          }
        };
        functionInstance.locationProperty.link( locationListener );

        // when dispose is called for the function instance ...
        functionInstance.disposeCalledEmitter.addListener( function( functionInstance ) {

          assert && assert( arguments.length === 1, 'does the associated Emitter call emit1?' );
          assert && assert( functionInstance instanceof ImageFunction, 'unexpected functionInstance type: ' + functionInstance.constructor.name );

          // clean up the instance
          functionInstance.locationProperty.unlink( locationListener );
          scene.removeFunctionInstance( functionInstance );

          // clean up the associated Node
          parentNode.removeChild( functionNode );
          functionNode.dispose();
        } );

      })( functionInstance, this.scene, this.parentNode, this.endDrag.bind( this ) );
    },

    /**
     * When the user stops dragging a function, decide what to do with it.
     *
     * @param {ImageFunction} functionInstance
     * @param {Event} event
     * @param {Trail} trail
     * @public
     */
    endDrag: function( functionInstance, event, trail ) {

      functionBuilder.log && functionBuilder.log( this.constructor.name + '.endDrag' );
      assert && assert( functionInstance instanceof ImageFunction, 'unexpected functionInstance type: ' + functionInstance.constructor.name );

      // Use IIFE to create a closure
      (function( functionInstance, scene ) {

        if ( functionInstance.locationProperty.get().equals( functionInstance.locationProperty.initialValue ) ) {

          // function has been dragged back to exactly its original location in the carousel
          functionInstance.dispose();
        }
        else {

          // try to add function to a builder
          var slotNumber = -1;
          for ( var i = 0; i < scene.builders.length && slotNumber === -1; i++ ) {
            slotNumber = scene.builders[ i ].addFunctionInstance( functionInstance );
          }

          // If the function isn't added to a builder, then return it to the carousel.
          if ( slotNumber === -1 ) {
            functionInstance.destination = functionInstance.locationProperty.initialValue;
          }
        }

      } )( functionInstance, this.scene );
    }
  } );
} );
