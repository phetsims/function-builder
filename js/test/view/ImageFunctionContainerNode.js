// Copyright 2016, University of Colorado Boulder

/**
 * Container for {ImageFunction} instances.
 *
 * Responsibilities:
 *
 * - create a specified number of {ImageFunction} function instance, all of the same type
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
  var Dimension2 = require( 'DOT/Dimension2' );
  var FBConstants = require( 'FUNCTION_BUILDER/common/FBConstants' );
  var FunctionBackgroundNode = require( 'FUNCTION_BUILDER/common/view/FunctionBackgroundNode' );
  var functionBuilder = require( 'FUNCTION_BUILDER/functionBuilder' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MovableContainerNode = require( 'FUNCTION_BUILDER/test/view/MovableContainerNode' );
  var MovableImageFunctionNode = require( 'FUNCTION_BUILDER/patterns/view/MovableImageFunctionNode' );

  /**
   * @param {constructor} FunctionConstructor - constructor for a subtype of {ImageFunction}
   * @param {number} numberOfInstances - number of instances to create
   * @param {Node} parentNode - parent for function Nodes when they are outside the container
   * @param {PatternsScene} scene
   * @param {Object} [options]
   * @constructor
   */
  function ImageFunctionContainerNode( FunctionConstructor, numberOfInstances, parentNode, scene, options ) {

    options = _.extend( {
      popOutOffset: FBConstants.FUNCTION_POP_OUT_OFFSET
    }, options );

    var thisNode = this;

    // Compute the size of the container, assumes all function are the same size
    var functionBackgroundNode = new FunctionBackgroundNode();
    options.size = new Dimension2( functionBackgroundNode.width, functionBackgroundNode.height );

    // When the user stops dragging a function, decide what to do with it.
    options.endDrag = function( functionInstance, functionNode, event, trail ) {

      if ( functionInstance.locationProperty.get().equals( thisNode.location ) ) {

        // function has been dragged back to exactly the location of the container
        thisNode.push( functionNode );
      }
      else {

        // try to add function to a builder
        var slotNumber = -1;
        for ( var i = 0; i < scene.builders.length && slotNumber === -1; i++ ) {
          slotNumber = scene.builders[ i ].addFunctionInstance( functionInstance );
        }

        // If the function isn't added to a builder, then return it to the container.
        if ( slotNumber === -1 ) {
          functionInstance.destination = thisNode.location;
        }
      }
    };

    MovableContainerNode.call( this, parentNode, options );

    // Populate the container
    for ( var i = 0; i < numberOfInstances; i++ ) {

      // IIFE to create a closure for each function instance
      (function() {

        // model element
        var functionInstance = new FunctionConstructor( {
          containerNode: thisNode
        } );
        scene.addFunctionInstance( functionInstance );

        // associated node
        var functionNode = new MovableImageFunctionNode( functionInstance, {
          endDrag: options.endDrag
        } );

        // put the node in the container
        thisNode.push( functionNode );

        // return the node to the container
        functionInstance.locationProperty.lazyLink( function( location ) {
          if ( !functionInstance.dragging && location.equals( thisNode.location ) ) {
            thisNode.push( functionNode );
          }
        } );
      })();
    }
  }

  functionBuilder.register( 'ImageFunctionContainerNode', ImageFunctionContainerNode );

  return inherit( MovableContainerNode, ImageFunctionContainerNode );
} );
