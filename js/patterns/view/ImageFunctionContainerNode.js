// Copyright 2016, University of Colorado Boulder

/**
 * Container for {ImageFunction} instances.
 *
 * Responsibilities:
 *
 * - create a specified number of {ImageFunction} function instances, all of the same type
 * - create an associated Node for each instance
 * - handle dragging instances out of the container
 * - decide what to do with an instance when the user stops dragging it
 * - return an instance to the container when it's location is the same as the container
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableContainerNode = require( 'FUNCTION_BUILDER/common/view/MovableContainerNode' );
  var MovableImageFunctionNode = require( 'FUNCTION_BUILDER/patterns/view/MovableImageFunctionNode' );

  /**
   * @param {constructor} FunctionConstructor - constructor for a subtype of {ImageFunction}
   * @param {Node} parentNode - parent for function Nodes when they are outside the container
   * @param {PatternsScene} scene
   * @param {Object} [options]
   * @constructor
   */
  function ImageFunctionContainerNode( FunctionConstructor, parentNode, scene, options ) {

    options = _.extend( {
      popOutOffset: FBConstants.FUNCTION_POP_OUT_OFFSET,
      size: FBConstants.FUNCTION_SIZE
    }, options );

    var thisNode = this;

    // When the user stops dragging a function, decide what to do with it.
    options.endDrag = function( functionNode, event, trail ) {

      var functionInstance = functionNode.movable;

      assert && assert( functionInstance.containerLocation, 'function instance has no containerLocation' );

      if ( functionInstance.locationProperty.get().equals( functionInstance.containerLocation ) ) {

        // function has been dragged back to exactly the location of the container
        thisNode.push( functionNode );
      }
      else {

        // try to add function to the builder
        var slotNumber = scene.builder.addFunctionInstance( functionInstance );

        // If the function isn't added to the builder, then return it to the container.
        if ( slotNumber === -1 ) {
          functionInstance.destination = functionInstance.containerLocation;
        }
      }
    };

    MovableContainerNode.call( this, parentNode, options );

    // Populates the container
    this._populateContainer = function( numberOfInstances, containerLocation ) {
      for ( var i = 0; i < numberOfInstances; i++ ) {

        // IIFE to create a closure for each function instance
        (function() {

          // model element
          var functionInstance = new FunctionConstructor();
          functionInstance.containerLocation = containerLocation; //TODO
          scene.functionInstances.push( functionInstance );

          // associated Node
          var functionNode = new MovableImageFunctionNode( functionInstance, {
            endDrag: options.endDrag
          } );

          // put the Node in the container
          thisNode.push( functionNode );

          // return the Node to the container
          functionInstance.locationProperty.lazyLink( function( location ) {
            assert && assert( functionInstance.containerLocation, 'function instance has no containerLocation' );
            if ( !functionInstance.dragging && location.equals( functionInstance.containerLocation ) ) {
              thisNode.push( functionNode );
            }
          } );
        })();
      }
    };
  }

  functionBuilder.register( 'ImageFunctionContainerNode', ImageFunctionContainerNode );

  return inherit( MovableContainerNode, ImageFunctionContainerNode, {

    populateContainer: function( numberOfInstances, containerLocation ) {
      this._populateContainer( numberOfInstances, containerLocation );
    }
  } );
} );
